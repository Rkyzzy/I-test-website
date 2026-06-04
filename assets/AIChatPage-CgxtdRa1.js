import{Ct as e,E as t,F as n,L as r,M as i,Tt as a,W as o,_ as s,f as c,h as l,i as u,p as d,rt as f,u as p,v as m,z as h}from"./runtime-core.esm-bundler-rZaFWmUE.js";import{a as g,i as _,t as v}from"./index-DeZQ_AZV.js";import{t as y}from"./_plugin-vue_export-helper-BDNMzG2s.js";var b={class:`min-h-screen flex flex-col`},x={class:`flex-1 flex flex-col max-w-4xl mx-auto w-full`},S={key:0,class:`flex flex-col items-center justify-center h-full text-center`},C={class:`flex flex-wrap justify-center gap-3`},w=[`onClick`],T={key:0},E={key:1},D={class:`whitespace-pre-wrap`},O={key:1,class:`flex gap-4 animate-fade-in`},k={class:`p-6 border-t border-[#d0d7de] dark:border-[#30363d]`},A={class:`flex gap-4`},j=[`disabled`],M=y(m({__name:`AIChatPage`,setup(m){let y=v(),M=f([]),N=f(``),P=f(!1),F=f(null),I=[`你能介绍一下自己吗？`,`你擅长哪些技术？`,`你参与过什么项目？`,`你的研究方向是什么？`],L={intro:`你好！我是基于 ${y.name} 的知识和经历训练的 AI 助手。

${y.name} 是一位 ${y.title}，${y.bio}

如果你想了解更多关于我的训练者，可以问我关于他的技能、工作经历、项目经验等任何问题！`,skills:`我的训练者 ${y.name} 掌握以下技能：

**编程语言：** JavaScript, TypeScript, Python

**前端框架：** Vue.js, React, Node.js

**工具：** Git, Docker, Linux

**其他：** 系统设计、团队协作、项目管理

如果你想了解某个具体领域，可以问我更多细节！`,projects:`让我介绍一下 ${y.name} 参与过的一些项目：

**AI Personal Assistant** - 基于个人知识库构建的 AI 助手

**Real-time Collaboration Platform** - 支持多人实时协作的在线工具

**ML Model Compression Toolkit** - 模型压缩工具

想了解某个项目的详细信息吗？`,research:`${y.name} 的研究方向主要包括：

**人工智能与机器学习**
- 深度学习模型优化与压缩
- 知识蒸馏技术
- 边缘设备部署优化

如果你对这个方向感兴趣，可以问我更多相关问题！`};function R(e){let t=e.toLowerCase();return t.includes(`介绍`)||t.includes(`自己`)||t.includes(`关于`)?L.intro:t.includes(`技能`)||t.includes(`擅长`)||t.includes(`技术`)?L.skills:t.includes(`项目`)?L.projects:t.includes(`研究`)||t.includes(`方向`)?L.research:`感谢你的问题！关于"${e}"

作为 ${y.name} 的 AI 助手，我可以帮助你了解他/她的背景和经历。

你可以问我：
- 关于他/她的技能和经验
- 他/她参与过的项目
- 研究方向
- 工作经历

或者你也可以用中文问我任何关于他/她的问题！`}async function z(){let e=N.value.trim();if(!e||P.value)return;M.value.push({role:`user`,content:e}),N.value=``,P.value=!0,await H(),await new Promise(e=>setTimeout(e,1e3+Math.random()*1e3));let t=R(e);M.value.push({role:`assistant`,content:t}),P.value=!1,await H()}async function B(e){N.value=e,await z()}function V(){M.value=[]}async function H(){await t(),F.value&&(F.value.scrollTop=F.value.scrollHeight)}return i(()=>{let e=localStorage.getItem(`ai-chat-history`);if(e)try{M.value=JSON.parse(e)}catch{console.error(`Failed to load chat history`)}}),o(M,e=>{localStorage.setItem(`ai-chat-history`,JSON.stringify(e))},{deep:!0}),(t,i)=>{let o=h(`n-input`);return n(),d(`div`,b,[i[7]||=p(`div`,{class:`py-8 px-6 border-b border-[#d0d7de] dark:border-[#30363d]`},[p(`div`,{class:`max-w-4xl mx-auto`},[p(`h1`,{class:`text-3xl font-bold mb-2`},`AI 对话`),p(`p`,{class:`text-[#656d76] dark:text-[#8b949e]`},` 与基于我的知识训练的 AI 对话助手交流 `)])],-1),p(`div`,x,[p(`div`,{ref_key:`messagesContainer`,ref:F,class:`flex-1 overflow-y-auto p-6 space-y-6`},[M.value.length===0?(n(),d(`div`,S,[i[1]||=p(`div`,{class:`w-20 h-20 rounded-full bg-[rgba(88,166,255,0.1)] flex items-center justify-center mb-6`},[p(`span`,{class:`text-4xl`},`🤖`)],-1),i[2]||=p(`h2`,{class:`text-2xl font-semibold mb-2`},`你好！我是 AI 助手`,-1),i[3]||=p(`p`,{class:`text-[#656d76] dark:text-[#8b949e] max-w-md mb-8`},` 我是基于主人的知识库训练的 AI。你可以问我关于他的技能、经历、项目等问题。 `,-1),p(`div`,C,[(n(),d(u,null,r(I,e=>p(`button`,{key:e,onClick:t=>B(e),class:`tag cursor-pointer hover:border-[#58a6ff] hover:text-[#58a6ff]`},a(e),9,w)),64))])])):c(``,!0),(n(!0),d(u,null,r(M.value,(t,r)=>(n(),d(`div`,{key:r,class:e([`flex gap-4 animate-fade-in`,t.role===`user`?`flex-row-reverse`:``])},[p(`div`,{class:e([`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center`,t.role===`user`?`bg-[#58a6ff]`:`bg-[#3fb950]`])},[t.role===`user`?(n(),d(`span`,T,`👤`)):(n(),d(`span`,E,`🤖`))],2),p(`div`,{class:e([`max-w-[70%] rounded-2xl px-4 py-3`,t.role===`user`?`bg-[#58a6ff] text-white`:`bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]`])},[p(`p`,D,a(t.content),1)],2)],2))),128)),P.value?(n(),d(`div`,O,[...i[4]||=[l(`<div class="w-10 h-10 rounded-full bg-[#3fb950] flex items-center justify-center" data-v-8af84c9d><span data-v-8af84c9d>🤖</span></div><div class="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-2xl px-4 py-3" data-v-8af84c9d><div class="flex gap-1" data-v-8af84c9d><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:0ms;" data-v-8af84c9d></span><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:150ms;" data-v-8af84c9d></span><span class="w-2 h-2 bg-[#3fb950] rounded-full animate-bounce" style="animation-delay:300ms;" data-v-8af84c9d></span></div></div>`,2)]])):c(``,!0)],512),p(`div`,k,[p(`div`,A,[s(o,{value:N.value,"onUpdate:value":i[0]||=e=>N.value=e,type:`textarea`,rows:1,autosize:{minRows:1,maxRows:4},placeholder:`输入你的问题...`,class:`flex-1`,onKeydown:_(g(z,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`onKeydown`]),p(`button`,{onClick:z,disabled:!N.value.trim()||P.value,class:`btn btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed`},[...i[5]||=[p(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[p(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M12 19l9 2-9-18-9 18 9-2zm0 0v-8`})],-1)]],8,j),M.value.length>0?(n(),d(`button`,{key:0,onClick:V,class:`btn btn-ghost self-end`,title:`清空对话`},[...i[6]||=[p(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[p(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16`})],-1)]])):c(``,!0)])])])])}}}),[[`__scopeId`,`data-v-8af84c9d`]]);export{M as default};