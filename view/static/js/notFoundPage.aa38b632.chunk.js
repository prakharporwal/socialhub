"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[710],{4301:function(n,e,r){r.r(e);r(9867);var a=r(5644),t=r(7973),i=r(8875),c=r(681),o=r(2265),s=r(1221),l=r(8381),u=r(3967),d=r(4670),f=r(2834),m=["/images/notfound_relaxation.svg","/images/notfound_page_travelling.svg","/images/notfound_writer.svg","/images/notfound_coffee.svg","/images/notfound_campfire.svg"];e.default=function(){var n=Math.round(4*Math.random()),e=(0,d.s0)();return(0,f.jsxs)(t.xu,{h:"100vh",display:"grid",placeItems:"center",children:[(0,f.jsxs)(t.xu,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:8,children:[(0,f.jsx)(i.E,{src:m[n],alt:"page not found",h:"20vh"}),(0,f.jsx)(c.X,{children:"Oops! page not found"}),(0,f.jsx)(o.z,{variant:"outline",leftIcon:(0,f.jsx)(u.bUI,{}),onClick:function(){return e(-1)},children:"Go Back"}),(0,f.jsx)(s.r,{as:a.rU,to:"/",color:"blue",children:"Head over to homepage"})]}),(0,f.jsxs)(l.x,{children:["If you think this is a mistake contact us at",(0,f.jsx)(l.x,{color:"blue",children:"prakharporwal99@gmail.com"})]})]})}},2265:function(n,e,r){r.d(e,{z:function(){return _}});var a=r(5987),t=r(1413),i=r(9439),c=r(9867);var o=(0,r(631).k)({strict:!1,name:"ButtonGroupContext"}),s=(0,i.Z)(o,2),l=(s[0],s[1]),u=r(3689),d=r(9523),f=r(2834),m=["children","className"];function g(n){var e=n.children,r=n.className,i=(0,a.Z)(n,m),o=(0,c.isValidElement)(e)?(0,c.cloneElement)(e,{"aria-hidden":!0,focusable:!1}):e,s=(0,d.cx)("chakra-button__icon",r);return(0,f.jsx)(u.m.span,(0,t.Z)((0,t.Z)({display:"inline-flex",alignSelf:"center",flexShrink:0},i),{},{className:s,children:o}))}g.displayName="ButtonIcon";var h=r(4942),v=r(7877),p=["label","placement","spacing","children","className","__css"];function x(n){var e=n.label,r=n.placement,i=n.spacing,o=void 0===i?"0.5rem":i,s=n.children,l=void 0===s?(0,f.jsx)(v.$,{color:"currentColor",width:"1em",height:"1em"}):s,m=n.className,g=n.__css,x=(0,a.Z)(n,p),Z=(0,d.cx)("chakra-button__spinner",m),b="start"===r?"marginEnd":"marginStart",y=(0,c.useMemo)((function(){var n;return(0,t.Z)((n={display:"flex",alignItems:"center",position:e?"relative":"absolute"},(0,h.Z)(n,b,e?o:0),(0,h.Z)(n,"fontSize","1em"),(0,h.Z)(n,"lineHeight","normal"),n),g)}),[g,e,b,o]);return(0,f.jsx)(u.m.div,(0,t.Z)((0,t.Z)({className:Z},x),{},{__css:y,children:l}))}x.displayName="ButtonSpinner";var Z=r(154),b=r(9770),y=r(6833),k=r(9511),N=["isDisabled","isLoading","isActive","children","leftIcon","rightIcon","loadingText","iconSpacing","type","spinner","spinnerPlacement","className","as"],_=(0,b.G)((function(n,e){var r=l(),o=(0,y.mq)("Button",(0,t.Z)((0,t.Z)({},r),n)),s=(0,k.Lr)(n),m=s.isDisabled,g=void 0===m?null==r?void 0:r.isDisabled:m,h=s.isLoading,v=s.isActive,p=s.children,b=s.leftIcon,_=s.rightIcon,S=s.loadingText,I=s.iconSpacing,w=void 0===I?"0.5rem":I,E=s.type,z=s.spinner,C=s.spinnerPlacement,G=void 0===C?"start":C,L=s.className,O=s.as,q=(0,a.Z)(s,N),B=(0,c.useMemo)((function(){var n=(0,t.Z)((0,t.Z)({},null==o?void 0:o._focus),{},{zIndex:1});return(0,t.Z)((0,t.Z)({display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none"},o),!!r&&{_focus:n})}),[o,r]),P=function(n){var e=(0,c.useState)(!n),r=(0,i.Z)(e,2),a=r[0],t=r[1];return{ref:(0,c.useCallback)((function(n){n&&t("BUTTON"===n.tagName)}),[]),type:a?"button":void 0}}(O),T=P.ref,A=P.type,F={rightIcon:_,leftIcon:b,iconSpacing:w,children:p};return(0,f.jsxs)(u.m.button,(0,t.Z)((0,t.Z)({ref:(0,Z.qq)(e,T),as:O,type:null!=E?E:A,"data-active":(0,d.PB)(v),"data-loading":(0,d.PB)(h),__css:B,className:(0,d.cx)("chakra-button",L)},q),{},{disabled:g||h,children:[h&&"start"===G&&(0,f.jsx)(x,{className:"chakra-button__spinner--start",label:S,placement:"start",spacing:w,children:z}),h?S||(0,f.jsx)(u.m.span,{opacity:0,children:(0,f.jsx)(j,(0,t.Z)({},F))}):(0,f.jsx)(j,(0,t.Z)({},F)),h&&"end"===G&&(0,f.jsx)(x,{className:"chakra-button__spinner--end",label:S,placement:"end",spacing:w,children:z})]}))}));function j(n){var e=n.leftIcon,r=n.rightIcon,a=n.children,t=n.iconSpacing;return(0,f.jsxs)(f.Fragment,{children:[e&&(0,f.jsx)(g,{marginEnd:t,children:e}),a,r&&(0,f.jsx)(g,{marginStart:t,children:r})]})}_.displayName="Button"},2295:function(n,e,r){r.d(e,{d:function(){return c},z:function(){return o}});var a=r(9439),t=r(4590),i=r(9867);function c(n){var e=n.loading,r=n.src,c=n.srcSet,o=n.onLoad,s=n.onError,l=n.crossOrigin,u=n.sizes,d=n.ignoreFallback,f=(0,i.useState)("pending"),m=(0,a.Z)(f,2),g=m[0],h=m[1];(0,i.useEffect)((function(){h(r?"loading":"pending")}),[r]);var v=(0,i.useRef)(),p=(0,i.useCallback)((function(){if(r){x();var n=new Image;n.src=r,l&&(n.crossOrigin=l),c&&(n.srcset=c),u&&(n.sizes=u),e&&(n.loading=e),n.onload=function(n){x(),h("loaded"),null==o||o(n)},n.onerror=function(n){x(),h("failed"),null==s||s(n)},v.current=n}}),[r,l,c,u,o,s,e]),x=function(){v.current&&(v.current.onload=null,v.current.onerror=null,v.current=null)};return(0,t.G)((function(){if(!d)return"loading"===g&&p(),function(){x()}}),[g,p,d]),d?"loaded":g}var o=function(n,e){return"loaded"!==n&&"beforeLoadOrError"===e||"failed"===n&&"onError"===e}},8875:function(n,e,r){r.d(e,{E:function(){return m}});var a=r(1413),t=r(5987),i=r(7762),c=r(9770),o=r(2834),s=["htmlWidth","htmlHeight","alt"],l=(0,c.G)((function(n,e){var r=n.htmlWidth,i=n.htmlHeight,c=n.alt,l=(0,t.Z)(n,s);return(0,o.jsx)("img",(0,a.Z)({width:r,height:i,ref:e,alt:c},l))}));l.displayName="NativeImage";var u=r(2295),d=r(3689),f=["fallbackSrc","fallback","src","srcSet","align","fit","loading","ignoreFallback","crossOrigin","fallbackStrategy","referrerPolicy"];var m=(0,c.G)((function(n,e){var r=n.fallbackSrc,c=n.fallback,s=n.src,m=n.srcSet,g=n.align,h=n.fit,v=n.loading,p=n.ignoreFallback,x=n.crossOrigin,Z=n.fallbackStrategy,b=void 0===Z?"beforeLoadOrError":Z,y=n.referrerPolicy,k=(0,t.Z)(n,f),N=null!=v||p||!(void 0!==r||void 0!==c),_=(0,u.d)((0,a.Z)((0,a.Z)({},n),{},{crossOrigin:x,ignoreFallback:N})),j=(0,u.z)(_,b),S=(0,a.Z)({ref:e,objectFit:h,objectPosition:g},N?k:function(n){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=Object.assign({},n),t=(0,i.Z)(r);try{for(t.s();!(e=t.n()).done;){var c=e.value;c in a&&delete a[c]}}catch(o){t.e(o)}finally{t.f()}return a}(k,["onError","onLoad"]));return j?c||(0,o.jsx)(d.m.img,(0,a.Z)({as:l,className:"chakra-image__placeholder",src:r},S)):(0,o.jsx)(d.m.img,(0,a.Z)({as:l,src:s,srcSet:m,crossOrigin:x,loading:v,referrerPolicy:y,className:"chakra-image"},S))}));m.displayName="Image"},7973:function(n,e,r){r.d(e,{xu:function(){return u}});var a=r(1413),t=r(5987),i=r(3689),c=r(9770),o=r(2834),s=["size","centerContent"],l=["size"],u=(0,i.m)("div");u.displayName="Box";var d=(0,c.G)((function(n,e){var r=n.size,i=n.centerContent,c=void 0===i||i,l=(0,t.Z)(n,s),d=c?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return(0,o.jsx)(u,(0,a.Z)({ref:e,boxSize:r,__css:(0,a.Z)((0,a.Z)({},d),{},{flexShrink:0,flexGrow:0})},l))}));d.displayName="Square",(0,c.G)((function(n,e){var r=n.size,i=(0,t.Z)(n,l);return(0,o.jsx)(d,(0,a.Z)({size:r,ref:e,borderRadius:"9999px"},i))})).displayName="Circle"},681:function(n,e,r){r.d(e,{X:function(){return f}});var a=r(1413),t=r(5987),i=r(9770),c=r(6833),o=r(9511),s=r(3689),l=r(9523),u=r(2834),d=["className"],f=(0,i.G)((function(n,e){var r=(0,c.mq)("Heading",n),i=(0,o.Lr)(n),f=(i.className,(0,t.Z)(i,d));return(0,u.jsx)(s.m.h2,(0,a.Z)((0,a.Z)({ref:e,className:(0,l.cx)("chakra-heading",n.className)},f),{},{__css:r}))}));f.displayName="Heading"},8381:function(n,e,r){r.d(e,{x:function(){return m}});var a=r(1413),t=r(5987),i=r(9770),c=r(6833),o=r(9511),s=r(3689),l=r(9523),u=r(4518),d=r(2834),f=["className","align","decoration","casing"],m=(0,i.G)((function(n,e){var r=(0,c.mq)("Text",n),i=(0,o.Lr)(n),m=(i.className,i.align,i.decoration,i.casing,(0,t.Z)(i,f)),g=(0,u.o)({textAlign:n.align,textDecoration:n.decoration,textTransform:n.casing});return(0,d.jsx)(s.m.p,(0,a.Z)((0,a.Z)((0,a.Z)({ref:e,className:(0,l.cx)("chakra-text",n.className)},g),m),{},{__css:r}))}));m.displayName="Text"},1221:function(n,e,r){r.d(e,{r:function(){return f}});var a=r(1413),t=r(5987),i=r(9770),c=r(6833),o=r(9511),s=r(3689),l=r(9523),u=r(2834),d=["className","isExternal"],f=(0,i.G)((function(n,e){var r=(0,c.mq)("Link",n),i=(0,o.Lr)(n),f=i.className,m=i.isExternal,g=(0,t.Z)(i,d);return(0,u.jsx)(s.m.a,(0,a.Z)((0,a.Z)({target:m?"_blank":void 0,rel:m?"noopener":void 0,ref:e,className:(0,l.cx)("chakra-link",f)},g),{},{__css:r}))}));f.displayName="Link"},4518:function(n,e,r){function a(n){var e=Object.assign({},n);for(var r in e)void 0===e[r]&&delete e[r];return e}r.d(e,{o:function(){return a}})},154:function(n,e,r){r.d(e,{lq:function(){return t},qq:function(){return i}});var a=r(9867);function t(){for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return function(n){e.forEach((function(e){!function(n,e){if(null!=n)if("function"!==typeof n)try{n.current=e}catch(r){throw new Error("Cannot assign value '".concat(e,"' to ref '").concat(n,"'"))}else n(e)}(e,n)}))}}function i(){for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return(0,a.useMemo)((function(){return t.apply(void 0,e)}),e)}}}]);
//# sourceMappingURL=notFoundPage.aa38b632.chunk.js.map