import{_ as p,r as l,d as f,o as _,c as v,w as c,v as r,a as n,e as g,b as y}from"./_plugin-vue_export-helper-57ca4d15.js";const N={class:"my-2 border-2 rounded-md p-2 w-300 flex justify-between"},w=["placeholder"],A=["placeholder"],E={__name:"creditNumber",setup(d){l(""),l("");const e=l(""),s=l(""),i=l("**** **** **** ****"),m=f([4,9,14]),b=()=>{e.value=e.value.replace(/[^0-9\s]/g,""),m.indexOf(e.value.length)>-1&&s.value.length<e.value.length?e.value+=" ":e.value.substr(-1)==" "&&(e.value=e.value.substr(0,e.value.length-1)),s.value=e.value},t=l(""),o=l(""),h=l("MM/YY"),x=()=>{t.value=t.value.replace(/[^0-9\/]/g,""),t.value.length==2&&o.value.length<t.value.length?t.value+="/":t.value.substr(-1)=="/"&&(t.value=t.value.substr(0,t.value.length-1)),o.value=t.value};return(P,a)=>(_(),v("div",N,[c(n("input",{type:"text",class:"border-0 focus:outline-0","onUpdate:modelValue":a[0]||(a[0]=u=>e.value=u),placeholder:i.value,maxlength:"19",onInput:b},null,40,w),[[r,e.value]]),c(n("input",{type:"text",class:"border-0 focus:outline-0 w-50","onUpdate:modelValue":a[1]||(a[1]=u=>t.value=u),placeholder:h.value,maxlength:"5",onInput:x},null,40,A),[[r,t.value]])]))}},I=p(E,[["__scopeId","data-v-aa5e8195"]]);const V={class:"wrapper"},B={__name:"App",setup(d){return(e,s)=>(_(),v("div",V,[n("div",null,[g(I)])]))}},M=p(B,[["__scopeId","data-v-37eb7ec6"]]);y(M).mount("#app");
