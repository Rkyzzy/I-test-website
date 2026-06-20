export default async function handler(
  req: { method: string; body: any },
  res: {
    setHeader: (key: string, value: string) => void
    status: (code: number) => { json: (data: any) => void; end: () => void }
  }
) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  for (const [key, value] of Object.entries(corsHeaders)) {
    res.setHeader(key, value)
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { messages, systemPrompt } = req.body

    if (!Array.isArray(messages) || typeof systemPrompt !== 'string') {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY not configured')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 2048,
        temperature: 0.8,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepSeek API error:', response.status, errorText)
      return res.status(response.status).json({
        error: `DeepSeek API returned ${response.status}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
