"use strict";(self.webpackChunkreact_view=self.webpackChunkreact_view||[]).push([[160],{6699:function(e,n,t){t.d(n,{Z:function(){return i}});var i={api_server_url:"https://api.sociohub.live"}},6239:function(e,n,t){t.r(n),t.d(n,{default:function(){return Ze}});var i=t(4165),a=t(5861),r=t(9439),o=t(9867),s=t(7200),l=t(7973),c=t(7254),u=t(7194),d=t(8216),h=t(3145),p=t(9274),f=t(1413),m=t(5987),v=t(9770),g=t(3689),b=t(4518),x=t(6928),Z=t(2834),y=["area","colSpan","colStart","colEnd","rowEnd","rowSpan","rowStart"];function k(e){return(0,x.XQ)(e,(function(e){return"auto"===e?"auto":"span ".concat(e,"/span ").concat(e)}))}var j=(0,v.G)((function(e,n){var t=e.area,i=e.colSpan,a=e.colStart,r=e.colEnd,o=e.rowEnd,s=e.rowSpan,l=e.rowStart,c=(0,m.Z)(e,y),u=(0,b.o)({gridArea:t,gridColumn:k(i),gridRow:k(s),gridColumnStart:a,gridColumnEnd:r,gridRowStart:l,gridRowEnd:o});return(0,Z.jsx)(g.m.div,(0,f.Z)({ref:n,__css:u},c))}));j.displayName="GridItem";var w=t(5721),S=t(9523),C=["children","placeholder","className"],_=(0,v.G)((function(e,n){var t=e.children,i=e.placeholder,a=e.className,r=(0,m.Z)(e,C);return(0,Z.jsxs)(g.m.select,(0,f.Z)((0,f.Z)({},r),{},{ref:n,className:(0,S.cx)("chakra-select",a),children:[i&&(0,Z.jsx)("option",{value:"",children:i}),t]}))}));_.displayName="SelectField";var P=t(5912),N=t(6833),R=t(9511),D=["rootProps","placeholder","icon","color","height","h","minH","minHeight","iconColor","iconSize"],I=["children"];var F=(0,v.G)((function(e,n){var t,i=(0,N.jC)("Select",e),a=(0,R.Lr)(e),o=a.rootProps,s=a.placeholder,l=a.icon,c=a.color,u=a.height,d=a.h,h=a.minH,p=a.minHeight,v=a.iconColor,b=a.iconSize,x=function(e,n){for(var t={},i={},a=0,o=Object.entries(e);a<o.length;a++){var s=(0,r.Z)(o[a],2),l=s[0],c=s[1];n.includes(l)?t[l]=c:i[l]=c}return[t,i]}((0,m.Z)(a,D),R.oE),y=(0,r.Z)(x,2),k=y[0],j=y[1],w=(0,P.Y)(j),C={width:"100%",height:"fit-content",position:"relative",color:c},I=(0,f.Z)((0,f.Z)({paddingEnd:"2rem"},i.field),{},{_focus:(0,f.Z)({zIndex:"unset"},null==(t=i.field)?void 0:t._focus)});return(0,Z.jsxs)(g.m.div,(0,f.Z)((0,f.Z)((0,f.Z)({className:"chakra-select__wrapper",__css:C},k),o),{},{children:[(0,Z.jsx)(_,(0,f.Z)((0,f.Z)({ref:n,height:null!=d?d:u,minH:null!=h?h:p,placeholder:s},w),{},{__css:I,children:e.children})),(0,Z.jsx)(E,(0,f.Z)((0,f.Z)((0,f.Z)({"data-disabled":(0,S.PB)(w.disabled)},(v||c)&&{color:v||c}),{},{__css:i.icon},b&&{fontSize:b}),{},{children:l}))]}))}));F.displayName="Select";var T=function(e){return(0,Z.jsx)("svg",(0,f.Z)((0,f.Z)({viewBox:"0 0 24 24"},e),{},{children:(0,Z.jsx)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})}))},B=(0,g.m)("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),E=function(e){var n=e.children,t=void 0===n?(0,Z.jsx)(T,{}):n,i=(0,m.Z)(e,I),a=(0,o.cloneElement)(t,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return(0,Z.jsx)(B,(0,f.Z)((0,f.Z)({},i),{},{className:"chakra-select__icon-wrapper",children:(0,o.isValidElement)(t)?a:null}))};E.displayName="SelectIcon";var O=t(1429),G=t(4942),L=t(154),M=["onChange","value","defaultValue","name","isDisabled","isFocusable","isNative"];function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.onChange,t=e.value,i=e.defaultValue,a=e.name,s=e.isDisabled,l=e.isFocusable,c=e.isNative,u=(0,m.Z)(e,M),d=(0,o.useState)(i||""),h=(0,r.Z)(d,2),p=h[0],v=h[1],g="undefined"!==typeof t,b=g?t:p,x=(0,o.useRef)(null),Z=(0,o.useCallback)((function(){var e=x.current;if(e){var n="input:not(:disabled):checked",t=e.querySelector(n);if(t)t.focus();else{n="input:not(:disabled)";var i=e.querySelector(n);null==i||i.focus()}}}),[]),y=(0,o.useId)(),k="radio-".concat(y),j=a||k,w=(0,o.useCallback)((function(e){var t=function(e){return e&&(0,S.Kn)(e)&&(0,S.Kn)(e.target)}(e)?e.target.value:e;g||v(t),null==n||n(String(t))}),[n,g]),C=(0,o.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,f.Z)((0,f.Z)({},e),{},{ref:(0,L.lq)(n,x),role:"radiogroup"})}),[]),_=(0,o.useCallback)((function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=c?"checked":"isChecked";return(0,f.Z)((0,f.Z)({},n),{},(e={ref:t,name:j},(0,G.Z)(e,i,null!=b?n.value===b:void 0),(0,G.Z)(e,"onChange",(function(e){w(e)})),(0,G.Z)(e,"data-radiogroup",!0),e))}),[c,j,w,b]);return{getRootProps:C,getRadioProps:_,name:j,ref:x,focus:Z,setValue:v,value:b,onChange:w,isDisabled:s,isFocusable:l,htmlProps:u}}var z=t(631),q=["colorScheme","size","variant","children","className","isDisabled","isFocusable"],H=(0,z.k)({name:"RadioGroupContext",strict:!1}),J=(0,r.Z)(H,2),K=J[0],U=J[1],Q=(0,v.G)((function(e,n){var t=e.colorScheme,i=e.size,a=e.variant,r=e.children,s=e.className,l=e.isDisabled,c=e.isFocusable,u=A((0,m.Z)(e,q)),d=u.value,h=u.onChange,p=u.getRootProps,v=u.name,b=u.htmlProps,x=(0,o.useMemo)((function(){return{name:v,size:i,onChange:h,colorScheme:t,value:d,variant:a,isDisabled:l,isFocusable:c}}),[v,i,h,t,d,a,l,c]);return(0,Z.jsx)(K,{value:x,children:(0,Z.jsx)(g.m.div,(0,f.Z)((0,f.Z)({},p(b,n)),{},{className:(0,S.cx)("chakra-radio-group",s),children:r}))})}));Q.displayName="RadioGroup";var W=t(3367),Y=["defaultChecked","isChecked","isFocusable","isDisabled","isReadOnly","isRequired","onChange","isInvalid","name","value","id","data-radiogroup","aria-describedby"],X={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"};function V(e){e.preventDefault(),e.stopPropagation()}var $=["spacing","children","isDisabled","isFocusable","inputProps"];var ee=(0,v.G)((function(e,n){var t,i=U(),a=e.onChange,s=e.value,l=(0,N.jC)("Radio",(0,f.Z)((0,f.Z)({},i),e)),c=(0,R.Lr)(e),u=c.spacing,d=void 0===u?"0.5rem":u,h=c.children,v=c.isDisabled,b=void 0===v?null==i?void 0:i.isDisabled:v,x=c.isFocusable,y=void 0===x?null==i?void 0:i.isFocusable:x,k=c.inputProps,j=(0,m.Z)(c,$),w=e.isChecked;null!=(null==i?void 0:i.value)&&null!=s&&(w=i.value===s);var C=a;(null==i?void 0:i.onChange)&&null!=s&&(C=(0,S.PP)(i.onChange,a));var _=null!=(t=null==e?void 0:e.name)?t:null==i?void 0:i.name,P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.defaultChecked,t=e.isChecked,i=e.isFocusable,a=e.isDisabled,s=e.isReadOnly,l=e.isRequired,c=e.onChange,u=e.isInvalid,d=e.name,h=e.value,v=e.id,g=e["data-radiogroup"],b=e["aria-describedby"],x=(0,m.Z)(e,Y),Z="radio-".concat((0,o.useId)()),y=(0,p.NJ)(),k=U(),j=!y||k||g?Z:y.id;j=null!=v?v:j;var w=null!=a?a:null==y?void 0:y.isDisabled,C=null!=s?s:null==y?void 0:y.isReadOnly,_=null!=l?l:null==y?void 0:y.isRequired,P=null!=u?u:null==y?void 0:y.isInvalid,N=(0,o.useState)(!1),R=(0,r.Z)(N,2),D=R[0],I=R[1],F=(0,o.useState)(!1),T=(0,r.Z)(F,2),B=T[0],E=T[1],O=(0,o.useState)(!1),G=(0,r.Z)(O,2),L=G[0],M=G[1],A=(0,o.useState)(!1),z=(0,r.Z)(A,2),q=z[0],H=z[1],J=(0,o.useState)(Boolean(n)),K=(0,r.Z)(J,2),Q=K[0],$=K[1],ee="undefined"!==typeof t,ne=ee?t:Q;(0,o.useEffect)((function(){return(0,W.BT)(I)}),[]);var te=(0,o.useCallback)((function(e){C||w?e.preventDefault():(ee||$(e.target.checked),null==c||c(e))}),[ee,w,C,c]),ie=(0,o.useCallback)((function(e){" "===e.key&&H(!0)}),[H]),ae=(0,o.useCallback)((function(e){" "===e.key&&H(!1)}),[H]),re=(0,o.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,f.Z)((0,f.Z)({},e),{},{ref:n,"data-active":(0,S.PB)(q),"data-hover":(0,S.PB)(L),"data-disabled":(0,S.PB)(w),"data-invalid":(0,S.PB)(P),"data-checked":(0,S.PB)(ne),"data-focus":(0,S.PB)(B),"data-focus-visible":(0,S.PB)(B&&D),"data-readonly":(0,S.PB)(C),"aria-hidden":!0,onMouseDown:(0,S.v0)(e.onMouseDown,(function(){return H(!0)})),onMouseUp:(0,S.v0)(e.onMouseUp,(function(){return H(!1)})),onMouseEnter:(0,S.v0)(e.onMouseEnter,(function(){return M(!0)})),onMouseLeave:(0,S.v0)(e.onMouseLeave,(function(){return M(!1)}))})}),[q,L,w,P,ne,B,C,D]),oe=null!=y?y:{},se=oe.onFocus,le=oe.onBlur,ce=(0,o.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=w&&!i;return(0,f.Z)((0,f.Z)({},e),{},{id:j,ref:n,type:"radio",name:d,value:h,onChange:(0,S.v0)(e.onChange,te),onBlur:(0,S.v0)(le,e.onBlur,(function(){return E(!1)})),onFocus:(0,S.v0)(se,e.onFocus,(function(){return E(!0)})),onKeyDown:(0,S.v0)(e.onKeyDown,ie),onKeyUp:(0,S.v0)(e.onKeyUp,ae),checked:ne,disabled:t,readOnly:C,required:_,"aria-invalid":(0,S.Qm)(P),"aria-disabled":(0,S.Qm)(t),"aria-required":(0,S.Qm)(_),"data-readonly":(0,S.PB)(C),"aria-describedby":b,style:X})}),[w,i,j,d,h,te,le,se,ie,ae,ne,C,_,P,b]);return{state:{isInvalid:P,isFocused:B,isChecked:ne,isActive:q,isHovered:L,isDisabled:w,isReadOnly:C,isRequired:_},getCheckboxProps:re,getRadioProps:re,getInputProps:ce,getLabelProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,f.Z)((0,f.Z)({},e),{},{ref:n,onMouseDown:(0,S.v0)(e.onMouseDown,V),"data-disabled":(0,S.PB)(w),"data-checked":(0,S.PB)(ne),"data-invalid":(0,S.PB)(P)})},getRootProps:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,f.Z)((0,f.Z)({},e),{},{ref:n,"data-disabled":(0,S.PB)(w),"data-checked":(0,S.PB)(ne),"data-invalid":(0,S.PB)(P)})},htmlProps:x}}((0,f.Z)((0,f.Z)({},j),{},{isChecked:w,isFocusable:y,isDisabled:b,onChange:C,name:_})),D=P.getInputProps,I=P.getCheckboxProps,F=P.getLabelProps,T=P.getRootProps,B=function(e,n){for(var t={},i={},a=0,o=Object.entries(e);a<o.length;a++){var s=(0,r.Z)(o[a],2),l=s[0],c=s[1];n.includes(l)?t[l]=c:i[l]=c}return[t,i]}(P.htmlProps,R.oE),E=(0,r.Z)(B,2),O=E[0],G=I(E[1]),L=D(k,n),M=F(),A=Object.assign({},O,T()),z=(0,f.Z)({display:"inline-flex",alignItems:"center",verticalAlign:"top",cursor:"pointer",position:"relative"},l.container),q=(0,f.Z)({display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},l.control),H=(0,f.Z)({userSelect:"none",marginStart:d},l.label);return(0,Z.jsxs)(g.m.label,(0,f.Z)((0,f.Z)({className:"chakra-radio"},A),{},{__css:z,children:[(0,Z.jsx)("input",(0,f.Z)({className:"chakra-radio__input"},L)),(0,Z.jsx)(g.m.span,(0,f.Z)((0,f.Z)({className:"chakra-radio__control"},G),{},{__css:q})),h&&(0,Z.jsx)(g.m.span,(0,f.Z)((0,f.Z)({className:"chakra-radio__label"},M),{},{__css:H,children:h}))]}))}));ee.displayName="Radio";var ne=t(7762),te=["className","rows"];var ie=["h","minH","height","minHeight"],ae=(0,v.G)((function(e,n){var t=(0,N.mq)("Textarea",e),i=(0,R.Lr)(e),a=i.className,r=i.rows,o=(0,m.Z)(i,te),s=(0,P.Y)(o),l=r?function(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=Object.assign({},e),a=(0,ne.Z)(t);try{for(a.s();!(n=a.n()).done;){var r=n.value;r in i&&delete i[r]}}catch(o){a.e(o)}finally{a.f()}return i}(t,ie):t;return(0,Z.jsx)(g.m.textarea,(0,f.Z)((0,f.Z)({ref:n,rows:r},s),{},{className:(0,S.cx)("chakra-textarea",a),__css:l}))}));ae.displayName="Textarea";var re=t(9868),oe=["spacing","children"],se=(0,v.G)((function(e,n){var t=(0,N.jC)("Switch",e),i=(0,R.Lr)(e),a=i.spacing,r=void 0===a?"0.5rem":a,s=i.children,l=(0,m.Z)(i,oe),c=(0,re.O)(l),u=c.state,d=c.getInputProps,h=c.getCheckboxProps,p=c.getRootProps,v=c.getLabelProps,b=(0,o.useMemo)((function(){return(0,f.Z)({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0},t.container)}),[t.container]),x=(0,o.useMemo)((function(){return(0,f.Z)({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer"},t.track)}),[t.track]),y=(0,o.useMemo)((function(){return(0,f.Z)({userSelect:"none",marginStart:r},t.label)}),[r,t.label]);return(0,Z.jsxs)(g.m.label,(0,f.Z)((0,f.Z)({},p()),{},{className:(0,S.cx)("chakra-switch",e.className),__css:b,children:[(0,Z.jsx)("input",(0,f.Z)({className:"chakra-switch__input"},d({},n))),(0,Z.jsx)(g.m.span,(0,f.Z)((0,f.Z)({},h()),{},{className:"chakra-switch__track",__css:x,children:(0,Z.jsx)(g.m.span,{__css:t.thumb,className:"chakra-switch__thumb","data-checked":(0,S.PB)(u.isChecked),"data-hover":(0,S.PB)(u.isHovered)})})),s&&(0,Z.jsx)(g.m.span,(0,f.Z)((0,f.Z)({className:"chakra-switch__label"},v()),{},{__css:y,children:s}))]}))}));se.displayName="Switch";var le=t(8910),ce=t(2265),ue=t(4825),de=t(8381),he=t(4997),pe=t(1821),fe=t(5680),me=t(6443),ve=t(6699),ge=t(3967);function be(e){return new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString()}var xe=(0,me.Z)((function(){var e=(0,s.p)(),n=(0,fe.a)(),t=(0,o.useState)("text"),f=(0,r.Z)(t,2),m=f[0],v=f[1],g=(0,o.useState)(""),b=(0,r.Z)(g,2),x=b[0],y=b[1],k=(0,o.useState)(!1),S=(0,r.Z)(k,2),C=S[0],_=S[1],P=(0,o.useState)(!1),N=(0,r.Z)(P,2),R=N[0],D=N[1],I=(0,o.useState)(!1),T=(0,r.Z)(I,2),B=T[0],E=T[1],G=(0,o.useState)(!1),L=(0,r.Z)(G,2),M=L[0],A=L[1],z=(0,o.useState)(be(new Date)),q=(0,r.Z)(z,2),H=q[0],J=q[1],K=(0,o.useState)(!0),U=(0,r.Z)(K,2),W=U[0],Y=U[1],X=(0,o.useState)([{value:"monday",id:1},{value:"tuesday",id:2}]),V=(0,r.Z)(X,2),$=V[0],ne=(V[1],function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(_(!0),""!==x&&""!==m){t.next=5;break}return _(!1),e.isActive("post-submit-error")||e({id:"post-submit-error",status:"error",title:"Form Empty",description:"Content and type cannot be empty"}),t.abrupt("return");case 5:if(!B){t.next=8;break}return t.next=8,fetch(ve.Z.api_server_url+"/api/p/linkedin/post",{headers:{"access-token":n.accessToken||""},method:"POST",body:JSON.stringify({content_type:m,text:x,data:{author:"",commentary:x,visibility:"PUBLIC",distribution:{feedDistribution:"MAIN_FEED",targetEntities:[],thirdPartyDistributionChannels:[]},lifecycleState:"PUBLISHED",isReshareDisabledByAuthor:!1}})}).then(function(){var e=(0,a.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.ok&&201!==n.status){e.next=2;break}return e.abrupt("return",n.json());case 2:return t={},e.next=5,n.json().then((function(e){t=e}));case 5:throw new Error(JSON.stringify(t));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).then((function(n){e.isActive("post-submit-api-success")||e({id:"post-submit-api-success",status:"success",title:"Submitted Post to Linkedin",description:"Posting now depends on linkedin"})})).catch((function(n){console.log("error",JSON.parse(null===n||void 0===n?void 0:n.message).error),e.isActive("post-submit-api-error")||e({id:"post-submit-api-error",status:"error",title:"Posting Failed for Linkedin",description:JSON.parse(null===n||void 0===n?void 0:n.message).error})})).finally((function(){console.log(x,m),_(!1)}));case 8:if(!R){t.next=13;break}return t.next=11,fetch(ve.Z.api_server_url+"/api/p/twitter/tweets/create",{headers:{"access-token":n.accessToken||""},method:"POST",body:JSON.stringify({text:x})}).then(function(){var e=(0,a.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.json(),!n.ok&&201!==n.status){e.next=3;break}return e.abrupt("return",t);case 3:throw new Error(JSON.stringify({body:t}));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).then((function(n){e.isActive("post-submit-api-success")||e({id:"twitter-submit-api-success",status:"success",title:"Submitted Post to Twitter",description:"Posting now depends on twitter"})})).catch((function(n){console.log("error",JSON.parse(null===n||void 0===n?void 0:n.message).error),e.isActive("post-submit-api-error")||e({id:"twitter-submit-api-error",status:"error",title:"Posting Failed For Twitter!",description:JSON.parse(null===n||void 0===n?void 0:n.message).error})})).finally((function(){console.log(x,m),_(!1)}));case 11:t.next=14;break;case 13:_(!1);case 14:return t.abrupt("return");case 15:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}());return(0,Z.jsx)(l.xu,{children:(0,Z.jsx)(c.k,{minH:"80vh",align:"center",justify:"center",direction:"column",children:(0,Z.jsx)(u.K,{spacing:4,mx:"auto",width:"full",py:4,px:4,children:(0,Z.jsx)(l.xu,{borderWidth:"2px",rounded:"lg",shadow:"2px 2px 3px rgba(0,0,0,0.3)",minWidth:{base:"full",sm:"96"},bg:(0,d.ff)("white","gray.700"),p:8,m:"10px auto",as:"form",children:(0,Z.jsx)(h.M,{columns:1,spacing:6,children:(0,Z.jsxs)("form",{children:[(0,Z.jsxs)(p.NI,{as:j,colSpan:[3,2],isRequired:!0,children:[(0,Z.jsx)(w.l,{fontSize:"sm",fontWeight:"md",color:"gray.700",_dark:{color:"gray.50"},children:"Post Type"}),(0,Z.jsxs)(F,{placeholder:"Select post type",value:m,variant:"outline",w:"auto",onChange:function(e){v(e.currentTarget.value)},children:[(0,Z.jsx)("option",{value:"image",disabled:!0,"aria-disabled":!0,children:"Image"}),(0,Z.jsx)("option",{value:"poll",disabled:!0,"aria-disabled":!0,children:"Create a Poll"}),(0,Z.jsx)("option",{value:"text",children:"Text"})]})]}),"poll"===m?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(p.NI,{mt:2,as:j,colSpan:[3,2],isRequired:!0,children:[(0,Z.jsx)(w.l,{fontSize:"sm",fontWeight:"md",color:"gray.700",_dark:{color:"white"},children:"Question"}),(0,Z.jsx)(O.I,{p:2,placeholder:"Hey guys I just started using Socialhub",shadow:"sm",focusBorderColor:"brand.400",fontSize:{sm:"sm"},value:x,onChange:function(e){y(e.currentTarget.value)}})]}),(0,Z.jsxs)(p.NI,{mt:2,as:j,colSpan:[3,2],children:[(0,Z.jsx)(Q,{value:"1",onChange:function(){},children:(0,Z.jsx)(u.K,{direction:"column",children:$.map((function(e){return(0,Z.jsx)(ee,{value:e.value,textTransform:"capitalize",children:e.value},e.id)}))})}),(0,Z.jsx)(p.Q6,{children:"Brief description for your profile. URLs are hyperlinked."})]})]}):(0,Z.jsxs)(p.NI,{mt:2,as:j,colSpan:[3,2],isRequired:!0,children:[(0,Z.jsx)(ae,{p:2,placeholder:"Hey guys I just started using Socialhub",rows:10,shadow:"sm",focusBorderColor:"brand.400",fontSize:{sm:"sm"},value:x,onChange:function(e){y(e.currentTarget.value)}}),(0,Z.jsx)(p.Q6,{children:" "})]}),(0,Z.jsxs)(p.NI,{as:h.M,columns:{base:2,lg:4},children:[(0,Z.jsx)(w.l,{htmlFor:"isChecked",children:"Twitter"}),(0,Z.jsx)(se,{id:"isChecked",marginRight:"auto",onChange:function(e){console.log(e.currentTarget.checked),D(e.currentTarget.checked)}}),(0,Z.jsx)(w.l,{htmlFor:"isDisabled",children:"Linkedin"}),(0,Z.jsx)(se,{id:"isDisabled",marginRight:"auto",onChange:function(e){console.log(e.currentTarget.checked),E(e.currentTarget.checked)}}),(0,Z.jsx)(w.l,{htmlFor:"isFocusable",children:"Instagram"}),(0,Z.jsx)(se,{id:"isFocusable",marginRight:"auto",isDisabled:!0}),(0,Z.jsx)(w.l,{htmlFor:"isInvalid",children:"Facebook"}),(0,Z.jsx)(se,{id:"isInvalid",marginRight:"auto",isDisabled:!0})]}),(0,Z.jsx)(p.NI,{children:(0,Z.jsxs)(u.K,{spacing:8,children:[(0,Z.jsx)(le.L,{}),W?(0,Z.jsxs)(c.k,{dir:"row",gap:4,children:[(0,Z.jsx)(ce.z,{color:"white",_hover:{bg:"blue.600"},colorScheme:"linkedin",w:"full",maxW:"md",leftIcon:(0,Z.jsx)(pe.pP6,{}),isLoading:C,onClick:ne,children:(0,Z.jsx)(ue.M,{children:(0,Z.jsx)(de.x,{children:"Post on Socials"})})}),(0,Z.jsx)(he.h,{icon:(0,Z.jsx)(ge.qyc,{}),"aria-label":"schedule post",onClick:function(){Y(!W)}})]}):(0,Z.jsxs)(u.K,{spacing:8,children:[(0,Z.jsxs)(c.k,{dir:"row",gap:4,children:[(0,Z.jsx)(ce.z,{_hover:{bg:"blue.600",color:"white"},colorScheme:"linkedin",variant:"outline",w:"full",maxW:"md",leftIcon:(0,Z.jsx)(ge.qyc,{}),isLoading:M,onClick:function(){var t=new Date(H),i=new Date(t.getTime()+6e4*t.getTimezoneOffset()).toISOString();console.log(i),""!==x?(A(!0),fetch(ve.Z.api_server_url+"/api/p/linkedin/schedule/post",{method:"POST",headers:{"access-token":n.accessToken||""},body:JSON.stringify({post_type:m,post_json:{author:"",commentary:x,visibility:"PUBLIC",distribution:{feedDistribution:"MAIN_FEED",targetEntities:[],thirdPartyDistributionChannels:[]},lifecycleState:"PUBLISHED",isReshareDisabledByAuthor:!1},scheduled_at:i})}).then((function(e){if(e.ok)return e.json();throw new Error("Error scheduling post!")})).then((function(n){console.log(n),e({status:"success",title:"Submitted post for scheduling",duration:5e3})})).catch((function(){})).finally((function(){A(!1)}))):e.isActive("post-empty")||e({id:"post-empty",status:"error",title:"Post content is empty!"})},children:(0,Z.jsx)(ue.M,{children:(0,Z.jsx)(de.x,{children:"Schedule Post"})})}),(0,Z.jsx)(he.h,{icon:(0,Z.jsx)(ge.qyc,{}),"aria-label":"schedule post",onClick:function(){Y(!W)}})]}),(0,Z.jsx)(O.I,{type:"datetime-local",value:H.substring(0,16),onChange:function(e){console.log(new Date(e.currentTarget.value));var n=be(new Date(e.currentTarget.value));J(n)}})]})]})})]})})})})})})})),Ze=xe},6443:function(e,n,t){var i=t(1413),a=(t(9867),t(4670)),r=t(5680),o=t(7973),s=t(2834);n.Z=function(e){return function(n){var t=(0,r.a)();return(0,s.jsx)(o.xu,{h:"calc(100vh - 4rem)",overflowY:"auto",children:t.isAuthenticated?(0,s.jsx)(e,(0,i.Z)({},n)):(0,s.jsx)(a.Fg,{to:"/signin",replace:!0})})}}},5680:function(e,n,t){t.d(n,{a:function(){return r}});var i=t(9439),a=t(9867);function r(){var e=(0,a.useMemo)((function(){return function(e){var n=e.length+1;return document.cookie.split(";").map((function(e){return e.trim()})).filter((function(t){return t.substring(0,n)==="".concat(e,"=")})).map((function(e){return decodeURIComponent(e.substring(n))}))[0]||null}("access_token")}),[]),n=(0,a.useState)(null!=e&&void 0!==e&&""!==e),t=(0,i.Z)(n,2),r=t[0];t[1];return{isAuthenticated:r,accessToken:e}}},4997:function(e,n,t){t.d(n,{h:function(){return u}});var i=t(1413),a=t(5987),r=t(2265),o=t(9770),s=t(9867),l=t(2834),c=["icon","children","isRound","aria-label"],u=(0,o.G)((function(e,n){var t=e.icon,o=e.children,u=e.isRound,d=e["aria-label"],h=(0,a.Z)(e,c),p=t||o,f=(0,s.isValidElement)(p)?(0,s.cloneElement)(p,{"aria-hidden":!0,focusable:!1}):null;return(0,l.jsx)(r.z,(0,i.Z)((0,i.Z)({padding:"0",borderRadius:u?"full":void 0,ref:n,"aria-label":d},h),{},{children:f}))}));u.displayName="IconButton"},4825:function(e,n,t){t.d(n,{M:function(){return c}});var i=t(1413),a=t(5987),r=t(3689),o=t(9770),s=t(2834),l=["axis"],c=(0,r.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});c.displayName="Center";var u={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}};(0,o.G)((function(e,n){var t=e.axis,o=void 0===t?"both":t,c=(0,a.Z)(e,l);return(0,s.jsx)(r.m.div,(0,i.Z)((0,i.Z)({ref:n,__css:u[o]},c),{},{position:"absolute"}))}))},8910:function(e,n,t){t.d(n,{L:function(){return i}});var i=(0,t(3689).m)("div",{baseStyle:{flex:1,justifySelf:"stretch",alignSelf:"stretch"}});i.displayName="Spacer"},8381:function(e,n,t){t.d(n,{x:function(){return p}});var i=t(1413),a=t(5987),r=t(9770),o=t(6833),s=t(9511),l=t(3689),c=t(9523),u=t(4518),d=t(2834),h=["className","align","decoration","casing"],p=(0,r.G)((function(e,n){var t=(0,o.mq)("Text",e),r=(0,s.Lr)(e),p=(r.className,r.align,r.decoration,r.casing,(0,a.Z)(r,h)),f=(0,u.o)({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,d.jsx)(l.m.p,(0,i.Z)((0,i.Z)((0,i.Z)({ref:n,className:(0,c.cx)("chakra-text",e.className)},f),p),{},{__css:t}))}));p.displayName="Text"},3145:function(e,n,t){t.d(n,{M:function(){return f}});var i=t(1413),a=t(5987),r=t(9770),o=t(3689),s=t(2834),l=["templateAreas","gap","rowGap","columnGap","column","row","autoFlow","autoRows","templateRows","autoColumns","templateColumns"],c=(0,r.G)((function(e,n){var t=e.templateAreas,r=e.gap,c=e.rowGap,u=e.columnGap,d=e.column,h=e.row,p=e.autoFlow,f=e.autoRows,m=e.templateRows,v=e.autoColumns,g=e.templateColumns,b=(0,a.Z)(e,l),x={display:"grid",gridTemplateAreas:t,gridGap:r,gridRowGap:c,gridColumnGap:u,gridAutoColumns:v,gridColumn:d,gridRow:h,gridAutoFlow:p,gridAutoRows:f,gridTemplateRows:m,gridTemplateColumns:g};return(0,s.jsx)(o.m.div,(0,i.Z)({ref:n,__css:x},b))}));c.displayName="Grid";var u=t(653),d=t(5),h=t(6928),p=["columns","spacingX","spacingY","spacing","minChildWidth"],f=(0,r.G)((function(e,n){var t,r=e.columns,o=e.spacingX,l=e.spacingY,f=e.spacing,m=e.minChildWidth,v=(0,a.Z)(e,p),g=(0,u.F)(),b=m?function(e,n){return(0,h.XQ)(e,(function(e){var t,i=(0,d.LP)("sizes",e,"number"===typeof(t=e)?"".concat(t,"px"):t)(n);return null===e?null:"repeat(auto-fit, minmax(".concat(i,", 1fr))")}))}(m,g):(t=r,(0,h.XQ)(t,(function(e){return null===e?null:"repeat(".concat(e,", minmax(0, 1fr))")})));return(0,s.jsx)(c,(0,i.Z)({ref:n,gap:f,columnGap:o,rowGap:l,templateColumns:b},v))}));f.displayName="SimpleGrid"},4518:function(e,n,t){function i(e){var n=Object.assign({},e);for(var t in n)void 0===n[t]&&delete n[t];return n}t.d(n,{o:function(){return i}})}}]);
//# sourceMappingURL=postForm.b5226be4.chunk.js.map