"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7308],{6789:function(e,t,l){l.r(t),l.d(t,{default:function(){return c}});var s=l(5893),a=l(7294),i=l(6514),n=l(5861),r=l(4957),o=l(1138),d=l(4178);function c(e){let{creditTM:t,volume:l}=e,{LoggedIn:c}=(0,a.useContext)(d.GlobalContext),[x,u]=(0,a.useState)(JSON.parse(localStorage.getItem("Credit"))),f=(0,a.useMemo)(()=>(null==x?void 0:x.SkillAnswer)+(null==x?void 0:x.SkillAsk)+(null==x?void 0:x.HealthAgendaDo),[x]),[m,h]=(0,a.useState)(0),[v,p]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!c)return;let e=new Date,l="".concat(e.getFullYear()).concat(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1).concat(10>e.getDate()?"0"+e.getDate():e.getDate());(0,o.BB)("Credit:@pub",l,l,!1).then(e=>{if(!e||0==e.length)return;let l=e[0];var s=l.SkillAnswer+l.SkillAsk+l.HealthAgendaDo,a=s-f;if(a<0&&1==s&&(a=s),a&&t>0&&(h(x-f),p(!0),setTimeout(()=>p(!1),1e3)),l.Operates.length>=10&&a>0){for(var i=[],n=0;n<l.Operates.length-1;n++)i.push(l.Operates[n+1]-l.Operates[n]);var r=i[i.length-1];i.sort((e,t)=>e-t),i[0]==r?new Audio("/kids_woah-6272.mp3").play():i[4]>=r&&new Audio("/wow-113128.mp3").play()}localStorage.setItem("Credit",JSON.stringify(l)),u(l)})},[t]),c?(0,s.jsx)("div",{className:" mt-2 min-w-[250px]",children:(0,s.jsxs)("div",{className:"flex flex-row w-full justify-between",children:[(0,s.jsx)(i.Z,{in:v,timeout:1e3,children:(0,s.jsxs)("div",{className:"text-xl",children:[" ","+".concat(m),(0,s.jsx)(r.Z,{})," "]})}),(0,s.jsxs)(n.Z,{variant:"h4",sx:{fontWeight:600,fontSize:18,color:"#333",fontFamily:"Roboto, Arial, sans-serif",lineHeight:"22px",margin:"6px 0px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["今日积分：",f,". 回答正确：",null==x?void 0:x.SkillAnswer,". 提问：",null==x?void 0:x.SkillAsk," 日程：",null==x?void 0:x.HealthAgendaDo]})]},"credit".concat(f))}):(0,s.jsx)("div",{children:" "})}},5524:function(e,t,l){l.r(t),l.d(t,{default:function(){return m}});var s=l(5893),a=l(7294),i=l(4472),n=l(3578),r=l(6624),o=l(1138),d=l(9492),c=l(4386),x=l(9443),u=l(7308),f=l(1163);function m(e){var t,l;let{}=e;(0,f.useRouter)();let{topic:m,setTopic:h,skillTree:v,setSkillTree:p,skillMyTrace:g,setSkillMyTrace:w,skillSession:j,setSkillSession:b}=(0,a.useContext)(d.Context);(0,a.useEffect)(()=>{if(m){var e=m.split(":")[0],t=m.split(":")[1];(0,o.bl)("SkillLoadList",{Name:e,Detail:t}).then(e=>{var t;if(null==e||null===(t=e.Sessions)||void 0===t||t.sort((e,t)=>e.ChapterSession-t.ChapterSession),e&&p(e),!x.qR.Get().IsValid())return;let l=e.Sessions.map(e=>"".concat(e.Name,":").concat(e.Detail));(null==l?void 0:l.length)>0&&(0,o.f2)("SkillMyTrace:@id",l).then(e=>{l.length==(null==e?void 0:e.length)&&w(e.reduce((e,t,s)=>(e[l[s]]=t,e),{}))})})}},[m]);let[y,N]=(0,a.useState)("");(0,a.useEffect)(()=>{var e,t;if(null==v?void 0:null===(e=v.Sessions)||void 0===e?void 0:e.length){if(0==Object.keys(g).length)return b(v.Sessions[0]);if(y!=m){for(var l=0;l<(null==v?void 0:null===(t=v.Sessions)||void 0===t?void 0:t.length);l++){var s=v.Sessions[l],a=g[s.Name+":"+s.Detail];if(a&&2>S(a))return N(m),b(s)}b(v.Sessions[0]),N(m)}}},[v,g]);let S=e=>{var t,l,s,a,i;return e?(null!==(a=null===(t=e.Asks)||void 0===t?void 0:t.length)&&void 0!==a?a:0)/2+(null!==(i=null===(s=e.QAs)||void 0===s?void 0:null===(l=s.filter(e=>e.indexOf("|||0")>0))||void 0===l?void 0:l.length)&&void 0!==i?i:0):0};return(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start w-full max-w-[390px] h-full overflow-x-scroll gap-1 mt-1",children:[(0,s.jsx)("div",{className:"flex flex-row pt-1 whitespace-normal text-lg bg-yellow-50 rounded-lg w-[97%] ml-2 gap-2 items-center",children:(0,s.jsxs)("div",{className:"flex flex-col",children:[(0,s.jsxs)("div",{className:"flex flex-row gap-4 items-center h-8",children:[(0,s.jsx)("div",{className:"flex font-semibold self-center items-center   ",children:(0,s.jsx)("div",{className:"pl-1"})}),(0,s.jsxs)("div",{className:" font-semibold text-base ",children:[" ",v.Name]})]}),(0,s.jsxs)("div",{className:" font-semibold text-sm px-2 pb-1",children:[" ",v.Detail]})]})},"title"),(0,s.jsx)("div",{className:" flex flex-row justify-start items-center w-[97%]  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2",children:"目录："}),!(null==v?void 0:null===(t=v.Sessions)||void 0===t?void 0:t.length)&&(0,s.jsx)(u.LoadingComponent,{Text:"正在创建课程..."}),(null==v?void 0:null===(l=v.Sessions)||void 0===l?void 0:l.length)>0&&(0,s.jsx)(r.Z,{orientation:"vertical",className:"flex w-full break-all whitespace-nowrap h-fit",activeStep:null==v?void 0:v.Sessions.indexOf(j),children:!!v&&(null==v?void 0:v.Sessions.map((e,t)=>(0,s.jsx)(i.Z,{className:"flex flex-col justify-start items-start w-full h-fit whitespace-nowrap min-h-max",sx:{margin:"-5px 0 -12px 0",":hover":{backgroundColor:"#e8e8e8"},boxShadow:t==(null==v?void 0:v.Sessions.indexOf(j))?"inset 0px 0px 0px 200px gold":"none"},onClick:t=>b(e),children:(0,s.jsx)(n.Z,{sx:{margin:"-5px 0 -5px 0"},className:"flex flex-row justify-start items-start w-full  whitespace-nowrap",children:(0,s.jsxs)("div",{className:"flex flex-col  items-start gap-2  w-full whitespace-nowrap justify-between leading-6 ",children:[(0,s.jsxs)("div",{className:"flex  first-row justify-between items-start w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 ",children:[(0,s.jsx)("div",{className:"flex flex-row justify-start w-full  whitespace-nowrap  text-ellipsis text-base text-gray-700 font-sans font-semibold leading-6 gap-3",children:e.ChapterSession+" "+e.Name}),(0,s.jsxs)("div",{className:" flex flex-row justify-end items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 mr-2",children:[(0,s.jsxs)("div",{children:["难度:",e.Difficulty]}),(0,s.jsx)("div",{className:"mr-2",children:S(g[e.Name+":"+e.Detail])>=2?"✅":"⬜"})]})]},"first-row"),(0,s.jsx)(c.Z,{title:e.Detail,placement:"right",children:(0,s.jsx)("div",{className:"flex flex-row flex-wrap justify-start -ml-7 items-start w-full  text-sm text-gray-700",children:e.Detail},"second-row")})]})})},"skillTree".concat(t))))})]})}},1606:function(e,t,l){l.r(t),l.d(t,{default:function(){return w}});var s=l(5893),a=l(7294),i=l(1138),n=l(6024),r=l(9492),o=l(4178);l(1458),l(7357),l(5861);var d=l(3321),c=l(9661);l(9884);var x=l(2147),u=l(6172),f=l(8317),m=l(7308),h=e=>{let{components:t,durations:l}=e,[i,n]=(0,a.useState)(0),[r,o]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=!0,s=setTimeout(()=>{e&&(o(!0),setTimeout(()=>{e&&(n(e=>(e+1)%t.length),o(!1))},500))},l[i]);return()=>{e=!1,clearTimeout(s)}},[i,t.length,l]),(0,s.jsx)("div",{className:"flex flex-col flex-wrap justify-start items-start w-full mt-2 gap-[7px] h-full overflow-hidden ".concat(r?"animate-darken":"animate-brighten"),children:t[i]})};let v=null,p=()=>{var e="警惕！这里可能有误区。\n内容有“坑”：你能发现吗？\n不靠谱的内容，你辨识出来了吗！\n谁能捕捉到有哪些失误？\n错误就在眼前：留心观察！\n警觉！别让错误滑过你的眼睛。\n内容有“小陷阱”：你会掉进去吗？".split("\n");let t=()=>e[Math.floor(Math.random()*e.length)],[l,i]=a.useState(null);return a.useEffect(()=>{i(t())},[]),(0,s.jsxs)("div",{className:" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-2 px-2 pb-2 h-36",children:[(0,s.jsx)("div",{className:" w-40 h-32  rounded-3xl mt-0 self-stretch ",title:"苏格拉底之问",children:(0,s.jsx)("img",{className:"rounded-3xl -mr-2 ",src:"/holeInRoad.webp"})}),(0,s.jsx)("div",{className:"flex h-full text-2xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center pl-4",children:l})]})},g=e=>{let{ScenerInfos:t,CurrentScene:l}=e;return(0,s.jsxs)("div",{className:"flex flex-row  text-xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 justify-between items-center h-36",children:[(0,s.jsx)("div",{className:"w-32 h-32 rounded-lg",children:(0,s.jsx)("img",{className:!isNaN(l)&&l>=0&&l<(null==t?void 0:t.length)&&0===t[l].Text.indexOf("女孩")&&" ring-4 animate-pulse"||"",src:"/image-girl.jpg"})}),(0,s.jsx)("div",{className:" w-36 h-32 mt-1 self-stretch overflow-hidden rounded-lg ",title:"苏格拉底之问",children:(0,s.jsx)("img",{className:(!isNaN(l)&&l>=0&&l<(null==t?void 0:t.length)&&0===t[l].Text.indexOf("苏格拉底")&&"ring-4 animate-pulse "||"")+"  -mr-8",src:"/socrates.webp"})}),(0,s.jsx)("div",{className:"w-32 h-32 rounded-lg",children:(0,s.jsx)("img",{className:!isNaN(l)&&l>=0&&l<(null==t?void 0:t.length)&&0===t[l].Text.indexOf("男孩")&&" ring-4 animate-pulse"||"",src:"/image-man.jpeg"})}),(0,s.jsxs)("div",{className:"flex flex-col  h-full text-2xl text-gray-800 font-sans leading-4   bg-white/70 rounded-xl my-2 px-4 py-6 gap-6 items-center ",children:[(0,s.jsx)("div",{children:"追问        "}),(0,s.jsx)("div",{children:"          思辨"}),(0,s.jsx)("div",{children:"-> 自我发现"})]})]},"talker-".concat(l,"-").concat(t))};function w(e){let{volume:t,playbackRate:l}=e,{setCreditTM:w,debugMode:j}=(0,a.useContext)(o.GlobalContext),{skillTree:b,skillMyTrace:y,setSkillMyTrace:N,skillSession:S,setSkillSession:k}=(0,a.useContext)(r.Context),[C,T]=(0,a.useState)([]),[D,A]=(0,a.useState)([]),Z=()=>"".concat(null==S?void 0:S.Name,":").concat(null==S?void 0:S.Detail),[E,O]=(0,a.useState)([]),[Q,R]=(0,a.useState)(-1),[M,q]=(0,a.useState)(!1),[G,I]=(0,a.useState)(""),[W,_]=(0,a.useState)([]),L=()=>(null==b?void 0:b.Name)+":"+(null==b?void 0:b.Detail);(0,a.useEffect)(()=>{T([]),A([]),_([]);let e=Z();if(!(!e||e.indexOf("undefined")>=0||e.indexOf("undefined")>=0)&&(null==b?void 0:b.Sessions)&&!((null==b?void 0:null===(t=b.Sessions)||void 0===t?void 0:t.length)<=0)){var t,l,s,a=L();(0,i.bl)("SkillSocrates",{Name:e,Topic:a,Rebuild:!1}).then(t=>e===Z()&&T(null!=t?t:[])),A(null!==(s=null===(l=y[Z()])||void 0===l?void 0:l.Asks)&&void 0!==s?s:[]),(0,i.bl)("SkillSocratesTTS",{Session:Z(),Topic:a}).then(t=>{if(e===Z()){if(!t||0==t.length)return O([]);O(t)}})}},[b,S]),(0,a.useEffect)(()=>{var e,t;Z()&&A(null!==(t=null===(e=y[Z()])||void 0===e?void 0:e.Asks)&&void 0!==t?t:[])},[S,y]);let H=function(){for(var e=arguments.length,s=Array(e),a=0;a<e;a++)s[a]=arguments[a];let i=s[0],n=i.indexOf("TTSOgg")>=0;(v=new Audio(i)).volume=isNaN(t)?.5:t,v&&n&&(v.playbackRate=l),v.onended=()=>{s.length>1&&H(...s.slice(1)),n&&R(Q+1)},v.play()},[z,B]=(0,a.useState)(0),[F,U]=(0,a.useState)(0),V=null;(0,a.useEffect)(()=>{F>=z||(V=setTimeout(()=>U(F+.11),100),setTimeout(()=>clearTimeout(V),120))},[z,F]);let J=e=>{var t,l,s;null===(t=v)||void 0===t||t.pause(),(null===(l=E[e])||void 0===l?void 0:l.CiteQuestion)&&(null==W?void 0:W.length)>0&&H("/DingSoundEffect.ogg");let a=null===(s=E[e])||void 0===s?void 0:s.Text;a&&H((0,i.en)(i.E.HGET,"TTSOggSocrates",a,i.DF.ogg))};(0,a.useEffect)(()=>{if(!Z()||Q<0||Q>=E.length)return;U(0),setTimeout(()=>J(Q),700),B(((null!==(s=null===(e=E[Q])||void 0===e?void 0:e.Duration)&&void 0!==s?s:0)+1e-4*Math.random())/l);var e,t,s,a=null===(t=E[Q])||void 0===t?void 0:t.CiteQuestion;a&&I(a);var i=W.filter(e=>e.Q===(a||G));if(0==i.length&&(i=[{Q:a||G,A:"",Talks:[]}]),i=i[0],a){let e=C.filter(e=>e.Q===a);e.length>0&&(i.A=e[0].A)}let n=E[Q].Text,r=n.indexOf(":"),o=r>0?n.substr(0,r+1):"苏格拉底",d=r>0?n.substr(r+1).trim():n;i.Talks.includes(n)||(i.Talks=[{User:o,Talk:d,Raw:n},...i.Talks.filter(e=>e.Raw!==n)]),_([i,...W.filter(e=>e.Q!==(a||G))])},[Q]);let P=e=>!isNaN(e)&&e>=0&&e<E.length;return Z(S)?(0,s.jsxs)("div",{style:{width:"40%"},className:"flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]",children:[(0,s.jsxs)("div",{className:"flex flex-col flex-wrap justify-start items-start w-full  mt-2 gap-[7px] opacity-90 h-38",children:[(0,s.jsx)("div",{className:"flex flex-row w-full",children:(0,s.jsx)(h,{components:[(0,s.jsx)(p,{}),(0,s.jsx)(g,{ScenerInfos:E,CurrentScene:Q})],durations:[3e3,8e3]})}),(0,s.jsxs)("div",{title:"playSocratesDemo",className:"flex flex-row w-full text-base justify-start items-start h-10 -mt-1 ",children:[j>=3&&(0,s.jsx)("div",{title:"自动修复错误的问答列表",className:"flex flex-row pr-1 h-full self-center items-center justify-center",onClick:()=>Z()&&(0,i.bl)("SkillSocrates",{Name:Z(),Topic:L(),Rebuild:!0}).then(e=>T(null!=e?e:[])),children:(0,s.jsx)(n.Z,{})}),(0,s.jsxs)("div",{className:"flex flex-row  w-full self-center gap-1",children:[(0,s.jsxs)(d.Z,{size:"small",onClick:()=>{var e;null===(e=v)||void 0===e||e.pause(),clearTimeout(V),R(Q-1)},disabled:Q<=0,children:[(0,s.jsx)(u.Z,{}),"Back"]}),(0,s.jsx)("select",{className:"flex flex-row w-full bg-transparent  border-0 text-gray-500 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-900 dark:hover:text-gray-400 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-400 hover:bg-gray-100 rounded-md p-1 ring-1",value:G,onChange:e=>{var t=-1;E.map((l,s)=>{(null==l?void 0:l.CiteQuestion)===e.target.value&&(t=s)}),R(t)},children:E.filter((e,t)=>!!e.CiteQuestion).map((e,t)=>(0,s.jsxs)("option",{value:e.CiteQuestion,children:[" ",t+1+": "+e.CiteQuestion," "]},"option-".concat(t)))}),(0,s.jsxs)(d.Z,{size:"small",onClick:()=>{var e;null===(e=v)||void 0===e||e.pause(),clearTimeout(V),R(Q+1)},disabled:Q>=E.length,children:["Next ",(0,s.jsx)(f.Z,{})]})]}),(0,s.jsx)("div",{title:"播放演示",className:"flex flex-row pr-1 h-10 self-center items-center justify-center",children:(0,s.jsxs)("div",{className:"flex flex-row gap-1 self-center items-center justify-center flex-nowrap h-10 ",children:[(0,s.jsx)("div",{className:"mt-1"+(P(Q)?" animate-pulse hover:grayscale":" grayscale-[60%] hover:grayscale-0"),children:(0,s.jsx)(x.e,{})}),!P(Q)&&(0,s.jsx)("div",{className:"flex flex-row w-10 flex-nowrap h-fit text-2xl -mt-2 self-center",onClick:()=>{v&&(v.playbackRate=l),_([]),q(!1),setTimeout(()=>R(0),100)},children:".. ▶️"}),P(Q)&&(0,s.jsxs)("div",{className:"flex -mt-1 flex-row gap-2  self-center",children:[!M&&(0,s.jsx)("div",{title:"暂停播放",className:"flex h-fit",onClick:()=>{v&&v.pause(),clearTimeout(V),q(!0)},children:"⏸️"}),M&&(0,s.jsx)("div",{title:"继续播放",className:"flex h-fit",onClick:()=>{var e;null===(e=v)||void 0===e||e.play(),q(!1),V=setTimeout(()=>U(F+.11),100)},children:"▶️"}),(0,s.jsx)("div",{className:"flex h-fit",onClick:()=>{v&&v.pause(),R(-1),I(""),_([]),clearTimeout(V),U(0)},children:"⏹️"})]})]})})]})]}),(0,s.jsx)("div",{className:"flex flex-col flex-wrap justify-start items-start overflow-scroll w-full  mt-2 gap-[7px] opacity-90 max-h-[60%] min-h-min",children:(Q<0||Q>=E.length)&&C.filter(e=>0>D.join("").indexOf(e.Q)).map((e,t)=>(0,s.jsxs)("div",{className:" text-base  even:bg-lime-100 odd: bg-amber-100 max-w-[49%] rounded-md px-4 py-[4px]  items-center",onClick:()=>(0,i.bl)("SkillMyTraceReport",{SkillName:L(),SessionName:Z(),Ask:"".concat(e.Q,"|||").concat(e.A)}).then(e=>{N({...y,[Z()]:e}),w(new Date().getTime())}),children:["❓",e.Q]},e.Q))}),(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start w-full  max-h-max min-h-min overflow-scroll my-2 ",style:{boxShadow:"inset 0px 0px 0px 1000px rgba(255,255,255,0.20)"},children:[(null==W?void 0:W.length)===0&&D.reverse().map((e,t)=>(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start w-full h-fit py-3",children:[(0,s.jsxs)("div",{variant:"18px",className:"flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2",children:[(0,s.jsx)("div",{className:"text-lg mr-1",children:"\uD83E\uDD14"}),"  ",e.split("|||")[0]]}),(0,s.jsxs)("div",{style:{maxWidth:"80%",backgroundColor:"#d2f9d1"},className:"flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line",children:["\uD83D\uDCAC ",e.split("|||")[1]]},"question-answer-a".concat(e[1],"-").concat(t))]},"question-answer-q-".concat(e.Q,"-").concat(t))),!(null==C?void 0:C.length)&&(0,s.jsx)(m.LoadingComponent,{Text:"Loading..."}),(null==W?void 0:W.length)>0&&W.map((e,t)=>{var l;return(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start w-full h-fit py-3 gap-1",children:[(0,s.jsxs)("div",{variant:"18px",className:"flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2",children:[(0,s.jsx)("div",{className:"text-lg mr-1",children:"\uD83E\uDD14"}),"  ",e.Q]}),Q>=0&&(Q==E.length||G!=e.Q)&&!!e.A&&(0,s.jsxs)("div",{style:{maxWidth:"80%",backgroundColor:"#d2f9d1"},className:"flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line bg-orange-100 ",children:["\uD83D\uDCAC ",e.A]},"question-answer-a".concat(e[1],"-").concat(t)),null===(l=e.Talks)||void 0===l?void 0:l.map((t,l)=>{var a,i,n;return(0,s.jsxs)("div",{style:{maxWidth:"80%",backgroundColor:"#d2f9d1"},className:"flex flex-row justify-start items-start self-end font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line  selection:bg-fuchsia-300 gap-1"+(t.Raw===(null===(a=E[Q])||void 0===a?void 0:a.Text)?" ring-2 text-lg text-gray-900 ":" text-base  text-gray-800 "),children:["女孩:"===t.User&&(0,s.jsx)(c.Z,{alt:"女孩",src:"/image-girl.jpg"}),"男孩:"===t.User&&(0,s.jsx)(c.Z,{alt:"男孩",src:"/image-man.jpeg"}),"苏格拉底:"===t.User&&(0,s.jsx)(c.Z,{alt:"苏格拉底",src:"/socratics.jpeg"}),(0,s.jsxs)("div",{className:" flex-nowrap",children:[(0,s.jsx)("b",{className:" text-bold",children:t.Raw===(null===(i=E[Q])||void 0===i?void 0:i.Text)?t.Talk.substr(0,t.Talk.length*(F/z)):""}),t.Raw===(null===(n=E[Q])||void 0===n?void 0:n.Text)?t.Talk.substr(t.Talk.length*(F/z),t.Talk.length):t.Talk]})]},"question-answer-talks".concat(e[1],"-").concat(l))})]},"question-answer-q-".concat(e.Q,"-").concat(t))})]},"what-is-my-answered")]},"socratic-container-".concat(S)):(0,s.jsx)("div",{className:"flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"},"socratic-container-nodata")}},4893:function(e,t,l){l.r(t),l.d(t,{default:function(){return x}});var s=l(5893),a=l(7379),i=l(7294);l(9443);var n=l(4178),r=l(1138),o=l(4054),d=l(303),c=l(3599);function x(){let e=(0,a.useRouter)(),[t,l]=(0,i.useState)([]),{LoggedIn:x}=(0,i.useContext)(n.GlobalContext);return(0,i.useEffect)(()=>{x&&(0,r.Nb)("SkillMyTouchTime:@id",0,100).then(e=>{l(e)})},[x]),x&&(0,s.jsx)(o.Z,{variant:"standard",sx:{ml:2,minWidth:160},children:(0,s.jsxs)(d.Z,{labelId:"select-history-topic",id:"select-history-topic",value:"",label:"Age",inputProps:{"aria-label":"Without label"},displayEmpty:!0,onChange:t=>!!t.target.value&&e.push("/skill?t=".concat(t.target.value)),children:[(0,s.jsxs)(c.Z,{value:"",children:[" ",(0,s.jsx)("em",{children:"切换到 最近学习:"})," "]}),null==t?void 0:t.map((e,t)=>(0,s.jsx)(c.Z,{value:e,children:e},"menu-item-".concat(e)))]})})}},7308:function(e,t,l){l.r(t),l.d(t,{ExploreComponent:function(){return j},LoadingComponent:function(){return w},__N_SSG:function(){return g},default:function(){return b}});var s=l(5893),a=l(7294),i=l(2468),n=l(5524),r=l(6789),o=l(1606),d=l(9036),c=l(7379),x=l(1138),u=l(4178),f=l(9492);l(9443);var m=l(4054),h=l(303),v=l(3599),p=l(4893),g=!0;let w=e=>{let{Text:t}=e;return(0,s.jsxs)("div",{className:"flex justify-center items-center min-h-screen space-x-4",children:[(0,s.jsx)("div",{className:"loader w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"}),(0,s.jsx)("div",{className:"text-3xl text-blue-500",children:t})]})};function j(){let e=(0,c.useRouter)(),{setMenuL2:t,creditTM:l,setCreditTM:d}=(0,a.useContext)(u.GlobalContext),[g,w]=(0,a.useState)(.5),[j,b]=(0,a.useState)(1),{topic:y,setTopic:N,skillTree:S,setSkillTree:k,skillMyTrace:C,setSkillMyTrace:T,skillSession:D,setSkillSession:A}=(0,a.useContext)(f.Context),{Params:Z}=(0,a.useContext)(u.GlobalContext);(0,a.useEffect)(()=>{let{t:e}=Z;if(e){N(e);return}},[Z]);let[E,O]=(0,a.useState)([]);return(0,a.useEffect)(()=>{(0,x.bl)("SkillSearch",{Name:y}).then(e=>{if(e&&Array.isArray(e)){var t=e.map(e=>e.Name+":"+e.Detail);O(t=[...new Set(t)])}})},[y]),(0,a.useEffect)(()=>{t((0,s.jsxs)("div",{className:"flex justify-between w-full items-center",children:[(0,s.jsx)(p.default,{}),(0,s.jsx)(m.Z,{variant:"standard",sx:{ml:10,minWidth:155},children:(0,s.jsxs)(h.Z,{labelId:"select-related-topic",id:"select-related-topic",value:"",displayEmpty:!0,inputProps:{"aria-label":"Without label"},onChange:t=>!!t.target.value&&e.push("/skill?t=".concat(t.target.value)),children:[(0,s.jsxs)(v.Z,{value:"",children:[" ",(0,s.jsx)("em",{children:"相关的主题:"})," "]}),E.map((e,t)=>(0,s.jsx)(v.Z,{value:e,children:e},"menu-item-".concat(e)))]})}),(0,s.jsx)("div",{className:"flex flex-row overflow-hidden w-full items-center justify-between",children:(0,s.jsx)(r.default,{creditTM:l,volume:g})},"reward"),(0,s.jsxs)("div",{className:"flex flex-row   gap-2 items-center justify-between",children:[(0,s.jsxs)("div",{title:"设置倍速",className:"group flex flex-col w-12 h-8 items-center relative z-10 rounded-md opacity-100 mt-1 bg-inherit ",children:[(0,s.jsx)("div",{className:"flex flex-row group-hover:flex items-center self-center rounded-md h-fit bg-inherit",children:"倍速"}),[.5,.75,1,1.25,1.5,2,2.25,2.5,2.75,3].map((e,t)=>(0,s.jsx)("button",{onClick:()=>{b(e)},className:"flex flex-row group-hover:visible invisible items-center space-x-2 hover:bg-gray-200 p-2 rounded-md focus:outline-none",children:(0,s.jsx)("span",{className:j==e?" text-blue-400":"",children:1===e?"Normal":e+"x"})},"speed-".concat(e,"-").concat(t)))]}),(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center gap-2 mr-1",children:[(0,s.jsx)("div",{children:"音量"}),(0,s.jsxs)("div",{className:"flex flex-row justify-center items-center gap-2",children:[0!==g&&(0,s.jsx)("div",{onClick:()=>{window.lastVolume=g,w(0)},children:"\uD83D\uDD0A"}),0===g&&(0,s.jsx)("div",{onClick:()=>w(window.lastVolume),children:"\uD83D\uDD07"})]}),(0,s.jsx)("input",{type:"range",min:"0",max:"1",step:"0.1",value:g,onChange:e=>w(e.target.value)})]})]})]}))},[l,g,E,j]),(0,s.jsxs)("div",{className:"flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center ",style:{backgroundImage:"url(/bg03.webp)",boxShadow:"inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"},children:[(0,s.jsx)(n.default,{}),(0,s.jsx)("div",{title:"divider",className:"h-full bg-gray-400 w-[2px] my-[4px] mx-1"}),(0,s.jsx)(o.default,{volume:g,playbackRate:j}),(0,s.jsx)("div",{title:"divider",className:"h-full bg-gray-400 w-[2px] my-[4px] mx-1"}),(0,s.jsx)(i.default,{setCreditTM:d,volume:g})]})}function b(e){let{}=e;return(0,s.jsx)(f.default,{children:(0,s.jsx)(d.Z,{children:(0,s.jsx)(j,{})})})}}}]);