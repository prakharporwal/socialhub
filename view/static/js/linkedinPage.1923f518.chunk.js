"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[209],{6699:function(n,e,t){t.d(e,{Z:function(){return i}});var i={api_server_url:"https://api.sociohub.live",path_prefix:"/api"}},6005:function(n,e,t){var i=t(4165),r=t(5861),c=t(9439),o=t(295),u=t(4825),a=t(8381),s=t(9867),l=t(1821),f=t(4438),d=t(6699),h=t(2834);e.Z=function(n){var e=(0,s.useState)(!1),t=(0,c.Z)(e,2),p=t[0],v=t[1],x=(0,s.useState)(""),k=(0,c.Z)(x,2),g=k[0],w=k[1],j=(0,f.a)(),Z=(0,s.useState)(!1),m=(0,c.Z)(Z,2),_=m[0],b=m[1];function y(){return(y=(0,r.Z)((0,i.Z)().mark((function n(){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!_){n.next=2;break}return n.abrupt("return");case 2:return v(!0),n.next=5,fetch(d.Z.api_server_url+"/api/p/linkedin/oauth/access/initiate",{method:"get",headers:{"access-token":j.accessToken||""}}).then((function(n){if(n.ok)return n.json();throw new Error("")})).then((function(n){console.log("data",n),window.location.replace(n.redirect_uri)})).catch((function(n){console.log(n)})).finally((function(){v(!1)}));case 5:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,s.useEffect)((function(){fetch(d.Z.api_server_url+"/api/p/linkedin/account/info",{headers:{"access-token":j.accessToken||""}}).then((function(n){if(n.ok)return n.json();throw new Error("Failed to get linkedin account info!")})).then((function(n){var e,t,i;void 0!==(null===(e=n.account)||void 0===e?void 0:e.urn)&&""!==(null===(t=n.account)||void 0===t?void 0:t.urn)&&(w(null===(i=n.account)||void 0===i?void 0:i.urn),b(!0))})).catch((function(n){console.log(n)}))}),[]),(0,h.jsx)(o.z,{variant:_?"outline":"solid",colorScheme:"linkedin",w:"full",maxW:"md",leftIcon:(0,h.jsx)(l.n7M,{}),isLoading:p,loadingText:"Connecting",onClick:function(){return y.apply(this,arguments)},children:(0,h.jsx)(u.M,{children:(0,h.jsx)(a.x,{children:_?g.split(":")[3]:"Connect Linkedin Account"})})})}},6443:function(n,e,t){var i=t(1413),r=(t(9867),t(4670)),c=t(4438),o=t(7973),u=t(2834);e.Z=function(n){return function(e){var t=(0,c.a)();return(0,u.jsx)(o.xu,{h:"calc(100vh - 4rem)",overflowY:"auto",children:t.isAuthenticated?(0,u.jsx)(n,(0,i.Z)({},e)):(0,u.jsx)(r.Fg,{to:"/signin",replace:!0})})}}},4438:function(n,e,t){t.d(e,{a:function(){return o}});var i=t(9439),r=t(9867),c=t(2733);function o(){var n=(0,r.useMemo)((function(){return(0,c.e)("access_token")}),[]),e=(0,r.useState)(null!=n&&void 0!==n&&""!==n),t=(0,i.Z)(e,2),o=t[0];t[1];return{isAuthenticated:o,accessToken:n}}},3822:function(n,e,t){t.r(e);var i=t(7973),r=t(7254),c=(t(9867),t(6443)),o=t(6005),u=t(2834);e.default=(0,c.Z)((function(n){return(0,u.jsx)(i.xu,{h:"80vh",children:(0,u.jsx)(r.k,{direction:"column",align:"center",justify:"center",h:"100%",gap:"8",children:(0,u.jsx)(o.Z,{})})})}))},2733:function(n,e,t){function i(n){var e=n.length+1;return document.cookie.split(";").map((function(n){return n.trim()})).filter((function(t){return t.substring(0,e)==="".concat(n,"=")})).map((function(n){return decodeURIComponent(n.substring(e))}))[0]||null}t.d(e,{e:function(){return i}})},7254:function(n,e,t){t.d(e,{k:function(){return s}});var i=t(1413),r=t(5987),c=t(9770),o=t(3689),u=t(2834),a=["direction","align","justify","wrap","basis","grow","shrink"],s=(0,c.G)((function(n,e){var t=n.direction,c=n.align,s=n.justify,l=n.wrap,f=n.basis,d=n.grow,h=n.shrink,p=(0,r.Z)(n,a),v={display:"flex",flexDirection:t,alignItems:c,justifyContent:s,flexWrap:l,flexBasis:f,flexGrow:d,flexShrink:h};return(0,u.jsx)(o.m.div,(0,i.Z)({ref:e,__css:v},p))}));s.displayName="Flex"}}]);
//# sourceMappingURL=linkedinPage.1923f518.chunk.js.map