(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9703],{5097:function(e,t,r){"use strict";r.d(t,{V:function(){return i}});var n=r(1588),o=r(4867);function i(e){return(0,o.Z)("MuiDivider",e)}let u=(0,n.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);t.Z=u},3599:function(e,t,r){"use strict";r.d(t,{Z:function(){return P}});var n=r(3366),o=r(7462),i=r(7294),u=r(6010),a=r(4780),l=r(1796),s=r(948),c=r(1657),d=r(9773),f=r(2607),p=r(8974),b=r(1705),v=r(5097),m=r(1588);let y=(0,m.Z)("MuiListItemIcon",["root","alignItemsFlexStart"]),g=(0,m.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var h=r(4867);function _(e){return(0,h.Z)("MuiMenuItem",e)}let x=(0,m.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var O=r(5893);let C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],S=e=>{let{disabled:t,dense:r,divider:n,disableGutters:i,selected:u,classes:l}=e,s=(0,a.Z)({root:["root",r&&"dense",t&&"disabled",!i&&"gutters",n&&"divider",u&&"selected"]},_,l);return(0,o.Z)({},l,s)},j=(0,s.ZP)(f.Z,{shouldForwardProp:e=>(0,s.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})(({theme:e,ownerState:t})=>(0,o.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${x.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${x.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${x.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${x.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${x.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${v.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${v.Z.inset}`]:{marginLeft:52},[`& .${g.root}`]:{marginTop:0,marginBottom:0},[`& .${g.inset}`]:{paddingLeft:36},[`& .${y.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,o.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${y.root} svg`]:{fontSize:"1.25rem"}}))),M=i.forwardRef(function(e,t){let r;let a=(0,c.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:s="li",dense:f=!1,divider:v=!1,disableGutters:m=!1,focusVisibleClassName:y,role:g="menuitem",tabIndex:h,className:_}=a,x=(0,n.Z)(a,C),M=i.useContext(d.Z),P=i.useMemo(()=>({dense:f||M.dense||!1,disableGutters:m}),[M.dense,f,m]),E=i.useRef(null);(0,p.Z)(()=>{l&&E.current&&E.current.focus()},[l]);let w=(0,o.Z)({},a,{dense:P.dense,divider:v,disableGutters:m}),Z=S(a),I=(0,b.Z)(E,t);return a.disabled||(r=void 0!==h?h:-1),(0,O.jsx)(d.Z.Provider,{value:P,children:(0,O.jsx)(j,(0,o.Z)({ref:I,role:g,tabIndex:r,component:s,focusVisibleClassName:(0,u.Z)(Z.focusVisible,y),className:(0,u.Z)(Z.root,_)},x,{ownerState:w,classes:Z}))})});var P=M},8515:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/skill/historyTopics",function(){return r(4893)}])},8530:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"createAsyncLocalStorage",{enumerable:!0,get:function(){return i}});let r=Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");class n{disable(){throw r}getStore(){}run(){throw r}exit(){throw r}enterWith(){throw r}}let o=globalThis.AsyncLocalStorage;function i(){return o?new o:new n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5182:function(e,t,r){"use strict";function n(e){}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"clientHookInServerComponentError",{enumerable:!0,get:function(){return n}}),r(8754),r(7294),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1414:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return p},useSearchParams:function(){return b},usePathname:function(){return v},ServerInsertedHTMLContext:function(){return l.ServerInsertedHTMLContext},useServerInsertedHTML:function(){return l.useServerInsertedHTML},useRouter:function(){return m},useParams:function(){return y},useSelectedLayoutSegments:function(){return g},useSelectedLayoutSegment:function(){return h},redirect:function(){return s.redirect},notFound:function(){return c.notFound}});let n=r(7294),o=r(4224),i=r(8463),u=r(5182),a=r(2526),l=r(3014),s=r(8781),c=r(8147),d=Symbol("internal for urlsearchparams readonly");function f(){return Error("ReadonlyURLSearchParams cannot be modified")}class p{[Symbol.iterator](){return this[d][Symbol.iterator]()}append(){throw f()}delete(){throw f()}set(){throw f()}sort(){throw f()}constructor(e){this[d]=e,this.entries=e.entries.bind(e),this.forEach=e.forEach.bind(e),this.get=e.get.bind(e),this.getAll=e.getAll.bind(e),this.has=e.has.bind(e),this.keys=e.keys.bind(e),this.values=e.values.bind(e),this.toString=e.toString.bind(e)}}function b(){(0,u.clientHookInServerComponentError)("useSearchParams");let e=(0,n.useContext)(i.SearchParamsContext),t=(0,n.useMemo)(()=>e?new p(e):null,[e]);return t}function v(){return(0,u.clientHookInServerComponentError)("usePathname"),(0,n.useContext)(i.PathnameContext)}function m(){(0,u.clientHookInServerComponentError)("useRouter");let e=(0,n.useContext)(o.AppRouterContext);if(null===e)throw Error("invariant expected app router to be mounted");return e}function y(){(0,u.clientHookInServerComponentError)("useParams");let e=(0,n.useContext)(o.GlobalLayoutRouterContext);return e?function e(t,r){void 0===r&&(r={});let n=t[1];for(let t of Object.values(n)){let n=t[0],o=Array.isArray(n),i=o?n[1]:n;!i||i.startsWith("__PAGE__")||(o&&(r[n[0]]=n[1]),r=e(t,r))}return r}(e.tree):null}function g(e){void 0===e&&(e="children"),(0,u.clientHookInServerComponentError)("useSelectedLayoutSegments");let{tree:t}=(0,n.useContext)(o.LayoutRouterContext);return function e(t,r,n,o){let i;if(void 0===n&&(n=!0),void 0===o&&(o=[]),n)i=t[1][r];else{var u;let e=t[1];i=null!=(u=e.children)?u:Object.values(e)[0]}if(!i)return o;let l=i[0],s=(0,a.getSegmentValue)(l);return!s||s.startsWith("__PAGE__")?o:(o.push(s),e(i,r,!1,o))}(t,e)}function h(e){void 0===e&&(e="children"),(0,u.clientHookInServerComponentError)("useSelectedLayoutSegment");let t=g(e);return 0===t.length?null:t[0]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8147:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{notFound:function(){return n},isNotFoundError:function(){return o}});let r="NEXT_NOT_FOUND";function n(){let e=Error(r);throw e.digest=r,e}function o(e){return(null==e?void 0:e.digest)===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8781:function(e,t,r){"use strict";var n,o;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return n},getRedirectError:function(){return a},redirect:function(){return l},isRedirectError:function(){return s},getURLFromRedirectError:function(){return c},getRedirectTypeFromError:function(){return d}});let i=r(4505),u="NEXT_REDIRECT";function a(e,t){let r=Error(u);r.digest=u+";"+t+";"+e;let n=i.requestAsyncStorage.getStore();return n&&(r.mutableCookies=n.mutableCookies),r}function l(e,t){throw void 0===t&&(t="replace"),a(e,t)}function s(e){if("string"!=typeof(null==e?void 0:e.digest))return!1;let[t,r,n]=e.digest.split(";",3);return t===u&&("replace"===r||"push"===r)&&"string"==typeof n}function c(e){return s(e)?e.digest.split(";",3)[2]:null}function d(e){if(!s(e))throw Error("Not a redirect error");return e.digest.split(";",3)[1]}(o=n||(n={})).push="push",o.replace="replace",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4505:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"requestAsyncStorage",{enumerable:!0,get:function(){return o}});let n=r(8530),o=(0,n.createAsyncLocalStorage)();("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2526:function(e,t){"use strict";function r(e){return Array.isArray(e)?e[1]:e}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSegmentValue",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3014:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ServerInsertedHTMLContext:function(){return i},useServerInsertedHTML:function(){return u}});let n=r(1757),o=n._(r(7294)),i=o.default.createContext(null);function u(e){let t=(0,o.useContext)(i);t&&t(e)}},4893:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var n=r(5893),o=r(9332),i=r(7294);r(9443);var u=r(4178),a=r(1138),l=r(4054),s=r(303),c=r(3599);function d(){let e=(0,o.useRouter)(),[t,r]=(0,i.useState)([]),{LoggedIn:d}=(0,i.useContext)(u.GlobalContext);return(0,i.useEffect)(()=>{d&&(0,a.Nb)("SkillMyTouchTime:@id",0,100).then(e=>{r(e)})},[d]),d&&(0,n.jsx)(l.Z,{variant:"standard",sx:{ml:2,minWidth:160},children:(0,n.jsxs)(s.Z,{labelId:"select-history-topic",id:"select-history-topic",value:"",label:"Age",inputProps:{"aria-label":"Without label"},displayEmpty:!0,onChange:t=>!!t.target.value&&e.push("/skill?t=".concat(t.target.value)),children:[(0,n.jsxs)(c.Z,{value:"",children:[" ",(0,n.jsx)("em",{children:"切换到 最近学习:"})," "]}),null==t?void 0:t.map((e,t)=>(0,n.jsx)(c.Z,{value:e,children:e},"menu-item-".concat(e)))]})})}},9332:function(e,t,r){e.exports=r(1414)}},function(e){e.O(0,[9288,361,6057,7910,1412,9774,2888,179],function(){return e(e.s=8515)}),_N_E=e.O()}]);