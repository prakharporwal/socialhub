"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[209],{6699:function(n,e,t){t.d(e,{Z:function(){return i}});var i={api_server_url:"https://api.sociohub.live"}},6005:function(n,e,t){var i=t(4165),r=t(5861),a=t(9439),c=t(2265),o=t(4825),s=t(8381),l=t(9867),u=t(1821),f=t(5680),d=t(6699),p=t(2834);e.Z=function(n){var e=(0,l.useState)(!1),t=(0,a.Z)(e,2),h=t[0],m=t[1],v=(0,l.useState)(""),x=(0,a.Z)(v,2),g=x[0],Z=x[1],j=(0,f.a)(),y=(0,l.useState)(!1),k=(0,a.Z)(y,2),_=k[0],b=k[1];function w(){return(w=(0,r.Z)((0,i.Z)().mark((function n(){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!_){n.next=2;break}return n.abrupt("return");case 2:return m(!0),n.next=5,fetch(d.Z.api_server_url+"/api/p/linkedin/oauth/access/initiate",{method:"get",headers:{"access-token":j.accessToken||""}}).then((function(n){if(n.ok)return n.json();throw new Error("")})).then((function(n){console.log("data",n),window.location.replace(n.redirect_uri)})).catch((function(n){console.log(n)})).finally((function(){m(!1)}));case 5:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return(0,l.useEffect)((function(){fetch(d.Z.api_server_url+"/api/p/linkedin/account/info",{headers:{"access-token":j.accessToken||""}}).then((function(n){if(n.ok)return n.json();throw new Error("Failed to get linkedin account info!")})).then((function(n){var e,t,i;void 0!==(null===(e=n.account)||void 0===e?void 0:e.urn)&&""!==(null===(t=n.account)||void 0===t?void 0:t.urn)&&(Z(null===(i=n.account)||void 0===i?void 0:i.urn),b(!0))})).catch((function(n){console.log(n)}))}),[]),(0,p.jsx)(c.z,{variant:_?"outline":"solid",colorScheme:"linkedin",w:"full",maxW:"md",leftIcon:(0,p.jsx)(u.n7M,{}),isLoading:h,loadingText:"Connecting",onClick:function(){return w.apply(this,arguments)},children:(0,p.jsx)(o.M,{children:(0,p.jsx)(s.x,{children:_?g.split(":")[3]:"Connect Linkedin Account"})})})}},6443:function(n,e,t){var i=t(1413),r=(t(9867),t(4670)),a=t(5680),c=t(7973),o=t(2834);e.Z=function(n){return function(e){var t=(0,a.a)();return(0,o.jsx)(c.xu,{h:"calc(100vh - 4rem)",overflowY:"auto",children:t.isAuthenticated?(0,o.jsx)(n,(0,i.Z)({},e)):(0,o.jsx)(r.Fg,{to:"/signin",replace:!0})})}}},5680:function(n,e,t){t.d(e,{a:function(){return a}});var i=t(9439),r=t(9867);function a(){var n=(0,r.useMemo)((function(){return function(n){var e=n.length+1;return document.cookie.split(";").map((function(n){return n.trim()})).filter((function(t){return t.substring(0,e)==="".concat(n,"=")})).map((function(n){return decodeURIComponent(n.substring(e))}))[0]||null}("access_token")}),[]),e=(0,r.useState)(null!=n&&void 0!==n&&""!==n),t=(0,i.Z)(e,2),a=t[0];t[1];return{isAuthenticated:a,accessToken:n}}},3822:function(n,e,t){t.r(e);var i=t(7973),r=t(7254),a=(t(9867),t(6443)),c=t(6005),o=t(2834);e.default=(0,a.Z)((function(n){return(0,o.jsx)(i.xu,{h:"80vh",children:(0,o.jsx)(r.k,{direction:"column",align:"center",justify:"center",h:"100%",gap:"8",children:(0,o.jsx)(c.Z,{})})})}))},2265:function(n,e,t){t.d(e,{z:function(){return b}});var i=t(5987),r=t(1413),a=t(9439),c=t(9867);var o=(0,t(631).k)({strict:!1,name:"ButtonGroupContext"}),s=(0,a.Z)(o,2),l=(s[0],s[1]),u=t(3689),f=t(9523),d=t(2834),p=["children","className"];function h(n){var e=n.children,t=n.className,a=(0,i.Z)(n,p),o=(0,c.isValidElement)(e)?(0,c.cloneElement)(e,{"aria-hidden":!0,focusable:!1}):e,s=(0,f.cx)("chakra-button__icon",t);return(0,d.jsx)(u.m.span,(0,r.Z)((0,r.Z)({display:"inline-flex",alignSelf:"center",flexShrink:0},a),{},{className:s,children:o}))}h.displayName="ButtonIcon";var m=t(4942),v=t(7877),x=["label","placement","spacing","children","className","__css"];function g(n){var e=n.label,t=n.placement,a=n.spacing,o=void 0===a?"0.5rem":a,s=n.children,l=void 0===s?(0,d.jsx)(v.$,{color:"currentColor",width:"1em",height:"1em"}):s,p=n.className,h=n.__css,g=(0,i.Z)(n,x),Z=(0,f.cx)("chakra-button__spinner",p),j="start"===t?"marginEnd":"marginStart",y=(0,c.useMemo)((function(){var n;return(0,r.Z)((n={display:"flex",alignItems:"center",position:e?"relative":"absolute"},(0,m.Z)(n,j,e?o:0),(0,m.Z)(n,"fontSize","1em"),(0,m.Z)(n,"lineHeight","normal"),n),h)}),[h,e,j,o]);return(0,d.jsx)(u.m.div,(0,r.Z)((0,r.Z)({className:Z},g),{},{__css:y,children:l}))}g.displayName="ButtonSpinner";var Z=t(154),j=t(9770),y=t(6833),k=t(9511),_=["isDisabled","isLoading","isActive","children","leftIcon","rightIcon","loadingText","iconSpacing","type","spinner","spinnerPlacement","className","as"],b=(0,j.G)((function(n,e){var t=l(),o=(0,y.mq)("Button",(0,r.Z)((0,r.Z)({},t),n)),s=(0,k.Lr)(n),p=s.isDisabled,h=void 0===p?null==t?void 0:t.isDisabled:p,m=s.isLoading,v=s.isActive,x=s.children,j=s.leftIcon,b=s.rightIcon,N=s.loadingText,S=s.iconSpacing,C=void 0===S?"0.5rem":S,I=s.type,z=s.spinner,T=s.spinnerPlacement,B=void 0===T?"start":T,A=s.className,E=s.as,G=(0,i.Z)(s,_),q=(0,c.useMemo)((function(){var n=(0,r.Z)((0,r.Z)({},null==o?void 0:o._focus),{},{zIndex:1});return(0,r.Z)((0,r.Z)({display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none"},o),!!t&&{_focus:n})}),[o,t]),M=function(n){var e=(0,c.useState)(!n),t=(0,a.Z)(e,2),i=t[0],r=t[1];return{ref:(0,c.useCallback)((function(n){n&&r("BUTTON"===n.tagName)}),[]),type:i?"button":void 0}}(E),L=M.ref,D=M.type,F={rightIcon:b,leftIcon:j,iconSpacing:C,children:x};return(0,d.jsxs)(u.m.button,(0,r.Z)((0,r.Z)({ref:(0,Z.qq)(e,L),as:E,type:null!=I?I:D,"data-active":(0,f.PB)(v),"data-loading":(0,f.PB)(m),__css:q,className:(0,f.cx)("chakra-button",A)},G),{},{disabled:h||m,children:[m&&"start"===B&&(0,d.jsx)(g,{className:"chakra-button__spinner--start",label:N,placement:"start",spacing:C,children:z}),m?N||(0,d.jsx)(u.m.span,{opacity:0,children:(0,d.jsx)(w,(0,r.Z)({},F))}):(0,d.jsx)(w,(0,r.Z)({},F)),m&&"end"===B&&(0,d.jsx)(g,{className:"chakra-button__spinner--end",label:N,placement:"end",spacing:C,children:z})]}))}));function w(n){var e=n.leftIcon,t=n.rightIcon,i=n.children,r=n.iconSpacing;return(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsx)(h,{marginEnd:r,children:e}),i,t&&(0,d.jsx)(h,{marginStart:r,children:t})]})}b.displayName="Button"},4825:function(n,e,t){t.d(e,{M:function(){return l}});var i=t(1413),r=t(5987),a=t(3689),c=t(9770),o=t(2834),s=["axis"],l=(0,a.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});l.displayName="Center";var u={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}};(0,c.G)((function(n,e){var t=n.axis,c=void 0===t?"both":t,l=(0,r.Z)(n,s);return(0,o.jsx)(a.m.div,(0,i.Z)((0,i.Z)({ref:e,__css:u[c]},l),{},{position:"absolute"}))}))},7973:function(n,e,t){t.d(e,{xu:function(){return u}});var i=t(1413),r=t(5987),a=t(3689),c=t(9770),o=t(2834),s=["size","centerContent"],l=["size"],u=(0,a.m)("div");u.displayName="Box";var f=(0,c.G)((function(n,e){var t=n.size,a=n.centerContent,c=void 0===a||a,l=(0,r.Z)(n,s),f=c?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return(0,o.jsx)(u,(0,i.Z)({ref:e,boxSize:t,__css:(0,i.Z)((0,i.Z)({},f),{},{flexShrink:0,flexGrow:0})},l))}));f.displayName="Square",(0,c.G)((function(n,e){var t=n.size,a=(0,r.Z)(n,l);return(0,o.jsx)(f,(0,i.Z)({size:t,ref:e,borderRadius:"9999px"},a))})).displayName="Circle"},7254:function(n,e,t){t.d(e,{k:function(){return l}});var i=t(1413),r=t(5987),a=t(9770),c=t(3689),o=t(2834),s=["direction","align","justify","wrap","basis","grow","shrink"],l=(0,a.G)((function(n,e){var t=n.direction,a=n.align,l=n.justify,u=n.wrap,f=n.basis,d=n.grow,p=n.shrink,h=(0,r.Z)(n,s),m={display:"flex",flexDirection:t,alignItems:a,justifyContent:l,flexWrap:u,flexBasis:f,flexGrow:d,flexShrink:p};return(0,o.jsx)(c.m.div,(0,i.Z)({ref:e,__css:m},h))}));l.displayName="Flex"},8381:function(n,e,t){t.d(e,{x:function(){return p}});var i=t(1413),r=t(5987),a=t(9770),c=t(6833),o=t(9511),s=t(3689),l=t(9523),u=t(4518),f=t(2834),d=["className","align","decoration","casing"],p=(0,a.G)((function(n,e){var t=(0,c.mq)("Text",n),a=(0,o.Lr)(n),p=(a.className,a.align,a.decoration,a.casing,(0,r.Z)(a,d)),h=(0,u.o)({textAlign:n.align,textDecoration:n.decoration,textTransform:n.casing});return(0,f.jsx)(s.m.p,(0,i.Z)((0,i.Z)((0,i.Z)({ref:e,className:(0,l.cx)("chakra-text",n.className)},h),p),{},{__css:t}))}));p.displayName="Text"},4518:function(n,e,t){function i(n){var e=Object.assign({},n);for(var t in e)void 0===e[t]&&delete e[t];return e}t.d(e,{o:function(){return i}})},154:function(n,e,t){t.d(e,{lq:function(){return r},qq:function(){return a}});var i=t(9867);function r(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return function(n){e.forEach((function(e){!function(n,e){if(null!=n)if("function"!==typeof n)try{n.current=e}catch(t){throw new Error("Cannot assign value '".concat(e,"' to ref '").concat(n,"'"))}else n(e)}(e,n)}))}}function a(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return(0,i.useMemo)((function(){return r.apply(void 0,e)}),e)}}}]);
//# sourceMappingURL=linkedinPage.b97e8f79.chunk.js.map