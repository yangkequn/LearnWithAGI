(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7098],{9132:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Auth/AuthContext",function(){return n(1085)}])},1085:function(e,t,n){"use strict";n.r(t),n.d(t,{AuthContext:function(){return c},default:function(){return s}});var o=n(5893),r=n(7294),u=n(1138);let c=r.createContext({nickname:"",setNickname:()=>{},nicknameError:"",countryCode:"86",setCountryCode:()=>{},countryCodeError:"",phone:"",setPhone:()=>{},phoneError:"",setPhoneError:()=>{},account:"",setAccount:()=>{},accountError:"",setAccountError:()=>{},password:"",setPassword:()=>{},passwordError:"",setPasswordError:()=>{},foreignPhone:!1,setForeignPhone:()=>{},SMSCode:null,setSMSCode:()=>{},SMSCodeError:null,setSMSCodeError:()=>{},SMSButtonText:"获取校验码",SMSButtonDisabled:!1,SendSMSCode:()=>{},checkSMSCode:()=>{},CheckPassword:()=>{},checkAccount:()=>{},checkPhone:()=>{},checkCountryCode:()=>{},CheckNickName:()=>{}});function s(e){let{children:t}=e,[n,s]=(0,r.useState)(""),[h,a]=(0,r.useState)(""),[S,l]=(0,r.useState)("86"),[d,i]=(0,r.useState)(""),C=()=>{let e="";return(!S||isNaN(S))&&(e="无效国家，重新选择"),i(e),!e},[k,f]=(0,r.useState)(""),[E,P]=(0,r.useState)(""),[w,N]=(0,r.useState)(null),[_,g]=(0,r.useState)(null),[M,p]=(0,r.useState)("获取校验码"),[A,m]=(0,r.useState)(!1),v=e=>{e>0?(p("已发送, "+e+" ..."),setTimeout(()=>v(e-1),1e3),m(!0)):(p("重新获取"),m(!1))},[x,b]=(0,r.useState)(""),[y,T]=(0,r.useState)(""),B=e=>!0===e&&T("该账号已经注册"),[J,O]=(0,r.useState)(""),[R,U]=(0,r.useState)(""),[X,j]=(0,r.useState)(!1);return(0,o.jsx)(c.Provider,{value:{nickname:n,setNickname:s,nicknameError:h,countryCode:S,setCountryCode:l,countryCodeError:d,phone:k,setPhone:f,phoneError:E,setPhoneError:P,account:x,setAccount:b,accountError:y,setAccountError:T,password:J,setPassword:O,passwordError:R,setPasswordError:U,foreignPhone:X,setForeignPhone:j,SMSCode:w,setSMSCode:N,SMSCodeError:_,setSMSCodeError:g,SMSButtonText:M,SMSButtonDisabled:A,SendSMSCode:e=>{e()&&(v(60),(0,u.bl)("userSendSMSCode",{countryCode:S,phone:k}))},checkSMSCode:()=>{let e="";return"none"===w?e="请填写校验码":6!==w.length&&(e="校验码为六位"),g(e),!e},CheckPassword:()=>{let e="";return J||(e="密码必须填写"),(J.length<8||J.length>32)&&(e="密码8-32位"),U(e),!e},checkAccount:function(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0],t="";return x||(t="账号必须填写"),(x.length<6||x.length>32)&&(t="账号6-32位"),T(t),!t&&e&&(0,u.Jp)("UserRootAccount",x).then(B).catch(e=>null),!t},checkPhone:()=>{let e="";if(k||(e="常用手机号必填"),k.length>=7&&k.length<=13?k.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)||(e="不是完整有效手机号码"):e="手机号码7-13位",P(e),!e&&C()){var t=k;"086"===S||"86"===S||(t="86"+t),(0,u.Jp)("UserRootAccount",t).then(e=>!0===e&&P("该账号已经注册")).catch(e=>null)}return!e},checkCountryCode:C,CheckNickName:()=>{let e="";if(n){let t=n.length;(t>32||t<5)&&(e="昵称 5-32字符")}else e="昵称不能为空";return a(e),!e}},children:t})}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=9132)}),_N_E=e.O()}]);