(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[590],{917:function(e,t,r){"use strict";r.d(t,{F4:function(){return c},iv:function(){return u},xB:function(){return l}});var n=r(5260),o=r(7294),a=r(444),i=r(7278),s=r(8137);r(8417),r(8679);var l=(0,n.w)(function(e,t){var r=e.styles,l=(0,s.O)([r],void 0,o.useContext(n.T));if(!n.i){for(var u,c=l.name,f=l.styles,d=l.next;void 0!==d;)c+=" "+d.name,f+=d.styles,d=d.next;var m=!0===t.compat,p=t.insert("",{name:c,styles:f},t.sheet,m);return m?null:o.createElement("style",((u={})["data-emotion"]=t.key+"-global "+c,u.dangerouslySetInnerHTML={__html:p},u.nonce=t.sheet.nonce,u))}var y=o.useRef();return(0,i.j)(function(){var e=t.key+"-global",r=new t.sheet.constructor({key:e,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),n=!1,o=document.querySelector('style[data-emotion="'+e+" "+l.name+'"]');return t.sheet.tags.length&&(r.before=t.sheet.tags[0]),null!==o&&(n=!0,o.setAttribute("data-emotion",e),r.hydrate([o])),y.current=[r,n],function(){r.flush()}},[t]),(0,i.j)(function(){var e=y.current,r=e[0];if(e[1]){e[1]=!1;return}if(void 0!==l.next&&(0,a.My)(t,l.next,!0),r.tags.length){var n=r.tags[r.tags.length-1].nextElementSibling;r.before=n,r.flush()}t.insert("",l,r,!1)},[t,l.name]),null});function u(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.O)(t)}var c=function(){var e=u.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}},1458:function(e,t,r){"use strict";r.d(t,{Z:function(){return B}});var n=r(3366),o=r(7462),a=r(7294),i=r(6010),s=r(4780),l=r(917),u=r(1796),c=r(8216),f=r(2734),d=r(948),m=r(1657),p=r(1588),y=r(4867);function b(e){return(0,y.Z)("MuiLinearProgress",e)}(0,p.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var v=r(5893);let g=["className","color","value","valueBuffer","variant"],h=e=>e,x,S,w,$,C,P,Z=(0,l.F4)(x||(x=h`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),k=(0,l.F4)(S||(S=h`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),j=(0,l.F4)(w||(w=h`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),_=e=>{let{classes:t,variant:r,color:n}=e,o={root:["root",`color${(0,c.Z)(n)}`,r],dashed:["dashed",`dashedColor${(0,c.Z)(n)}`],bar1:["bar",`barColor${(0,c.Z)(n)}`,("indeterminate"===r||"query"===r)&&"bar1Indeterminate","determinate"===r&&"bar1Determinate","buffer"===r&&"bar1Buffer"],bar2:["bar","buffer"!==r&&`barColor${(0,c.Z)(n)}`,"buffer"===r&&`color${(0,c.Z)(n)}`,("indeterminate"===r||"query"===r)&&"bar2Indeterminate","buffer"===r&&"bar2Buffer"]};return(0,s.Z)(o,b,t)},M=(e,t)=>"inherit"===t?"currentColor":e.vars?e.vars.palette.LinearProgress[`${t}Bg`]:"light"===e.palette.mode?(0,u.$n)(e.palette[t].main,.62):(0,u._j)(e.palette[t].main,.5),T=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`color${(0,c.Z)(r.color)}`],t[r.variant]]}})(({ownerState:e,theme:t})=>(0,o.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:M(t,e.color)},"inherit"===e.color&&"buffer"!==e.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===e.variant&&{backgroundColor:"transparent"},"query"===e.variant&&{transform:"rotate(180deg)"})),N=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.dashed,t[`dashedColor${(0,c.Z)(r.color)}`]]}})(({ownerState:e,theme:t})=>{let r=M(t,e.color);return(0,o.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===e.color&&{opacity:.3},{backgroundImage:`radial-gradient(${r} 0%, ${r} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,l.iv)($||($=h`
    animation: ${0} 3s infinite linear;
  `),j)),O=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.bar,t[`barColor${(0,c.Z)(r.color)}`],("indeterminate"===r.variant||"query"===r.variant)&&t.bar1Indeterminate,"determinate"===r.variant&&t.bar1Determinate,"buffer"===r.variant&&t.bar1Buffer]}})(({ownerState:e,theme:t})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===e.color?"currentColor":(t.vars||t).palette[e.color].main},"determinate"===e.variant&&{transition:"transform .4s linear"},"buffer"===e.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:e})=>("indeterminate"===e.variant||"query"===e.variant)&&(0,l.iv)(C||(C=h`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),Z)),E=(0,d.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.bar,t[`barColor${(0,c.Z)(r.color)}`],("indeterminate"===r.variant||"query"===r.variant)&&t.bar2Indeterminate,"buffer"===r.variant&&t.bar2Buffer]}})(({ownerState:e,theme:t})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==e.variant&&{backgroundColor:"inherit"===e.color?"currentColor":(t.vars||t).palette[e.color].main},"inherit"===e.color&&{opacity:.3},"buffer"===e.variant&&{backgroundColor:M(t,e.color),transition:"transform .4s linear"}),({ownerState:e})=>("indeterminate"===e.variant||"query"===e.variant)&&(0,l.iv)(P||(P=h`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),k)),F=a.forwardRef(function(e,t){let r=(0,m.Z)({props:e,name:"MuiLinearProgress"}),{className:a,color:s="primary",value:l,valueBuffer:u,variant:c="indeterminate"}=r,d=(0,n.Z)(r,g),p=(0,o.Z)({},r,{color:s,variant:c}),y=_(p),b=(0,f.Z)(),h={},x={bar1:{},bar2:{}};if(("determinate"===c||"buffer"===c)&&void 0!==l){h["aria-valuenow"]=Math.round(l),h["aria-valuemin"]=0,h["aria-valuemax"]=100;let e=l-100;"rtl"===b.direction&&(e=-e),x.bar1.transform=`translateX(${e}%)`}if("buffer"===c&&void 0!==u){let e=(u||0)-100;"rtl"===b.direction&&(e=-e),x.bar2.transform=`translateX(${e}%)`}return(0,v.jsxs)(T,(0,o.Z)({className:(0,i.Z)(y.root,a),ownerState:p,role:"progressbar"},h,{ref:t},d,{children:["buffer"===c?(0,v.jsx)(N,{className:y.dashed,ownerState:p}):null,(0,v.jsx)(O,{className:y.bar1,ownerState:p,style:x.bar1}),"determinate"===c?null:(0,v.jsx)(E,{className:y.bar2,ownerState:p,style:x.bar2})]}))});var B=F},2734:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}}),r(7294);var n=r(6682),o=r(247),a=r(606);function i(){let e=(0,n.Z)(o.Z);return e[a.Z]||e}},8679:function(e,t,r){"use strict";var n=r(9864),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function l(e){return n.isMemo(e)?i:s[e.$$typeof]||o}s[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[n.Memo]=i;var u=Object.defineProperty,c=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,d=Object.getOwnPropertyDescriptor,m=Object.getPrototypeOf,p=Object.prototype;e.exports=function e(t,r,n){if("string"!=typeof r){if(p){var o=m(r);o&&o!==p&&e(t,o,n)}var i=c(r);f&&(i=i.concat(f(r)));for(var s=l(t),y=l(r),b=0;b<i.length;++b){var v=i[b];if(!a[v]&&!(n&&n[v])&&!(y&&y[v])&&!(s&&s[v])){var g=d(r,v);try{u(t,v,g)}catch(e){}}}}return t}},8708:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/skill/Scenery",function(){return r(5471)}])},9492:function(e,t,r){"use strict";r.r(t),r.d(t,{Context:function(){return a},default:function(){return i}});var n=r(5893),o=r(7294);let a=o.createContext({skillTree:[],setSkillTree:()=>{},skillMyTrace:{},setSkillMyTrace:()=>{},skillSession:null,setSkillSession:()=>{},topic:"",setTopic:()=>{}});function i(e){let{children:t}=e,[r,i]=(0,o.useState)([]),[s,l]=(0,o.useState)(""),[u,c]=(0,o.useState)({}),[f,d]=(0,o.useState)(null);return(0,n.jsx)(a.Provider,{value:{skillTree:r,setSkillTree:i,skillMyTrace:u,setSkillMyTrace:c,skillSession:f,setSkillSession:d,topic:s,setTopic:l},children:t})}},5471:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var n=r(5893),o=r(7294),a=r(1138),i=r(9492),s=r(4178),l=r(1458);function u(e){let{topic:t,volume:r}=e,{setCreditTM:u}=(0,o.useContext)(s.GlobalContext),{skillMyTrace:c,setSkillMyTrace:f,skillSession:d,setSkillSession:m}=(0,o.useContext)(i.Context),[p,y]=(0,o.useState)([]),b=()=>"".concat(null==d?void 0:d.Name,":").concat(null==d?void 0:d.Detail);(0,o.useEffect)(()=>{let e=b();!e||e.indexOf("undefined")>=0||e.indexOf("undefined")>=0||(0,a.uH)("TTSInfo",b()).then(t=>e===b()&&y(null!=t?t:[]))},[t,d]);let[v,g]=(0,o.useState)(-1),h=()=>{v<p.length-1&&g(v+1)};(0,o.useEffect)(()=>{if(!b()||v<0)return;let e=new Audio((0,a.en)(a.E.HGET,"TTSOgg",p[v].Text,a.DF.ogg));e.volume=.5,e.onended=h,e.play()},[v,r]);let[x,S]=(0,o.useState)(0);return b(d)?(0,n.jsxs)("div",{style:{width:"40%"},className:"flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]",children:[(0,n.jsx)("div",{className:"flex flow-row text-xl text-gray-800 h-fit font-sans leading-4 w-[100%]  bg-white/70 rounded-md px-4 py-2 gap-2 items-center",children:(0,n.jsx)("div",{className:"",children:"Scenery"})}),(0,n.jsx)("div",{className:"flex flex-col flex-wrap justify-start items-start overflow-y-scroll w-full h-full  mt-2 gap-[7px] opacity-90 min-h-min",children:null==p?void 0:p.map((e,t)=>(0,n.jsx)("div",{className:" text-base  even:bg-lime-100 odd: bg-amber-100 w-full rounded-md px-4 py-[4px]  items-center",onClick:()=>g(t),children:e.Text},e.Q))}),(0,n.jsx)("div",{className:"flex flow-row text-xl text-gray-800 h-fit font-sans leading-4 w-[100%]  bg-white/70 rounded-md px-4 py-2 gap-2 items-center",children:(0,n.jsx)(l.Z,{variant:"determinate",value:x,style:{width:"100%"},onChange:(e,t)=>S(t),contentEditable:!0})})]},"socratic-container-".concat(d)):(0,n.jsx)("div",{className:"flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"},"socratic-container-nodata")}},9921:function(e,t){"use strict";/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r="function"==typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,o=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,i=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,l=r?Symbol.for("react.provider"):60109,u=r?Symbol.for("react.context"):60110,c=r?Symbol.for("react.async_mode"):60111,f=r?Symbol.for("react.concurrent_mode"):60111,d=r?Symbol.for("react.forward_ref"):60112,m=r?Symbol.for("react.suspense"):60113,p=r?Symbol.for("react.suspense_list"):60120,y=r?Symbol.for("react.memo"):60115,b=r?Symbol.for("react.lazy"):60116,v=r?Symbol.for("react.block"):60121,g=r?Symbol.for("react.fundamental"):60117,h=r?Symbol.for("react.responder"):60118,x=r?Symbol.for("react.scope"):60119;function S(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case c:case f:case a:case s:case i:case m:return e;default:switch(e=e&&e.$$typeof){case u:case d:case b:case y:case l:return e;default:return t}}case o:return t}}}function w(e){return S(e)===f}t.AsyncMode=c,t.ConcurrentMode=f,t.ContextConsumer=u,t.ContextProvider=l,t.Element=n,t.ForwardRef=d,t.Fragment=a,t.Lazy=b,t.Memo=y,t.Portal=o,t.Profiler=s,t.StrictMode=i,t.Suspense=m,t.isAsyncMode=function(e){return w(e)||S(e)===c},t.isConcurrentMode=w,t.isContextConsumer=function(e){return S(e)===u},t.isContextProvider=function(e){return S(e)===l},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return S(e)===d},t.isFragment=function(e){return S(e)===a},t.isLazy=function(e){return S(e)===b},t.isMemo=function(e){return S(e)===y},t.isPortal=function(e){return S(e)===o},t.isProfiler=function(e){return S(e)===s},t.isStrictMode=function(e){return S(e)===i},t.isSuspense=function(e){return S(e)===m},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===f||e===s||e===i||e===m||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===b||e.$$typeof===y||e.$$typeof===l||e.$$typeof===u||e.$$typeof===d||e.$$typeof===g||e.$$typeof===h||e.$$typeof===x||e.$$typeof===v)},t.typeOf=S},9864:function(e,t,r){"use strict";e.exports=r(9921)}},function(e){e.O(0,[9288,9774,2888,179],function(){return e(e.s=8708)}),_N_E=e.O()}]);