(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4484],{9696:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Asks/AskContext",function(){return n(1157)}])},1157:function(e,t,n){"use strict";n.r(t),n.d(t,{AskContext:function(){return o},default:function(){return r}});var s=n(5893),i=n(1138),u=n(7294);let o=u.createContext({topics:[],QA:{Q:"",A:"",Time:0},topicLoaded:!1,modelGPT:"gpt-3.5",setTopics:()=>{},setQA:()=>{},setTopicLoaded:()=>{},setReload:()=>{},setModelGPT:()=>{}});function r(e){let{children:t}=e,[n,r]=(0,u.useState)([]),[c,a]=(0,u.useState)({Q:"",A:"",Time:0}),[f,d]=(0,u.useState)(!1),[l,p]=(0,u.useState)(0),[_,T]=(0,u.useState)("gpt-3.5");return(0,u.useEffect)(()=>{(0,i.BB)("MyQuestionsList:@id",0,"+inf").then(e=>{if(!e||0==e.length)return d(!0),r([]);e=e.slice(0,200),(0,i.f2)("MyQuestions:@id",e).then(e=>{e.sort((e,t)=>parseInt(t.Time)-parseInt(e.Time)),r(e),c&&c.Q||a(e[0]),d(!0)})})},[l]),(0,s.jsx)(o.Provider,{value:{topics:n,setTopics:r,QA:c,setQA:a,topicLoaded:f,setTopicLoaded:d,setReload:p,modelGPT:_,setModelGPT:T},children:t})}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=9696)}),_N_E=e.O()}]);