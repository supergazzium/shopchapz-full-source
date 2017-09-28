if (self.CavalryLogger) { CavalryLogger.start_js(["VBka0"]); }

__d("ArtilleryLoggerType",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({PRELIMINARY_UPLOAD:"preliminary",FULL_UPLOAD:"full_upload"})}),null);
__d('ServiceWorkerRegistration',['Promise','ClientServiceWorkerMessage'],(function a(b,c,d,e,f,g){var h='serviceWorker' in navigator;function i(){var k=navigator.serviceWorker;if(!h||!k)throw new Error('serviceWorker is not supported in this browser');return k}var j={isSupported:function k(){return h},registerWorkerIfUnregistered:function k(l){var m=i();return new (c('Promise'))(function(n,o){this.getWorkerRegistration(l).done(function(p){if(!p){c('Promise').resolve(m.register(l,{updateViaCache:'all'})).done(function(){c('Promise').resolve(m.ready).done(n)})}else n(p);})}.bind(this))},unregisterControllingWorker:function k(){return new (c('Promise'))(function(l,m){var n=new (c('ClientServiceWorkerMessage'))('unregister',{},function(){l(true)});n.sendViaController()})},getWorkerRegistration:function k(l){var m=i();return c('Promise').resolve(m.getRegistration(l))},isAWorkerActivated:function k(){if(!navigator.serviceWorker||!navigator.serviceWorker.getRegistration)return c('Promise').resolve(false);return navigator.serviceWorker.getRegistration().then(function(l){return !!(l&&l.active)})}};f.exports=j}),null);
__d('ArtillerySWDataCollector',['Promise','ArtillerySWConfig','ClientServiceWorkerMessage','ServiceWorkerRegistration','pageLoadedViaSWCache','setTimeoutAcrossTransitions'],(function a(b,c,d,e,f,g){var h=5000,i=null;function j(l){var m=false,n=new (c('ClientServiceWorkerMessage'))('asw-pageTraceDataRequest',{fullSWEFLog:c('ArtillerySWConfig').shouldLogEFRsrcs},function(o){var p=o.data,q=p.command,r=p.data;if(m)return;m=true;if(q==='trace'&&r.workerPerf){var s=void 0;if(r.workerPerf.annotations.stringProps&&r.workerPerf.annotations.stringProps.fullCacheHitData){s=r.workerPerf.annotations.stringProps.fullCacheHitData;delete r.workerPerf.annotations.stringProps.fullCacheHitData}l({workerPerf:r.workerPerf,fullCacheHitData:s});return}});n.sendViaController()}var k={collect:function l(){if(i!==null)return i;i=new (c('Promise'))(function(m,n){if(!c('pageLoadedViaSWCache')())c('ServiceWorkerRegistration').isAWorkerActivated().then(function(o){if(o){c('setTimeoutAcrossTransitions')(function(){m()},h)}else{m();return}})['catch'](m);j(m)});return i}};f.exports=k}),null);
__d("BrowserProfiler",[],(function a(b,c,d,e,f,g){var h={isEnabled:function i(){return this.isAvailable()},isAvailable:function i(){return !!window.facebookLowLevelProfiler},getProfile:function i(j){window.facebookLowLevelProfiler.getData(function(k){j(k)})},notifyTracePosted:function i(j,k){window.facebookLowLevelProfiler.notifyTracePosted(j,k)}};f.exports=h}),null);
/**
 * @providesModule SnappyCompress
 * @preserve-whitespace
 *
 * snappyjs:
 *   license: MIT
 *   author: Zhipeng Jia
 *   version: 0.5.0
 *
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
__d("SnappyCompress",[],(function $module_SnappyCompress(global,require,requireDynamic,requireLazy,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof requireSnappy=="function"&&requireSnappy;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof requireSnappy=="function"&&requireSnappy;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(requireSnappy,module,exports){
var SnappyJS=window.SnappyJS||{};SnappyJS.uncompress=requireSnappy("./index").uncompress,SnappyJS.compress=requireSnappy("./index").compress,window.SnappyJS=SnappyJS;
},{"./index":2}],2:[function(requireSnappy,module,exports){
"use strict";function isNode(){return"object"==typeof process&&"object"==typeof process.versions&&"undefined"!=typeof process.versions.node?!0:!1}function isUint8Array(r){return r instanceof Uint8Array&&(!is_node||!Buffer.isBuffer(r))}function isArrayBuffer(r){return r instanceof ArrayBuffer}function isBuffer(r){return is_node?Buffer.isBuffer(r):!1}function uncompress(r){if(!isUint8Array(r)&&!isArrayBuffer(r)&&!isBuffer(r))throw new TypeError(TYPE_ERROR_MSG);var e=!1,s=!1;isUint8Array(r)?e=!0:isArrayBuffer(r)&&(s=!0,r=new Uint8Array(r));var n=new SnappyDecompressor(r),o=n.readUncompressedLength();if(-1===o)throw new Error("Invalid Snappy bitstream");var f,i;if(e){if(f=new Uint8Array(o),!n.uncompressToBuffer(f))throw new Error("Invalid Snappy bitstream")}else if(s){if(f=new ArrayBuffer(o),i=new Uint8Array(f),!n.uncompressToBuffer(i))throw new Error("Invalid Snappy bitstream")}else if(f=new Buffer(o),!n.uncompressToBuffer(f))throw new Error("Invalid Snappy bitstream");return f}function compress(r){if(!isUint8Array(r)&&!isArrayBuffer(r)&&!isBuffer(r))throw new TypeError(TYPE_ERROR_MSG);var e=!1,s=!1;isUint8Array(r)?e=!0:isArrayBuffer(r)&&(s=!0,r=new Uint8Array(r));var n,o,f,i=new SnappyCompressor(r),p=i.maxCompressedLength();return e?(n=new Uint8Array(p),f=i.compressToBuffer(n)):s?(n=new ArrayBuffer(p),o=new Uint8Array(n),f=i.compressToBuffer(o)):(n=new Buffer(p),f=i.compressToBuffer(n)),n.slice(0,f)}var is_node=isNode(),SnappyDecompressor=requireSnappy("./snappy_decompressor").SnappyDecompressor,SnappyCompressor=requireSnappy("./snappy_compressor").SnappyCompressor,TYPE_ERROR_MSG="Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array";exports.uncompress=uncompress,exports.compress=compress;

},{"./snappy_compressor":3,"./snappy_decompressor":4}],3:[function(requireSnappy,module,exports){
"use strict";function hashFunc(r,e){return 506832829*r>>>e}function load32(r,e){return r[e]+(r[e+1]<<8)+(r[e+2]<<16)+(r[e+3]<<24)}function equals32(r,e,a){return r[e]===r[a]&&r[e+1]===r[a+1]&&r[e+2]===r[a+2]&&r[e+3]===r[a+3]}function copyBytes(r,e,a,t,n){var o;for(o=0;n>o;o++)a[t+o]=r[e+o]}function emitLiteral(r,e,a,t,n){return 60>=a?(t[n]=a-1<<2,n+=1):256>a?(t[n]=240,t[n+1]=a-1,n+=2):(t[n]=244,t[n+1]=a-1&255,t[n+2]=a-1>>>8,n+=3),copyBytes(r,e,t,n,a),n+a}function emitCopyLessThan64(r,e,a,t){return 12>t&&2048>a?(r[e]=1+(t-4<<2)+(a>>>8<<5),r[e+1]=255&a,e+2):(r[e]=2+(t-1<<2),r[e+1]=255&a,r[e+2]=a>>>8,e+3)}function emitCopy(r,e,a,t){for(;t>=68;)e=emitCopyLessThan64(r,e,a,64),t-=64;return t>64&&(e=emitCopyLessThan64(r,e,a,60),t-=60),emitCopyLessThan64(r,e,a,t)}function compressFragment(r,e,a,t,n){for(var o=1;a>=1<<o&&MAX_HASH_TABLE_BITS>=o;)o+=1;o-=1;var s=32-o;"undefined"==typeof global_hash_tables[o]&&(global_hash_tables[o]=new Uint16Array(1<<o));var i,h=global_hash_tables[o];for(i=0;i<h.length;i++)h[i]=0;var u,p,l,f,c,y,m,_,L,C,B,S,b=e+a,d=e,A=e,T=!0,g=15;if(a>=g)for(u=b-g,e+=1,l=hashFunc(load32(r,e),s);T;){y=32,f=e;do{if(e=f,p=l,m=y>>>5,y+=1,f=e+m,e>u){T=!1;break}l=hashFunc(load32(r,f),s),c=d+h[p],h[p]=e-d}while(!equals32(r,e,c));if(!T)break;n=emitLiteral(r,A,e-A,t,n);do{for(_=e,L=4;b>e+L&&r[e+L]===r[c+L];)L+=1;if(e+=L,C=_-c,n=emitCopy(t,n,C,L),A=e,e>=u){T=!1;break}B=hashFunc(load32(r,e-1),s),h[B]=e-1-d,S=hashFunc(load32(r,e),s),c=d+h[S],h[S]=e-d}while(equals32(r,e,c));if(!T)break;e+=1,l=hashFunc(load32(r,e),s)}return b>A&&(n=emitLiteral(r,A,b-A,t,n)),n}function putVarint(r,e,a){do e[a]=127&r,r>>>=7,r>0&&(e[a]+=128),a+=1;while(r>0);return a}function SnappyCompressor(r){this.array=r}var BLOCK_LOG=16,BLOCK_SIZE=1<<BLOCK_LOG,MAX_HASH_TABLE_BITS=14,global_hash_tables=new Array(MAX_HASH_TABLE_BITS+1);SnappyCompressor.prototype.maxCompressedLength=function(){var r=this.array.length;return 32+r+Math.floor(r/6)},SnappyCompressor.prototype.compressToBuffer=function(r){var e,a=this.array,t=a.length,n=0,o=0;for(o=putVarint(t,r,o);t>n;)e=Math.min(t-n,BLOCK_SIZE),o=compressFragment(a,n,e,r,o),n+=e;return o},exports.SnappyCompressor=SnappyCompressor;

},{}],4:[function(requireSnappy,module,exports){
"use strict";function copyBytes(r,e,s,t,o){var p;for(p=0;o>p;p++)s[t+p]=r[e+p]}function selfCopyBytes(r,e,s,t){var o;for(o=0;t>o;o++)r[e+o]=r[e-s+o]}function SnappyDecompressor(r){this.array=r,this.pos=0}var WORD_MASK=[0,255,65535,16777215,4294967295];SnappyDecompressor.prototype.readUncompressedLength=function(){for(var r,e,s=0,t=0;32>t&&this.pos<this.array.length;){if(r=this.array[this.pos],this.pos+=1,e=127&r,e<<t>>>t!==e)return-1;if(s|=e<<t,128>r)return s;t+=7}return-1},SnappyDecompressor.prototype.uncompressToBuffer=function(r){for(var e,s,t,o,p=this.array,n=p.length,i=this.pos,a=0;i<p.length;)if(e=p[i],i+=1,0===(3&e)){if(s=(e>>>2)+1,s>60){if(i+3>=n)return!1;t=s-60,s=p[i]+(p[i+1]<<8)+(p[i+2]<<16)+(p[i+3]<<24),s=(s&WORD_MASK[t])+1,i+=t}if(i+s>n)return!1;copyBytes(p,i,r,a,s),i+=s,a+=s}else{switch(3&e){case 1:s=(e>>>2&7)+4,o=p[i]+(e>>>5<<8),i+=1;break;case 2:if(i+1>=n)return!1;s=(e>>>2)+1,o=p[i]+(p[i+1]<<8),i+=2;break;case 3:if(i+3>=n)return!1;s=(e>>>2)+1,o=p[i]+(p[i+1]<<8)+(p[i+2]<<16)+(p[i+3]<<24),i+=4}if(0===o||o>a)return!1;selfCopyBytes(r,a,o,s),a+=s}return!0},exports.SnappyDecompressor=SnappyDecompressor;

},{}]},{},[1]);

module.exports = SnappyJS;

/* tcRs24QsxV3 */}),null);
__d('getFirstPaint',['performance'],(function a(b,c,d,e,f,g){'use strict';function h(){var i=void 0;if(c('performance')&&c('performance').timing)if(window.chrome&&window.chrome.loadTimes){var j=window.chrome.loadTimes();i=parseInt(j.firstPaintTime*1000,10)}else if(typeof c('performance').timing.msFirstPaint==='number')i=c('performance').timing.msFirstPaint;return i||null}f.exports=h}),null);
__d('ArtilleryLogger',['Arbiter','ArtilleryExperiments','ArtilleryLoggerType','ArtillerySWDataCollector','Banzai','BigPipe','BigPipeExperiments','BrowserProfiler','Heartbeat','ImageTimingHelper','Map','NavigationMetrics','NavigationTimingHelper','PageletEventsHelper','ResourceTimingBootloaderHelper','SnappyCompress','TimeSliceHelper','TimeSliceInteraction','forEachObject','pageLoadedViaSWCache','performance','performanceAbsoluteNow','getFirstPaint'],(function a(b,c,d,e,f,g){var h=c('BigPipeExperiments').link_images_to_pagelets,i=c('ArtilleryExperiments').artillery_static_resources_pagelet_attribution,j=c('ArtilleryExperiments').artillery_timeslice_compressed_data,k=c('ArtilleryExperiments').artillery_miny_client_payload,l='generation_time',m='__user_annotations',n='serviceworker_trace',o='serviceworker',p='first_paint',q='browser_profile',r='artillery_logger_data',s='artillery_browser_perf_data',t=new (c('Map'))(),u=new (c('Map'))(),v=false,w=new (c('Map'))(),x=new (c('Map'))();function y(){return c('performance')&&c('performance').timing&&c('performance').timing.navigationStart}function z(oa){if(!t.has(oa))t.set(oa,{});}function aa(oa){oa.subscribe(c('BigPipe').Events.tti,function(pa,qa){var ra=qa.ts,sa=qa.lid,ta=qa.metrics;z(sa);var ua=t.get(sa);ua.t_bigpipe_tti=ra;c('forEachObject')(ta,function(va,wa){ua[wa]=va})})}function ba(oa){oa.subscribe(c('BigPipe').Events.displayed,function(pa,qa){var ra=qa.ts,sa=qa.lid;z(sa);t.get(sa).t_marker_all_pagelets_displayed=ra;c('Heartbeat').disablePageHeartbeat();c('ArtillerySWDataCollector').collect().done(function(ta){if(ta)x.set(sa,ta);})})}function ca(oa){oa.subscribe(c('BigPipe').Events.loaded,function(pa,qa){var ra=qa.ts,sa=qa.lid;z(sa);t.get(sa).t_marker_bigpipe_e2e=ra})}function da(oa,pa){if(!oa)return;if(pa.profile){var qa=ma(pa.profile);if(qa!==null){pa.profile=qa;pa.snappy=true}}var ra={clientData:oa,browserPerfData:pa,traceType:'pageload'};c('Banzai').post(s,ra,c('Banzai').VITAL);c('BrowserProfiler').notifyTracePosted(ra.clientData.traceID,ra.traceType)}function ea(oa,pa,qa){var ra,sa=qa;if(c('BrowserProfiler').isEnabled()&&u.has(sa))(function(){var ta=u.get(sa);window.requestIdleCallback(function(){c('BrowserProfiler').getProfile(function(ua){da(ta,ua)})})})();fa(oa,pa,qa)}function fa(oa,pa,qa){var ra,sa=c('performanceAbsoluteNow')(),ta=qa;if(!u.has(ta)||!t.has(ta))return;var ua=t.get(ta);ua.uploadType=c('ArtilleryLoggerType').FULL_UPLOAD;ja(ua);ga();var va=c('performanceAbsoluteNow')(),wa=null;if(oa==='normal'){wa=0;ua.navigation_timing=c('NavigationTimingHelper').getNavTimings()}else if(oa==='quickling'&&c('performance').getEntriesByName){var xa=c('performance').getEntriesByName(pa);ua.navigation_timing=c('NavigationTimingHelper').getAsyncRequestTimings(pa);if(xa.length)wa=xa[0].startTime;}if(wa!=null&&y()){var ya=wa+c('performance').timing.navigationStart;ua.resource_timing_bootloader=c('ResourceTimingBootloaderHelper').getMetrics(ya,h,ta);var za=c('TimeSliceHelper').getMetrics(ya,ua.t_onload,1,1);if(j){ua.time_slice=c('TimeSliceHelper').formatMetricsForTransport(za)}else ua.time_slice=za;ua.extra_points=c('TimeSliceInteraction').getPageLoadPoints(ya,va);ua.interaction_ids=c('TimeSliceInteraction').getInteractionIDsBetween(ya,va)}ua.pagelet_events=c('PageletEventsHelper').getMetrics(ta);if(!i&&ua.pagelet_events){if(ua.pagelet_events.display_resources)delete ua.pagelet_events.display_resources;if(ua.pagelet_events.all_resources)delete ua.pagelet_events.all_resources;}la(ta);ka(ua);var ab=babelHelpers['extends']({},ua,u.get(ta).data),bb=x.get(ta);if(oa==='normal'&&bb!=null)ab[o]=bb.workerPerf;if(oa==='normal')ab[p]=c('getFirstPaint')();if(w.size){ab[m]={};w.forEach(function(cb,db){ab[m][db]=cb})}u['delete'](ta);t['delete'](ta);if(k)(function(){var cb=['resource_timing_bootloader','pagelet_events'],db={};cb.forEach(function(eb){var fb=ab[eb];if(fb==null)return;var gb=JSON.stringify(fb),hb=ma(gb);if(hb!==null){db[eb]=hb;delete ab[eb]}});ab.miny=db})();ab[l]=c('performanceAbsoluteNow')()-sa;c('Banzai').post(r,ab,c('Banzai').VITAL)}function ga(){var oa=navigator&&navigator.hardwareConcurrency;na.recordUserAnnotation('num_cores',oa!=null?oa.toString():'unknown');if(navigator&&navigator.deviceMemory&&typeof navigator.deviceMemory==='number')na.recordUserAnnotation('ram_gb',navigator.deviceMemory.toString());na.recordUserAnnotation('client_pixel_ratio_10x',((window.devicePixelRatio||1)*10).toString());na.recordUserAnnotation('is_sw_page_loaded_via_cache',c('pageLoadedViaSWCache')()?'1':'0');if(c('performance')&&c('performance').navigation)na.recordUserAnnotation('nav_type',ha(c('performance').navigation.type));na.recordUserAnnotation('images_preparsed',c('BigPipeExperiments').preparse_content&&c('BigPipeExperiments').preparse_content!=='off'?'1':'0')}function ha(oa){switch(oa){case 0:return 'TYPE_NAVIGATE';case 1:return 'TYPE_RELOAD';case 2:return 'TYPE_BACK_FORWARD';case 255:return 'TYPE_RESERVED';default:return 'unknown navigation type';}}function ia(){c('NavigationMetrics').addListener(c('NavigationMetrics').Events.NAVIGATION_DONE,function(oa,pa){var qa=pa.pageType,ra=pa.pageURI,sa=pa.serverLID;ea(qa,ra,sa)})}function ja(oa){var pa;if(window.CavalryLogger)(function(){var qa=window.CavalryLogger.getInstance(),ra=['t_domcontent','t_pagelet_cssload_early_resources','t_tti','t_onload'];ra.forEach(function(sa){if(Object.prototype.hasOwnProperty.call(qa.values,sa))oa[sa]=qa.values[sa];})})();}function ka(oa){if(window.CavalryLogger){var pa=window.CavalryLogger.getInstance();c('ResourceTimingBootloaderHelper').mergeBootloaderMetricsAndResourceTimings(oa.resource_timing_bootloader,pa.bootloader_metrics,true)}}function la(oa){var pa=t.get(oa);if(y()){var qa=c('performance').timing.navigationStart,ra=pa.t_bigpipe_tti,sa=pa.t_marker_bigpipe_e2e,ta=c('ImageTimingHelper').getImageTimings(oa),ua=c('ResourceTimingBootloaderHelper').getLastTTIAndE2EImageResponseEnds(ra,sa,ta),va=ua.TTI,wa=ua.E2E;if(!isNaN(va)&&va!==qa)pa.t_tti_with_images=va;if(!isNaN(wa)&&wa!==qa)pa.t_marker_bigpipe_e2e_with_images=wa;}}function ma(oa){if(window.Uint8Array===undefined||window.btoa===undefined)return null;var pa=new window.Uint8Array(oa.length);for(var qa=0;qa<oa.length;qa++)pa[qa]=oa.charCodeAt(qa);var ra=c('SnappyCompress').compress(pa),sa='';for(var ta=0;ta<ra.length;ta++)sa+=String.fromCharCode(ra[ta]);return window.btoa(sa)}var na={enableProfilingWithClientData:function oa(pa,qa,ra){z(pa);u.set(pa,{traceID:qa,data:ra});if(v)return;v=true;c('PageletEventsHelper').init();c('Arbiter').subscribe(c('BigPipe').Events.init,function(sa,ta){var ua=ta.arbiter;if(ua){aa(ua);ba(ua);ca(ua)}});ia()},recordUserAnnotation:function oa(pa,qa){var ra=arguments.length<=2||arguments[2]===undefined?true:arguments[2];if(!ra&&w.has(pa))return false;w.set(pa,qa);return true}};f.exports=na}),null);
__d('ArtillerySegment',['invariant','performanceAbsoluteNow'],(function a(b,c,d,e,f,g,h){var i=0;function j(k){'use strict';k||h(0);'category' in k&&'description' in k||h(0);this.$ArtillerySegment1=false;this.$ArtillerySegment2=babelHelpers['extends']({},k,{id:(i++).toString(36)});this.$ArtillerySegment3=[]}j.prototype.getID=function(){'use strict';return this.$ArtillerySegment2.id};j.prototype.begin=function(){'use strict';this.$ArtillerySegment2.begin=c('performanceAbsoluteNow')();return this};j.prototype.end=function(){'use strict';this.$ArtillerySegment2.end=c('performanceAbsoluteNow')();return this};j.prototype.appendChild=function(){'use strict';!this.$ArtillerySegment1||h(0);for(var k=arguments.length,l=Array(k),m=0;m<k;m++)l[m]=arguments[m];l.forEach(function(n){this.$ArtillerySegment3.push(n.getID())}.bind(this));return this};j.prototype.setPosted=function(){'use strict';this.$ArtillerySegment1=true;return this};j.prototype.getPostData=function(){'use strict';return babelHelpers['extends']({},this.$ArtillerySegment2,{id:this.$ArtillerySegment2.id,children:this.$ArtillerySegment3.slice()})};f.exports=j}),null);
__d('ArtillerySequence',['invariant'],(function a(b,c,d,e,f,g,h){var i=0;function j(k){'use strict';k||h(0);'description' in k||h(0);this.$ArtillerySequence1=false;this.$ArtillerySequence2=babelHelpers['extends']({},k,{id:(i++).toString(36)});this.$ArtillerySequence3=[]}j.prototype.getID=function(){'use strict';return this.$ArtillerySequence2.id};j.prototype.addSegment=function(){'use strict';!this.$ArtillerySequence1||h(0);for(var k=arguments.length,l=Array(k),m=0;m<k;m++)l[m]=arguments[m];l.forEach(function(n){this.$ArtillerySequence3.push(n.getID())}.bind(this));return this};j.prototype.setPosted=function(){'use strict';this.$ArtillerySequence1=true;return this};j.prototype.getPostData=function(){'use strict';return babelHelpers['extends']({},this.$ArtillerySequence2,{id:this.$ArtillerySequence2.id,segments:this.$ArtillerySequence3.slice()})};f.exports=j}),null);
__d('ArtilleryTrace',['invariant','ArtillerySegment','ArtillerySequence'],(function a(b,c,d,e,f,g,h){function i(){'use strict';this.$ArtilleryTrace1=false;this.$ArtilleryTrace3=undefined;this.$ArtilleryTrace4={};this.$ArtilleryTrace5={};this.$ArtilleryTrace6=[];this.$ArtilleryTrace7=[];this.$ArtilleryTrace8={};this.$ArtilleryTrace9=[];this.$ArtilleryTrace10=null}i.prototype.createSequence=function(j){'use strict';!this.$ArtilleryTrace1||h(0);var k=new (c('ArtillerySequence'))(j);this.$ArtilleryTrace6.push(k);return k};i.prototype.createSegment=function(j){'use strict';!this.$ArtilleryTrace1||h(0);var k=new (c('ArtillerySegment'))(j);this.$ArtilleryTrace7.push(k);return k};i.prototype.markSegment=function(j,k){'use strict';!this.$ArtilleryTrace1||h(0);this.$ArtilleryTrace8[k]=j.getID();return this};i.prototype.connectTrace=function(j,k){'use strict';!this.$ArtilleryTrace1||h(0);k=k||this.$ArtilleryTrace2;k||h(0);this.$ArtilleryTrace9.push({segment:j.getID(),trace:k});return this};i.prototype.setID=function(j,k){'use strict';!this.$ArtilleryTrace2&&!this.$ArtilleryTrace3||h(0);this.$ArtilleryTrace2=j;this.$ArtilleryTrace3=k;return this};i.prototype.getID=function(){'use strict';return this.$ArtilleryTrace2};i.prototype.getArtillery2ID=function(){'use strict';return this.$ArtilleryTrace3};i.prototype.addProperty=function(j,k){'use strict';this.$ArtilleryTrace4[j]=k;return this};i.prototype.addTagset=function(j,k){'use strict';this.$ArtilleryTrace5[j]=k;return this};i.prototype.addActivePolicies=function(j){'use strict';this.addTagset('active_policies',j);this.addTagset('policy',j);return this};i.prototype.getProperty=function(j){'use strict';return this.$ArtilleryTrace4[j]};i.prototype.getTagset=function(j){'use strict';return this.$ArtilleryTrace5[j]};i.prototype.getActivePolicies=function(){'use strict';return this.getTagset('active_policies')};i.prototype.post=function(){'use strict';!this.$ArtilleryTrace1||h(0);this.$ArtilleryTrace1=true;var j=this.$ArtilleryTrace10;if(j)j({id:this.$ArtilleryTrace2,artillery2Id:this.$ArtilleryTrace3,properties:this.$ArtilleryTrace4,tagsets:this.$ArtilleryTrace5,sequences:this.$ArtilleryTrace6.map(function(k){return k.setPosted().getPostData()}),segments:this.$ArtilleryTrace7.map(function(k){return k.setPosted().getPostData()}),marks:Object.assign({},this.$ArtilleryTrace8),connections:this.$ArtilleryTrace9.slice()});};i.prototype.setOnPost=function(j){'use strict';!this.$ArtilleryTrace10||h(0);this.$ArtilleryTrace10=j;return this};i.prototype.isPosted=function(){'use strict';return this.$ArtilleryTrace1};f.exports=i}),null);
__d('Artillery',['invariant','ArtilleryTrace','Banzai','ClientServiceWorkerMessage','Run','ServiceWorkerRegistration','forEachObject','mixInEventEmitter','performance'],(function a(b,c,d,e,f,g,h){var i=false,j=false,k=[],l,m,n,o={},p={},q=false,r=false;function s(){if(i)return;i=true;c('Banzai').subscribe(c('Banzai').SHUTDOWN,function(){u._postAll()})}function t(){m=null;l=null;p={};o={};n=null;r=false}var u={isEnabled:function v(){return j},createTrace:function v(){s();var w=new (c('ArtilleryTrace'))();w.setOnPost(function(x){u.emitAndHold('posttrace',x)});k.push(w);return w},getPageTrace:function v(){l||h(0);if(n)return n;var w=u.createTrace().setID(l,m);c('forEachObject')(o,function(x,y,z){w.addProperty(y,x)});c('forEachObject')(p,function(x,y,z){w.addTagset(y,x)});n=w;return w},setPageProperties:function v(w){o=w},addPageTagset:function v(w,x){if(n==null){p[w]=x}else n.addTagset(w,x);},setActivePolicies:function v(w){this.addPageTagset('active_policies',w);this.addPageTagset('policy',w)},getPageActivePolicies:function v(){return this.getPageTagset('active_policies')},enableLogServiceWorker:function v(){if(c('ServiceWorkerRegistration').isSupported())q=true;},getPageProperty:function v(w){if(n==null){return o[w]}else return n.getProperty(w);},getPageTagset:function v(w){if(n==null){return p[w]}else return n.getTagset(w);},enable:function v(){j=true;if(!r){c('Run').onLeave(t);r=true}},disable:function v(){j=false},setPageTraceID:function v(w,x){if(l===w&&m===x)return;!l&&!m||h(0);l=w;m=x;if(q&&c('performance')&&c('performance').timing&&c('performance').timing.navigationStart){var y=new (c('ClientServiceWorkerMessage'))('asw-sendStartupData',{traceID:m,windowStart:c('performance').timing.navigationStart},null);y.sendViaController()}},addPiggyback:function v(w,x){if(window.CavalryLogger)window.CavalryLogger.getInstance().addPiggyback(w,x);},_postAll:function v(){k.forEach(function(w){return !w.isPosted()&&w.post()})}};c('mixInEventEmitter')(u,{posttrace:true});f.exports=u}),null);