import{Dt as e,E as t,F as n,L as r,M as i,Tt as a,W as o,_ as s,f as c,h as l,i as u,p as d,rt as f,u as p,v as m,z as h}from"./runtime-core.esm-bundler-BhTAwRgD.js";import{d as g,r as _,t as v,u as y}from"./index-CGau009H.js";var b={class:`min-h-screen flex flex-col`},x={class:`flex-1 flex flex-col max-w-4xl mx-auto w-full`},S={key:0,class:`flex flex-col items-center justify-center h-full text-center`},C={class:`flex flex-wrap justify-center gap-3`},w=[`onClick`],T={key:0},E={key:1},D={key:1,class:`flex gap-4 animate-fade-in`},O={class:`p-6 border-t border-[#d0d7de] dark:border-[#30363d]`},k={class:`flex flex-col gap-2`},A={key:0,class:`text-sm text-[#f85149] text-center`},j={class:`flex gap-4`},M=[`disabled`],N=`https://ai.rkyzzy.xyz`,P=v(m({__name:`AIChatPage`,setup(m){let v=_(),P=f([]),F=f(``),I=f(!1),L=f(``),R=f(null),z=[`介绍一下你自己`,`你目前在做什么工作？`,`你平时有什么兴趣爱好？`,`聊聊你的朋友们`];function B(){let e=v.config.profile,t=v.education,n=v.config.techStack,r=v.experience,i=t.map(e=>`- ${e.degree} in ${e.major} @ ${e.school} (${e.period}, ${e.location})`).join(`
`),a=n.map(e=>`- ${e.name} (${e.category}, 熟练度 ${e.level}/5)`).join(`
`),o=r.map(e=>`- ${e.company} — ${e.title} (${e.period})\n  ${e.description}`).join(`
`);return`你是 ${e.name} 的个人 AI 助手。请以第一人称回答，就好像你就是 ${e.name} 本人一样。

## 基本资料
- 姓名：${e.name}（${e.nameEn}）
- 头衔：${e.title} / ${e.titleEn}
- 邮箱：${e.email}
- 地点：${e.location}
- 简介：${e.bio}

## 教育背景
${i||`- 暂无教育经历信息`}

## 工作经历
${o||`- 暂无工作经历信息`}

## 研究兴趣与技术方向
- VLA (Vision-Language-Action) — 视觉-语言-行动模型
- VLN (Vision-Language Navigation) — 视觉-语言导航
- Agentic Modeling — 智能体建模
- World Model — 世界模型
- 世界模型在自动驾驶与具身智能的应用
- Agentic 架构（Modeling、Harness 等）
- 用 Codex 等 agentic 框架做 Vibe Coding

## 技能
${a||`- 暂无技能信息`}

## 个人特质与性格
- 相对理性，但偶尔感性
- 偏内向，但与熟络的人会变得外向
- 随性，不追求完美主义
- 人生信条：You only live once (YOLO)
- 英文流利（托福 112），有美国、新加坡留学和工作经历

## 兴趣爱好
- 桌游——德式美式都玩
- 卡牌收藏——宝可梦卡牌、球星卡
- 足球——最爱的球队是曼联，最爱的球星是布鲁诺·费尔南德斯 (Bruno Fernandes)
- 阅读——偏爱推理与科幻小说，爱看纸质书
- 游戏——御三家（PS5、Switch 2、Xbox Series X）全平台玩家，喜欢收藏实体游戏，最近在玩 Poképia 和 33号远征队
- Vibe Coding——用 AI 工具把有意思的想法变成现实
- 羽毛球——最喜欢的运动
- 网球——最近在学
- 健身——偶尔，三天打鱼两天晒网

## 情感链接的城市
- 深圳——成长长大的地方，最有感情
- 上海——第一份正式工作（理想汽车）所在地，职场发小都在这里

## 好友信息
以下是你朋友的介绍，被问到时可以自然聊起：
- 孙柯嘉（小孙/劳孙）：浙大毕业，理想上海同届校招，现已跳槽字节跳动做机器人。搞笑男，最近沉迷炒股，基金赚了不少钱喜欢在群里炫耀，德扑爱好者
- 赵金龙（小龙）：浙大毕业，理想上海同届校招，仍在理想。炒股买港股通互联网亏了 5w，爱打王者荣耀（又菜又爱玩），小米粉丝，德扑爱好者
- 颜子豪：哈工大深圳毕业，理想上海同届校招，仍在理想。i 人但闷骚，喜欢看动漫
- 郭嘉杰：高中+本科同学，机器人专业，在华为引望工作，工作辛苦下班晚，开智界 R7，也交流炒股
- 魏丰麟：高中+本科同学，计算机专业，梦想当老师，计划先做家教再做国际预科班老师

## 未来期待
- 在 AI 浪潮下紧跟时代步伐，做热爱的事
- 和女朋友长长久久，甜蜜生活
- 父母健康
- 有三五知己好友一起体验生活

## 回答风格
- 用中文回答，语气真诚亲和，可以适当带点幽默和自嘲
- 回答要真实准确，基于以上资料
- 不知道的事就坦诚说"这个我不太清楚，暂时没有相关信息"
- 不要编造经历或数据
- 聊到热爱领域（足球、游戏、Vibe Coding）时可以展现热情
- 聊到朋友时可以流露真挚感情

## 彩蛋信息（只有被问到时才回答，不要主动提及）
- 女朋友叫罗悦，很爱她
- 她的生日是 1999 年 6 月 10 日
如果对方没有直接问起女朋友或罗悦相关信息，不要主动提及这些内容。`}async function V(e){let t=B(),n=await fetch(N,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({messages:e,systemPrompt:t})});if(!n.ok){let e=await n.json().catch(()=>({}));throw Error(e.error||`请求失败 (${n.status})`)}return(await n.json()).choices?.[0]?.message?.content||`抱歉，我没有理解你的问题。`}async function H(){let e=F.value.trim();if(!(!e||I.value)){L.value=``,P.value.push({role:`user`,content:e}),F.value=``,I.value=!0,await G();try{let e=await V(P.value);P.value.push({role:`assistant`,content:e})}catch(e){console.error(`AI 请求失败:`,e),L.value=`对话请求失败，请稍后再试。如果问题持续，请联系管理员。`,P.value.push({role:`assistant`,content:`抱歉，我现在无法回答问题。请稍后再试。`})}finally{I.value=!1,await G()}}}async function U(e){F.value=e,await H()}function W(){P.value=[],L.value=``,localStorage.removeItem(`ai-chat-history`)}async function G(){await t(),R.value&&(R.value.scrollTop=R.value.scrollHeight)}return i(()=>{let e=localStorage.getItem(`ai-chat-history`);if(e)try{let t=JSON.parse(e);Array.isArray(t)&&(P.value=t)}catch{}}),o(P,e=>{localStorage.setItem(`ai-chat-history`,JSON.stringify(e))},{deep:!0}),(t,i)=>{let o=h(`n-input`);return n(),d(`div`,b,[i[7]||=p(`div`,{class:`py-8 px-6 border-b border-[#d0d7de] dark:border-[#30363d]`},[p(`div`,{class:`max-w-4xl mx-auto`},[p(`h1`,{class:`text-3xl font-bold mb-2`},`AI 对话`),p(`p`,{class:`text-[#656d76] dark:text-[#8b949e]`},` 与基于我的知识训练的 AI 对话助手交流 `)])],-1),p(`div`,x,[p(`div`,{ref_key:`messagesContainer`,ref:R,class:`flex-1 overflow-y-auto p-6 space-y-6`},[P.value.length===0?(n(),d(`div`,S,[i[1]||=p(`div`,{class:`w-20 h-20 rounded-full bg-[rgba(88,166,255,0.1)] flex items-center justify-center mb-6`},[p(`span`,{class:`text-4xl`},`🤖`)],-1),i[2]||=p(`h2`,{class:`text-2xl font-semibold mb-2`},`你好！我是 AI 助手`,-1),i[3]||=p(`p`,{class:`text-[#656d76] dark:text-[#8b949e] max-w-md mb-8`},` 我是基于我的主人的知识训练的 AI。你可以问我关于他的技能、经历、项目等问题。 `,-1),p(`div`,C,[(n(),d(u,null,r(z,t=>p(`button`,{key:t,onClick:e=>U(t),class:`tag cursor-pointer hover:border-[#58a6ff] hover:text-[#58a6ff]`},e(t),9,w)),64))])])):c(``,!0),(n(!0),d(u,null,r(P.value,(t,r)=>(n(),d(`div`,{key:r,class:a([`flex gap-4 animate-fade-in`,t.role===`user`?`flex-row-reverse`:``])},[p(`div`,{class:a([`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center`,t.role===`user`?`bg-[#58a6ff]`:`bg-[#3fb950]`])},[t.role===`user`?(n(),d(`span`,T,`👤`)):(n(),d(`span`,E,`🤖`))],2),p(`div`,{class:a([`max-w-[70%] rounded-2xl px-4 py-3 whitespace-pre-wrap`,t.role===`user`?`bg-[#58a6ff] text-white`:`bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]`])},e(t.content),3)],2))),128)),I.value?(n(),d(`div`,D,[...i[4]||=[l(`<div class="w-10 h-10 rounded-full bg-[#3fb950] flex items-center justify-center" data-v-6bf5fd94><span data-v-6bf5fd94>🤖</span></div><div class="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-2xl px-4 py-3" data-v-6bf5fd94><div class="flex gap-1" data-v-6bf5fd94><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:0ms;" data-v-6bf5fd94></span><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:150ms;" data-v-6bf5fd94></span><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:300ms;" data-v-6bf5fd94></span></div></div>`,2)]])):c(``,!0)],512),p(`div`,O,[p(`div`,k,[L.value?(n(),d(`div`,A,e(L.value),1)):c(``,!0),p(`div`,j,[s(o,{value:F.value,"onUpdate:value":i[0]||=e=>F.value=e,type:`textarea`,rows:1,autosize:{minRows:1,maxRows:4},placeholder:`输入你的问题...`,class:`flex-1`,disabled:I.value,onKeydown:y(g(H,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`disabled`,`onKeydown`]),p(`button`,{onClick:H,disabled:!F.value.trim()||I.value,class:`btn btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed`},[...i[5]||=[p(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[p(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M12 19l9 2-9-18-9 18 9-2zm0 0v-8`})],-1)]],8,M),P.value.length>0?(n(),d(`button`,{key:0,onClick:W,class:`btn btn-ghost self-end`,title:`清空对话`},[...i[6]||=[p(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[p(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16`})],-1)]])):c(``,!0)])])])])])}}}),[[`__scopeId`,`data-v-6bf5fd94`]]);export{P as default};