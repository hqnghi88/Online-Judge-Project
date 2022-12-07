"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[415],{1415:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var r=n(74165),i=n(15861),o=n(42982),c=n(70885),u=n(72791),a=n(88446),s=n(54261),d=n(49877),l=n(36151),f=n(1235),p=n(3710),g=n(29609),m=n(59434),h=n(80184),x=[["GET","get","g"],["POST","post","g"],["PUT","put","g"],["DELETE","delete","g"],["Unlinked","unlinked","g"],["PORT","port","g"],["Database","database","g"],["Production","production","g"],["Note:","note","g"],["Add Note","addnote","g"],["Edit Note","editnote","g"],["Delete Note","deletenote","g"],["Containers","containers","g"],["Deleted","deleted","g"],["Error","error","g"],["failed","failed","g"],["LOG","log","g"]],Z=function(e,t,n,o,c){(0,u.useEffect)((function(){e(!0),t(void 0),fetch("".concat(a.p,"/api/experimental/logs"),{headers:{"Content-Type":"application/json"},method:"GET",credentials:"include"}).then(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok){e.next=2;break}return e.abrupt("return",t.json());case 2:return e.next=4,t.json();case 4:return n=e.sent,e.next=7,Promise.reject(n);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){o(e.stdoutTxt.trim().split("\n").map((function(e){return{msg:e,id:(0,s.Z)()}}))),n(e.stderrTxt.trim().split("\n").map((function(e){return{msg:e,id:(0,s.Z)()}}))),c((function(e){return!e}))})).catch(t).finally((function(){return e(!1)}))}),[e,t,n,o,c])},k=function(e){(0,u.useEffect)((function(){var e=setTimeout((function(){var e=document.getElementById("out-pre");e&&e.childNodes.forEach((function(e){"ok"!==e.getAttribute("tokenized")&&(e.innerHTML=v(e.innerHTML),e.setAttribute("tokenized","ok"))}))}),10);return function(){return clearTimeout(e)}}),e)},v=function(e){x.forEach((function(t){return e=e.replace(new RegExp(t[0],t[2]),"<span class='token token-".concat(t[1],"'>").concat(t[0],"</span>"))}));var t=e.match("[0-9]+/[0-9]+/[0-9]+, [0-9]+:[0-9]+:[0-9]+ [a-zA-Z][a-zA-Z]");return t&&(e=e.replace(t[0],"<span class='token-time'>".concat(t[0],"</span>"))),e},j=function(){var e=(0,m.v9)((function(e){return e.auth})),t=(0,u.useState)(!0),n=(0,c.Z)(t,2),r=n[0],i=n[1],x=(0,u.useState)(),v=(0,c.Z)(x,2),j=v[0],E=v[1],T=(0,u.useState)({}),b=(0,c.Z)(T,2),y=b[0],w=b[1],S=(0,u.useState)({}),z=(0,c.Z)(S,2),A=z[0],C=z[1],N=(0,u.useState)(!1),P=(0,c.Z)(N,2),D=P[0],L=P[1],I=(0,u.useState)(!0),O=(0,c.Z)(I,2),G=O[0],R=O[1],H=(0,u.useRef)(null);return(0,u.useEffect)((function(){if(e.isAdmin){var t=(0,g.ZP)(a.p,{query:{id:(0,s.Z)()}});return t.on("logger-new-log",(function(e){w((function(t){return[].concat((0,o.Z)(t),[{msg:e,id:(0,s.Z)()}])}))})),t.on("logger-new-error",(function(e){C((function(t){return[].concat((0,o.Z)(t),[{msg:e,id:(0,s.Z)()}])}))})),function(){return t.close()}}}),[e.username,e.isAdmin]),Z(i,E,C,w,L),k([D,G,A,y]),r?(0,h.jsx)("div",{children:"Loading..."}):j?(0,h.jsx)("div",{children:JSON.stringify(j)}):(0,h.jsxs)(u.Fragment,{children:[(0,h.jsx)(d.Z,{onClick:function(){return H.current.scrollIntoView()},style:{position:"fixed",bottom:"4.5em",right:"1em",opacity:"0.9"},size:"small",color:"primary","aria-label":"add",children:(0,h.jsx)(f.Z,{})}),(0,h.jsx)(l.Z,{variant:"contained",color:"success",onClick:function(){return R((function(e){return!e}))},sx:{textTransform:"capitalize"},startIcon:(0,h.jsx)(p.Z,{}),children:G?"show stderr":"show stdout"}),(0,h.jsx)("pre",{id:"out-pre",style:{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"1rem",fontSize:"0.6rem"},children:G?(0,o.Z)(y).reverse().map((function(e){return(0,h.jsx)("div",{children:e.msg},e.id)})):A.map((function(e){return(0,h.jsx)("div",{children:e.msg},e.id)}))}),(0,h.jsx)("div",{ref:H,"aria-hidden":!0})]})}}}]);
//# sourceMappingURL=415.1ebee72d.chunk.js.map