if (self.CavalryLogger) { CavalryLogger.start_js(["cuKot"]); }

__d('XUIAmbientNUXBody.react',['cx','React','XUICloseButton.react','joinClasses'],(function a(b,c,d,e,f,g,h){var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;l.prototype.render=function(){'use strict';var m=c('joinClasses')("_21es",this.props.className,this.props.noCloseButton?"_izg":null),n=this.props.noCloseButton?null:c('React').createElement(c('XUICloseButton.react'),{shade:'light',className:"_36gl",onClick:this.props.onCloseButtonClick});return c('React').createElement('div',{className:m},n,c('React').createElement('div',{className:"__xn"},this.props.children))};function l(){'use strict';i.apply(this,arguments)}l.propTypes={noCloseButton:k.bool,onCloseButtonClick:k.func};f.exports=l}),null);
__d('XUIAmbientNUXTheme',['cx'],(function a(b,c,d,e,f,g,h){var i={wrapperClassName:"_2x6q",arrowDimensions:{offset:14,length:18}};f.exports=i}),null);
__d('XUIAmbientNUX.react',['fbt','React','ReactLayer','ReactAbstractContextualDialog','XUIAmbientNUXTheme','XUIAmbientNUXBody.react','uniqueID'],(function a(b,c,d,e,f,g,h){var i,j,k=c('React').PropTypes,l=300,m=380,n=c('ReactLayer').createClass(c('ReactAbstractContextualDialog').createSpec({displayName:'XUIAmbientNUX',theme:c('XUIAmbientNUXTheme')}));i=babelHelpers.inherits(o,c('React').Component);j=i&&i.prototype;function o(){'use strict';j.constructor.call(this);this.$XUIAmbientNUX2=c('uniqueID')();this.$XUIAmbientNUX1=c('uniqueID')()}o.prototype.$XUIAmbientNUX3=function(){'use strict';switch(this.props.width){case 'wide':return m;case 'custom':return this.props.customwidth;case 'auto':return null;default:return l;}};o.prototype.$XUIAmbientNUX4=function(){'use strict';return h._("Learn about this new feature")};o.prototype.render=function(){'use strict';var p=this.props.labelledBy,q=null,r=null;if(!p||!p.length){q=c('React').createElement('div',{'aria-label':this.props.label||this.$XUIAmbientNUX4(),id:this.$XUIAmbientNUX2,key:this.$XUIAmbientNUX2});p=[this.$XUIAmbientNUX2]}var s=h._("Close");r=c('React').createElement('a',{className:'layer_close_elem accessible_elem',href:'#',id:this.$XUIAmbientNUX1,key:this.$XUIAmbientNUX1,'aria-label':s,'aria-labelledby':this.$XUIAmbientNUX1+' '+p.join(' '),role:'button'});return c('React').createElement(n,{alignment:this.props.alignment,autoFocus:false,behaviors:this.props.behaviors,context:this.props.context,contextRef:this.props.contextRef,dialogRole:'region',focusContextOnHide:false,hasActionableContext:this.props.hasActionableContext,insertParent:this.props.insertParent,labelledBy:p,offsetX:this.props.offsetX,offsetY:this.props.offsetY,onBeforeHide:this.props.onBeforeHide,position:this.props.position,shown:this.props.shown,width:this.$XUIAmbientNUX3(this.props)},c('React').createElement(c('XUIAmbientNUXBody.react'),{className:this.props.className,noCloseButton:this.props.noCloseButton,onCloseButtonClick:this.props.onCloseButtonClick},this.props.children,q,r))};o.propTypes={alignment:k.oneOf(['left','center','right']),behaviors:k.object,className:k.string,context:k.object,contextRef:k.func,customwidth:k.number,hasActionableContext:k.bool,insertParent:k.object,label:k.object,labelledBy:k.arrayOf(k.string),noCloseButton:k.bool,offsetX:k.number,offsetY:k.number,onBeforeHide:k.func,onCloseButtonClick:k.func,position:k.oneOf(['above','below','left','right']),shown:k.bool,width:k.oneOf(['wide','normal','auto','custom'])};f.exports=o}),null);
__d('DeveloperAppReviewStatus',['AsyncDialog','AsyncRequest','Event'],(function a(b,c,d,e,f,g){var h={registerDevModeToggle:function i(j,k){c('Event').listen(j,'change',function(l){var m=function n(){var o=l.target;o.disabled=false;o.checked=!o.checked};l.target.disabled=true;c('AsyncDialog').send(new (c('AsyncRequest'))(k).setMethod('POST').setData({is_live:l.target.checked}),function(n){n.subscribe('cancel',function(){return m()})})})}};f.exports=h}),null);
__d('DeveloperAppSwitchButton',['DOMEventListener','emptyFunction'],(function a(b,c,d,e,f,g){function h(i){'use strict';this.$DeveloperAppSwitchButton1=i.checked;this.$DeveloperAppSwitchButton2=c('emptyFunction');c('DOMEventListener').add(i,'change',function(j){this.$DeveloperAppSwitchButton1=i.checked;this.$DeveloperAppSwitchButton2(this)}.bind(this))}h.prototype.setOnChange=function(i){'use strict';this.$DeveloperAppSwitchButton2=i};h.prototype.isChecked=function(){'use strict';return this.$DeveloperAppSwitchButton1};f.exports=h}),null);
__d('DevsiteButtonTextField.react',['cx','fbt','AsyncRequest','React','URI','XUIButton.react'],(function a(b,c,d,e,f,g,h,i){var j,k,l=c('React').PropTypes;j=babelHelpers.inherits(m,c('React').Component);k=j&&j.prototype;function m(){var n,o;'use strict';for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return o=(n=k.constructor).call.apply(n,[this].concat(q)),this.state={value:this.props.value,buttonHidden:this.props.buttonHidden,buttonLabel:this.props.buttonLabel,action:this.props.action,actionType:this.props.actionType,disabled:false},this.$DevsiteButtonTextField1=function(event){if(this.state.action){if(this.state.actionType=='link'){new (c('URI'))(this.state.action).go(true)}else new (c('AsyncRequest'))(this.state.action).setMethod('POST').setHandler(function(s){var t=true;if(s.payload.buttonHidden!=='undefined')t=s.payload.buttonHidden;var u=this.state.action;if(s.payload.action!=='undefined')u=s.payload.action;this.setState({buttonLabel:s.payload.buttonLabel,buttonHidden:t,value:s.payload.value,action:u})}.bind(this)).send();this.setState({disabled:this.props.disableOnClick})}return event.preventDefault()}.bind(this),o}m.prototype.render=function(){'use strict';var n=this.state.value,o=null;if(!this.state.buttonHidden)o=c('React').createElement(c('XUIButton.react'),{type:'button',label:this.state.buttonLabel,onClick:this.props.onClick||this.$DevsiteButtonTextField1,disabled:this.state.disabled});return c('React').createElement('div',{className:"_5e_6 _5rvc _2caq"},c('React').createElement('span',{className:"_5rv9"},n),o)};m.propTypes={value:l.string,buttonHidden:l.bool,buttonLabel:l.string,action:l.string,actionType:l.oneOf(['async','link']),disableOnClick:l.bool};m.defaultProps={buttonHidden:false,buttonLabel:i._("Show")};f.exports=m}),null);
__d("XDeveloperCollapsibleCardController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/async\/monetize\/collapsible_card\/",{fbid:{type:"Int",required:true},app_id:{type:"Int",required:true},is_collapsed:{type:"Bool",defaultValue:false}})}),null);
__d('DevsiteCollapsibleCard',['csx','cx','CSS','Event','Parent','AsyncRequest','XDeveloperCollapsibleCardController'],(function a(b,c,d,e,f,g,h,i){function j(k,l,m,n){'use strict';this.fbid=l;this.app_id=m;this.header=k;this.is_collapsed=n;c('Event').listen(k,'click',this.onclick.bind(this))}j.prototype.onclick=function(){'use strict';c('CSS').toggleClass(c('Parent').bySelector(this.header,"._5lxy"),"_5lxz");if(this.fbid&&this.app_id){var k=c('XDeveloperCollapsibleCardController').getURIBuilder().setInt('fbid',this.fbid).setInt('app_id',this.app_id).setBool('is_collapsed',this.is_collapsed).getURI();new (c('AsyncRequest'))(k).send()}};f.exports=j}),null);
__d('DevsiteAppDashNavProductItem',['CSS'],(function a(b,c,d,e,f,g){'use strict';function h(i,j,k,l,m){this.$DevsiteAppDashNavProductItem1=i;this.$DevsiteAppDashNavProductItem2=j;this.$DevsiteAppDashNavProductItem3=k;this.$DevsiteAppDashNavProductItem4=l;this.$DevsiteAppDashNavProductItem5=m}h.prototype.getRoute=function(){return this.$DevsiteAppDashNavProductItem1};h.prototype.getRoot=function(){return this.$DevsiteAppDashNavProductItem2};h.prototype.getLink=function(){return this.$DevsiteAppDashNavProductItem3};h.prototype.getSubProducts=function(){return this.$DevsiteAppDashNavProductItem5};h.prototype.showSpinner=function(i){c('CSS').conditionShow(this.$DevsiteAppDashNavProductItem4,i)};h.prototype.setIsSelected=function(i){c('CSS').conditionClass(this.getRoot(),'selected',i)};f.exports=h}),null);
__d('DevsiteAppDashNavSubProductItem',['CSS'],(function a(b,c,d,e,f,g){'use strict';function h(i,j,k){this.$DevsiteAppDashNavSubProductItem1=i;this.$DevsiteAppDashNavSubProductItem2=j;this.$DevsiteAppDashNavSubProductItem3=k}h.prototype.getTab=function(){return this.$DevsiteAppDashNavSubProductItem1};h.prototype.getRoot=function(){return this.$DevsiteAppDashNavSubProductItem2};h.prototype.getIsDefault=function(){return this.$DevsiteAppDashNavSubProductItem3};h.prototype.setIsSelected=function(i){c('CSS').conditionClass(this.getRoot(),'selected',i)};f.exports=h}),null);
__d('DeveloperAssetManagerCardController',['AsyncRequest'],(function a(b,c,d,e,f,g){var h={initChangeHostingOption:function i(j,k,l){var m=j.getValue();if(l!=null){l.subscribe('confirm',function(n,o){new (c('AsyncRequest'))().setURI(k).setData({type:j.getValue()}).setHandler(function(){if(l!=null)l.hide();}).send()});l.subscribe('cancel',function(n,o){j.setValue(m);if(l!=null)l.hide();})}j.subscribe('change',function(n,o){if(l==null){new (c('AsyncRequest'))().setURI(k).setData({type:o.value}).send()}else l.show();})}};f.exports=h}),null);
__d('DashboardHeaderToggle',['cx','CSS','Event'],(function a(b,c,d,e,f,g,h){'use strict';function i(j,k,l){c('Event').listen(j,'click',this.$DashboardHeaderToggle1.bind(this,j,k,l))}i.prototype.$DashboardHeaderToggle1=function(j,k,l){c('CSS').toggle(k);c('CSS').toggle(l);c('CSS').toggleClass(j,"_2xo5")};f.exports=i}),null);
__d('DeveloperAppInlineValidation',['csx','CSS','DOM','DOMScroll','Event','Parent','Vector'],(function a(b,c,d,e,f,g,h){var i=150,j={registerPopup:function k(l,m){c('Event').listen(l,'mouseenter',function(event){var n=c('Parent').bySelector(l,"._5b_j");if(c('CSS').hasClass(n,'valid')||!Object.prototype.hasOwnProperty.call(n,'_errors'))return;var o=c('DOM').find(m.getContent(),"div._5p3t");c('DOM').setContent(o,c('DOM').create('ul',{},n._errors.map(function(p){return c('DOM').create('li',{},p)})))})},isInvalid:function k(l){return c('CSS').hasClass(l,'validated')&&!c('CSS').hasClass(l,'valid')},isValid:function k(l){return c('CSS').hasClass(l,'validated')&&c('CSS').hasClass(l,'valid')},setValid:function k(l){c('CSS').addClass(l,'validated');c('CSS').addClass(l,'valid')},setInvalid:function k(l,m){l._errors=m;c('CSS').addClass(l,'validated');c('CSS').removeClass(l,'valid')},clearFlags:function k(l){c('CSS').removeClass(l,'validated');c('CSS').removeClass(l,'valid')},show:function k(l,m,n,o){if(!m)m=document;if(n===undefined)n=true;var p=null;c('DOM').scry(m,"div._5b_j").forEach(function(q){var r=[q.querySelector('input[type=hidden]'),q.querySelector('input'),q.firstChild.firstChild],s=true;for(var t=r,u=Array.isArray(t),v=0,t=u?t:t[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var w;if(u){if(v>=t.length)break;w=t[v++]}else{v=t.next();if(v.done)break;w=v.value}var x=w;if(!x)continue;var y=x.getAttribute('name');if(!y)y=x.getAttribute('id');if(x.getAttribute('type')==='hidden'){var z=q.querySelectorAll('input');for(var aa=0;aa<z.length;++aa)if(z[aa].getAttribute('type')!=='hidden'){x=z[aa];break}}if(!y)continue;y=y.replace('[]','');if(l&&Object.prototype.hasOwnProperty.call(l,y)){this.setInvalid(q,l[y]);var ba=c('Vector').getElementPosition(q);if(!p||ba<p)p=ba;s=false;break}else if(o&&Object.prototype.hasOwnProperty.call(o,y)){this.setValid(q);s=false;break}}if(s)this.clearFlags(q);}.bind(this));if(p&&n){p.y-=i;c('DOMScroll').scrollTo(p)}},updateValidations:function k(l,m,n){if(!m)m=document;if(n===undefined)n=true;var o=c('DOM').scry(m,"div._5b_j").some(function(p){return c('CSS').hasClass(p,'validated')});if(!o)return;this.show(l,m,n)},clearAllValidations:function k(l){if(!l)l=document;c('DOM').scry(l,"div._5b_j").forEach(function(m){return this.clearFlags(m)}.bind(this))}};f.exports=j}),null);
__d('getInlineBoundingRect',['Rect'],(function a(b,c,d,e,f,g){function h(i,j){var k=i.getClientRects();if(!j||k.length===0)return c('Rect').getElementBounds(i);var l,m=false;for(var n=0;n<k.length;n++){var o=new (c('Rect'))(Math.round(k[n].top),Math.round(k[n].right),Math.round(k[n].bottom),Math.round(k[n].left),'viewport').convertTo('document'),p=o.getPositionVector(),q=p.add(o.getDimensionVector());if(!l||p.x<=l.l&&p.y>l.t){if(m)break;l=new (c('Rect'))(p.y,q.x,q.y,p.x,'document')}else{l.t=Math.min(l.t,p.y);l.b=Math.max(l.b,q.y);l.r=q.x}if(o.contains(j))m=true;}if(!l)l=c('Rect').getElementBounds(i);return l}f.exports=h}),null);
__d('Tooltip',['fbt','AsyncRequest','ContextualLayer','ContextualLayerAutoFlip','CSS','DOM','Event','Style','TooltipData','Vector','emptyFunction','getElementText','getInlineBoundingRect','getOrCreateDOMID','nl2br','setImmediate'],(function a(b,c,d,e,f,g,h){var i=null,j=null,k=null,l=null,m=null,n=null,o=[],p=[];function q(){if(!l){m=c('DOM').create('div',{className:'tooltipContent','data-testid':'tooltip_testid'});n=c('getOrCreateDOMID')(m);var u=c('DOM').create('i',{className:'arrow'}),v=c('DOM').create('div',{className:'uiTooltipX'},[m,u]);l=new (c('ContextualLayer'))({},v);l.shouldSetARIAProperties(false);l.enableBehavior(c('ContextualLayerAutoFlip'))}}function r(u,v){t._show(u,h._("Loading..."));new (c('AsyncRequest'))(v).setHandler(function(w){t._show(u,w.getPayload())}).setErrorHandler(c('emptyFunction')).send()}var s;c('Event').listen(document.documentElement,'mouseover',function(event){s=event;c('setImmediate')(function(){s=null})});var t=babelHelpers['extends']({},c('TooltipData'),{isActive:function u(v){return v===i},process:function u(v,w){if(!c('DOM').contains(v,w))return;if(v!==i){t.fetchIfNecessary(v);var x=t._get(v);if(x.suppress)return;if(x.delay){t._showWithDelay(v,x.delay)}else t.show(v);}},fetchIfNecessary:function u(v){var w=v.getAttribute('data-tooltip-uri');if(w){v.removeAttribute('data-tooltip-uri');r(v,w)}},hide:function u(){if(i){l.hide();i=null;while(o.length)o.pop().remove();}},_show:function u(v,w){t._store({context:v,content:w});t.isActive(v)&&t.show(v)},show:function u(v){var w=function ha(){v.setAttribute('aria-describedby',n);l.show()},x=function ha(){v.removeAttribute('aria-describedby');t.hide()},y=function ha(ia){if(!c('DOM').contains(i,ia.getTarget()))x();};q();x();var z=t._get(v);if(z.suppress||t.allSuppressed)return;var aa=z.content;if(z.overflowDisplay){if(v.offsetWidth>=v.scrollWidth)return;if(!aa)aa=c('getElementText')(v);}if(!aa)return;var ba=0,ca=0;if(z.position==='left'||z.position==='right'){ca=(v.offsetHeight-28)/2}else if(z.alignH!=='center'){var da=v.offsetWidth;if(da<32)ba=(da-32)/2*(z.alignH==='right'?-1:1);}l.setContextWithBounds(v,c('getInlineBoundingRect')(v,s&&c('Vector').getEventPosition(s))).setOffsetX(ba).setOffsetY(ca).setPosition(z.position).setAlignment(z.alignH);if(typeof aa==='string'){c('CSS').addClass(l.getRoot(),'invisible_elem');var ea=c('DOM').create('span',{},c('nl2br')(aa)),fa=c('DOM').create('div',{className:'tooltipText'},ea);c('DOM').setContent(m,fa);w();c('CSS').removeClass(l.getRoot(),'invisible_elem')}else{c('DOM').setContent(m,aa);w()}o.push(c('Event').listen(document.documentElement,'mouseover',y),c('Event').listen(document.documentElement,'focusin',y));var ga=c('Style').getScrollParent(v);if(ga!==window)o.push(c('Event').listen(ga,'scroll',x));if(!z.persistOnClick)o.push(c('Event').listen(v,'click',x));i=v},_showWithDelay:function u(v,w){if(v!==j)t._clearDelay();if(!k){var x=function y(z){if(!c('DOM').contains(j,z.getTarget()))t._clearDelay();};p.push(c('Event').listen(document.documentElement,'mouseover',x),c('Event').listen(document.documentElement,'focusin',x));j=v;k=setTimeout(function(){t._clearDelay();t.show(v)},w)}},_clearDelay:function u(){clearTimeout(k);j=null;k=null;while(p.length)p.pop().remove();}});c('Event').listen(window,'scroll',t.hide);f.exports=t}),null);
__d("XSimpleNUXMessagesController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/ajax\/nux\/{msg_id}\/seen\/",{msg_id:{type:"Int",required:true}})}),null);
__d('SimpleNUXMessage',['AsyncRequest','SimpleNUXMessageTypesToShow','XSimpleNUXMessagesController'],(function a(b,c,d,e,f,g){function h(j){return !c('SimpleNUXMessageTypesToShow')[j]}function i(j){delete c('SimpleNUXMessageTypesToShow')[j];var k=c('XSimpleNUXMessagesController').getURIBuilder().setInt('msg_id',j).getURI();new (c('AsyncRequest'))().setURI(k).send()}f.exports={hasUserSeenMessage:h,markMessageSeenByUser:i}}),null);
__d('getNormalizedClientRect',['getDocumentScrollElement'],(function a(b,c,d,e,f,g){'use strict';function h(i){var j=i.getBoundingClientRect(),k=0,l=0,m=c('getDocumentScrollElement')(i.ownerDocument),n=m.getBoundingClientRect();if(n.left>0){k=-n.left}else{var o=m.scrollWidth+n.left,p=n.width;if(p>o)k=p-o;}if(n.top>0)l=-n.top;return {bottom:j.bottom+l,height:j.height,left:j.left+k,right:j.right+k,top:j.top+l,width:j.width}}f.exports=h}),null);
__d('StickyArea',['cx','CSS','DOM','DOMQuery','Event','Run','Style','ViewportBounds','getNormalizedClientRect','getOverlayZIndex','removeFromArray','throttle'],(function a(b,c,d,e,f,g,h){var i=[],j=null,k=null,l=c('throttle').acrossTransitions(o,1000),m='$$StickyArea_scrollListener',n='$$StickyArea_scrollListenerCount';function o(){i.sort(function(u,v){var w=u.getNode(),x=v.getNode();if(w.compareDocumentPosition){return 3-(w.compareDocumentPosition(x)&6)}else return w.sourceIndex-x.sourceIndex;})}function p(u,v,w){var x=u.getPlaceholder(),y=u.getNode(),z=c('Style').get(y,'float'),aa=u.getData();if(aa.placeholderWidth!==v||aa.placeholderHeight!==w||aa.placeholderFloat!==z){c('Style').apply(x,{'float':z,height:w+'px',width:v+'px'});aa.placeholderHeight=w;aa.placeholderWidth=v}if(y.nextSibling!==x)c('DOM').insertAfter(y,x);}function q(u,v){var w=u.getData();if(w.fixed!==v){c('Style').apply(u.getNode(),w.styles);c('CSS').conditionShow(u.getPlaceholder(),v);c('CSS').conditionClass(u.getNode(),"_1a1e",v);c('Event').fire(u.getNode(),'change');w.fixed=v}}function r(u,v){if(!u){return 0}else if(v.right<=u.rect.left||v.left>=u.rect.right){return r(u.prev,v)}else return u.bottom;}function s(){var u=0,v=i.length,w=100,x=null;function y(z,aa){var ba=w;while(u<v){var ca=i[u],da=ca.getNode(),ea=ca._scrollTarget;if(aa&&!c('DOMQuery').contains(aa,da))break;w=Math.max(ba,ca.getZIndex());var fa=ca.getData(),ga=da.parentNode,ha=fa.styles;if(ga==null){u++;continue}for(var ia in ha)ha[ia]='';q(ca,false);var ja=da.offsetHeight,ka=da.offsetWidth,la=ea!==window?ea.getBoundingClientRect().top:0,ma=c('getNormalizedClientRect')(da),na=r(z||(ea===window?x:null),ma)+ca.getOffset(),oa=ma.top-la;if(oa<=na){ha.width=ka+'px';var pa=parseInt(c('Style').get(ga,'padding-bottom'),10),qa=c('getNormalizedClientRect')(ga);if(qa.bottom-pa>na+ja||!ca.getIsBoundToContainer()){var ra=parseInt(c('Style').get(da,'margin-left'),10);ha.position='fixed';ha.bottom='auto';ha.top=na+la+'px';ha.left=ma.left-ra+'px'}else{if(!fa.parent||ga!==fa.parent){if(c('Style').get(ga,'position')==='static')c('Style').set(ga,'position','relative');fa.parent=ga}ha.position='absolute';ha.top='auto';ha.bottom=pa+'px';var sa=parseInt(c('Style').get(ga,'border-left-width'),10);ha.left=ma.left-qa.left-sa+'px'}p(ca,ka,ja);q(ca,true)}u++;var ta={bottom:na+ja,prev:z,rect:ma},ua=0;if(!ca.getIsBoundToContainer()){x=ta;ua=100}y(ta,ga);var va=ca.getZIndexOverride()||w+++ua;c('Style').set(da,'z-index',va)}}y(null,null)}function t(u,v,w){var x=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];'use strict';this._isDestroyed=false;this._node=u;this._data={fixed:false,placeholderFloat:null,placeholderHeight:null,placeholderWidth:null,styles:{}};this._offset=w;this._boundToContainer=x.boundToContainer!==false;if(x.stickTo===t.stickTo.SCROLL_PARENT){this._scrollTarget=c('Style').getScrollParent(u.parentNode)||window}else this._scrollTarget=window;this._zIndexOverride=x.zIndexOverride;c('CSS').addClass(u,"_k");if(!v)c('Run').onLeave(this.destroy.bind(this));if(!this._scrollTarget[m]){this._scrollTarget[m]=c('Event').listen(this._scrollTarget,'scroll',function(){l();s()});this._scrollTarget[n]=1}else this._scrollTarget[n]++;if(!i.length){j=c('Event').listen(window,'resize',function(){l();s()});k=c('ViewportBounds').subscribe('change',function(){l();s()})}i.push(this);t.reflow()}t.prototype.destroy=function(){'use strict';if(this._isDestroyed)return;c('removeFromArray')(i,this);this._scrollTarget[n]--;if(this._scrollTarget[n]===0){this._scrollTarget[m].remove();this._scrollTarget[m]=null}if(!i.length){j.remove();j=null;k.unsubscribe();k=null}if(this._placeholder)c('DOM').remove(this._placeholder);var u=0;for(var v in this._data.styles){this._data.styles[v]='';u++}if(u)c('Style').apply(this._node,this._data.styles);this._isDestroyed=true};t.prototype.getData=function(){'use strict';return this._data};t.prototype.getNode=function(){'use strict';return this._node};t.prototype.getOffset=function(){'use strict';return this._offset||0};t.prototype.getPlaceholder=function(){'use strict';if(!this._placeholder)this._placeholder=c('DOM').create('div');return this._placeholder};t.prototype.getIsBoundToContainer=function(){'use strict';return this._boundToContainer};t.prototype.getZIndexOverride=function(){'use strict';return this._zIndexOverride};t.prototype.getZIndex=function(){'use strict';if(!this._zIndex)this._zIndex=c('getOverlayZIndex')(this._node);return this._zIndex};t.prototype.setOffset=function(u){'use strict';this._offset=u};t.reflow=c('throttle').acrossTransitions(function(){o();s()},100);t.stickTo={SCROLL_PARENT:'SCROLL_PARENT',WINDOW:'WINDOW'};f.exports=t}),null);
__d('AnalyticsGKs',['invariant','immutable'],(function a(b,c,d,e,f,g,h){var i={_gkResults:null,init:function j(k){var l={};k.forEach(function(m){return l[m.gk_name]=m.value});this._gkResults=c('immutable').Map(l)},get:function j(k){this._gkResults!==null||h(0);this._gkResults.has(k)||h(0);return this._gkResults.get(k)}};f.exports=i}),null);