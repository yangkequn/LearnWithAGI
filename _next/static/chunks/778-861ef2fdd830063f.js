(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[778],{1899:function(t,e,n){"use strict";var r=n(4836);e.Z=void 0;var i=r(n(4938)),o=n(5893),u=(0,i.default)((0,o.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}),"ContentCopy");e.Z=u},1733:function(t,e,n){"use strict";var r=n(4836);e.Z=void 0;var i=r(n(4938)),o=n(5893),u=(0,i.default)((0,o.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");e.Z=u},4938:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(8372)},7720:function(t,e,n){"use strict";var r=n(3366),i=n(7462),o=n(7294),u=n(6010),l=n(4780),c=n(1796),a=n(948),s=n(1657),d=n(5097),f=n(5893);let v=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=t=>{let{absolute:e,children:n,classes:r,flexItem:i,light:o,orientation:u,textAlign:c,variant:a}=t;return(0,l.Z)({root:["root",e&&"absolute",a,o&&"light","vertical"===u&&"vertical",i&&"flexItem",n&&"withChildren",n&&"vertical"===u&&"withChildrenVertical","right"===c&&"vertical"!==u&&"textAlignRight","left"===c&&"vertical"!==u&&"textAlignLeft"],wrapper:["wrapper","vertical"===u&&"wrapperVertical"]},d.V,r)},p=(0,a.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:n}=t;return[e.root,n.absolute&&e.absolute,e[n.variant],n.light&&e.light,"vertical"===n.orientation&&e.vertical,n.flexItem&&e.flexItem,n.children&&e.withChildren,n.children&&"vertical"===n.orientation&&e.withChildrenVertical,"right"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignRight,"left"===n.textAlign&&"vertical"!==n.orientation&&e.textAlignLeft]}})(({theme:t,ownerState:e})=>(0,i.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},e.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},e.light&&{borderColor:t.vars?`rgba(${t.vars.palette.dividerChannel} / 0.08)`:(0,c.Fq)(t.palette.divider,.08)},"inset"===e.variant&&{marginLeft:72},"middle"===e.variant&&"horizontal"===e.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===e.variant&&"vertical"===e.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===e.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},e.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:t})=>(0,i.Z)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:t,ownerState:e})=>(0,i.Z)({},e.children&&"vertical"!==e.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(t.vars||t).palette.divider}`}}),({theme:t,ownerState:e})=>(0,i.Z)({},e.children&&"vertical"===e.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(t.vars||t).palette.divider}`}}),({ownerState:t})=>(0,i.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),m=(0,a.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(t,e)=>{let{ownerState:n}=t;return[e.wrapper,"vertical"===n.orientation&&e.wrapperVertical]}})(({theme:t,ownerState:e})=>(0,i.Z)({display:"inline-block",paddingLeft:`calc(${t.spacing(1)} * 1.2)`,paddingRight:`calc(${t.spacing(1)} * 1.2)`},"vertical"===e.orientation&&{paddingTop:`calc(${t.spacing(1)} * 1.2)`,paddingBottom:`calc(${t.spacing(1)} * 1.2)`})),Z=o.forwardRef(function(t,e){let n=(0,s.Z)({props:t,name:"MuiDivider"}),{absolute:o=!1,children:l,className:c,component:a=l?"div":"hr",flexItem:d=!1,light:Z=!1,orientation:g="horizontal",role:w="hr"!==a?"separator":void 0,textAlign:b="center",variant:x="fullWidth"}=n,S=(0,r.Z)(n,v),y=(0,i.Z)({},n,{absolute:o,component:a,flexItem:d,light:Z,orientation:g,role:w,textAlign:b,variant:x}),C=h(y);return(0,f.jsx)(p,(0,i.Z)({as:a,className:(0,u.Z)(C.root,c),role:w,ref:e,ownerState:y},S,{children:l?(0,f.jsx)(m,{className:C.wrapper,ownerState:y,children:l}):null}))});e.Z=Z},5097:function(t,e,n){"use strict";n.d(e,{V:function(){return o}});var r=n(1588),i=n(4867);function o(t){return(0,i.Z)("MuiDivider",t)}let u=(0,r.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);e.Z=u},3219:function(t,e,n){"use strict";n.d(e,{Z:function(){return w}});var r=n(7462),i=n(3366),o=n(7294),u=n(6010),l=n(4780),c=n(8216),a=n(1657),s=n(948),d=n(1588),f=n(4867);function v(t){return(0,f.Z)("MuiSvgIcon",t)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var h=n(5893);let p=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],m=t=>{let{color:e,fontSize:n,classes:r}=t,i={root:["root","inherit"!==e&&`color${(0,c.Z)(e)}`,`fontSize${(0,c.Z)(n)}`]};return(0,l.Z)(i,v,r)},Z=(0,s.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:n}=t;return[e.root,"inherit"!==n.color&&e[`color${(0,c.Z)(n.color)}`],e[`fontSize${(0,c.Z)(n.fontSize)}`]]}})(({theme:t,ownerState:e})=>{var n,r,i,o,u,l,c,a,s,d,f,v,h,p,m,Z,g;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,transition:null==(n=t.transitions)?void 0:null==(r=n.create)?void 0:r.call(n,"fill",{duration:null==(i=t.transitions)?void 0:null==(o=i.duration)?void 0:o.shorter}),fontSize:({inherit:"inherit",small:(null==(u=t.typography)?void 0:null==(l=u.pxToRem)?void 0:l.call(u,20))||"1.25rem",medium:(null==(c=t.typography)?void 0:null==(a=c.pxToRem)?void 0:a.call(c,24))||"1.5rem",large:(null==(s=t.typography)?void 0:null==(d=s.pxToRem)?void 0:d.call(s,35))||"2.1875rem"})[e.fontSize],color:null!=(f=null==(v=(t.vars||t).palette)?void 0:null==(h=v[e.color])?void 0:h.main)?f:({action:null==(p=(t.vars||t).palette)?void 0:null==(m=p.action)?void 0:m.active,disabled:null==(Z=(t.vars||t).palette)?void 0:null==(g=Z.action)?void 0:g.disabled,inherit:void 0})[e.color]}}),g=o.forwardRef(function(t,e){let n=(0,a.Z)({props:t,name:"MuiSvgIcon"}),{children:o,className:l,color:c="inherit",component:s="svg",fontSize:d="medium",htmlColor:f,inheritViewBox:v=!1,titleAccess:g,viewBox:w="0 0 24 24"}=n,b=(0,i.Z)(n,p),x=(0,r.Z)({},n,{color:c,component:s,fontSize:d,instanceFontSize:t.fontSize,inheritViewBox:v,viewBox:w}),S={};v||(S.viewBox=w);let y=m(x);return(0,h.jsxs)(Z,(0,r.Z)({as:s,className:(0,u.Z)(y.root,l),focusable:"false",color:f,"aria-hidden":!g||void 0,role:g?"img":void 0,ref:e},S,b,{ownerState:x,children:[o,g?(0,h.jsx)("title",{children:g}):null]}))});g.muiName="SvgIcon";var w=g},7450:function(t,e,n){"use strict";var r=n(6508);e.Z=r.Z},2066:function(t,e,n){"use strict";n.d(e,{Z:function(){return l}});var r=n(7462),i=n(7294),o=n(3219),u=n(5893);function l(t,e){function n(n,i){return(0,u.jsx)(o.Z,(0,r.Z)({"data-testid":`${e}Icon`,ref:i},n,{children:t}))}return n.muiName=o.Z.muiName,i.memo(i.forwardRef(n))}},7144:function(t,e,n){"use strict";var r=n(9336);e.Z=r.Z},8372:function(t,e,n){"use strict";n.r(e),n.d(e,{capitalize:function(){return i.Z},createChainedFunction:function(){return o.Z},createSvgIcon:function(){return u.Z},debounce:function(){return l.Z},deprecatedPropType:function(){return c},isMuiElement:function(){return a.Z},ownerDocument:function(){return s.Z},ownerWindow:function(){return d.Z},requirePropFactory:function(){return f},setRef:function(){return v},unstable_ClassNameGenerator:function(){return x},unstable_useEnhancedEffect:function(){return h.Z},unstable_useId:function(){return p.Z},unsupportedProp:function(){return m},useControlled:function(){return Z.Z},useEventCallback:function(){return g.Z},useForkRef:function(){return w.Z},useIsFocusVisible:function(){return b.Z}});var r=n(7078),i=n(8216),o=n(7450),u=n(2066),l=n(7144),c=function(t,e){return()=>null},a=n(1579),s=n(8038),d=n(5340);n(7462);var f=function(t,e){return()=>null},v=n(7960).Z,h=n(8974),p=n(7909),m=function(t,e,n,r,i){return null},Z=n(9299),g=n(2068),w=n(1705),b=n(8791);let x={configure:t=>{r.Z.configure(t)}}},1579:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(7294),i=function(t,e){return r.isValidElement(t)&&-1!==e.indexOf(t.type.muiName)}},8038:function(t,e,n){"use strict";var r=n(2690);e.Z=r.Z},5340:function(t,e,n){"use strict";var r=n(4161);e.Z=r.Z},9299:function(t,e,n){"use strict";var r=n(9032);e.Z=r.Z},8974:function(t,e,n){"use strict";var r=n(3546);e.Z=r.Z},2068:function(t,e,n){"use strict";var r=n(9948);e.Z=r.Z},1705:function(t,e,n){"use strict";var r=n(3703);e.Z=r.Z},7909:function(t,e,n){"use strict";var r=n(2996);e.Z=r.Z},8791:function(t,e,n){"use strict";let r;n.d(e,{Z:function(){return d}});var i=n(7294);let o=!0,u=!1,l={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function c(t){t.metaKey||t.altKey||t.ctrlKey||(o=!0)}function a(){o=!1}function s(){"hidden"===this.visibilityState&&u&&(o=!0)}var d=function(){let t=i.useCallback(t=>{if(null!=t){var e;(e=t.ownerDocument).addEventListener("keydown",c,!0),e.addEventListener("mousedown",a,!0),e.addEventListener("pointerdown",a,!0),e.addEventListener("touchstart",a,!0),e.addEventListener("visibilitychange",s,!0)}},[]),e=i.useRef(!1);return{isFocusVisibleRef:e,onFocus:function(t){return!!function(t){let{target:e}=t;try{return e.matches(":focus-visible")}catch(t){}return o||function(t){let{type:e,tagName:n}=t;return"INPUT"===n&&!!l[e]&&!t.readOnly||"TEXTAREA"===n&&!t.readOnly||!!t.isContentEditable}(e)}(t)&&(e.current=!0,!0)},onBlur:function(){return!!e.current&&(u=!0,window.clearTimeout(r),r=window.setTimeout(()=>{u=!1},100),e.current=!1,!0)},ref:t}}},6508:function(t,e,n){"use strict";function r(...t){return t.reduce((t,e)=>null==e?t:function(...n){t.apply(this,n),e.apply(this,n)},()=>{})}n.d(e,{Z:function(){return r}})},9336:function(t,e,n){"use strict";function r(t,e=166){let n;function r(...i){clearTimeout(n),n=setTimeout(()=>{t.apply(this,i)},e)}return r.clear=()=>{clearTimeout(n)},r}n.d(e,{Z:function(){return r}})},2690:function(t,e,n){"use strict";function r(t){return t&&t.ownerDocument||document}n.d(e,{Z:function(){return r}})},4161:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(2690);function i(t){let e=(0,r.Z)(t);return e.defaultView||window}},7960:function(t,e,n){"use strict";function r(t,e){"function"==typeof t?t(e):t&&(t.current=e)}n.d(e,{Z:function(){return r}})},9032:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(7294);function i({controlled:t,default:e,name:n,state:i="value"}){let{current:o}=r.useRef(void 0!==t),[u,l]=r.useState(e),c=o?t:u,a=r.useCallback(t=>{o||l(t)},[]);return[c,a]}},3546:function(t,e,n){"use strict";var r=n(7294);let i="undefined"!=typeof window?r.useLayoutEffect:r.useEffect;e.Z=i},9948:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var r=n(7294),i=n(3546);function o(t){let e=r.useRef(t);return(0,i.Z)(()=>{e.current=t}),r.useCallback((...t)=>(0,e.current)(...t),[])}},3703:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var r=n(7294),i=n(7960);function o(...t){return r.useMemo(()=>t.every(t=>null==t)?null:e=>{t.forEach(t=>{(0,i.Z)(t,e)})},t)}},2996:function(t,e,n){"use strict";n.d(e,{Z:function(){return l}});var r,i=n(7294);let o=0,u=(r||(r=n.t(i,2)))["useId".toString()];function l(t){if(void 0!==u){let e=u();return null!=t?t:e}return function(t){let[e,n]=i.useState(t),r=t||e;return i.useEffect(()=>{null==e&&n(`mui-${o+=1}`)},[e]),r}(t)}},4836:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports}}]);