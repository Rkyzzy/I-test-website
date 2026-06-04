import{C as e,D as t,T as n,_ as r,a as i,b as a,d as o,g as s,i as c,k as l,l as u,m as d,p as f,r as p,s as m,t as h,u as g,x as _,y as v}from"./index-G60Sbd3G.js";import{t as y}from"./_plugin-vue_export-helper-BDNMzG2s.js";var b={class:`min-h-screen flex flex-col`},x={class:`flex-1 flex flex-col max-w-4xl mx-auto w-full`},S={key:0,class:`flex flex-col items-center justify-center h-full text-center`},C={class:`flex flex-wrap justify-center gap-3`},w=[`onClick`],T={key:0},E={key:1},D={class:`whitespace-pre-wrap`},O={key:1,class:`flex gap-4 animate-fade-in`},k={class:`p-6 border-t border-light-border dark:border-dark-border`},A={class:`flex gap-4`},j=[`disabled`],M=y(d({__name:`AIChatPage`,setup(d){let y=h(),M=n([]),N=n(``),P=n(!1),F=n(null),I=[`你能介绍一下自己吗？`,`你擅长哪些技术？`,`你参与过什么项目？`,`你的研究方向是什么？`],L={intro:`你好！我是基于 ${y.name} 的知识和经历训练的 AI 助手。

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

或者你也可以用中文问我任何关于他/她的问题！`}async function z(){let e=N.value.trim();if(!e||P.value)return;M.value.push({role:`user`,content:e}),N.value=``,P.value=!0,await H(),await new Promise(e=>setTimeout(e,1e3+Math.random()*1e3));let t=R(e);M.value.push({role:`assistant`,content:t}),P.value=!1,await H()}async function B(e){N.value=e,await z()}function V(){M.value=[]}async function H(){await s(),F.value&&(F.value.scrollTop=F.value.scrollHeight)}return r(()=>{let e=localStorage.getItem(`ai-chat-history`);if(e)try{M.value=JSON.parse(e)}catch{console.error(`Failed to load chat history`)}}),e(M,e=>{localStorage.setItem(`ai-chat-history`,JSON.stringify(e))},{deep:!0}),(e,n)=>{let r=_(`n-input`);return v(),g(`div`,b,[n[7]||=m(`div`,{class:`py-8 px-6 border-b border-light-border dark:border-dark-border`},[m(`div`,{class:`max-w-4xl mx-auto`},[m(`h1`,{class:`text-3xl font-bold mb-2`},`AI 对话`),m(`p`,{class:`text-light-muted dark:text-dark-muted`},` 与基于我的知识训练的 AI 对话助手交流 `)])],-1),m(`div`,x,[m(`div`,{ref_key:`messagesContainer`,ref:F,class:`flex-1 overflow-y-auto p-6 space-y-6`},[M.value.length===0?(v(),g(`div`,S,[n[1]||=m(`div`,{class:`w-20 h-20 rounded-full bg-accent-blue/10 flex items-center justify-center mb-6`},[m(`span`,{class:`text-4xl`},`🤖`)],-1),n[2]||=m(`h2`,{class:`text-2xl font-semibold mb-2`},`你好！我是 AI 助手`,-1),n[3]||=m(`p`,{class:`text-light-muted dark:text-dark-muted max-w-md mb-8`},` 我是基于主人的知识库训练的 AI。你可以问我关于他的技能、经历、项目等问题。 `,-1),m(`div`,C,[(v(),g(i,null,a(I,e=>m(`button`,{key:e,onClick:t=>B(e),class:`tag cursor-pointer hover:border-accent-blue hover:text-accent-blue`},l(e),9,w)),64))])])):u(``,!0),(v(!0),g(i,null,a(M.value,(e,n)=>(v(),g(`div`,{key:n,class:t([`flex gap-4 animate-fade-in`,e.role===`user`?`flex-row-reverse`:``])},[m(`div`,{class:t([`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center`,e.role===`user`?`bg-accent-blue`:`bg-accent-green`])},[e.role===`user`?(v(),g(`span`,T,`👤`)):(v(),g(`span`,E,`🤖`))],2),m(`div`,{class:t([`max-w-[70%] rounded-2xl px-4 py-3`,e.role===`user`?`bg-accent-blue text-white`:`bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border`])},[m(`p`,D,l(e.content),1)],2)],2))),128)),P.value?(v(),g(`div`,O,[...n[4]||=[o(`<div class="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center" data-v-d2c1d65b><span data-v-d2c1d65b>🤖</span></div><div class="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl px-4 py-3" data-v-d2c1d65b><div class="flex gap-1" data-v-d2c1d65b><span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay:0ms;" data-v-d2c1d65b></span><span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay:150ms;" data-v-d2c1d65b></span><span class="w-2 h-2 bg-accent-green rounded-full animate-bounce" style="animation-delay:300ms;" data-v-d2c1d65b></span></div></div>`,2)]])):u(``,!0)],512),m(`div`,k,[m(`div`,A,[f(r,{value:N.value,"onUpdate:value":n[0]||=e=>N.value=e,type:`textarea`,rows:1,autosize:{minRows:1,maxRows:4},placeholder:`输入你的问题...`,class:`flex-1`,onKeydown:p(c(z,[`exact`,`prevent`]),[`enter`])},null,8,[`value`,`onKeydown`]),m(`button`,{onClick:z,disabled:!N.value.trim()||P.value,class:`btn btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed`},[...n[5]||=[m(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[m(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M12 19l9 2-9-18-9 18 9-2zm0 0v-8`})],-1)]],8,j),M.value.length>0?(v(),g(`button`,{key:0,onClick:V,class:`btn btn-ghost self-end`,title:`清空对话`},[...n[6]||=[m(`svg`,{class:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[m(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16`})],-1)]])):u(``,!0)])])])])}}}),[[`__scopeId`,`data-v-d2c1d65b`]]);export{M as default};