(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7020],{209:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/UserCenter",function(){return l(6361)}])},3331:function(e,s,l){"use strict";l.r(s);var n=l(5893),t=l(7294),r=l(1138),a=l(4178);s.default=function(e){let{}=e,[s,l]=(0,t.useState)([]),{quota:i}=(0,t.useContext)(a.GlobalContext);(0,t.useEffect)(()=>{(0,r.bl)("OrderMine").then(e=>{e&&0!=e.length&&l(e)})},[]);let c=e=>e?new Date(1e3*e).toISOString().replace("T"," ").substring(0,16):"-",d=e=>Date.now()>new Date(e?1e3*e:0)?"\uD83D\uDD34":"\uD83D\uDFE2";return(0,n.jsx)("div",{className:"flex flex-col justify-center h-full items-center font-sans w-full",children:(0,n.jsxs)("div",{className:"  flex-row justify-center items-center w-full h-full  min-w-[700px] text-base max-w-3xl ",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:" flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-3xl  bg-blue-50 rounded-xl px-2 py-1",children:"已经开通的订单"}),(0,n.jsxs)("div",{className:"grid grid-cols-[24%_22%_13%_18%_9%_12%] leading-10",children:[(0,n.jsx)("div",{className:"",children:" 订单号 "}),"      ",(0,n.jsx)("div",{className:"",children:" 服务等级 "}),"      ",(0,n.jsx)("div",{className:"",children:" 价格 / 元 "}),"        ",(0,n.jsx)("div",{className:"",children:" 到期时间  "}),(0,n.jsx)("div",{className:"",children:" 已激活 "}),(0,n.jsx)("div",{className:"",children:" 支付 "})]}),s.map(e=>(0,n.jsxs)("div",{className:"grid grid-cols-[24%_22%_13%_18%_9%_12%] leading-10",children:[(0,n.jsxs)("div",{className:"",children:[" ",e.TradeNumber," "]}),(0,n.jsxs)("div",{className:"",children:[" ",e.name," "]}),(0,n.jsxs)("div",{className:"",children:[" ",e.money," "]}),(0,n.jsxs)("div",{className:"",children:[" ",c(e.ServiceEndAt)," "]}),(0,n.jsxs)("div",{className:"".concat("\uD83D\uDFE2"===d(e.ServiceEndAt)&&"animate-bounce"," "),children:[" ",d(e.ServiceEndAt)," "]}),(0,n.jsxs)("div",{className:"",children:[" ",e.Paid?"已支付":"未支付"," "]})]},"".concat(e.TradeNumber,"-").concat(e.name))),0==s.length&&(0,n.jsx)("div",{className:"flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-xs ",children:"没有订单"})]},"已经开通的订单"),(0,n.jsxs)("div",{className:" my-8       ",children:[(0,n.jsx)("div",{className:" flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-3xl  bg-yellow-50 rounded-xl px-2 py-1",children:"今日所有订单，总计剩余可用次数"}),s.length>0&&(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center w-full h-full  min-w-[600px] text-base max-w-xl ",children:[(0,n.jsxs)("div",{className:"grid grid-cols-[25%_25%_25%_25%] leading-10 w-full",children:[(0,n.jsx)("div",{className:"",children:"   "}),(0,n.jsx)("div",{className:"",children:" ChatGPT3.5 "}),(0,n.jsx)("div",{className:"",children:" ChatGPT4 "}),(0,n.jsx)("div",{className:"",children:" 剩余课程 "})]},"今日所有订单，总计剩余可用次数"),(0,n.jsxs)("div",{className:"grid grid-cols-[25%_25%_25%_25%] leading-10  w-full",children:[(0,n.jsx)("div",{className:"",children:"  "}),(0,n.jsxs)("div",{className:"",children:[" ",i.AllowedDayGPT35," "]}),(0,n.jsxs)("div",{className:"",children:[" ",i.AllowedDayGPT4," "]}),(0,n.jsxs)("div",{className:"",children:[" ",i.AllowedDaySkill," "]})]})]})]},"今天剩余服务明细")]},"现有订单")},"MyOrder")}},6361:function(e,s,l){"use strict";l.r(s),l.d(s,{default:function(){return j}});var n=l(5893),t=l(7294),r=l(1855),a=l(9036),i=l(4178),c=l(7379),d=l(1664),o=l.n(d),u=l(3331),f=l(7171),x=l(9443);let m={MyProfile:"MyProfile",Order:"Order",Purchase:"Purchase",None:""},h=()=>{let{Params:e,LoggedIn:s,setMenuL2:l}=(0,t.useContext)(i.GlobalContext),{page:a,To:d}=e,h=(0,c.useRouter)(),j=e=>(0,n.jsx)("div",{className:"flex flex-row justify-center items-center w-full h-full  ",children:(0,n.jsxs)("div",{className:"flex flex-row max-w-lg gap-4 text-base self-center",children:[(0,n.jsx)(o(),{href:"/UserCenter?page=MyProfile",className:"self-center rounded-lg px-2 py-1 hover:bg-amber-200 ".concat("MyProfile"===e&&"bg-amber-200"),onClick:e=>{h.push("/UserCenter?page=MyProfile")},children:"我的资料"}),(0,n.jsx)(o(),{href:"/UserCenter?page=Order",className:"self-center rounded-lg px-2 py-1 hover:bg-amber-200 ".concat("Order"===e&&"bg-amber-200"),onClick:e=>{h.push("/UserCenter?page=Order")},children:"我的订单"}),(0,n.jsx)(o(),{href:"/UserCenter?page=Purchase",className:"self-center rounded-lg px-2 py-1 hover:bg-amber-200 ".concat("Purchase"===e&&"bg-amber-200"),onClick:e=>{h.push("/UserCenter?page=Purchase")},children:"服务与开通"}),(0,n.jsx)("button",{className:"hover:bg-yellow-500 w-24 rounded ",onClick:e=>{x.qR.Clear(),h.push(null!=d?d:"/")},children:"退出 / 登出"})]})});return(0,t.useEffect)(()=>{l(j(a));let e=a===m.MyProfile||a===m.Order||a===m.Purchase||a===m.None;if(s&&a&&!e)return h.push(null!=d?d:"/")},[s,a]),(0,n.jsxs)("div",{className:"flex flex-col items-start self-center justify-center w-full h-full mt-4 ",children:[s&&(a===m.MyProfile||a===m.MyProfile)&&(0,n.jsx)(r.default,{}),s&&a===m.Order&&(0,n.jsx)(u.default,{}),s&&a===m.Purchase&&(0,n.jsx)(f.default,{})]})};function j(e){let{Page:s,To:l}=e;return(0,n.jsx)(a.Z,{children:(0,n.jsx)(h,{})})}},1855:function(e,s,l){"use strict";l.r(s),l.d(s,{default:function(){return f},unixTime:function(){return d}});var n=l(5893),t=l(7294),r=l(1138),a=l(9443),i=l(4178),c=l(7379);l(9036);let d=()=>Math.floor(new Date().getTime()/1e3),o=e=>{let{id:s}=e,[l,a]=(0,t.useState)(0);return(0,n.jsxs)("div",{style:{margin:"0 0 1em 0"},children:[(0,n.jsxs)("div",{className:" flex flex-row justify-start w-full items-center font-sans border-b",children:[(0,n.jsx)("div",{style:{margin:"0 1em 0 0"},children:"头像"}),(0,n.jsx)("img",{src:(0,r.en)(r.E.HGET,"UserAvatar",s,r.DF.jpeg,"*")+"?t=".concat(l),alt:""})]}),(0,n.jsxs)("div",{className:" flex flex-row justify-between w-full items-center font-sans ",children:[(0,n.jsx)("input",{type:"file",style:{display:"none"},id:"upload_avatar",onChange:e=>{var s=new FileReader;s.readAsArrayBuffer(e.target.files[0]),s.onloadend=function(e){if(e.target.readyState===FileReader.DONE){var s=e.target.result,l=new Uint8Array(s);(0,r.bl)("userResetAvatar",{Avatar:l}).then(e=>a(d()))}}}}),(0,n.jsx)("button",{style:{margin:"1em 0 0 0"},onClick:e=>document.getElementById("upload_avatar").click(),children:"修改头像"})]})]})},u=e=>{let s={Title:["Complete my profile","完善我的资料"][e],footer:["Every thing you pursuit, there's an answer","你总在乎的，终有答案"][e],save:["Save modification","保存修改"][e],channelName:["My channel name:","呢称："][e],noChannelName:["Write channel name here","缺失，在这里添加.."][e],noChannelNameError:["Channel name incomplete","未填写频道名称.."][e],loginAccount:["Login Account:","登录账号："][e],noLoginAccount:["Write real name here","缺失，在这里填写.."][e]};return s};function f(){(0,c.useRouter)(),(0,c.usePathname)();let{LoggedIn:e}=(0,t.useContext)(i.GlobalContext),s=u(1),[l,d]=(0,t.useState)(""),[f,x]=(0,t.useState)(""),[m,h]=(0,t.useState)(""),[j,v]=(0,t.useState)(""),[w,g]=(0,t.useState)(""),[N,b]=(0,t.useState)(""),[y,p]=(0,t.useState)(""),[C,_]=(0,t.useState)(""),P=l=>{if(!m){v(s.noChannelNameError);return}m&&y&&e&&a.qR.Get().jwt&&(0,r.bl)("userResetProfile",{Nick:m,Region:N,Introduction:w}).then(e=>{"ok"===e.response&&(_("已修改"),setTimeout(()=>_(""),2e3))})};return((0,t.useEffect)(()=>{a.qR.Get().IsValid()&&((0,r.uH)("UserInfo","@id").then(e=>{d(null==e?void 0:e.CountryCode),x(null==e?void 0:e.Phone),p(null==e?void 0:e.Account)}),(0,r.uH)("UserInfoPublic",a.qR.Pub()).then(e=>{h(null==e?void 0:e.Nick),g(null==e?void 0:e.Introduction),b(null==e?void 0:e.Region)}))},[e]),e)?(0,n.jsxs)("div",{className:"flex flex-col justify-center h-full items-center font-sans w-full",children:[(0,n.jsxs)("div",{className:"flex flex-col justify-center w-full min-w-max items-center font-sans max-w-sm bg-white text-black px-8 pt-12  ",children:[(0,n.jsx)("div",{className:"flex flex-row w-full justify-between mb-8 items-center",children:(0,n.jsx)("div",{children:(0,n.jsxs)("h2",{children:[" ",s.Title," "]})})}),(0,n.jsxs)("div",{className:"flex flex-row justify-between w-8/12 min-w-fit items-center font-sans  mb-4 self-start",children:[(0,n.jsxs)("div",{className:"flex flex-row",children:[(0,n.jsx)("div",{children:"手机号："}),(0,n.jsxs)("div",{className:" bg-gray-200 rounded px-2",children:[l," \xa0 | ",f]})]},"input-phone-number"),!!f&&(0,n.jsx)("div",{className:"  whitespace-nowrap",children:"\xa0 已经认证"})]}),(0,n.jsxs)("div",{className:" container max-w-2xl flex  flex-row justify-start  items-center font-sans  mb-4",children:[(0,n.jsx)("div",{children:s.channelName}),(0,n.jsx)("input",{placeholder:s.noChannelName,value:j||m,className:"flex flex-row justify-center w-fit items-center font-sans text bg-orange-50 rounded border-solid border-2 border-lime-200 px-2 py-1",style:{color:({button:{margin:"0 0 0 1em",lineHeight:1,border:"0px",width:"120px",background:"#FFFFFF"},inputColor:(e,s)=>e?"#f1403c":s?"#000":"#89a"}).inputColor(j,m)},onChange:e=>h(e.target.value),onClick:e=>v("")})]},"input-channel-conainer"),(0,n.jsx)(o,{id:a.qR.Pub()}),(0,n.jsx)("div",{className:"flex flex-row h-full self-start w-full rounded-md",children:(0,n.jsx)("textarea",{className:"flex flex-row justify-start self-start font-sans h-full  mb-4 ring-1  resize-none ",style:{width:"100%"},placeholder:"简介:","aria-label":"maximum height",value:w,rows:1,onChange:e=>g(e.target.value),minrows:3,onResize:void 0,onResizeCapture:void 0},"input-channel-name")}),(0,n.jsxs)("button",{className:"flex flex-row justify-center w-full items-center font-sans text-sm h-9 bg-sky-200 text-gray-700 rounded my-4",onClick:e=>P(e),disabled:!!C,children:[" ",C||s.save," "]},"sign-up-button")]}),(0,n.jsx)("div",{className:"flex flex-row justify-center w-full items-center font-sans  mb-8 mu-8 text-sm rounded"})]},"MyProfile".concat(e)):(0,n.jsx)("div",{className:"flex flex-col justify-center h-full items-center font-sans",children:"you should loggin first"})}}},function(e){e.O(0,[9288,9521,1999,3428,2601,7910,1019,3717,6901,9172,4325,9036,7171,9774,2888,179],function(){return e(e.s=209)}),_N_E=e.O()}]);