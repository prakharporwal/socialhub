"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[561],{6699:function(e,t,n){n.d(t,{Z:function(){return o}});var r={dev:{api_server_url:"http://localhost:8080",path_prefix:"/api"},lan:{api_server_url:"http://192.168.0.184:8080",path_prefix:"/api"},prod:{api_server_url:"https://api.sociohub.live",path_prefix:"/api"}},o=r.prod},6443:function(e,t,n){var r=n(1413),o=(n(9867),n(4670)),s=n(4438),i=n(7973),a=n(2834);t.Z=function(e){return function(t){var n=(0,s.a)();return(0,a.jsx)(i.xu,{h:"calc(100vh - 4rem)",overflowY:"auto",children:n.isAuthenticated?(0,a.jsx)(e,(0,r.Z)({},t)):(0,a.jsx)(o.Fg,{to:"/signin",replace:!0})})}}},4438:function(e,t,n){n.d(t,{a:function(){return i}});var r=n(9439),o=n(9867),s=n(2733);function i(){var e=(0,o.useMemo)((function(){return(0,s.e)("access_token")}),[]),t=(0,o.useState)(null!=e&&void 0!==e&&""!==e),n=(0,r.Z)(t,2),i=n[0];n[1];return{isAuthenticated:i,accessToken:e}}},4980:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var r=n(7973),o=n(4165),s=n(5861),i=n(9439),a=n(9867),c=n(7200),u=n(7254),l=n(8216),h=n(3145),d=n(9274),p=n(4458),f=n(5721),m=n(348),x=n(1429),g=n(2678),v=n(1914),j=n(3727),y=n(2102),b=n(8910),w=n(295),k=n(4825),Z=n(8381),S=n(4997),T=n(4438),C=n(6443),I=n(6699),_=n(3967),E=n(9333),N=n(2834);function P(e){return new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString()}var A=(0,C.Z)((function(){var e=(0,c.p)(),t=(0,T.a)(),n=(0,a.useState)("text"),C=(0,i.Z)(n,2),A=C[0],O=C[1],D=(0,a.useState)(""),R=(0,i.Z)(D,2),F=R[0],H=R[1],L=(0,a.useState)(!1),M=(0,i.Z)(L,2),z=M[0],B=M[1],W=(0,a.useState)(new Map),J=(0,i.Z)(W,2),q=J[0],K=J[1],U=(0,a.useState)(!1),G=(0,i.Z)(U,2),Q=G[0],Y=G[1],X=(0,a.useState)(P(new Date)),V=(0,i.Z)(X,2),$=V[0],ee=V[1],te=(0,a.useState)(!0),ne=(0,i.Z)(te,2),re=ne[0],oe=ne[1],se=(0,a.useState)([{value:"monday",id:1},{value:"tuesday",id:2}]),ie=(0,i.Z)(se,2),ae=ie[0],ce=(ie[1],function(e){q.set(e.currentTarget.id,e.currentTarget.checked),K(new Map(q))}),ue=function(){var t=(0,s.Z)((0,o.Z)().mark((function t(n){var r,s;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),B(!0),""!==F&&""!==A){t.next=6;break}return B(!1),e.isActive("post-submit-error")||e({id:"post-submit-error",status:"error",title:"Form Empty",description:"Content and type cannot be empty"}),t.abrupt("return");case 6:r=Array.from(q,(function(e){var t=(0,i.Z)(e,2),n=t[0];if(t[1])return console.log(n),n})),s={post_text:F,post_type:"TEXT",creation_status:"COMPLETED",platforms:r},E.Z.post("/p/v1/posts",s).then((function(){e.isActive("post-submit-success")||e({id:"post-submit-success",status:"success",title:"Post submitted successfully"})})).catch((function(t){var n,r;e.isActive("post-submit-error")||e({id:"post-submit-error",status:"error",title:"Failed to submit post",description:(null===(n=t.response)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.message)||"An unexpected error occurred"});console.error("Post submission error:",t)})).finally((function(){B(!1)}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,N.jsx)(r.xu,{children:(0,N.jsx)(u.k,{align:"center",justify:"center",direction:"column",children:(0,N.jsx)(u.k,{gap:4,mx:"auto",width:"full",py:4,px:4,children:(0,N.jsx)(r.xu,{borderWidth:"2px",rounded:"lg",shadow:"2px 2px 3px rgba(0,0,0,0.3)",minWidth:{base:"full",sm:"50%"},bg:(0,l.ff)("white","gray.700"),p:8,m:"4",children:(0,N.jsx)(h.M,{columns:1,spacing:6,children:(0,N.jsxs)("form",{onSubmit:ue,children:[(0,N.jsxs)(d.NI,{as:p.P,colSpan:[3,2],isRequired:!0,children:[(0,N.jsx)(f.l,{htmlFor:"post_type",fontSize:"sm",fontWeight:"md",color:"gray.700",_dark:{color:"gray.50"},children:"Post Type"}),(0,N.jsxs)(m.P,{id:"post_type",placeholder:"Select post type",value:A,variant:"outline",w:"auto",onChange:function(e){O(e.currentTarget.value)},children:[(0,N.jsx)("option",{value:"image",disabled:!0,"aria-disabled":!0,children:"Image"}),(0,N.jsx)("option",{value:"poll",disabled:!0,"aria-disabled":!0,children:"Create a Poll"}),(0,N.jsx)("option",{value:"text",children:"Text"})]})]}),"poll"===A?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(d.NI,{mt:2,as:p.P,colSpan:[3,2],isRequired:!0,children:[(0,N.jsx)(f.l,{fontSize:"sm",fontWeight:"md",color:"gray.700",_dark:{color:"white"},children:"Question"}),(0,N.jsx)(x.I,{p:2,placeholder:"Hey guys I just started using Socialhub",shadow:"sm",focusBorderColor:"brand.400",fontSize:{sm:"sm"},value:F,onChange:function(e){H(e.currentTarget.value)}})]}),(0,N.jsxs)(d.NI,{mt:2,as:p.P,colSpan:[3,2],children:[(0,N.jsx)(g.E,{value:"1",onChange:function(){},children:(0,N.jsx)(u.k,{direction:"column",children:ae.map((function(e){return(0,N.jsx)(v.Y,{value:e.value,textTransform:"capitalize",children:e.value},e.id)}))})}),(0,N.jsx)(d.Q6,{children:"Brief description for your profile. URLs are hyperlinked."})]})]}):(0,N.jsxs)(d.NI,{mt:2,as:p.P,colSpan:[3,2],isRequired:!0,children:[(0,N.jsx)(j.g,{p:2,placeholder:"Hey guys I just started using Socialhub",rows:10,shadow:"sm",focusBorderColor:"brand.400",fontSize:{sm:"sm"},value:F,onChange:function(e){H(e.currentTarget.value)}}),(0,N.jsx)(d.Q6,{children:" "})]}),(0,N.jsxs)(d.NI,{as:h.M,columns:{base:2,lg:4},children:[(0,N.jsx)(f.l,{htmlFor:"TWITTER",children:"Twitter"}),(0,N.jsx)(y.r,{id:"TWITTER",marginRight:"auto",isChecked:q.get("TWITTER"),onChange:ce}),(0,N.jsx)(f.l,{htmlFor:"LINKEDIN",children:"Linkedin"}),(0,N.jsx)(y.r,{id:"LINKEDIN",marginRight:"auto",isChecked:q.get("LINKEDIN"),onChange:ce}),(0,N.jsx)(f.l,{htmlFor:"INSTAGRAM",children:"Instagram"}),(0,N.jsx)(y.r,{id:"INSTAGRAM",marginRight:"auto",isChecked:q.get("INSTAGRAM"),onChange:ce}),(0,N.jsx)(f.l,{htmlFor:"FACEBOOK",children:"Facebook"}),(0,N.jsx)(y.r,{id:"FACEBOOK",marginRight:"auto",isChecked:q.get("FACEBOOK"),onChange:ce})]}),(0,N.jsx)(d.NI,{children:(0,N.jsxs)(u.k,{gap:8,children:[(0,N.jsx)(b.L,{}),re?(0,N.jsxs)(u.k,{dir:"row",gap:4,children:[(0,N.jsx)(w.z,{type:"submit",colorScheme:"blue",w:"full",maxW:"md",isLoading:z,onClick:function(){},children:(0,N.jsx)(k.M,{children:(0,N.jsx)(Z.x,{children:"Post"})})}),(0,N.jsx)(S.h,{icon:(0,N.jsx)(_.qyc,{}),"aria-label":"schedule post",onClick:function(){oe(!re)}})]}):(0,N.jsxs)(u.k,{gap:8,children:[(0,N.jsxs)(u.k,{dir:"row",gap:4,children:[(0,N.jsx)(w.z,{_hover:{bg:"blue.600",color:"white"},colorScheme:"linkedin",variant:"outline",w:"full",maxW:"md",leftIcon:(0,N.jsx)(_.qyc,{}),isLoading:Q,onClick:function(){var n=new Date($),r=new Date(n.getTime()+6e4*n.getTimezoneOffset()).toISOString();console.log(r),""!==F?(Y(!0),fetch(I.Z.api_server_url+"/api/p/linkedin/schedule/post",{method:"POST",headers:{"access-token":t.accessToken||""},body:JSON.stringify({post_type:A,post_json:{author:"",commentary:F,visibility:"PUBLIC",distribution:{feedDistribution:"MAIN_FEED",targetEntities:[],thirdPartyDistributionChannels:[]},lifecycleState:"PUBLISHED",isReshareDisabledByAuthor:!1},scheduled_at:r})}).then((function(e){if(e.ok)return e.json();throw new Error("Error scheduling post!")})).then((function(t){console.log(t),e({status:"success",title:"Submitted post for scheduling",duration:5e3})})).catch((function(){})).finally((function(){Y(!1)}))):e.isActive("post-empty")||e({id:"post-empty",status:"error",title:"Post content is empty!"})},children:(0,N.jsx)(k.M,{children:(0,N.jsx)(Z.x,{children:"Schedule Post"})})}),(0,N.jsx)(S.h,{icon:(0,N.jsx)(_.qyc,{}),"aria-label":"schedule post",onClick:function(){oe(!re)}})]}),(0,N.jsx)(x.I,{colorScheme:"blue",type:"datetime-local",value:$.substring(0,16),onChange:function(e){console.log(new Date(e.currentTarget.value));var t=P(new Date(e.currentTarget.value));ee(t)}})]})]})})]})})})})})})}));function O(){return(0,N.jsx)(r.xu,{children:(0,N.jsx)(A,{})})}},9333:function(e,t,n){var r=n(4165),o=n(1413),s=n(5861),i=n(5671),a=n(3144),c=n(6699),u=n(2733),l=function(){function e(){var t;(0,i.Z)(this,e),this.apiHostname=void 0,this.apiHostname=c.Z.api_server_url.concat(null!==(t=c.Z.path_prefix)&&void 0!==t?t:"")}return(0,a.Z)(e,[{key:"getCommonHeaders",value:function(){return{"content-type":"application/json","access-token":(0,u.e)("access_token")||"no token found!"}}},{key:"get",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t,n){var i=this;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){fetch(i.apiHostname.concat(t),{headers:(0,o.Z)((0,o.Z)({},i.getCommonHeaders()),n&&n.headers),method:"GET"}).then(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok&&201!==t.status){e.next=2;break}return e.abrupt("return",t.json());case 2:return e.next=4,t.json();case 4:throw n=e.sent,new Error(JSON.stringify(n));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){e(t)})).catch((function(e){a(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t,n,i){var a=this;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,c){fetch(a.apiHostname.concat(t),{headers:(0,o.Z)((0,o.Z)({},a.getCommonHeaders()),i&&i.headers),method:"POST",body:n&&JSON.stringify(n)}).then(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok&&201!==t.status){e.next=2;break}return e.abrupt("return",t.json());case 2:return e.next=4,t.json();case 4:throw n=e.sent,new Error(JSON.stringify(n));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){e(t)})).catch((function(e){c(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"put",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t,n,i){var a=this;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,c){fetch(a.apiHostname.concat(t),{headers:(0,o.Z)((0,o.Z)({},a.getCommonHeaders()),i&&i.headers),method:"PUT",body:n&&JSON.stringify(n)}).then(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok&&201!==t.status){e.next=2;break}return e.abrupt("return",t.json());case 2:return n={},e.next=5,t.json().then((function(e){n=e}));case 5:throw new Error(JSON.stringify(n));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){e(t)})).catch((function(e){c(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t,n){var i=this;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){fetch(i.apiHostname.concat(t),{headers:(0,o.Z)((0,o.Z)({},i.getCommonHeaders()),n&&n.headers),method:"DELETE"}).then(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok&&201!==t.status){e.next=2;break}return e.abrupt("return",t.json());case 2:return n={},e.next=5,t.json().then((function(e){n=e}));case 5:throw new Error(JSON.stringify(n));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){e(t)})).catch((function(e){a(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),h=new l;console.log("ApiCaller",h),t.Z=h},2733:function(e,t,n){function r(e){var t=e.length+1,n=document.cookie.split(";").map((function(e){return e.trim()})).filter((function(n){return n.substring(0,t)==="".concat(e,"=")})).map((function(e){return decodeURIComponent(e.substring(t))}))[0];return console.log(n),n||null}n.d(t,{e:function(){return r}})}}]);
//# sourceMappingURL=postcreationPage.2807a16f.chunk.js.map