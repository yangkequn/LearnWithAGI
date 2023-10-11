"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2468],{9492:function(e,l,t){t.r(l),t.d(l,{Context:function(){return r},default:function(){return s}});var n=t(5893),i=t(7294);let r=i.createContext({skillTree:[],setSkillTree:()=>{},skillMyTrace:{},setSkillMyTrace:()=>{},skillSession:null,setSkillSession:()=>{},topic:"",setTopic:()=>{}});function s(e){let{children:l}=e,[t,s]=(0,i.useState)([]),[a,d]=(0,i.useState)(""),[o,c]=(0,i.useState)({}),[x,f]=(0,i.useState)(null);return(0,n.jsx)(r.Provider,{value:{skillTree:t,setSkillTree:s,skillMyTrace:o,setSkillMyTrace:c,skillSession:x,setSkillSession:f,topic:a,setTopic:d},children:l})}},2468:function(e,l,t){t.r(l),t.d(l,{default:function(){return x}});var n=t(5893),i=t(7294),r=t(7720),s=t(1138),a=t(1899),d=t(9492),o=t(4178),c=t(1733);function x(e){var l;let{volume:t}=e,{setCreditTM:x}=(0,i.useContext)(o.GlobalContext),[f,u]=(0,i.useState)(5),[g,v]=(0,i.useState)(!1),{skillTree:h,setSkillTree:m,skillTreeSelected:w,setSkillTreeSelected:p,skillMyTrace:b,setSkillMyTrace:j,skillSession:y,setSkillSession:k}=(0,i.useContext)(d.Context),[N,A]=(0,i.useState)([]),[Q,S]=(0,i.useState)(-1),T=()=>(null==h?void 0:h.Name)+":"+(null==h?void 0:h.Detail),C=()=>"".concat(null==y?void 0:y.Name,":").concat(null==y?void 0:y.Detail),O=(e,l)=>(0,s.bl)("SkillQAs",{Name:e,Topic:T()}).then(t=>l&&!!(null==t?void 0:t.length)>0&&e===C()&&A(t));(0,i.useEffect)(()=>{A([]),S(-1);let e=C();!e||e.indexOf("undefined")>=0||e.indexOf("undefined")>=0||O(e,!0)},[y]);let[E,D]=(0,i.useState)("");(0,i.useEffect)(()=>{if(D(null!==(r=null===(n=b[C()])||void 0===n?void 0:null===(t=n.QAs)||void 0===t?void 0:t.join(""))&&void 0!==r?r:""),!N||0==N.length)return S(-1);if(Q>=0)return;let e=null===(i=b[C()])||void 0===i?void 0:i.QAs,l=null!==(s=null==e?void 0:e.join(""))&&void 0!==s?s:"";for(var t,n,i,r,s,a=0;a<N.length;a++){let e=N[a].Q;if(N[a].Answer,!(l.indexOf(e+"|||0")>=0))return S(a)}},[N,b]);let _=e=>(null==E?void 0:E.indexOf(e.Q+"|||0"))>=0?"✅":(null==E?void 0:E.indexOf(e.Q))>=0?"❌":"⬜",I=(e,l)=>{let t=E.indexOf(e.Q)>=0,n=E.indexOf(e.Q+"|||0")>=0;return t?n&&e.Answers[0]==l?"✅":!n&&E.indexOf(e.Q+"|||"+e.Answers.indexOf(l))>=0?"❌":"⬜":"⬜"},M=function(){for(var e=arguments.length,l=Array(e),n=0;n<e;n++)l[n]=arguments[n];let i=l[0],r=new Audio(i);r.volume=isNaN(t)?.5:t,r.onended=()=>{l.length>1&&M(...l.slice(1))},r.play()};return(0,n.jsxs)("div",{className:"flex flex-col justify-start items-start w-full   overflow-scroll  max-w-[40%] min-w-[20%] pr-1",children:[(0,n.jsx)("div",{className:"flex flex-row text-black items-center my-2 gap-3 w-full",children:(0,n.jsxs)("div",{className:"flex flex-row  w-full flex-grow items-center md:pl-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 \n            rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] max-w-2xl self-center h-fit ".concat(g&&"animate-pulse"),children:[(0,n.jsx)("div",{title:"重新开始练习 / reset all practice",className:"w-8 h-8 self-center",onClick:()=>{(0,s.bl)("SkillMyTraceReport",{SkillName:T(),SessionName:C(),Action:"reset-qas"}).then(e=>{j({...b,[C()]:e})})},children:(0,n.jsx)("div",{children:(0,n.jsx)("svg",{focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24","data-testid":"RestartAltIcon",tabIndex:"-1",children:(0,n.jsx)("path",{d:"M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"})})})},"reset-practice"),(0,n.jsx)("div",{className:"flex  w-full self-center resize-none border-0 bg-transparent  pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-none ",children:"问答练习：".concat(C())}),(0,n.jsxs)("div",{className:"flex self-center  right-10 md:right-9",children:[(0,n.jsxs)("select",{className:"bg-transparent border-0 text-gray-500 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-900 dark:hover:text-gray-400 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-400 hover:bg-gray-100 rounded-md p-1",disabled:g,value:f,onChange:e=>{u(e.target.value)},children:[(0,n.jsx)("option",{value:-1,children:"-1题"},"option-negtive-1"),[...Array(10).keys()].map(e=>(0,n.jsxs)("option",{value:(e+1)*5,children:[(e+1)*5,"题"]},"option-".concat(e)))]}),(0,n.jsx)("button",{className:"self-center m-1 rounded-md text-gray-500  hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2",onClick:e=>{C()&&(0,s.bl)("SkillQAs",{Name:C(),Topic:T(),Action:f<0?"rebuild":"append",QANum:parseInt(f)}).then(e=>A(null!=e?e:[]))},children:(0,n.jsx)("div",{title:"申请重建练习列表",className:"mx=1 self-center items-center justify-center w-6 h-6",children:(0,n.jsx)("svg",{focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24","data-testid":"AddIcon",tabIndex:"-1",title:"Add",children:(0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})})})})]})]},"question-title-box")},"skill-sub-knowledge-point-title"),(0,n.jsx)("div",{className:" flex flex-col bg-[#ddba3b]  justify-start items-start rounded-md w-full text-gray-700 text-lg",children:(null==N?void 0:N.length)>0&&(null==N?void 0:N.filter(e=>0>E.indexOf(e.Q)).length)==0&&(0,n.jsxs)("div",{className:"flex flex-row w-full h-full justify-center items-center font-semibold text-lg text-gray-800  font-sans leading-8 my-4 gap-6  animate-bounce ",children:[(0,n.jsx)("div",{className:"flex flex-row w-fit self-center text-[56px]",children:"\uD83D\uDE04"}),(0,n.jsx)("div",{className:"flex flex-row w-fit self-center text-xl",children:"Completed! Nice Job!"})]})},"questions-all-completed-cheers"),(0,n.jsx)("div",{className:"flex flex-row w-full justify-start text-gra-800 gap-5 mt-2",children:(0,n.jsx)("div",{className:"flex flex-row justify-start items-start rounded-md w-full  text-gray-800 text-lg min-h-[300px]  max-h-[460px] flex-auto overflow-x-auto flex-wrap",children:(0,n.jsx)("div",{variant:"dots",position:"static",className:" flex flex-col justify-start rounded-md w-full  text-gray-800 text-lg leading-5  flex-wrap gap-2",sx:{boxShadow:"5px 5px 10px 0px gold",backgroundColor:"#f9f0d1"},children:null==N?void 0:N.map((e,l)=>(0,n.jsx)("div",{title:"注意，每5分钟只能回答一次",className:"group flex flex-row justify-start items-center h-fit rounded-lg text-lg leading-7 text-gray-700 max-w-[48%] min-w-[200px] w-full flex-grow  even:bg-lime-100 odd: bg-amber-100",onClick:()=>S(l),children:(0,n.jsx)("div",{className:"p-1 flex flex-row  justify-between w-full  rounded-lg ".concat(Q==l&&"font-bold bg-orange-400"),children:(0,n.jsxs)("div",{className:" flex flex-row justify-between items-center pr-2 gap-1  w-full",children:[(0,n.jsx)("div",{className:"rounded ",children:_(e)}),(0,n.jsx)("div",{className:"flex flex-row w-full",onClick:()=>{M((0,s.en)(s.E.HGET,"TTSOggQA",e.Q,s.DF.ogg))},children:e.Q}),(0,n.jsxs)("div",{className:" flex-row w-min gap-1 self-end hidden group-hover:flex group-hover:visible",children:[(0,n.jsxs)("div",{title:"复制到剪贴板",children:[" ",(0,n.jsx)(a.Z,{onClick:()=>{navigator.clipboard.writeText(e.Q)}})]}),(0,n.jsxs)("div",{title:"删除该条目",children:[" ",(0,n.jsx)(c.Z,{onClick:()=>{(0,s.bl)("SkillQAs",{Name:C(),Topic:T(),Action:"deleteItem:".concat(e.Q)}).then(e=>A(null!=e?e:[]))}})]})]})]})},"OtherQA".concat(e.Q))},"OtherQA".concat(e.Q,"-").concat(l)))},"activeStep-".concat(Q))},"current-questions-all")},"knowledge-point-questions"),(0,n.jsx)(r.Z,{sx:{width:280,m:.5},orientation:"horizontal"}),!!N[Q]&&(0,n.jsxs)("div",{className:"flex flex-col justify-start w-full items-start]",children:[(0,n.jsxs)("div",{variant:"h4",className:"flex flex-row justify-between font-semibold text-lg text-gray-800  font-sans leading-8 my-2 ",children:[(0,n.jsx)("div",{children:"回答正确的是: "}),(0,n.jsxs)("div",{className:"flex flex-row justify-start items-center gap-2",children:[(0,n.jsx)("button",{className:"flex flex-row justify-start items-center gap-2 bg-blue-500 text-white rounded-md px-2 py-1 ",onClick:()=>{Q-1>=0&&S(Q-1)},children:"上一题"}),(0,n.jsx)("div",{className:"flex flex-row justify-start items-center gap-2 bg-blue-500 text-white rounded-md px-2 py-1 ",onClick:()=>{Q+1<N.length&&S(Q+1)},children:"下一题"})]})]}),(0,n.jsx)("div",{className:" flex flex-row flex-wrap justify-center items-center w-full overflow-scroll  max-w-screen-sm min-w-min gap-3  ",children:(e=>{let l=0;for(let t=0;t<e.Q.length;t++)l=(l<<5)-l+e.Q.charCodeAt(t),l&=l;let t=l%e.Answers.length;return[...e.Answers.slice(t),...e.Answers.slice(0,t)]})(N[Q]).map((e,l)=>(0,n.jsxs)("div",{className:"flex flex-row items-center justify-center rounded text-gray-800  w-[48%] p-2\n                        ".concat("✅"==I(N[Q],e)?" text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4":" text-base w-4/12 bg-orange-200 min-h-min"),onClick:()=>{let l=null===(n=N[Q])||void 0===n?void 0:null===(t=n.Answers)||void 0===t?void 0:t.indexOf(e);if(void 0!==l){var t,n,i,r,a=[(0,s.en)(s.E.HGET,"TTSOggQA",e,s.DF.ogg),"/negative_beeps-6008.mp3",(0,s.en)(s.E.HGET,"TTSOggQA",null===(i=N[Q])||void 0===i?void 0:i.Why,s.DF.ogg)],d=[(0,s.en)(s.E.HGET,"TTSOggQA",e,s.DF.ogg),"/DingSoundEffect.ogg"];(null===(r=N[Q])||void 0===r?void 0:r.Answers[0])===e?M(...d):M(...a),(0,s.bl)("SkillMyTraceReport",{SkillName:T(),SessionName:C(),QA:N[Q].Q+"|||"+l}).then(e=>{x(new Date().getTime()),j({...b,[C()]:e})})}},children:[I(N[Q],e)," ",e]},"answer-item".concat(e,"-").concat(l)))},"QA-answers-".concat(Q)),(0,n.jsx)("div",{children:(null==E?void 0:E.indexOf(N[Q].Q))>=0&&(null===(l=N[Q])||void 0===l?void 0:l.Why)})]},"knowledge-point-answers")]},"QAComponent-".concat(N))}t(9443)}}]);