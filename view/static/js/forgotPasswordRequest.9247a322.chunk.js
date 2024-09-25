"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[424],{8304:function(e,n){var t={api_server_url:"http://3.111.57.148"};n.Z=t},7817:function(e,n,t){t.d(n,{Z:function(){return l}});t(9867);var i=t(7254),r=t(7194),a=t(681),s=t(7973),c=t(8216),o=t(2834),l=function(e){return(0,o.jsx)(i.k,{className:"signin-background",h:"100vh",align:"center",justify:"center",backgroundColor:"whitesmoke",children:(0,o.jsxs)(r.K,{spacing:4,mx:"auto",minW:{md:"md"},maxW:"lg",py:12,px:6,children:[(0,o.jsx)(r.K,{align:"center",children:(0,o.jsx)(a.X,{fontSize:"3xl",children:e.headingText})}),(0,o.jsx)(s.xu,{rounded:"lg",bg:(0,c.ff)("white","gray.700"),boxShadow:"lg",p:8,children:(0,o.jsx)(r.K,{spacing:4,children:e.children})})]})})}},5680:function(e,n,t){t.d(n,{a:function(){return a}});var i=t(9439),r=t(9867);function a(){var e=(0,r.useMemo)((function(){return function(e){var n=e.length+1;return document.cookie.split(";").map((function(e){return e.trim()})).filter((function(t){return t.substring(0,n)==="".concat(e,"=")})).map((function(e){return decodeURIComponent(e.substring(n))}))[0]||null}("access_token")}),[]),n=(0,r.useState)(null!=e&&void 0!==e&&""!==e),t=(0,i.Z)(n,2),a=t[0];t[1];return{isAuthenticated:a,accessToken:e}}},4099:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var i=t(9439),r=t(9867),a=t(7200),s=t(7973),c=t(9274),o=t(5721),l=t(1429),u=t(8910),d=t(2265),f=t(7817),h=t(8304),m=t(5680),p=t(2834),g=function(e){var n=(0,r.useState)(),t=(0,i.Z)(n,2),g=t[0],x=t[1],v=(0,r.useState)(""),Z=(0,i.Z)(v,2),b=Z[0],y=Z[1],j=(0,r.useState)(""),_=(0,i.Z)(j,2),S=_[0],N=_[1],k=(0,a.p)(),w=(0,m.a)();return(0,p.jsx)(f.Z,{headingText:"Forgot Password",children:(0,p.jsx)(s.xu,{children:(0,p.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.debug({userEmail:S,organisationId:b}),""!==S&&""!==b?(x(!0),fetch(h.Z.api_server_url+"/v1/password/forgot/request",{headers:{"access-token":w.accessToken||""},method:"POST",body:JSON.stringify({user_email:S,organisation_id:b})}).then((function(e){if(e.ok)return e.json();throw new Error(e.statusText)})).then((function(e){console.log(e),k({status:"success",title:"Sent Reset link to your Email",duration:5e3})})).catch((function(e){console.log(e),k({status:"error",title:"Failed to initiate request!",duration:5e3})})).finally((function(){x(!1)}))):k({title:"Fields cannot be empty!",status:"error"})},children:[(0,p.jsxs)(c.NI,{id:"organisation-id",isRequired:!0,children:[(0,p.jsx)(o.l,{children:"Organisation Id"}),(0,p.jsx)(l.I,{type:"text",value:b,required:!0,onChange:function(e){y(e.currentTarget.value)}})]}),(0,p.jsx)(u.L,{h:"4"}),(0,p.jsxs)(c.NI,{id:"user-email",isRequired:!0,children:[(0,p.jsx)(o.l,{children:"User Email"}),(0,p.jsx)(l.I,{type:"text",value:S,required:!0,onChange:function(e){N(e.currentTarget.value)}}),(0,p.jsx)(d.z,{marginTop:"4",bg:"blue.400",color:"white",_hover:{bg:"blue.400"},type:"submit",isLoading:g,children:"Send Reset Link"})]})]})})})}},2265:function(e,n,t){t.d(n,{z:function(){return S}});var i=t(5987),r=t(1413),a=t(9439),s=t(9867);var c=(0,t(631).k)({strict:!1,name:"ButtonGroupContext"}),o=(0,a.Z)(c,2),l=(o[0],o[1]),u=t(3689),d=t(9523),f=t(2834),h=["children","className"];function m(e){var n=e.children,t=e.className,a=(0,i.Z)(e,h),c=(0,s.isValidElement)(n)?(0,s.cloneElement)(n,{"aria-hidden":!0,focusable:!1}):n,o=(0,d.cx)("chakra-button__icon",t);return(0,f.jsx)(u.m.span,(0,r.Z)((0,r.Z)({display:"inline-flex",alignSelf:"center",flexShrink:0},a),{},{className:o,children:c}))}m.displayName="ButtonIcon";var p=t(4942),g=t(7877),x=["label","placement","spacing","children","className","__css"];function v(e){var n=e.label,t=e.placement,a=e.spacing,c=void 0===a?"0.5rem":a,o=e.children,l=void 0===o?(0,f.jsx)(g.$,{color:"currentColor",width:"1em",height:"1em"}):o,h=e.className,m=e.__css,v=(0,i.Z)(e,x),Z=(0,d.cx)("chakra-button__spinner",h),b="start"===t?"marginEnd":"marginStart",y=(0,s.useMemo)((function(){var e;return(0,r.Z)((e={display:"flex",alignItems:"center",position:n?"relative":"absolute"},(0,p.Z)(e,b,n?c:0),(0,p.Z)(e,"fontSize","1em"),(0,p.Z)(e,"lineHeight","normal"),e),m)}),[m,n,b,c]);return(0,f.jsx)(u.m.div,(0,r.Z)((0,r.Z)({className:Z},v),{},{__css:y,children:l}))}v.displayName="ButtonSpinner";var Z=t(154),b=t(9770),y=t(6833),j=t(9511),_=["isDisabled","isLoading","isActive","children","leftIcon","rightIcon","loadingText","iconSpacing","type","spinner","spinnerPlacement","className","as"],S=(0,b.G)((function(e,n){var t=l(),c=(0,y.mq)("Button",(0,r.Z)((0,r.Z)({},t),e)),o=(0,j.Lr)(e),h=o.isDisabled,m=void 0===h?null==t?void 0:t.isDisabled:h,p=o.isLoading,g=o.isActive,x=o.children,b=o.leftIcon,S=o.rightIcon,k=o.loadingText,w=o.iconSpacing,I=void 0===w?"0.5rem":w,C=o.type,q=o.spinner,T=o.spinnerPlacement,z=void 0===T?"start":T,E=o.className,B=o.as,L=(0,i.Z)(o,_),A=(0,s.useMemo)((function(){var e=(0,r.Z)((0,r.Z)({},null==c?void 0:c._focus),{},{zIndex:1});return(0,r.Z)((0,r.Z)({display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none"},c),!!t&&{_focus:e})}),[c,t]),G=function(e){var n=(0,s.useState)(!e),t=(0,a.Z)(n,2),i=t[0],r=t[1];return{ref:(0,s.useCallback)((function(e){e&&r("BUTTON"===e.tagName)}),[]),type:i?"button":void 0}}(B),P=G.ref,R=G.type,D={rightIcon:S,leftIcon:b,iconSpacing:I,children:x};return(0,f.jsxs)(u.m.button,(0,r.Z)((0,r.Z)({ref:(0,Z.qq)(n,P),as:B,type:null!=C?C:R,"data-active":(0,d.PB)(g),"data-loading":(0,d.PB)(p),__css:A,className:(0,d.cx)("chakra-button",E)},L),{},{disabled:m||p,children:[p&&"start"===z&&(0,f.jsx)(v,{className:"chakra-button__spinner--start",label:k,placement:"start",spacing:I,children:q}),p?k||(0,f.jsx)(u.m.span,{opacity:0,children:(0,f.jsx)(N,(0,r.Z)({},D))}):(0,f.jsx)(N,(0,r.Z)({},D)),p&&"end"===z&&(0,f.jsx)(v,{className:"chakra-button__spinner--end",label:k,placement:"end",spacing:I,children:q})]}))}));function N(e){var n=e.leftIcon,t=e.rightIcon,i=e.children,r=e.iconSpacing;return(0,f.jsxs)(f.Fragment,{children:[n&&(0,f.jsx)(m,{marginEnd:r,children:n}),i,t&&(0,f.jsx)(m,{marginStart:r,children:t})]})}S.displayName="Button"},7973:function(e,n,t){t.d(n,{xu:function(){return u}});var i=t(1413),r=t(5987),a=t(3689),s=t(9770),c=t(2834),o=["size","centerContent"],l=["size"],u=(0,a.m)("div");u.displayName="Box";var d=(0,s.G)((function(e,n){var t=e.size,a=e.centerContent,s=void 0===a||a,l=(0,r.Z)(e,o),d=s?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return(0,c.jsx)(u,(0,i.Z)({ref:n,boxSize:t,__css:(0,i.Z)((0,i.Z)({},d),{},{flexShrink:0,flexGrow:0})},l))}));d.displayName="Square",(0,s.G)((function(e,n){var t=e.size,a=(0,r.Z)(e,l);return(0,c.jsx)(d,(0,i.Z)({size:t,ref:n,borderRadius:"9999px"},a))})).displayName="Circle"},8910:function(e,n,t){t.d(n,{L:function(){return i}});var i=(0,t(3689).m)("div",{baseStyle:{flex:1,justifySelf:"stretch",alignSelf:"stretch"}});i.displayName="Spacer"},681:function(e,n,t){t.d(n,{X:function(){return f}});var i=t(1413),r=t(5987),a=t(9770),s=t(6833),c=t(9511),o=t(3689),l=t(9523),u=t(2834),d=["className"],f=(0,a.G)((function(e,n){var t=(0,s.mq)("Heading",e),a=(0,c.Lr)(e),f=(a.className,(0,r.Z)(a,d));return(0,u.jsx)(o.m.h2,(0,i.Z)((0,i.Z)({ref:n,className:(0,l.cx)("chakra-heading",e.className)},f),{},{__css:t}))}));f.displayName="Heading"},154:function(e,n,t){t.d(n,{lq:function(){return r},qq:function(){return a}});var i=t(9867);function r(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){!function(e,n){if(null!=e)if("function"!==typeof e)try{e.current=n}catch(t){throw new Error("Cannot assign value '".concat(n,"' to ref '").concat(e,"'"))}else e(n)}(n,e)}))}}function a(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,i.useMemo)((function(){return r.apply(void 0,n)}),n)}}}]);
//# sourceMappingURL=forgotPasswordRequest.9247a322.chunk.js.map