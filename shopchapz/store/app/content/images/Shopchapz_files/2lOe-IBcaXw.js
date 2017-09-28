if (self.CavalryLogger) { CavalryLogger.start_js(["j9yTm"]); }

__d('FbtResultBase',['cx','ErrorUtils'],(function a(b,c,d,e,f,g,h){function i(k){}function j(k){'use strict';this.$FbtResultBase1=k;this.$FbtResultBase2=null}j.prototype.flattenToArray=function(){'use strict';return j.flattenToArray(this.$FbtResultBase1)};j.prototype.getContents=function(){'use strict';return this.$FbtResultBase1};j.prototype.toString=function(){'use strict';if(this.$FbtResultBase2!==null)return this.$FbtResultBase2;var k='',l=this.flattenToArray();for(var m=0;m<l.length;++m){var n=l[m];if(typeof n==='string'||n instanceof j){k+=n}else{var o=new Error('Converting to a string will drop content data');c('ErrorUtils').reportError(o,true)}}if(!Object.isFrozen(this))this.$FbtResultBase2=k;return k};j.prototype.toJSON=function(){'use strict';return this.toString()};j.flattenToArray=function(k){'use strict';var l=[];for(var m=0;m<k.length;++m){var n=k[m];if(Array.isArray(n)){l.push.apply(l,j.flattenToArray(n))}else if(n instanceof j){l.push.apply(l,n.flattenToArray())}else l.push(n);}return l};['replace','split','toLowerCase','toUpperCase','indexOf','charAt','charCodeAt','substr','substring','trim','lastIndexOf','search','match','slice','codePointAt','endsWith','includes','localeCompare','normalize','repeat','startsWith','toLocaleLowerCase','toLocaleUpperCase','trimLeft','trimRight','link','anchor','fontcolor','fontsize','big','blink','bold','fixed','italics','small','strike','sub','sup','contains'].forEach(function(k){j.prototype[k]=function(){'use strict';i(k);return this.toString()[k].apply(this,arguments)}}.bind(this));f.exports=j}),18);
__d("isScalar",[],(function a(b,c,d,e,f,g){function h(i){return /string|number|boolean/.test(typeof i)}f.exports=h}),null);
__d('DOM',['$','DOMQuery','ErrorUtils','Event','FbtResultBase','HTML','UserAgent_DEPRECATED','createArrayFromMixed','isNode','isScalar','isTextNode'],(function a(b,c,d,e,f,g){var h={create:function k(l,m,n){var o=document.createElement(l);if(m)h.setAttributes(o,m);if(n!=null)h.setContent(o,n);return o},setAttributes:function k(l,m){if(m.type)l.type=m.type;for(var n in m){var o=m[n],p=/^on/i.test(n);if(n=='type'){continue}else if(n=='style'){if(typeof o=='string'){l.style.cssText=o}else Object.assign(l.style,o);}else if(p){c('Event').listen(l,n.substr(2),o)}else if(n in l){l[n]=o}else if(l.setAttribute)l.setAttribute(n,o);}},prependContent:function k(l,m){if(!l)throw new Error('DOM.prependContent: reference element is not a node');return j(m,l,function(n){l.firstChild?l.insertBefore(n,l.firstChild):l.appendChild(n)})},insertAfter:function k(l,m){if(!l||!l.parentNode)throw new Error('DOM.insertAfter: reference element does not '+'have a parent.');var n=l.parentNode;return j(m,n,function(o){l.nextSibling?n.insertBefore(o,l.nextSibling):n.appendChild(o)})},insertBefore:function k(l,m){if(!l||!l.parentNode)throw new Error('DOM.insertBefore: reference element does not have a parent.');var n=l.parentNode;return j(m,n,function(o){n.insertBefore(o,l)})},setContent:function k(l,m){if(!l)throw new Error('DOM.setContent: reference element is not a node.');while(l.firstChild)i(l.firstChild);return h.appendContent(l,m)},appendContent:function k(l,m){if(!l)throw new Error('DOM.appendContent: reference element is not a node.');return j(m,l,function(n){l.appendChild(n)})},replace:function k(l,m){if(!l||!l.parentNode)throw new Error('DOM.replace: reference element does not '+'have a parent.');var n=l.parentNode;return j(m,n,function(o){n.replaceChild(o,l)})},remove:function k(l){i(c('$')(l))},empty:function k(l){l=c('$')(l);while(l.firstChild)i(l.firstChild);}};Object.assign(h,c('DOMQuery'));function i(k){if(k.parentNode)k.parentNode.removeChild(k);}function j(k,l,m){k=c('HTML').replaceJSONWrapper(k);if(k instanceof c('HTML')&&l.firstChild===null&&-1===k.toString().indexOf('<scr'+'ipt')){var n=c('UserAgent_DEPRECATED').ie();if(!n||n>7&&!c('DOMQuery').isNodeOfType(l,['table','tbody','thead','tfoot','tr','select','fieldset'])){var o=n?'<em style="display:none;">&nbsp;</em>':'';l.innerHTML=o+k;n&&l.removeChild(l.firstChild);return Array.from(l.childNodes)}}else if(c('isTextNode')(l)){l.data=k;return [k]}var p=document.createDocumentFragment(),q,r=[],s=[];k=c('createArrayFromMixed')(k);if(k.length===1&&k[0] instanceof c('FbtResultBase'))k=k[0].getContents();for(var t=0;t<k.length;t++){q=c('HTML').replaceJSONWrapper(k[t]);if(q instanceof c('HTML')){s.push(q.getAction());var u=q.getNodes();for(var v=0;v<u.length;v++){r.push(u[v]);p.appendChild(u[v])}}else if(c('isScalar')(q)||q instanceof c('FbtResultBase')){var w=document.createTextNode(q);r.push(w);p.appendChild(w)}else if(c('isNode')(q)){r.push(q);p.appendChild(q)}}m(p);s.forEach(function(x){x()});return r}f.exports=h}),18);
__d('Promise',['invariant','TimeSlice','setImmediate','setTimeoutAcrossTransitions'],(function a(b,c,d,e,f,g,h){'use strict';function i(){}var j=null,k={};function l(da){try{return da.then}catch(ea){j=ea;return k}}function m(da,ea){try{return da(ea)}catch(fa){j=fa;return k}}function n(da,ea,fa){try{da(ea,fa)}catch(ga){j=ga;return k}}function o(da){if(typeof this!=='object')throw new TypeError('Promises must be constructed via new');if(typeof da!=='function')throw new TypeError('not a function');this._state=0;this._value=null;this._deferreds=[];if(da===i)return;v(da,this)}o._noop=i;o.prototype.then=function(da,ea){if(this.constructor!==o)return p(this,da,ea);var fa=new o(i);q(this,new u(da,ea,fa));return fa};function p(da,ea,fa){return new da.constructor(function(ga,ha){var ia=new o(i);ia.then(ga,ha);q(da,new u(ea,fa,ia))})}function q(da,ea){while(da._state===3)da=da._value;if(da._state===0){da._deferreds.push(ea);return}c('setImmediate')(function fa(){var ga=da._state===1?ea.onFulfilled:ea.onRejected;if(ga===null){ea.continuation(function(){});if(da._state===1){r(ea.promise,da._value)}else s(ea.promise,da._value);return}var ha=m(ea.continuation.bind(null,ga),da._value);if(ha===k){s(ea.promise,j)}else r(ea.promise,ha);})}function r(da,ea){if(ea===da)return s(da,new TypeError('A promise cannot be resolved with itself.'));if(ea&&(typeof ea==='object'||typeof ea==='function')){var fa=l(ea);if(fa===k)return s(da,j);if(fa===da.then&&ea instanceof o){da._state=3;da._value=ea;t(da);return}else if(typeof fa==='function'){v(fa.bind(ea),da);return}}da._state=1;da._value=ea;t(da)}function s(da,ea){da._state=2;da._value=ea;t(da)}function t(da){for(var ea=0;ea<da._deferreds.length;ea++)q(da,da._deferreds[ea]);da._deferreds=null}function u(da,ea,fa){this.onFulfilled=typeof da==='function'?da:null;this.onRejected=typeof ea==='function'?ea:null;this.continuation=c('TimeSlice').getGuardedContinuation('Promise Handler');this.promise=fa}function v(da,ea){var fa=false,ga=n(da,function(ha){if(fa)return;fa=true;r(ea,ha)},function(ha){if(fa)return;fa=true;s(ea,ha)});if(!fa&&ga===k){fa=true;s(ea,j)}}o.prototype.done=function(da,ea){var fa=arguments.length?this.then.apply(this,arguments):this;fa.then(null,function(ga){c('setTimeoutAcrossTransitions')(function(){throw ga},0)})};var w=ca(true),x=ca(false),y=ca(null),z=ca(undefined),aa=ca(0),ba=ca('');function ca(da){var ea=new o(o._noop);ea._state=1;ea._value=da;return ea}o.resolve=function(da){if(da instanceof o)return da;if(da===null)return y;if(da===undefined)return z;if(da===true)return w;if(da===false)return x;if(da===0)return aa;if(da==='')return ba;if(typeof da==='object'||typeof da==='function')try{var ea=da.then;if(typeof ea==='function')return new o(ea.bind(da));}catch(fa){return new o(function(ga,ha){ha(fa)})}return ca(da)};o.all=function(da){if(!Array.isArray(da))da=[new o(function(){throw new TypeError('Promise.all must be passed an iterable.')})];var ea=Array.prototype.slice.call(da);return new o(function(fa,ga){if(ea.length===0)return fa([]);var ha=ea.length;function ia(ka,la){if(la&&(typeof la==='object'||typeof la==='function'))if(la instanceof o&&la.then===o.prototype.then){while(la._state===3)la=la._value;if(la._state===1)return ia(ka,la._value);if(la._state===2)ga(la._value);la.then(function(oa){ia(ka,oa)},ga);return}else{var ma=la.then;if(typeof ma==='function'){var na=new o(ma.bind(la));na.then(function(oa){ia(ka,oa)},ga);return}}ea[ka]=la;if(--ha===0)fa(ea);}for(var ja=0;ja<ea.length;ja++)ia(ja,ea[ja]);})};o.reject=function(da){return new o(function(ea,fa){fa(da)})};o.race=function(da){return new o(function(ea,fa){da.forEach(function(ga){o.resolve(ga).then(ea,fa)})})};o.prototype['catch']=function(da){return this.then(null,da)};f.exports=o}),null);
__d('NonBlockingIFrame',['Promise','DOM','TimeSlice'],(function a(b,c,d,e,f,g){var h={},i,j;function k(){var n=arguments.length<=0||arguments[0]===undefined?h:arguments[0],o=arguments.length<=1||arguments[1]===undefined?document.body:arguments[1],p,q={className:'nonBlockingIframe',width:0,height:0,frameborder:0,scrolling:'no','aria-hidden':'true'};if(n!==h)q.src=n;p=c('DOM').create('iframe',q);p.style.left='-1000px';p.style.position='absolute';c('DOM').appendContent(o,p);if(n===h){p.contentDocument.open();p.contentDocument.close()}return p}function l(){return new (c('Promise'))(function(n){if(!i)i=k();if(i.contentDocument.readyState==='complete'){n(i)}else{if(!j)j=new (c('Promise'))(function(o){i.contentWindow.onload=c('TimeSlice').guard(function(){o(i)},'NonBlockingIFrame window.onload')});n(j)}})}var m={loadImage:function n(o){return l().then(function(p){return new (c('Promise'))(function(q,r){var s=p.contentWindow.Image,t=new s();t.onload=c('TimeSlice').guard(function(){q(t)},'NonBlockingIFrame image.onload');t.onerror=c('TimeSlice').guard(function(){r(t)},'NonBlockingIFrame image.onerror');t.onabort=c('TimeSlice').guard(function(){r(t)},'NonBlockingIFrame image.onabort');t.src=o})})},loadIFrame:function n(){var o=arguments.length<=0||arguments[0]===undefined?h:arguments[0];return l().then(function(p){var q=p.contentDocument.body;return k(o,q)})}};f.exports=m}),null);
__d('QueryString',[],(function a(b,c,d,e,f,g){function h(l){var m=[];Object.keys(l).sort().forEach(function(n){var o=l[n];if(typeof o==='undefined')return;if(o===null){m.push(n);return}m.push(encodeURIComponent(n)+'='+encodeURIComponent(o))});return m.join('&')}function i(l,m){var n={};if(l==='')return n;var o=l.split('&');for(var p=0;p<o.length;p++){var q=o[p].split('=',2),r=decodeURIComponent(q[0]);if(m&&Object.prototype.hasOwnProperty.call(n,r))throw new URIError('Duplicate key: '+r);n[r]=q.length===2?decodeURIComponent(q[1]):null}return n}function j(l,m){return l+(l.indexOf('?')!==-1?'&':'?')+(typeof m==='string'?m:k.encode(m))}var k={encode:h,decode:i,appendToUrl:j};f.exports=k}),null);
__d('getCrossOriginTransport',['invariant','ex'],(function a(b,c,d,e,f,g,h){function i(){try{var j=new XMLHttpRequest();if(!('withCredentials' in j)&&typeof XDomainRequest!=='undefined')j=new XDomainRequest();return j}catch(k){throw new Error(c('ex')('getCrossOriginTransport: %s',k.message))}}i.withCredentials=function(){var j=i();'withCredentials' in j||h(0);var k=j.open;j.open=function(){k.apply(this,arguments);this.withCredentials=true};return j};f.exports=i}),null);
__d('ZeroRewrites',['URI','ZeroRewriteRules','getCrossOriginTransport','getSameOriginTransport','isFacebookURI'],(function a(b,c,d,e,f,g){var h={rewriteURI:function i(j){if(!c('isFacebookURI')(j)||h._isWhitelisted(j))return j;var k=h._getRewrittenSubdomain(j);if(k!==null&&k!==undefined)j=j.setSubdomain(k);return j},getTransportBuilderForURI:function i(j){return h._isRewritten(j)?c('getCrossOriginTransport').withCredentials:c('getSameOriginTransport')},isRewriteSafe:function i(j){if(Object.keys(c('ZeroRewriteRules').rewrite_rules).length===0||!c('isFacebookURI')(j))return false;var k=h._getCurrentURI().getDomain(),l=new (c('URI'))(j).qualify().getDomain();return k===l||h._isRewritten(j)},_isWhitelisted:function i(j){var k=j.getPath();if(!k.endsWith('/'))k+='/';return c('ZeroRewriteRules').whitelist&&c('ZeroRewriteRules').whitelist[k]==1},_getRewrittenSubdomain:function i(j){var k=new (c('URI'))(j).qualify().getSubdomain();return c('ZeroRewriteRules').rewrite_rules[k]},_isRewritten:function i(j){j=new (c('URI'))(j).qualify();if(Object.keys(c('ZeroRewriteRules').rewrite_rules).length===0||!c('isFacebookURI')(j)||h._isWhitelisted(j))return false;var k=j.getSubdomain(),l=h._getCurrentURI(),m=h._getRewrittenSubdomain(l);return j.getDomain()!==l.getDomain()&&k===m},_getCurrentURI:function i(){return new (c('URI'))('/').qualify()}};f.exports=h}),null);
__d('isAdsExcelAddinURI',[],(function a(b,c,d,e,f,g){var h=new RegExp('(^|\\.)fbaddins\\.com$','i'),i=['https'];function j(k){if(k.isEmpty()&&k.toString()!=='#')return false;if(!k.getDomain()&&!k.getProtocol())return false;return i.indexOf(k.getProtocol())!==-1&&h.test(k.getDomain())}f.exports=j}),null);
__d('isMessengerDotComURI',[],(function a(b,c,d,e,f,g){var h=new RegExp('(^|\\.)messenger\\.com$','i'),i=['https'];function j(k){if(k.isEmpty()&&k.toString()!=='#')return false;if(!k.getDomain()&&!k.getProtocol())return false;return i.indexOf(k.getProtocol())!==-1&&h.test(k.getDomain())}f.exports=j}),null);
__d('isValidURI',[],(function a(b,c,d,e,f,g){var h=new RegExp('((^|\\.)atlassolutions\\.com$)|'+'((^|\\.)instagram\\.com$)|'+'((^|\\.)wit\\.ai$)|'+'((^|\\.)accountkit\\.com$)','i'),i=['https'];function j(k){if(k.isEmpty()&&k.toString()!=='#')return false;if(!k.getDomain()&&!k.getProtocol())return false;return i.includes(k.getProtocol())&&h.test(k.getDomain())}f.exports=j}),null);
__d('AsyncSignal',['Promise','ErrorUtils','NonBlockingIFrame','Run','QueryString','TimeSlice','TrackingConfig','URI','WebSpeedJSExperiments','ZeroRewrites','isValidURI','isAdsExcelAddinURI','isFacebookURI','isMessengerDotComURI','getAsyncParams','memoize'],(function a(b,c,d,e,f,g){var h;function i(j,k){this.data=k||{};this.uri=j.toString();if(c('TrackingConfig').domain&&this.uri.charAt(0)=='/')this.uri=c('TrackingConfig').domain+this.uri;}i.prototype.setHandler=function(j){this.handler=j;return this};i.prototype.setTimeout=function(j){this.timeout=j;return this};i.prototype.send=function(){c('TimeSlice').guard(this._send.bind(this),'AsyncSignal send',{isContinuation:false})()};i.prototype._send=function(){var j=this.handler,k=this.data;k.asyncSignal=(Math.random()*10000|0)+1;var l=c('ZeroRewrites').rewriteURI(new (c('URI'))(this.uri)),m=c('isFacebookURI')(l)||c('isMessengerDotComURI')(l)||c('isAdsExcelAddinURI')(l)||c('isValidURI')(l);if(m){Object.assign(k,c('getAsyncParams')('POST'))}else throw new Error("'"+this.uri+"' "+"is an external URL, you should not send async signals to offsite links.");var n=c('QueryString').appendToUrl(this.uri,k),o;if(c('WebSpeedJSExperiments').non_blocking_logger){o=c('NonBlockingIFrame').loadImage(n)}else{if(!h)h=new (c('Promise'))(function(r){c('Run').onAfterLoad(r)});o=h.then(function(){return new (c('Promise'))(function(r,s){var t=new Image();t.onload=r;t.onerror=t.onabort=s;t.src=n})})}if(j){var p=false,q=c('memoize')(function(){c('ErrorUtils').applyWithGuard(j,null,[p])});o.then(function(){p=true;q()},q).done();if(this.timeout)setTimeout(q,this.timeout);}return this};f.exports=i}),null);
__d('XControllerURIBuilder',['invariant','URI'],(function a(b,c,d,e,f,g,h){function i(j,k){'use strict';this.$XControllerURIBuilder1=j;this.$XControllerURIBuilder2=k;this.$XControllerURIBuilder3={}}i.prototype.setInt=function(j,k){'use strict';return this.__setParam(j,'Int',k)};i.prototype.setFBID=function(j,k){'use strict';return this.__setParam(j,'FBID',k)};i.prototype.setFloat=function(j,k){'use strict';return this.__setParam(j,'Float',k)};i.prototype.setString=function(j,k){'use strict';return this.__setParam(j,'String',k)};i.prototype.setExists=function(j,k){'use strict';if(k===false)k=undefined;return this.__setParam(j,'Exists',k)};i.prototype.setBool=function(j,k){'use strict';return this.__setParam(j,'Bool',k)};i.prototype.setEnum=function(j,k){'use strict';return this.__setParam(j,'Enum',k)};i.prototype.setIntVector=function(j,k){'use strict';return this.__setParam(j,'IntVector',k)};i.prototype.setIntSet=function(j,k){'use strict';return this.__setParam(j,'IntSet',k.join(','))};i.prototype.setFloatVector=function(j,k){'use strict';return this.__setParam(j,'FloatVector',k)};i.prototype.setFloatSet=function(j,k){'use strict';return this.__setParam(j,'FloatSet',k.join(','))};i.prototype.setStringVector=function(j,k){'use strict';return this.__setParam(j,'StringVector',k)};i.prototype.setStringKeyset=function(j,k){'use strict';return this.__setParam(j,'StringKeyset',k)};i.prototype.setStringSet=function(j,k){'use strict';return this.__setParam(j,'StringSet',k)};i.prototype.setFBIDVector=function(j,k){'use strict';return this.__setParam(j,'FBIDVector',k)};i.prototype.setFBIDSet=function(j,k){'use strict';return this.__setParam(j,'FBIDSet',k)};i.prototype.setFBIDKeyset=function(j,k){'use strict';return this.__setParam(j,'FBIDKeyset',k)};i.prototype.setEnumVector=function(j,k){'use strict';return this.__setParam(j,'EnumVector',k)};i.prototype.setEnumSet=function(j,k){'use strict';return this.__setParam(j,'EnumSet',k)};i.prototype.setEnumKeyset=function(j,k){'use strict';return this.__setParam(j,'EnumKeyset',k)};i.prototype.setIntToIntMap=function(j,k){'use strict';return this.__setParam(j,'IntToIntMap',k)};i.prototype.setIntToFloatMap=function(j,k){'use strict';return this.__setParam(j,'IntToFloatMap',k)};i.prototype.setIntToStringMap=function(j,k){'use strict';return this.__setParam(j,'IntToStringMap',k)};i.prototype.setIntToBoolMap=function(j,k){'use strict';return this.__setParam(j,'IntToBoolMap',k)};i.prototype.setStringToIntMap=function(j,k){'use strict';return this.__setParam(j,'StringToIntMap',k)};i.prototype.setStringToFloatMap=function(j,k){'use strict';return this.__setParam(j,'StringToFloatMap',k)};i.prototype.setStringToStringMap=function(j,k){'use strict';return this.__setParam(j,'StringToStringMap',k)};i.prototype.setStringToNullableStringMap=function(j,k){'use strict';return this.__setParam(j,'StringToNullableStringMap',k)};i.prototype.setStringToBoolMap=function(j,k){'use strict';return this.__setParam(j,'StringToBoolMap',k)};i.prototype.setHackType=function(j,k){'use strict';return this.__setParam(j,'HackType',k)};i.prototype.setTypeAssert=function(j,k){'use strict';return this.__setParam(j,'TypeAssert',k)};i.prototype.__validateRequiredParamsExistence=function(){'use strict';for(var j in this.$XControllerURIBuilder2)!this.$XControllerURIBuilder2[j].required||Object.prototype.hasOwnProperty.call(this.$XControllerURIBuilder3,j)||h(0);};i.prototype.setParams=function(j){'use strict';for(var k in j){this.__assertParamExists(k);var l=this.$XControllerURIBuilder2[k].type;this.__setParam(k,l,j[k])}return this};i.prototype.__assertParamExists=function(j){'use strict';j in this.$XControllerURIBuilder2||h(0)};i.prototype.__setParam=function(j,k,l){'use strict';this.__assertParamExists(j);var m=this.$XControllerURIBuilder2[j].type;m===k||h(0);this.__setParamInt(j,l);return this};i.prototype.__setParamInt=function(j,k){'use strict';this.$XControllerURIBuilder3[j]=k};i.prototype.getURI=function(){'use strict';this.__validateRequiredParamsExistence();var j={},k='',l=/^(.*)?\{(\?)?(\*)?(.+?)\}(.*)?$/,m=this.$XControllerURIBuilder1.split('/'),n=false;for(var o=0;o<m.length;o++){var p=m[o];if(p==='')continue;var q=l.exec(p);if(!q){k+='/'+p}else{var r=q[2]==='?',s=q[4],t=this.$XControllerURIBuilder2[s];t||h(0);if(r&&n)continue;if(this.$XControllerURIBuilder3[s]==null&&r){n=true;continue}this.$XControllerURIBuilder3[s]!=null||h(0);var u=q[1]?q[1]:'',v=q[5]?q[5]:'';k+='/'+u+this.$XControllerURIBuilder3[s]+v;j[s]=true}}if(this.$XControllerURIBuilder1.slice(-1)==='/')k+='/';if(k==='')k='/';var w=new (c('URI'))(k);for(var x in this.$XControllerURIBuilder3){var y=this.$XControllerURIBuilder3[x];if(!j[x]&&y!=null){var z=this.$XControllerURIBuilder2[x];w.addQueryData(x,z&&z.type==='Exists'?null:y)}}return w};i.create=function(j,k){return i.bind(null,j,k)};f.exports=i}),18);
__d('XRequest',['invariant'],(function a(b,c,d,e,f,g,h){var i=function k(l,m,n){var o,p;switch(l){case 'Bool':p=m&&m!=='false'&&m!=='0'||false;break;case 'Int':p=m.toString();/-?\d+/.test(p)||h(0);break;case 'Float':p=parseFloat(m,10);!isNaN(p)||h(0);break;case 'FBID':p=m.toString();for(var q=0;q<p.length;++q){var r=p.charCodeAt(q);48<=r&&r<=57||h(0)}break;case 'String':p=m.toString();break;case 'Enum':if(n===0){p=k('Int',m,null)}else if(n===1){p=k('String',m,null)}else if(n===2){p=m}else h(0);break;default:var s,t,u,v;if(s=/^Nullable(\w+)$/.exec(l)){if(m===null){p=null}else p=k(s[1],m,n);}else if(t=/^(\w+)Vector$/.exec(l)){if(!Array.isArray(m)){p=m.toString();p=p===''?[]:p.split(',')}else p=m;var w=t[1];typeof w==='string'||h(0);p=p.map(function(x){return k(w,x,n&&n.member)})}else if(u=/^(\w+)(Set|Keyset)$/.exec(l)){if(!Array.isArray(m)){p=m.toString();p=p===''?[]:p.split(',')}else p=m;p=p.reduce(function(x,y){x[y]=y;return x},{});w=u[1];typeof w==='string'||h(0);p=Object.keys(p).map(function(x){return k(w,p[x],n&&n.member)})}else if(v=/^(\w+)To(\w+)Map$/.exec(l)){(function(){p={};var x=v[1],y=v[2];typeof x==='string'&&typeof y==='string'||h(0);Object.keys(m).forEach(function(z){p[k(x,z,n&&n.key)]=k(y,m[z],n&&n.value)})})()}else h(0);}return p};function j(k,l,m){'use strict';this.$XRequest1=l;this.$XRequest2=babelHelpers['extends']({},m.getQueryData());var n=k.split('/').filter(function(u){return u}),o=m.getPath().split('/').filter(function(u){return u});for(var p=0;p<n.length;++p){var q=/^\{(\?)?(\*)?(\w+)\}$/.exec(n[p]);if(!q){n[p]===o[p]||h(0);continue}var r=!!q[1],s=!!q[2];!s||p===n.length-1||h(0);var t=q[3];Object.prototype.hasOwnProperty.call(this.$XRequest1,t)||h(0);if(this.$XRequest1[t].required){!r||h(0)}else r||h(0);if(o[p])this.$XRequest2[t]=s?o.slice(p).join('/'):o[p];}Object.keys(this.$XRequest1).forEach(function(u){!this.$XRequest1[u].required||Object.prototype.hasOwnProperty.call(this.$XRequest2,u)||h(0)},this)}j.prototype.getExists=function(k){'use strict';return this.$XRequest2[k]!==undefined};j.prototype.getBool=function(k){'use strict';return this.$XRequest3(k,'Bool')};j.prototype.getInt=function(k){'use strict';return this.$XRequest3(k,'Int')};j.prototype.getFloat=function(k){'use strict';return this.$XRequest3(k,'Float')};j.prototype.getFBID=function(k){'use strict';return this.$XRequest3(k,'FBID')};j.prototype.getString=function(k){'use strict';return this.$XRequest3(k,'String')};j.prototype.getEnum=function(k){'use strict';return this.$XRequest3(k,'Enum')};j.prototype.getOptionalInt=function(k){'use strict';return this.$XRequest4(k,'Int')};j.prototype.getOptionalFloat=function(k){'use strict';return this.$XRequest4(k,'Float')};j.prototype.getOptionalFBID=function(k){'use strict';return this.$XRequest4(k,'FBID')};j.prototype.getOptionalString=function(k){'use strict';return this.$XRequest4(k,'String')};j.prototype.getOptionalEnum=function(k){'use strict';return this.$XRequest4(k,'Enum')};j.prototype.getIntVector=function(k){'use strict';return this.$XRequest3(k,'IntVector')};j.prototype.getFloatVector=function(k){'use strict';return this.$XRequest3(k,'FloatVector')};j.prototype.getFBIDVector=function(k){'use strict';return this.$XRequest3(k,'FBIDVector')};j.prototype.getStringVector=function(k){'use strict';return this.$XRequest3(k,'StringVector')};j.prototype.getEnumVector=function(k){'use strict';return this.$XRequest3(k,'EnumVector')};j.prototype.getOptionalIntVector=function(k){'use strict';return this.$XRequest4(k,'IntVector')};j.prototype.getOptionalFloatVector=function(k){'use strict';return this.$XRequest4(k,'FloatVector')};j.prototype.getOptionalFBIDVector=function(k){'use strict';return this.$XRequest4(k,'FBIDVector')};j.prototype.getOptionalStringVector=function(k){'use strict';return this.$XRequest4(k,'StringVector')};j.prototype.getOptionalEnumVector=function(k){'use strict';return this.$XRequest4(k,'EnumVector')};j.prototype.getIntSet=function(k){'use strict';return this.$XRequest3(k,'IntSet')};j.prototype.getFBIDSet=function(k){'use strict';return this.$XRequest3(k,'FBIDSet')};j.prototype.getFBIDKeyset=function(k){'use strict';return this.$XRequest3(k,'FBIDKeyset')};j.prototype.getStringSet=function(k){'use strict';return this.$XRequest3(k,'StringSet')};j.prototype.getEnumKeyset=function(k){'use strict';return this.$XRequest3(k,'EnumKeyset')};j.prototype.getOptionalIntSet=function(k){'use strict';return this.$XRequest4(k,'IntSet')};j.prototype.getOptionalFBIDSet=function(k){'use strict';return this.$XRequest4(k,'FBIDSet')};j.prototype.getOptionalFBIDKeyset=function(k){'use strict';return this.$XRequest4(k,'FBIDKeyset')};j.prototype.getOptionalStringSet=function(k){'use strict';return this.$XRequest4(k,'StringSet')};j.prototype.getEnumToBoolMap=function(k){'use strict';return this.$XRequest3(k,'EnumToBoolMap')};j.prototype.getEnumToEnumMap=function(k){'use strict';return this.$XRequest3(k,'EnumToEnumMap')};j.prototype.getEnumToFloatMap=function(k){'use strict';return this.$XRequest3(k,'EnumToFloatMap')};j.prototype.getEnumToIntMap=function(k){'use strict';return this.$XRequest3(k,'EnumToIntMap')};j.prototype.getEnumToStringMap=function(k){'use strict';return this.$XRequest3(k,'EnumToStringMap')};j.prototype.getIntToBoolMap=function(k){'use strict';return this.$XRequest3(k,'IntToBoolMap')};j.prototype.getIntToEnumMap=function(k){'use strict';return this.$XRequest3(k,'IntToEnumMap')};j.prototype.getIntToFloatMap=function(k){'use strict';return this.$XRequest3(k,'IntToFloatMap')};j.prototype.getIntToIntMap=function(k){'use strict';return this.$XRequest3(k,'IntToIntMap')};j.prototype.getIntToStringMap=function(k){'use strict';return this.$XRequest3(k,'IntToStringMap')};j.prototype.getStringToBoolMap=function(k){'use strict';return this.$XRequest3(k,'StringToBoolMap')};j.prototype.getStringToEnumMap=function(k){'use strict';return this.$XRequest3(k,'StringToEnumMap')};j.prototype.getStringToFloatMap=function(k){'use strict';return this.$XRequest3(k,'StringToFloatMap')};j.prototype.getStringToIntMap=function(k){'use strict';return this.$XRequest3(k,'StringToIntMap')};j.prototype.getStringToStringMap=function(k){'use strict';return this.$XRequest3(k,'StringToStringMap')};j.prototype.getOptionalEnumToBoolMap=function(k){'use strict';return this.$XRequest4(k,'EnumToBoolMap')};j.prototype.getOptionalEnumToEnumMap=function(k){'use strict';return this.$XRequest4(k,'EnumToEnumMap')};j.prototype.getOptionalEnumToFloatMap=function(k){'use strict';return this.$XRequest4(k,'EnumToFloatMap')};j.prototype.getOptionalEnumToIntMap=function(k){'use strict';return this.$XRequest4(k,'EnumToIntMap')};j.prototype.getOptionalEnumToStringMap=function(k){'use strict';return this.$XRequest4(k,'EnumToStringMap')};j.prototype.getOptionalIntToBoolMap=function(k){'use strict';return this.$XRequest4(k,'IntToBoolMap')};j.prototype.getOptionalIntToEnumMap=function(k){'use strict';return this.$XRequest4(k,'IntToEnumMap')};j.prototype.getOptionalIntToFloatMap=function(k){'use strict';return this.$XRequest4(k,'IntToFloatMap')};j.prototype.getOptionalIntToIntMap=function(k){'use strict';return this.$XRequest4(k,'IntToIntMap')};j.prototype.getOptionalIntToStringMap=function(k){'use strict';return this.$XRequest4(k,'IntToStringMap')};j.prototype.getOptionalStringToBoolMap=function(k){'use strict';return this.$XRequest4(k,'StringToBoolMap')};j.prototype.getOptionalStringToEnumMap=function(k){'use strict';return this.$XRequest4(k,'StringToEnumMap')};j.prototype.getOptionalStringToFloatMap=function(k){'use strict';return this.$XRequest4(k,'StringToFloatMap')};j.prototype.getOptionalStringToIntMap=function(k){'use strict';return this.$XRequest4(k,'StringToIntMap')};j.prototype.getOptionalStringToStringMap=function(k){'use strict';return this.$XRequest4(k,'StringToStringMap')};j.prototype.getEnumToNullableEnumMap=function(k){'use strict';return this.$XRequest3(k,'EnumToNullableEnumMap')};j.prototype.getEnumToNullableFloatMap=function(k){'use strict';return this.$XRequest3(k,'EnumToNullableFloatMap')};j.prototype.getEnumToNullableIntMap=function(k){'use strict';return this.$XRequest3(k,'EnumToNullableIntMap')};j.prototype.getEnumToNullableStringMap=function(k){'use strict';return this.$XRequest3(k,'EnumToNullableStringMap')};j.prototype.getIntToNullableEnumMap=function(k){'use strict';return this.$XRequest3(k,'IntToNullableEnumMap')};j.prototype.getIntToNullableFloatMap=function(k){'use strict';return this.$XRequest3(k,'IntToNullableFloatMap')};j.prototype.getIntToNullableIntMap=function(k){'use strict';return this.$XRequest3(k,'IntToNullableIntMap')};j.prototype.getIntToNullableStringMap=function(k){'use strict';return this.$XRequest3(k,'IntToNullableStringMap')};j.prototype.getStringToNullableEnumMap=function(k){'use strict';return this.$XRequest3(k,'StringToNullableEnumMap')};j.prototype.getStringToNullableFloatMap=function(k){'use strict';return this.$XRequest3(k,'StringToNullableFloatMap')};j.prototype.getStringToNullableIntMap=function(k){'use strict';return this.$XRequest3(k,'StringToNullableIntMap')};j.prototype.getStringToNullableStringMap=function(k){'use strict';return this.$XRequest3(k,'StringToNullableStringMap')};j.prototype.getOptionalEnumToNullableEnumMap=function(k){'use strict';return this.$XRequest4(k,'EnumToNullableEnumMap')};j.prototype.getOptionalEnumToNullableFloatMap=function(k){'use strict';return this.$XRequest4(k,'EnumToNullableFloatMap')};j.prototype.getOptionalEnumToNullableIntMap=function(k){'use strict';return this.$XRequest4(k,'EnumToNullableIntMap')};j.prototype.getOptionalEnumToNullableStringMap=function(k){'use strict';return this.$XRequest4(k,'EnumToNullableStringMap')};j.prototype.getOptionalIntToNullableEnumMap=function(k){'use strict';return this.$XRequest4(k,'IntToNullableEnumMap')};j.prototype.getOptionalIntToNullableFloatMap=function(k){'use strict';return this.$XRequest4(k,'IntToNullableFloatMap')};j.prototype.getOptionalIntToNullableIntMap=function(k){'use strict';return this.$XRequest4(k,'IntToNullableIntMap')};j.prototype.getOptionalIntToNullableStringMap=function(k){'use strict';return this.$XRequest4(k,'IntToNullableStringMap')};j.prototype.getOptionalStringToNullableEnumMap=function(k){'use strict';return this.$XRequest4(k,'StringToNullableEnumMap')};j.prototype.getOptionalStringToNullableFloatMap=function(k){'use strict';return this.$XRequest4(k,'StringToNullableFloatMap')};j.prototype.getOptionalStringToNullableIntMap=function(k){'use strict';return this.$XRequest4(k,'StringToNullableIntMap')};j.prototype.getOptionalStringToNullableStringMap=function(k){'use strict';return this.$XRequest4(k,'StringToNullableStringMap')};j.prototype.$XRequest3=function(k,l){'use strict';this.$XRequest5(k,l);var m=this.$XRequest1[k];if(!Object.prototype.hasOwnProperty.call(this.$XRequest2,k)&&m.defaultValue!=null){!m.required||h(0);return i(l,m.defaultValue,m.enumType)}m.required||l==='Bool'||m.defaultValue!=null||h(0);return i(l,this.$XRequest2[k],m.enumType)};j.prototype.$XRequest4=function(k,l){'use strict';this.$XRequest5(k,l);var m=this.$XRequest1[k];!m.required||h(0);!m.defaultValue||h(0);if(Object.prototype.hasOwnProperty.call(this.$XRequest2,k))return i(l,this.$XRequest2[k],m.enumType);return null};j.prototype.$XRequest5=function(k,l){'use strict';Object.prototype.hasOwnProperty.call(this.$XRequest1,k)||h(0);this.$XRequest1[k].type===l||h(0)};f.exports=j}),null);
__d('XController',['XControllerURIBuilder','XRequest'],(function a(b,c,d,e,f,g){function h(i,j){'use strict';this.$XController1=i;this.$XController2=j}h.prototype.getURIBuilder=function(i){'use strict';var j=new (c('XControllerURIBuilder'))(this.$XController1,this.$XController2);if(i){var k=this.getRequest(i);Object.keys(this.$XController2).forEach(function(l){var m=this.$XController2[l],n='';if(!m.required&&!Object.prototype.hasOwnProperty.call(m,'defaultValue'))n='Optional';var o='get'+n+m.type,p=k[o](l);if(p==null||Object.prototype.hasOwnProperty.call(m,'defaultValue')&&p===m.defaultValue)return;var q='set'+m.type;j[q](l,p)},this)}return j};h.prototype.getRequest=function(i){'use strict';return new (c('XRequest'))(this.$XController1,this.$XController2,i)};h.create=function(i,j){'use strict';return new h(i,j)};f.exports=h}),18);
__d("XLynxAsyncCallbackController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/si\/linkclick\/ajax_callback\/",{lynx_uri:{type:"String"}})}),null);
__d('isLinkshimURI',['isFacebookURI','isMessengerDotComURI'],(function a(b,c,d,e,f,g){'use strict';function h(i){var j=i.getPath();if((j==='/l.php'||j.indexOf('/si/ajax/l/')===0||j.indexOf('/l/')===0||j.indexOf('l/')===0)&&(c('isFacebookURI')(i)||c('isMessengerDotComURI')(i)))return true;return false}f.exports=h}),null);
__d('FBLynx',['$','AsyncSignal','XLynxAsyncCallbackController','Event','isLinkshimURI','LinkshimHandlerConfig','Parent','URI'],(function a(b,c,d,e,f,g){'use strict';function h(j){if(!c('isLinkshimURI')(j))return null;var k=j.getQueryData().u;if(!k)return null;return k}var i={alreadySetup:false,setupDelegation:function j(){var k=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(document.body==null){if(k)return;setTimeout(function(){i.setupDelegation(true)},100);return}if(i.alreadySetup)return;i.alreadySetup=true;c('Event').listen(document.body,'click',function(event){var l=i.getMaybeLynxLink(event.target);if(!l)return;var m=l[0],n=l[1];switch(m){case 'async':case 'asynclazy':i.logAsyncClick(n);break;case 'origin':i.originReferrerPolicyClick(n);break;case 'hover':i.hoverClick(n);break;}});c('Event').listen(document.body,'mouseover',function(event){var l=i.getMaybeLynxLink(event.target);if(!l)return;var m=l[0],n=l[1];switch(m){case 'async':case 'asynclazy':case 'origin':case 'hover':i.mouseover(n);break;}});c('Event').listen(document.body,'contextmenu',function(event){var l=i.getMaybeLynxLink(event.target);if(!l)return;var m=l[0],n=l[1];switch(m){case 'async':case 'hover':case 'origin':i.contextmenu(n);break;case 'asynclazy':break;}})},getMaybeLynxLink:function j(k){var l=c('Parent').byAttribute(k,'data-lynx-mode');if(l instanceof HTMLAnchorElement){var m=l.getAttribute('data-lynx-mode');switch(m){case 'async':case 'asynclazy':case 'hover':case 'origin':return [m,l];default:return null;}}return null},logAsyncClick:function j(k){i.swapLinkWithUnshimmedLink(k);var l=k.getAttribute('data-lynx-uri');if(!l)return;var m=c('XLynxAsyncCallbackController').getURIBuilder().getURI();new (c('AsyncSignal'))(m,{lynx_uri:l}).send()},originReferrerPolicyClick:function j(k){var l=c('$')('meta_referrer');l.content=c('LinkshimHandlerConfig').switched_meta_referrer_policy;i.logAsyncClick(k);setTimeout(function(){l.content=c('LinkshimHandlerConfig').default_meta_referrer_policy},100)},hoverClick:function j(k){i.revertSwapIfLynxURIPresent(k)},mouseover:function j(k){i.swapLinkWithUnshimmedLink(k)},contextmenu:function j(k){i.revertSwapIfLynxURIPresent(k)},swapLinkWithUnshimmedLink:function j(k){var l=k.href,m=h(new (c('URI'))(l));if(!m)return;k.setAttribute('data-lynx-uri',l);k.href=m},revertSwapIfLynxURIPresent:function j(k){var l=k.getAttribute('data-lynx-uri');if(!l)return;k.removeAttribute('data-lynx-uri');k.href=l}};f.exports=i}),null);
__d('requestAnimationFrame',['TimerStorage','requestAnimationFrameAcrossTransitions'],(function a(b,c,d,e,f,g){f.exports=function h(i){var j=void 0;function k(){c('TimerStorage').unset(c('TimerStorage').ANIMATION_FRAME,j);Function.prototype.apply.call(i,this,arguments)}if(i.__tsGuarded){k.__tsGuarded=true;k.__cancelCallback=i.__cancelCallback;k.__creationID=i.__creationID}j=c('requestAnimationFrameAcrossTransitions').call(b,k);c('TimerStorage').set(c('TimerStorage').ANIMATION_FRAME,j);return j}}),18);
__d('queryThenMutateDOM',['ErrorUtils','Run','TimeSlice','emptyFunction','requestAnimationFrame'],(function a(b,c,d,e,f,g){var h,i,j={},k=[],l=[];function m(q,r,s){if(!q&&!r)return;if(s&&Object.prototype.hasOwnProperty.call(j,s)){return}else if(s)j[s]=1;var t=c('TimeSlice').guard(r||c('emptyFunction'),'queryThenMutateDOM mutation callback',{isContinuation:true}),u=c('TimeSlice').guard(q||c('emptyFunction'),'queryThenMutateDOM query callback',{isContinuation:true});k.push(t);l.push(u);o();if(!h){h=true;c('Run').onLeave(function(){h=false;i=false;j={};k.length=0;l.length=0})}}m.prepare=function(q,r,s){return function(){for(var t=arguments.length,u=Array(t),v=0;v<t;v++)u[v]=arguments[v];u.unshift(this);var w=Function.prototype.bind.apply(q,u),x=r.bind(this);m(w,x,s)}};var n=c('TimeSlice').guard(function(){while(l.length){j={};var q=[];while(l.length){var r=l.shift();q.push(p(r))}var s=q.length;while(s--){var t=k.shift();p(t,null,[q.shift()])}}i=false},'queryThenMutateDOM runScheduledQueriesAndMutations',{isContinuation:false});function o(){if(!i&&(l.length||k.length)){i=true;c('requestAnimationFrame')(n)}}function p(q,r,s,t,u){return c('ErrorUtils').applyWithGuard(q,r,s,t,u)}f.exports=m}),18);
__d('getElementText',['isElementNode','isTextNode'],(function a(b,c,d,e,f,g){var h=null;function i(j){if(c('isTextNode')(j)){return j.data}else if(c('isElementNode')(j)){if(h===null){var k=document.createElement('div');h=k.textContent!=null?'textContent':'innerText'}return j[h]}else return '';}f.exports=i}),null);
__d('keyMirror',['invariant'],(function a(b,c,d,e,f,g,h){'use strict';var i=function j(k){var l={},m;k instanceof Object&&!Array.isArray(k)||h(0);for(m in k){if(!Object.prototype.hasOwnProperty.call(k,m))continue;l[m]=m}return l};f.exports=i}),18);
__d('csx',[],(function a(b,c,d,e,f,g){function h(i){throw new Error('csx: Unexpected class selector transformation.')}f.exports=h}),18);