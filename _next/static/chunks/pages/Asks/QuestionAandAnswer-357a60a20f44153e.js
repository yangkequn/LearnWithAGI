(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2661],{9800:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Asks/QuestionAandAnswer",function(){return n(4986)}])},9884:function(t,e,n){"use strict";n.r(e),n.d(e,{AvatarWithName:function(){return d},UserName:function(){return h},default:function(){return f}});var l=n(5893),c=n(7294),o=n(9661),a=n(1138),r=n(4386),i=n(263),u=n(2341),s=n(4178);function d(t){let{pubID:e}=t,[n,i]=(0,c.useState)(""),[u,s]=(0,c.useState)("");return(0,c.useEffect)(()=>{if(!e){i(""),s("");return}(0,a.uH)("UserInfoPublic",e).then(t=>{t&&i(t.Nick)}),s((0,a.en)(a.E.HGET,"UserAvatar",e,a.DF.jpeg,"*"))},[]),(0,l.jsx)(r.Z,{title:"".concat(n),placement:"right",children:(0,l.jsx)(o.Z,{alt:n,src:u})},"".concat(n))}function f(t){let{pubID:e}=t,[n,d]=(0,c.useState)(""),[f,h]=(0,c.useState)(""),{quota:w}=(0,c.useContext)(s.GlobalContext);return(0,c.useEffect)(()=>{if(!e){d(""),h("");return}(0,a.uH)("UserInfoPublic",e).then(t=>{t&&d(t.Nick)}),h((0,a.en)(a.E.HGET,"UserAvatar",e,a.DF.jpeg,"*"))},[]),(0,l.jsx)(i.Z,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},color:(null==w?void 0:w.AllowedDayGPT4)>2||(null==w?void 0:w.AllowedDayGPT35)>2||(null==w?void 0:w.AllowedDaySkill)>2?"primary":"grey",badgeContent:(0,l.jsx)(u.Z,{className:"text-white"}),children:(0,l.jsx)(r.Z,{title:"".concat(n,"您好，今日剩余额度：chatGPT 3.5: ").concat(null==w?void 0:w.AllowedDayGPT35," chatGPT 4: ").concat(null==w?void 0:w.AllowedDayGPT4," 创建课程: ").concat(null==w?void 0:w.AllowedDaySkill,"        "),placement:"right",children:(0,l.jsx)(o.Z,{alt:n,src:f})},"".concat(w,"-").concat(n))},"".concat(null==w?void 0:w.AllowedDayGPT4,"-").concat(null==w?void 0:w.AllowedDayGPT35,"-").concat(null==w?void 0:w.AllowedDaySkill))}let h=t=>{let{pub:e}=t,[n,o]=(0,c.useState)("");return(0,c.useEffect)(()=>{e?(0,a.uH)("UserInfoPublic",e).then(t=>{t&&o(t.Nick)}):o("")},[e]),(0,l.jsx)("div",{children:n})}}},function(t){t.O(0,[9288,9521,1999,3428,2601,7910,1019,6901,4986,9774,2888,179],function(){return t(t.s=9800)}),_N_E=t.O()}]);