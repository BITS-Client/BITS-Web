import{o as e,s as t}from"./B46eZZnu.js";import{t as n}from"./HclGiUj8.js";import"./xihTtKlq.js";import{t as r}from"./BGze3w87.js";import{l as i}from"./CO95ceK-.js";var a=`admin@bits.co.id`,o=`+62 819 678 048`,s=`j996ej4v`,c=`https://bits.co.id`,l=`0x4AAAAAACEIn-rYc15eCGx7`,u=`62819678048`,d=class extends Error{constructor(e){let t=e.url.length>400?e.url.slice(0,399)+`…`:e.url;super(`${e.method}-request to ${t} resulted in HTTP ${e.status} ${e.statusText}`),this.name=`HttpError`,this.url=e.url,this.method=e.method,this.status=e.status,this.statusText=e.statusText,this.headers=e.headers,this.body=e.body,this.response=e.response}},f=class extends Error{constructor(e){let t=e.url.length>400?e.url.slice(0,399)+`…`:e.url;super(`Request timed out after ${e.timeoutMs}ms waiting for response headers: ${e.method} ${t}`),this.name=`TimeoutError`,this.url=e.url,this.method=e.method,this.timeoutMs=e.timeoutMs,this.phase=e.phase,this.code=`ETIMEDOUT`}},p;function m(e,t,n,r,i,a){let o,s;return{status:e,statusText:t,headers:n,url:i,redirected:a,body:r,text(){return o??=(p??=new TextDecoder).decode(r)},json(){return(s??={value:JSON.parse(this.text())}).value},bytes(){return r}}}function h(e){let t=e?.fetch,n=e?.base,r=e?.httpErrors,i=e?.timeout,a=e?.credentials,o=e?.middleware??[],s=[],c=[];for(let e of o)typeof e==`object`?s.push(e):c.push(e);async function l(e,t){let{totalMs:n,headersMs:r,attachSignal:o}=g(t.timeout===void 0?i:t.timeout),{url:s,init:c,clearTotalTimer:l}=oe(t,o?n:void 0,a),u=c.method??`GET`,d=!o&&n!==void 0?ee(n,new DOMException(`The operation was aborted due to timeout`,`TimeoutError`)):void 0,p=d?.deadline,m=()=>{l?.(),d?.clear()};if(r===void 0&&p===void 0)try{return{response:await e(s,c),url:s,method:u,totalDeadline:p,clearDeadline:m}}catch(e){throw m(),e}let h=p===void 0?[]:[p],_,v;if(r!==void 0){let e=new f({url:s,method:u,timeoutMs:r,phase:`headers`});v=o?new AbortController:void 0,h.push(new Promise((t,n)=>{_=setTimeout(()=>{n(e),v?.abort(e)},r)}))}let te=v&&c.signal?AbortSignal.any([c.signal,v.signal]):v?.signal??c.signal,ne;try{return ne=Promise.resolve(v?e(s,{...c,signal:te}):e(s,c)),{response:await Promise.race([ne,...h]),url:s,method:u,totalDeadline:p,clearDeadline:m}}catch(e){throw ne?.then(e=>e.body?.cancel()).catch(()=>{}),m(),e}finally{clearTimeout(_)}}async function u(e){let{response:n,url:i,method:a,totalDeadline:o,clearDeadline:s}=await l(e.fetch??t??globalThis.fetch,e),c=e.httpErrors??r??!0;try{return await te(se(n,c,i,a),o)}finally{s()}}let d=ce(u,c);async function p(e){let t=le(e,s),n=ue(await d(t),t,s);try{return de(n,JSON.parse(n.text()))}catch(t){throw TypeError(`Failed to parse JSON response from ${e.url}: ${t instanceof Error?t.message:t}`,{cause:t})}}async function h(e){let t=le(e,s),n=ue(await d(t),t,s);return de(n,n.text())}async function _(e){let n=le(e,s),i;async function a(e){let{response:n,url:a,method:o,totalDeadline:s,clearDeadline:c}=await l(e.fetch??t??globalThis.fetch,e),u=e.httpErrors??r??!0;if(u&&n.status>=400)try{return await te(se(n,u,a,o),s)}finally{c()}return s!==void 0&&c(),i=n,m(n.status,n.statusText,n.headers,new Uint8Array,n.url,n.redirected)}if(pe(a,`getItStreamed`),await ce(a,c)(n),!i)throw Error(`Stream response was not captured`);let o=i.body??new ReadableStream({start(e){e.close()}});return de(i,o)}async function v(t){let r=typeof t==`string`?{url:t}:t,i=r.url;n&&!/^https?:\/\//.test(i)&&(i=n.replace(/\/$/,``)+`/`+i.replace(/^\//,``));let a={...r,url:i,headers:ae(e?.headers,r.headers)};switch(a.as??e?.as){case`json`:return await p(a);case`text`:return await h(a);case`stream`:return await _(a);default:{let e=le(a,s);return ue(await d(e),e,s)}}}return pe(l,`performFetch`),pe(u,`getItBuffered`),pe(_,`requestStream`),pe(p,`requestJson`),pe(h,`requestText`),pe(v,`request`),v}function g(e){return typeof e==`number`||e===!1?{totalMs:_(e),headersMs:void 0,attachSignal:!0}:{totalMs:e?.total===void 0?12e4:_(e.total),headersMs:_(e?.headers),attachSignal:e?.signal!==!1}}function _(e){if(!(e===void 0||e===!1||e<=0))return e}function v(e){typeof e==`object`&&e&&`unref`in e&&typeof e.unref==`function`&&e.unref()}function ee(e,t){let n,r=new Promise((r,i)=>{n=setTimeout(()=>i(t),e),v(n)});return r.catch(()=>{}),{deadline:r,clear:()=>clearTimeout(n)}}async function te(e,t){if(t===void 0)return e;try{return await Promise.race([e,t])}catch(t){throw e.catch(()=>{}),t}}function ne(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function re(e){return e instanceof Blob||e instanceof ArrayBuffer||e instanceof ReadableStream||ArrayBuffer.isView(e)||e instanceof FormData||e instanceof URLSearchParams}function ie(e){if(e instanceof Headers||Array.isArray(e))return e;let t={};for(let[n,r]of Object.entries(e))r!==void 0&&(t[n]=r);return t}function ae(e,t){let n=new Headers(e?ie(e):void 0);t&&new Headers(ie(t)).forEach((e,t)=>{n.set(t,e)});let r={};return n.forEach((e,t)=>{r[t]=e}),r}function oe(e,t,n){let r=e.url;if(e.query){let t=e.query instanceof URLSearchParams?e.query.entries():Object.entries(e.query),n=new URLSearchParams;for(let[e,r]of t)r!==void 0&&n.append(e,`${r}`);let i=n.toString();if(i){let e=r.indexOf(`#`),t=e===-1?r:r.slice(0,e),n=e===-1?``:r.slice(e);r=`${t}${t.includes(`?`)?`&`:`?`}${i}${n}`}}let i=new Headers(e.headers),a={};if(e.method&&(a.method=e.method),!e.method&&e.body!==void 0&&e.body!==null&&(a.method=`POST`),e.body!==void 0&&e.body!==null){if(typeof e.body==`string`)a.body=e.body;else if(ne(e.body)||Array.isArray(e.body))a.body=JSON.stringify(e.body),i.has(`content-type`)||i.set(`content-type`,`application/json`);else if(re(e.body))a.body=e.body;else throw TypeError(`Unsupported body type: ${typeof e.body}`)}a.headers=i;let o=e.signal,s;if(t!==void 0){let e=new AbortController,n=setTimeout(()=>e.abort(new DOMException(`The operation was aborted due to timeout`,`TimeoutError`)),t);v(n),s=()=>clearTimeout(n),o=o?AbortSignal.any([o,e.signal]):e.signal}o&&(a.signal=o);let c=e.credentials??n;return c!==void 0&&(a.credentials=c),e.redirect&&(a.redirect=e.redirect),{url:r,init:a,clearTotalTimer:s}}async function se(e,t,n,r){let i=await e.arrayBuffer(),a=new Uint8Array(i),o=m(e.status,e.statusText,e.headers,a,e.url,e.redirected);if(t&&e.status>=400){let t=new d({url:n,method:r,status:e.status,statusText:e.statusText,headers:e.headers,body:o.text(),response:o});throw fe(Error)&&Error.captureStackTrace(t,se),t}return o}function ce(e,t){let n=e;for(let e=t.length-1;e>=0;e--){let r=t[e],i=n;n=e=>r(e,i)}return n}function le(e,t){let n=e;for(let e of t)e.beforeRequest&&(n=e.beforeRequest(n));return n}function ue(e,t,n){let r=e;for(let e of n)e.afterResponse&&(r=e.afterResponse(r,t));return r}function de(e,t){return{status:e.status,statusText:e.statusText,headers:e.headers,url:e.url,redirected:e.redirected,body:t}}function fe(e){return`captureStackTrace`in e}function pe(e,t){Object.defineProperty(e,"name",{value:t})}function me(e){if(!he(e)||e.name!==`HttpError`||typeof e.message!=`string`||typeof e.url!=`string`||typeof e.method!=`string`||typeof e.status!=`number`||typeof e.statusText!=`string`||!ge(e.headers)||!(`body`in e)||!he(e.response))return!1;let t=e.response;return t.status===e.status&&typeof t.statusText==`string`&&ge(t.headers)&&`body`in t&&(t.url===void 0||typeof t.url==`string`)&&(t.redirected===void 0||typeof t.redirected==`boolean`)}function he(e){return typeof e==`object`&&!!e}function ge(e){return he(e)&&typeof e.get==`function`}function _e(e){let t=e?.maxRetries??5,n=e?.retryDelay??ve,r=e?.shouldRetry??ye;return async function(e,i){let a=typeof e.maxRetries==`number`?e.maxRetries:t,o;for(let t=0;t<=a;t++)try{return await i(e)}catch(i){if(o=i,t>=a||!r(i,t,e))throw i;await Ce(n(t),e.signal)}throw o}}function ve(e){return 100*2**e+Math.random()*100}function ye(e,t,n){let r=(n.method??`GET`).toUpperCase();return r!==`GET`&&r!==`HEAD`||e instanceof Error&&`name`in e&&e.name===`HttpError`?!1:xe(e)}var be=new Set([`ECONNRESET`,`ECONNREFUSED`,`ETIMEDOUT`,`EPIPE`,`ENOTFOUND`,`ENETDOWN`,`EHOSTUNREACH`,`EAI_AGAIN`,`UND_ERR_CONNECT_TIMEOUT`,`UND_ERR_SOCKET`]);function xe(e){if(!(e instanceof Error))return!1;let t=Se(e)??Se(e.cause);return t?be.has(t):e.name===`TimeoutError`||e.name===`AbortError`?!1:`retryable`in e&&typeof e.retryable==`boolean`?e.retryable:e instanceof TypeError}function Se(e){if(e instanceof Error)return`code`in e&&typeof e.code==`string`?e.code:void 0}function Ce(e,t){return new Promise((n,r)=>{if(t?.aborted){r(t.reason);return}let i=setTimeout(n,e);t?.addEventListener(`abort`,()=>{clearTimeout(i),r(t.reason)},{once:!0})})}var we=function(e,t){return we=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},we(e,t)};function Te(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Class extends value `+String(t)+` is not a constructor or null`);we(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function Ee(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}function De(e,t){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,i,a,o=Object.create((typeof Iterator==`function`?Iterator:Object).prototype);return o.next=s(0),o.throw=s(1),o.return=s(2),typeof Symbol==`function`&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return c([e,t])}}function c(s){if(r)throw TypeError(`Generator is already executing.`);for(;o&&(o=0,s[0]&&(n=0)),n;)try{if(r=1,i&&(a=s[0]&2?i.return:s[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,s[1])).done)return a;switch(i=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return n.label++,{value:s[1],done:!1};case 5:n.label++,i=s[1],s=[0];continue;case 7:s=n.ops.pop(),n.trys.pop();continue;default:if(a=n.trys,!(a=a.length>0&&a[a.length-1])&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){n.label=s[1];break}if(s[0]===6&&n.label<a[1]){n.label=a[1],a=s;break}if(a&&n.label<a[2]){n.label=a[2],n.ops.push(s);break}a[2]&&n.ops.pop(),n.trys.pop();continue}s=t.call(e,n)}catch(e){s=[6,e],i=0}finally{r=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function Oe(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function ke(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),i,a=[],o;try{for(;(t===void 0||t-->0)&&!(i=r.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}function Ae(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}function je(e){return this instanceof je?(this.v=e,this):new je(e)}function Me(e,t,n){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var r=n.apply(e,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator==`function`?AsyncIterator:Object).prototype),s(`next`),s(`throw`),s(`return`,o),i[Symbol.asyncIterator]=function(){return this},i;function o(e){return function(t){return Promise.resolve(t).then(e,d)}}function s(e,t){r[e]&&(i[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||c(e,t)})},t&&(i[e]=t(i[e])))}function c(e,t){try{l(r[e](t))}catch(e){f(a[0][3],e)}}function l(e){e.value instanceof je?Promise.resolve(e.value.v).then(u,d):f(a[0][2],e)}function u(e){c(`next`,e)}function d(e){c(`throw`,e)}function f(e,t){e(t),a.shift(),a.length&&c(a[0][0],a[0][1])}}function Ne(e){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof Oe==`function`?Oe(e):e[Symbol.iterator](),n={},r(`next`),r(`throw`),r(`return`),n[Symbol.asyncIterator]=function(){return this},n);function r(t){n[t]=e[t]&&function(n){return new Promise(function(r,a){n=e[t](n),i(r,a,n.done,n.value)})}}function i(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}}function y(e){return typeof e==`function`}function Pe(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Fe=Pe(function(e){return function(t){e(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(e,t){return t+1+`) `+e.toString()}).join(`
  `):``,this.name=`UnsubscriptionError`,this.errors=t}});function Ie(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var Le=function(){function e(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var e,t,n,r,i;if(!this.closed){this.closed=!0;var a=this._parentage;if(a){if(this._parentage=null,Array.isArray(a))try{for(var o=Oe(a),s=o.next();!s.done;s=o.next())s.value.remove(this)}catch(t){e={error:t}}finally{try{s&&!s.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}else a.remove(this)}var c=this.initialTeardown;if(y(c))try{c()}catch(e){i=e instanceof Fe?e.errors:[e]}var l=this._finalizers;if(l){this._finalizers=null;try{for(var u=Oe(l),d=u.next();!d.done;d=u.next()){var f=d.value;try{Be(f)}catch(e){i??=[],e instanceof Fe?i=Ae(Ae([],ke(i)),ke(e.errors)):i.push(e)}}}catch(e){n={error:e}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}}if(i)throw new Fe(i)}},e.prototype.add=function(t){if(t&&t!==this){if(this.closed)Be(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=this._finalizers??[]).push(t)}}},e.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},e.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},e.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&Ie(t,e)},e.prototype.remove=function(t){var n=this._finalizers;n&&Ie(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e}(),Re=Le.EMPTY;function ze(e){return e instanceof Le||e&&`closed`in e&&y(e.remove)&&y(e.add)&&y(e.unsubscribe)}function Be(e){y(e)?e():e.unsubscribe()}var Ve={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},He={setTimeout:function(e,t){var n=[...arguments].slice(2),r=He.delegate;return r?.setTimeout?r.setTimeout.apply(r,Ae([e,t],ke(n))):setTimeout.apply(void 0,Ae([e,t],ke(n)))},clearTimeout:function(e){return(He.delegate?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Ue(e){He.setTimeout(function(){var t=Ve.onUnhandledError;if(t)t(e);else throw e})}function We(){}var Ge=(function(){return Je(`C`,void 0,void 0)})();function Ke(e){return Je(`E`,void 0,e)}function qe(e){return Je(`N`,e,void 0)}function Je(e,t,n){return{kind:e,value:t,error:n}}var Ye=null;function Xe(e){if(Ve.useDeprecatedSynchronousErrorHandling){var t=!Ye;if(t&&(Ye={errorThrown:!1,error:null}),e(),t){var n=Ye,r=n.errorThrown,i=n.error;if(Ye=null,r)throw i}}else e()}function Ze(e){Ve.useDeprecatedSynchronousErrorHandling&&Ye&&(Ye.errorThrown=!0,Ye.error=e)}var Qe=function(e){Te(t,e);function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,ze(t)&&t.add(n)):n.destination=ot,n}return t.create=function(e,t,n){return new nt(e,t,n)},t.prototype.next=function(e){this.isStopped?at(qe(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?at(Ke(e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?at(Ge,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(Le),$e=Function.prototype.bind;function et(e,t){return $e.call(e,t)}var tt=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){rt(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){rt(e)}else rt(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){rt(e)}},e}(),nt=function(e){Te(t,e);function t(t,n,r){var i=e.call(this)||this,a;if(y(t)||!t)a={next:t??void 0,error:n??void 0,complete:r??void 0};else{var o;i&&Ve.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=function(){return i.unsubscribe()},a={next:t.next&&et(t.next,o),error:t.error&&et(t.error,o),complete:t.complete&&et(t.complete,o)}):a=t}return i.destination=new tt(a),i}return t}(Qe);function rt(e){Ve.useDeprecatedSynchronousErrorHandling?Ze(e):Ue(e)}function it(e){throw e}function at(e,t){var n=Ve.onStoppedNotification;n&&He.setTimeout(function(){return n(e,t)})}var ot={closed:!0,next:We,error:it,complete:We},st=(function(){return typeof Symbol==`function`&&Symbol.observable||`@@observable`})();function ct(e){return e}function lt(e){return e.length===0?ct:e.length===1?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}var b=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r=this,i=ft(e)?e:new nt(e,t,n);return Xe(function(){var e=r,t=e.operator,n=e.source;i.add(t?t.call(i,n):n?r._subscribe(i):r._trySubscribe(i))}),i},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return t=ut(t),new t(function(t,r){var i=new nt({next:function(t){try{e(t)}catch(e){r(e),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)})},e.prototype._subscribe=function(e){return this.source?.subscribe(e)},e.prototype[st]=function(){return this},e.prototype.pipe=function(){return lt([...arguments])(this)},e.prototype.toPromise=function(e){var t=this;return e=ut(e),new e(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function ut(e){return e??Ve.Promise??Promise}function dt(e){return e&&y(e.next)&&y(e.error)&&y(e.complete)}function ft(e){return e&&e instanceof Qe||dt(e)&&ze(e)}function pt(e){return y(e?.lift)}function mt(e){return function(t){if(pt(t))return t.lift(function(t){try{return e(t,this)}catch(e){this.error(e)}});throw TypeError(`Unable to lift unknown Observable type`)}}function ht(e,t,n,r,i){return new gt(e,t,n,r,i)}var gt=function(e){Te(t,e);function t(t,n,r,i,a,o){var s=e.call(this,t)||this;return s.onFinalize=a,s.shouldUnsubscribe=o,s._next=n?function(e){try{n(e)}catch(e){t.error(e)}}:e.prototype._next,s._error=i?function(e){try{i(e)}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._error,s._complete=r?function(){try{r()}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._complete,s}return t.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)==null||t.call(this))}},t}(Qe),_t=Pe(function(e){return function(){e(this),this.name=`ObjectUnsubscribedError`,this.message=`object unsubscribed`}}),vt=function(e){Te(t,e);function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return t.prototype.lift=function(e){var t=new yt(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new _t},t.prototype.next=function(e){var t=this;Xe(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||=Array.from(t.observers);try{for(var i=Oe(t.currentObservers),a=i.next();!a.done;a=i.next())a.value.next(e)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;Xe(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;Xe(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){return this.observers?.length>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this,r=n.hasError,i=n.isStopped,a=n.observers;return r||i?Re:(this.currentObservers=null,a.push(e),new Le(function(){t.currentObservers=null,Ie(a,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this,n=t.hasError,r=t.thrownError,i=t.isStopped;n?e.error(r):i&&e.complete()},t.prototype.asObservable=function(){var e=new b;return e.source=this,e},t.create=function(e,t){return new yt(e,t)},t}(b),yt=function(e){Te(t,e);function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return t.prototype.next=function(e){var t,n;(n=(t=this.destination)?.next)==null||n.call(t,e)},t.prototype.error=function(e){var t,n;(n=(t=this.destination)?.error)==null||n.call(t,e)},t.prototype.complete=function(){var e,t;(t=(e=this.destination)?.complete)==null||t.call(e)},t.prototype._subscribe=function(e){return this.source?.subscribe(e)??Re},t}(vt),bt={now:function(){return(bt.delegate||Date).now()},delegate:void 0},xt=function(e){Te(t,e);function t(t,n){return e.call(this)||this}return t.prototype.schedule=function(e,t){return t===void 0&&(t=0),this},t}(Le),St={setInterval:function(e,t){var n=[...arguments].slice(2),r=St.delegate;return r?.setInterval?r.setInterval.apply(r,Ae([e,t],ke(n))):setInterval.apply(void 0,Ae([e,t],ke(n)))},clearInterval:function(e){return(St.delegate?.clearInterval||clearInterval)(e)},delegate:void 0},Ct=function(e){Te(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.scheduler=t,r.work=n,r.pending=!1,r}return t.prototype.schedule=function(e,t){if(t===void 0&&(t=0),this.closed)return this;this.state=e;var n=this.id,r=this.scheduler;return n!=null&&(this.id=this.recycleAsyncId(r,n,t)),this.pending=!0,this.delay=t,this.id=this.id??this.requestAsyncId(r,this.id,t),this},t.prototype.requestAsyncId=function(e,t,n){return n===void 0&&(n=0),St.setInterval(e.flush.bind(e,this),n)},t.prototype.recycleAsyncId=function(e,t,n){if(n===void 0&&(n=0),n!=null&&this.delay===n&&this.pending===!1)return t;t!=null&&St.clearInterval(t)},t.prototype.execute=function(e,t){if(this.closed)return Error(`executing a cancelled action`);this.pending=!1;var n=this._execute(e,t);if(n)return n;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},t.prototype._execute=function(e,t){var n=!1,r;try{this.work(e)}catch(e){n=!0,r=e||Error(`Scheduled action threw falsy error`)}if(n)return this.unsubscribe(),r},t.prototype.unsubscribe=function(){if(!this.closed){var t=this,n=t.id,r=t.scheduler,i=r.actions;this.work=this.state=this.scheduler=null,this.pending=!1,Ie(i,this),n!=null&&(this.id=this.recycleAsyncId(r,n,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},t}(xt),wt=function(){function e(t,n){n===void 0&&(n=e.now),this.schedulerActionCtor=t,this.now=n}return e.prototype.schedule=function(e,t,n){return t===void 0&&(t=0),new this.schedulerActionCtor(this,e).schedule(n,t)},e.now=bt.now,e}(),Tt=new(function(e){Te(t,e);function t(t,n){n===void 0&&(n=wt.now);var r=e.call(this,t,n)||this;return r.actions=[],r._active=!1,r}return t.prototype.flush=function(e){var t=this.actions;if(this._active){t.push(e);return}var n;this._active=!0;do if(n=e.execute(e.state,e.delay))break;while(e=t.shift());if(this._active=!1,n){for(;e=t.shift();)e.unsubscribe();throw n}},t}(wt))(Ct),Et=new b(function(e){return e.complete()});function Dt(e){return e&&y(e.schedule)}function Ot(e){return e[e.length-1]}function kt(e){return Dt(Ot(e))?e.pop():void 0}function At(e,t){return typeof Ot(e)==`number`?e.pop():t}var jt=(function(e){return e&&typeof e.length==`number`&&typeof e!=`function`});function Mt(e){return y(e?.then)}function Nt(e){return y(e[st])}function Pt(e){return Symbol.asyncIterator&&y(e?.[Symbol.asyncIterator])}function Ft(e){return TypeError(`You provided `+(typeof e==`object`&&e?`an invalid object`:`'`+e+`'`)+` where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function It(){return typeof Symbol!=`function`||!Symbol.iterator?`@@iterator`:Symbol.iterator}var Lt=It();function Rt(e){return y(e?.[Lt])}function zt(e){return Me(this,arguments,function(){var t,n,r,i;return De(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,je(t.read())];case 3:return n=a.sent(),r=n.value,i=n.done,i?[4,je(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,je(r)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Bt(e){return y(e?.getReader)}function Vt(e){if(e instanceof b)return e;if(e!=null){if(Nt(e))return Ht(e);if(jt(e))return Ut(e);if(Mt(e))return Wt(e);if(Pt(e))return Kt(e);if(Rt(e))return Gt(e);if(Bt(e))return qt(e)}throw Ft(e)}function Ht(e){return new b(function(t){var n=e[st]();if(y(n.subscribe))return n.subscribe(t);throw TypeError(`Provided object does not correctly implement Symbol.observable`)})}function Ut(e){return new b(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function Wt(e){return new b(function(t){e.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,Ue)})}function Gt(e){return new b(function(t){var n,r;try{for(var i=Oe(e),a=i.next();!a.done;a=i.next()){var o=a.value;if(t.next(o),t.closed)return}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}t.complete()})}function Kt(e){return new b(function(t){Jt(e,t).catch(function(e){return t.error(e)})})}function qt(e){return Kt(zt(e))}function Jt(e,t){var n,r,i,a;return Ee(this,void 0,void 0,function(){var o,s;return De(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=Ne(e),c.label=1;case 1:return[4,n.next()];case 2:if(r=c.sent(),r.done)return[3,4];if(o=r.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=c.sent(),i={error:s},[3,11];case 6:return c.trys.push([6,,9,10]),r&&!r.done&&(a=n.return)?[4,a.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function Yt(e,t,n,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var a=t.schedule(function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(a),!i)return a}function Xt(e,t){return t===void 0&&(t=0),mt(function(n,r){n.subscribe(ht(r,function(n){return Yt(r,e,function(){return r.next(n)},t)},function(){return Yt(r,e,function(){return r.complete()},t)},function(n){return Yt(r,e,function(){return r.error(n)},t)}))})}function Zt(e,t){return t===void 0&&(t=0),mt(function(n,r){r.add(e.schedule(function(){return n.subscribe(r)},t))})}function Qt(e,t){return Vt(e).pipe(Zt(t),Xt(t))}function $t(e,t){return Vt(e).pipe(Zt(t),Xt(t))}function en(e,t){return new b(function(n){var r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function tn(e,t){return new b(function(n){var r;return Yt(n,t,function(){r=e[Lt](),Yt(n,t,function(){var e,t,i;try{e=r.next(),t=e.value,i=e.done}catch(e){n.error(e);return}i?n.complete():n.next(t)},0,!0)}),function(){return y(r?.return)&&r.return()}})}function nn(e,t){if(!e)throw Error(`Iterable cannot be null`);return new b(function(n){Yt(n,t,function(){var r=e[Symbol.asyncIterator]();Yt(n,t,function(){r.next().then(function(e){e.done?n.complete():n.next(e.value)})},0,!0)})})}function rn(e,t){return nn(zt(e),t)}function an(e,t){if(e!=null){if(Nt(e))return Qt(e,t);if(jt(e))return en(e,t);if(Mt(e))return $t(e,t);if(Pt(e))return nn(e,t);if(Rt(e))return tn(e,t);if(Bt(e))return rn(e,t)}throw Ft(e)}function on(e,t){return t?an(e,t):Vt(e)}function sn(){var e=[...arguments];return on(e,kt(e))}function cn(e,t){var n=y(e)?e:function(){return e},r=function(e){return e.error(n())};return new b(t?function(e){return t.schedule(r,0,e)}:r)}function ln(e){return!!e&&(e instanceof b||y(e.lift)&&y(e.subscribe))}var un=Pe(function(e){return function(){e(this),this.name=`EmptyError`,this.message=`no elements in sequence`}});function x(e,t){var n=typeof t==`object`;return new Promise(function(r,i){var a=!1,o;e.subscribe({next:function(e){o=e,a=!0},error:i,complete:function(){a?r(o):n?r(t.defaultValue):i(new un)}})})}function dn(e){return e instanceof Date&&!isNaN(e)}function S(e,t){return mt(function(n,r){var i=0;n.subscribe(ht(r,function(n){r.next(e.call(t,n,i++))}))})}function fn(e,t,n,r,i,a,o,s){var c=[],l=0,u=0,d=!1,f=function(){d&&!c.length&&!l&&t.complete()},p=function(e){return l<r?m(e):c.push(e)},m=function(e){a&&t.next(e),l++;var s=!1;Vt(n(e,u++)).subscribe(ht(t,function(e){i?.(e),a?p(e):t.next(e)},function(){s=!0},void 0,function(){if(s)try{l--;for(var e=function(){var e=c.shift();o?Yt(t,o,function(){return m(e)}):m(e)};c.length&&l<r;)e();f()}catch(e){t.error(e)}}))};return e.subscribe(ht(t,p,function(){d=!0,f()})),function(){s?.()}}function pn(e,t,n){return n===void 0&&(n=1/0),y(t)?pn(function(n,r){return S(function(e,i){return t(n,e,r,i)})(Vt(e(n,r)))},n):(typeof t==`number`&&(n=t),mt(function(t,r){return fn(t,r,e,n)}))}function mn(e){return e===void 0&&(e=1/0),pn(ct,e)}function hn(){return mn(1)}function gn(){var e=[...arguments];return hn()(on(e,kt(e)))}function _n(e){return new b(function(t){Vt(e()).subscribe(t)})}function vn(e,t,n){e===void 0&&(e=0),n===void 0&&(n=Tt);var r=-1;return t!=null&&(Dt(t)?n=t:r=t),new b(function(t){var i=dn(e)?+e-n.now():e;i<0&&(i=0);var a=0;return n.schedule(function(){t.closed||(t.next(a++),0<=r?this.schedule(void 0,r):t.complete())},i)})}function yn(){var e=[...arguments],t=kt(e),n=At(e,1/0),r=e;return r.length?r.length===1?Vt(r[0]):mn(n)(on(r,t)):Et}function bn(e,t){return mt(function(n,r){var i=0;n.subscribe(ht(r,function(n){return e.call(t,n,i++)&&r.next(n)}))})}function xn(e){return mt(function(t,n){var r=null,i=!1,a;r=t.subscribe(ht(n,void 0,void 0,function(o){a=Vt(e(o,xn(e)(t))),r?(r.unsubscribe(),r=null,a.subscribe(n)):i=!0})),i&&(r.unsubscribe(),r=null,a.subscribe(n))})}function Sn(e){return mt(function(t,n){try{t.subscribe(n)}finally{n.add(e)}})}function Cn(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new vt}:t,r=e.resetOnError,i=r===void 0||r,a=e.resetOnComplete,o=a===void 0||a,s=e.resetOnRefCountZero,c=s===void 0||s;return function(e){var t,r,a,s=0,l=!1,u=!1,d=function(){r?.unsubscribe(),r=void 0},f=function(){d(),t=a=void 0,l=u=!1},p=function(){var e=t;f(),e?.unsubscribe()};return mt(function(e,m){s++,!u&&!l&&d();var h=a??=n();m.add(function(){s--,s===0&&!u&&!l&&(r=wn(p,c))}),h.subscribe(m),!t&&s>0&&(t=new nt({next:function(e){return h.next(e)},error:function(e){u=!0,d(),r=wn(f,i,e),h.error(e)},complete:function(){l=!0,d(),r=wn(f,o),h.complete()}}),Vt(e).subscribe(t))})(e)}}function wn(e,t){var n=[...arguments].slice(2);if(t===!0){e();return}if(t!==!1){var r=new nt({next:function(){r.unsubscribe(),e()}});return Vt(t.apply(void 0,Ae([],ke(n)))).subscribe(r)}}function Tn(e,t,n){var r=y(e)||t||n?{next:e,error:t,complete:n}:e;return r?mt(function(e,t){var n;(n=r.subscribe)==null||n.call(r);var i=!0;e.subscribe(ht(t,function(e){var n;(n=r.next)==null||n.call(r,e),t.next(e)},function(){var e;i=!1,(e=r.complete)==null||e.call(r),t.complete()},function(e){var n;i=!1,(n=r.error)==null||n.call(r,e),t.error(e)},function(){var e,t;i&&((e=r.unsubscribe)==null||e.call(r)),(t=r.finalize)==null||t.call(r)}))}):ct}var En=/\r\n|[\n\r\u2028\u2029]/;function Dn(e,t,n){let r=e.split(En),{start:i,end:a,markerLines:o}=On({start:kn(t.start,r),end:t.end?kn(t.end,r):void 0},r),s=`${a}`.length;return e.split(En,a).slice(i,a).map((e,t)=>{let r=i+1+t,a=` ${` ${r}`.slice(-s)} |`,c=o[r],l=!o[r+1];if(!c)return` ${a}${e.length>0?` ${e}`:``}`;let u=``;if(Array.isArray(c)){let t=e.slice(0,Math.max(c[0]-1,0)).replace(/[^\t]/g,` `),r=c[1]||1;u=[`
 `,a.replace(/\d/g,` `),` `,t,`^`.repeat(r)].join(``),l&&n&&(u+=` `+n)}return[`>`,a,e.length>0?` ${e}`:``,u].join(``)}).join(`
`)}function On(e,t){let n={...e.start},r={...n,...e.end},i=n.line??-1,a=n.column??0,o=r.line,s=r.column,c=Math.max(i-3,0),l=Math.min(t.length,o+3);i===-1&&(c=0),o===-1&&(l=t.length);let u=o-i,d={};if(u)for(let e=0;e<=u;e++){let n=e+i;d[n]=a?e===0?[a,t[n-1].length-a+1]:e===u?[0,s]:[0,t[n-e].length]:!0}else d[i]=a===s?!a||[a,0]:[a,s-a];return{start:c,end:l,markerLines:d}}function kn(e,t){let n=0;for(let r=0;r<t.length;r++){let i=t[r].length+1;if(n+i>e)return{line:r+1,column:e-n};n+=i}return{line:t.length,column:t[t.length-1]?.length??0}}function An(e){"@babel/helpers - typeof";return An=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},An(e)}function jn(e,t){if(An(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(An(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Mn(e){var t=jn(e,`string`);return An(t)==`symbol`?t:t+``}function C(e,t,n){return(t=Mn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Nn(e,t,n){return{statusCode:e.status,statusMessage:e.statusText||null,headers:Pn(e.headers),body:e.body,url:e.url||t,method:n}}function Pn(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}var Fn=class extends Error{constructor(e,t){let n=Ln(e,t);super(n.message),C(this,`response`,void 0),C(this,`statusCode`,400),C(this,`responseBody`,void 0),C(this,`traceId`,void 0),C(this,`details`,void 0),Object.assign(this,n)}},In=class extends Error{constructor(e){let t=Ln(e);super(t.message),C(this,`response`,void 0),C(this,`statusCode`,500),C(this,`responseBody`,void 0),C(this,`traceId`,void 0),C(this,`details`,void 0),Object.assign(this,t)}};function Ln(e,t){let n=e.body,i={response:e,statusCode:e.statusCode,responseBody:Wn(n,e),traceId:Un(e),message:``,details:void 0};if(!r(n))return i.message=`${Hn(e,n)}${Gn(i.traceId)}`,i;let a=n.error;if(typeof a==`string`&&typeof n.message==`string`)return i.message=`${a} - ${n.message}${Gn(i.traceId)}`,i;if(typeof a!=`object`||!a)return i.message=typeof a==`string`?`${a}${Gn(i.traceId)}`:typeof n.message==`string`?`${n.message}${Gn(i.traceId)}`:`${Hn(e,n)}${Gn(i.traceId)}`,i;if(Rn(a)||zn(a)){let e=a.items||[],t=e.slice(0,5).map(e=>e.error?.description).filter(Boolean),r=t.length?`:\n- ${t.join(`
- `)}`:``;return e.length>5&&(r+=`\n...and ${e.length-5} more`),i.message=`${a.description}${Gn(i.traceId)}${r}`,i.details=n.error,i}return Bn(a)?(i.message=Vn(a,t,i.traceId),i.details=n.error,i):`description`in a&&typeof a.description==`string`?(i.message=`${a.description}${Gn(i.traceId)}`,i.details=a,i):(i.message=`${Hn(e,n)}${Gn(i.traceId)}`,i)}function Rn(e){return`type`in e&&e.type===`mutationError`&&`description`in e&&typeof e.description==`string`}function zn(e){return`type`in e&&e.type===`actionError`&&`description`in e&&typeof e.description==`string`}function Bn(e){return r(e)&&e.type===`queryParseError`&&typeof e.query==`string`&&typeof e.start==`number`&&typeof e.end==`number`}function Vn(e,t,n){let{query:r,start:i,end:a,description:o}=e,s=n?`\n(traceId: ${n})`:``;if(!r||i===void 0)return`GROQ query parse error: ${o}${s}`;let c=t?`\n\nTag: ${t}`:``;return`GROQ query parse error:\n${Dn(r,{start:i,end:a},o)}${c}${s}`}function Hn(e,t){let n=typeof t==`string`?` (${Kn(t,100)})`:``,r=e.statusMessage?` ${e.statusMessage}`:``;return`${e.method}-request to ${e.url} resulted in HTTP ${e.statusCode}${r}${n}`}function Un(e){let t=e?.headers?.traceparent;if(t)return t.split(`-`)[1]}function Wn(e,t){return(t.headers[`content-type`]||``).toLowerCase().indexOf(`application/json`)===-1?e:JSON.stringify(e,null,2)}function Gn(e){return e?` (traceId: ${e})`:``}function Kn(e,t){return e.length>t?`${e.slice(0,t)}…`:e}var qn=class extends Error{constructor({projectId:e,credentials:t}={}){if(super(`CorsOriginError`),C(this,`projectId`,void 0),C(this,`addOriginUrl`,void 0),this.name=`CorsOriginError`,this.projectId=e,e&&typeof location<`u`){let n=new URL(`https://sanity.io/manage/project/${e}/api`),{origin:r}=location;n.searchParams.set(`cors`,`add`),n.searchParams.set(`origin`,r),t&&n.searchParams.set(`credentials`,``),this.addOriginUrl=n,this.message=`The current origin is not allowed to connect to the Live Content API. Add it here: ${n}`}else this.message=e?`The current origin is not allowed to connect to the Live Content API. Change your configuration here: https://sanity.io/manage/project/${e}/api`:`The current origin is not allowed to connect to the Live Content API.`}};function Jn(e,t={}){let n=(t,n)=>{let r=t.meta?.fetchInit;if(typeof r!=`object`||!r)return n(t);let i=t.fetch??e.fetch??globalThis.fetch,a=(e,t)=>i(e,{...r,...t});return n({...t,fetch:a})},r=h({...e.fetch?{fetch:e.fetch}:{},headers:e.headers,httpErrors:!0,middleware:[_e({shouldRetry:er,maxRetries:t.maxRetries??5,...t.retryDelay?{retryDelay:t.retryDelay}:{}}),...e.middleware,n,tr(t)]}),i=e=>{if(typeof e.url!=`string`)throw TypeError("Request options must include a `url`");return Yn(r,e)};return{promise:i,observable:e=>new b(t=>{let n=new AbortController,r=e.signal,a=r?AbortSignal.any([r,n.signal]):n.signal,o=on(i({...e,signal:a})).subscribe(t);return()=>{o.unsubscribe(),n.abort()}})}}async function Yn(e,t){let n=t.url,r=(t.method??`GET`).toUpperCase(),i;try{i=await e(t)}catch(e){if(me(e)){let i=Qn(typeof e.body==`string`?e.body:``,e.headers),a=Nn({status:e.status,statusText:e.statusText,headers:e.headers,body:i,url:e.response.url??e.url},n,r),o=Xn(t.query);throw a.statusCode>=500?new In(a):new Fn(a,o)}throw e}return{type:`response`,body:Zn(i),statusCode:i.status,statusMessage:i.statusText||null,headers:$n(i.headers),url:i.url||n,method:r}}function Xn(e){if(!e)return;if(e instanceof URLSearchParams)return e.get(`tag`)??void 0;let t=e.tag;return typeof t==`string`?t:void 0}function Zn(e){return Qn(e.text(),e.headers)}function Qn(e,t){let n=(t.get(`content-type`)??``).toLowerCase();if(e){if(n.includes(`application/json`))try{return JSON.parse(e)}catch{return e}return e}}function $n(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}function er(e,t,n){if(me(e)){let t=(n.method??`GET`)===`GET`||n.method===`HEAD`,r=(n.url??``).includes(`/data/query`),i=e.status;return!!((t||r)&&(i===429||i===502||i===503))}return ye(e,t,n)}function tr(e){let t={},n=t=>e.ignoreWarnings!==void 0&&(Array.isArray(e.ignoreWarnings)?e.ignoreWarnings:[e.ignoreWarnings]).some(e=>typeof e==`string`?t.includes(e):e.test(t));return{afterResponse(e){let r=e.headers.get(`x-sanity-warning`);if(!r)return e;for(let e of r.split(`,`).map(e=>e.trim()))!e||t[e]||n(e)||(t[e]=!0,console.warn(e));return e}}}function nr(e){return`https://www.sanity.io/help/`+e}var rr=[`image`,`file`],ir=[`before`,`after`,`replace`],ar=e=>{if(!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(e))throw Error(`Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters`)},or=e=>{if(!/^[-a-z0-9]+$/i.test(e))throw Error("`projectId` can only contain only a-z, 0-9 and dashes")},sr=e=>{if(rr.indexOf(e)===-1)throw Error(`Invalid asset type: ${e}. Must be one of ${rr.join(`, `)}`)},cr=(e,t)=>{if(typeof t!=`object`||!t||Array.isArray(t))throw Error(`${e}() takes an object of properties`)},lr=(e,t)=>{if(typeof t!=`string`||!/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(t)||t.includes(`..`))throw Error(`${e}(): "${t}" is not a valid document ID`)},ur=(e,t)=>{if(!t._id)throw Error(`${e}() requires that the document contains an ID ("_id" property)`);lr(e,t._id)},dr=(e,t)=>{if(typeof t!=`string`)throw Error(`\`${e}()\`: \`${t}\` is not a valid document type`)},fr=(e,t)=>{if(!t._type)throw Error(`\`${e}()\` requires that the document contains a type (\`_type\` property)`);dr(e,t._type)},pr=(e,t)=>{if(t._id&&t._id!==e)throw Error(`The provided document ID (\`${t._id}\`) does not match the generated version ID (\`${e}\`)`)},mr=(e,t,n)=>{let r=`insert(at, selector, items)`;if(ir.indexOf(e)===-1){let e=ir.map(e=>`"${e}"`).join(`, `);throw Error(`${r} takes an "at"-argument which is one of: ${e}`)}if(typeof t!=`string`)throw Error(`${r} takes a "selector"-argument which must be a string`);if(!Array.isArray(n))throw Error(`${r} takes an "items"-argument which must be an array`)},hr=e=>{if(e.dataset)return e.dataset;let t=e.resource;if(t&&t.type===`dataset`){let e=t.id.split(`.`);if(e.length!==2)throw Error(`Dataset resource ID must be in the format "project.dataset"`);return e[1]}throw Error("`dataset` must be provided to perform queries")},gr=e=>{if(typeof e!=`string`||!/^[a-z0-9._-]{1,75}$/i.test(e))throw Error(`Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.`);return e},_r=e=>{let t=e.resource;if(!t)throw Error("`resource` must be provided to perform resource queries");let{type:n,id:r}=t;switch(n){case`dataset`:if(r.split(`.`).length!==2)throw Error(`Dataset resource ID must be in the format "project.dataset"`);return;case`dashboard`:case`knowledge-base`:case`media-library`:case`canvas`:return;default:throw Error(`Unsupported resource type: ${n.toString()}`)}},w=(e,t)=>{if(t.resource)throw Error(`\`${e}\` does not support resource-based operations`)};function vr(e){let t=!1,n;return(...r)=>t?n:(n=e(...r),t=!0,n)}var T=e=>vr((...t)=>console.warn(e.join(` `),...t)),yr=T(["Because you set `withCredentials` to true, we will override your `useCdn`",`setting to be false since (cookie-based) credentials are never set on the CDN`]),br=T(["Since you haven't set a value for `useCdn`, we will deliver content using our",`global, edge-cached API-CDN. If you wish to have content delivered faster, set`,"`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."]),xr=T(["The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.","The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."]),Sr=T(["The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"]),Cr=T([`You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.`,`See ${nr(`js-client-browser-token`)} for more information and how to hide this warning.`]),wr=T(["You have configured Sanity client to use a token, but also provided `withCredentials: true`.","This is no longer supported - only token will be used - remove `withCredentials: true`."]),Tr=T([`Using the Sanity client without specifying an API version is deprecated.`,`See ${nr(`js-client-api-version`)}`]);T(["The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."]);var Er=T(["You have called `createVersion()` with a defined `document`.","If you are creating a version of a document that already exists, prefer providing `baseId` and `releaseId` instead."]),Dr=T(["The `uri` request option has been renamed to `url`.","Please update your code to use `url` instead. Support for `uri` will be removed in a future version."]),Or=T(["The `~experimental_resource` configuration property has been renamed to `resource`.","Please update your client configuration to use `resource` instead. Support for `~experimental_resource` will be removed in a future version."]),kr={apiHost:`https://api.sanity.io`,apiVersion:`1`,useProjectHostname:!0,stega:{enabled:!1}},Ar=[`localhost`,`127.0.0.1`,`0.0.0.0`],jr=e=>Ar.indexOf(e)!==-1;function Mr(e){if(e===`1`||e===`X`)return;let t=new Date(e);if(!(/^\d{4}-\d{2}-\d{2}$/.test(e)&&t instanceof Date&&t.getTime()>0))throw Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`")}function Nr(e){if(Array.isArray(e)&&e.length>1&&e.includes(`raw`))throw TypeError(`Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives`)}var Pr=(e,t)=>{let n={...t,...e,stega:{...typeof t.stega==`boolean`?{enabled:t.stega}:t.stega||kr.stega,...typeof e.stega==`boolean`?{enabled:e.stega}:e.stega||{}}};n.apiVersion||Tr();let r={...kr,...n,apiHost:n.apiHost??kr.apiHost};r[`~experimental_resource`]&&!r.resource&&(Or(),r.resource=r[`~experimental_resource`]);let i=r.resource,a=r.useProjectHostname&&!i;if(typeof Promise>`u`){let e=nr(`js-client-promise-polyfill`);throw Error(`No native Promise-implementation found, polyfill needed - see ${e}`)}if(a&&!r.projectId)throw Error("Configuration must contain `projectId`");if(i&&_r(r),r.perspective!==void 0&&Nr(r.perspective),`encodeSourceMap`in r)throw Error(`It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?`);if(`encodeSourceMapAtPath`in r)throw Error(`It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?`);if(typeof r.stega.enabled!=`boolean`)throw Error(`stega.enabled must be a boolean, received ${r.stega.enabled}`);if(r.stega.enabled&&r.stega.studioUrl===void 0)throw Error(`stega.studioUrl must be defined when stega.enabled is true`);if(r.stega.enabled&&typeof r.stega.studioUrl!=`string`&&typeof r.stega.studioUrl!=`function`)throw Error(`stega.studioUrl must be a string or a function, received ${r.stega.studioUrl}`);let o=typeof window<`u`&&window.location&&window.location.hostname,s=o&&jr(window.location.hostname),c=!!r.token;r.withCredentials&&c&&(wr(),r.withCredentials=!1),o&&s&&c&&r.ignoreBrowserTokenWarning!==!0?Cr():r.useCdn===void 0&&br(),a&&or(r.projectId),r.dataset&&ar(r.dataset),`requestTagPrefix`in r&&(r.requestTagPrefix=r.requestTagPrefix?gr(r.requestTagPrefix).replace(/\.+$/,``):void 0),r.apiVersion=`${r.apiVersion}`.replace(/^v/,``),r.isDefaultApi=r.apiHost===kr.apiHost,r.useCdn===!0&&r.withCredentials&&yr(),r.useCdn=r.useCdn!==!1&&!r.withCredentials,Mr(r.apiVersion);let l=r.apiHost.split(`://`,2),u=l[0],d=l[1],f=r.isDefaultApi?`apicdn.sanity.io`:d;return a?(r.url=`${u}://${r.projectId}.${d}/v${r.apiVersion}`,r.cdnUrl=`${u}://${r.projectId}.${f}/v${r.apiVersion}`):(r.url=`${r.apiHost}/v${r.apiVersion}`,r.cdnUrl=r.url),r},Fr={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},Ir={0:8203,1:8204,2:8205,3:65279},Lr={0:String.fromCodePoint(Ir[0]),1:String.fromCodePoint(Ir[1]),2:String.fromCodePoint(Ir[2]),3:String.fromCodePoint(Ir[3])},Rr=[,,,,].fill(String.fromCodePoint(Ir[0])).join(``);function zr(e){let t=JSON.stringify(e),n=new TextEncoder().encode(t),r=``;for(let e=0;e<n.length;e++){let t=n[e];r+=Lr[t>>6&3]+Lr[t>>4&3]+Lr[t>>2&3]+Lr[t&3]}return Rr+r}function Br(e){return!Number.isNaN(Number(e))||/[a-z]/i.test(e)&&!/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(e)?!1:!!Date.parse(e)}function Vr(e){try{new URL(e,e.startsWith(`/`)?`https://acme.com`:void 0)}catch{return!1}return!0}function Hr(e,t,n=`auto`){return n===!0||n===`auto`&&(Br(e)||Vr(e))?e:`${e}${zr(t)}`}Object.fromEntries(Object.entries(Lr).map(e=>[e[1],+e[0]])),Object.fromEntries(Object.entries(Fr).map(e=>e.reverse()));var Ur=`${Object.values(Fr).map(e=>`\\u{${e.toString(16)}}`).join(``)}`,Wr=RegExp(`[${Ur}]{4,}`,`gu`);function Gr(e){return{cleaned:e.replace(Wr,``),encoded:e.match(Wr)?.[0]||``}}function Kr(e){return e&&JSON.parse(Gr(JSON.stringify(e)).cleaned)}function qr(e){return Kr(e)}var Jr=/_key\s*==\s*['"](.*)['"]/;function Yr(e){return typeof e==`string`?Jr.test(e.trim()):typeof e==`object`&&`_key`in e}function Xr(e){if(!Array.isArray(e))throw Error(`Path is not an array`);return e.reduce((e,t,n)=>{let r=typeof t;if(r===`number`)return`${e}[${t}]`;if(r===`string`)return`${e}${n===0?``:`.`}${t}`;if(Yr(t)&&t._key)return`${e}[_key=="${t._key}"]`;if(Array.isArray(t)){let[n,r]=t;return`${e}[${n}:${r}]`}throw Error(`Unsupported path segment \`${JSON.stringify(t)}\``)},``)}var Zr=`drafts`,Qr=`versions`,$r=`${Zr}.`,ei=`${Qr}.`;function ti(e){return e.startsWith($r)}function ni(e){return e.startsWith(ei)}function ri(e){return!ti(e)&&!ni(e)}function ii(e){return e}function ai(e){return e}function oi(e){return ni(e)?ii($r+li(e)):ti(e)?e:$r+e}function si(e,t){if(t===`drafts`||t===`published`)throw Error(`Version can not be "published" or "drafts"`);return`${ei}${t}.${li(e)}`}function ci(e){if(!ni(e))return;let[t,n,...r]=e.split(`.`);return n}function li(e){if(ni(e))return ai(e.split(`.`).slice(2).join(`.`));if(ti(e))return ai(e.slice($r.length));if(ri(e))return e;throw Error(`Unable to resolve a published id from "${e}"`)}var ui={"\f":`\\f`,"\n":`\\n`,"\r":`\\r`,"	":`\\t`,"'":`\\'`,"\\":`\\\\`},di={"\\f":`\f`,"\\n":`
`,"\\r":`\r`,"\\t":`	`,"\\'":`'`,"\\\\":`\\`};function fi(e){return`$${e.map(e=>typeof e==`string`?`['${e.replace(/[\f\n\r\t'\\]/g,e=>ui[e])}']`:typeof e==`number`?`[${e}]`:e._key===``?`[${e._index}]`:`[?(@._key=='${e._key.replace(/['\\]/g,e=>ui[e])}')]`).join(``)}`}function pi(e){return e.map(e=>typeof e==`string`?`['${e.replace(/[\f\n\r\t'\\]/g,e=>ui[e])}']`:typeof e==`number`?`[${e}]`:e._key===``?`[${e._index}]`:`[?(@._key=='${e._key.replace(/['\\]/g,e=>ui[e])}')]`)}function mi(e){let t=[],n=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g,r;for(;(r=n.exec(e))!==null;){if(r[1]!==void 0){let e=r[1].replace(/\\(\\|f|n|r|t|')/g,e=>di[e]);t.push(e);continue}if(r[2]!==void 0){t.push(parseInt(r[2],10));continue}if(r[3]!==void 0){let e=r[3].replace(/\\(\\')/g,e=>di[e]);t.push({_key:e,_index:-1});continue}}return t}function hi(e){return e.map(e=>{if(typeof e==`string`||typeof e==`number`)return e;if(e._key!==``)return{_key:e._key};if(e._index!==-1)return e._index;throw Error(`invalid segment:${JSON.stringify(e)}`)})}function gi(e){return e.map(e=>{if(typeof e==`string`||typeof e==`number`)return e;if(e._index!==-1)return e._index;throw Error(`invalid segment:${JSON.stringify(e)}`)})}function _i(e,t){if(!t?.mappings)return;let n=fi(gi(e));if(t.mappings[n]!==void 0)return{mapping:t.mappings[n],matchedPath:n,pathSuffix:``};let r=pi(gi(e));for(let e=r.length-1;e>=0;e--){let i=`$${r.slice(0,e).join(``)}`,a=t.mappings[i];if(a)return{mapping:a,matchedPath:i,pathSuffix:n.substring(i.length)}}}function vi(e){return e!==null&&Array.isArray(e)}function yi(e,t,n=[]){if(vi(e))return e.map((e,i)=>{if(r(e)){let r=e._key;if(typeof r==`string`)return yi(e,t,n.concat({_key:r,_index:i}))}return yi(e,t,n.concat(i))});if(r(e)){if(e._type===`block`||e._type===`span`){let r={...e};return e._type===`block`?r.children=yi(e.children,t,n.concat(`children`)):e._type===`span`&&(r.text=yi(e.text,t,n.concat(`text`))),r}return Object.fromEntries(Object.entries(e).map(([e,r])=>[e,yi(r,t,n.concat(e))]))}return t(e,n)}function bi(e){let{baseUrl:t,workspace:n=`default`,tool:r=`default`,id:i,type:a,path:o,projectId:s,dataset:c}=e;if(!t)throw Error(`baseUrl is required`);if(!o)throw Error(`path is required`);if(!i)throw Error(`id is required`);if(t!==`/`&&t.endsWith(`/`))throw Error(`baseUrl must not end with a slash`);let l=n==="default"?void 0:n,u=r==="default"?void 0:r,d=li(i),f=Array.isArray(o)?Xr(hi(o)):o,p=new URLSearchParams({baseUrl:t,id:d,type:a,path:f});if(l&&p.set(`workspace`,l),u&&p.set(`tool`,u),s&&p.set(`projectId`,s),c&&p.set(`dataset`,c),ri(i))p.set(`perspective`,`published`);else if(ni(i)){let e=ci(i);p.set(`perspective`,e)}let m=[t===`/`?``:t];l&&m.push(l);let h=[`mode=presentation`,`id=${d}`,`type=${a}`,`path=${encodeURIComponent(f)}`];return u&&h.push(`tool=${u}`),m.push(`intent`,`edit`,`${h.join(`;`)}?${p}`),m.join(`/`)}function xi(e){let t=typeof e==`string`?e:e.baseUrl;return t!==`/`&&(t=t.replace(/\/$/,``)),typeof e==`string`?{baseUrl:t}:{...e,baseUrl:t}}var Si=class extends Event{code;message;constructor(e,t){super(e),this.code=t?.code??void 0,this.message=t?.message??void 0}[Symbol.for(`nodejs.util.inspect.custom`)](e,t,n){return n(Ti(this),t)}[Symbol.for(`Deno.customInspect`)](e,t){return e(Ti(this),t)}};function Ci(e){let t=globalThis.DOMException;return typeof t==`function`?new t(e,`SyntaxError`):SyntaxError(e)}function wi(e){return e instanceof Error?`errors`in e&&Array.isArray(e.errors)?e.errors.map(wi).join(`, `):`cause`in e&&e.cause instanceof Error?`${e}: ${wi(e.cause)}`:e.message:`${e}`}function Ti(e){return{type:e.type,message:e.message,code:e.code,defaultPrevented:e.defaultPrevented,cancelable:e.cancelable,timeStamp:e.timeStamp}}var Ei=class extends Error{constructor(e,t){super(e),this.name=`ParseError`,this.type=t.type,this.field=t.field,this.value=t.value,this.line=t.line}},Di=10,Oi=13,ki=32,Ai=6;function ji(e){if(typeof e==`function`)throw TypeError("`config` must be an object, got a function instead. Did you mean `createParser({onEvent: fn})`?");let{maxBufferSize:t,onComment:n,onError:r,onEvent:i,onId:a,onRetry:o}=e,s=[],c=0,l=!0,u,d=``,f=0,p,m=!1,h=!1,g=!1;function _(e){if(m)throw Error("Cannot feed parser: it was terminated after exceeding the configured max buffer size. Call `reset()` to resume parsing.");if(l&&(l=!1,e.charCodeAt(0)===65279?e=e.slice(1):e.charCodeAt(0)===239&&e.charCodeAt(1)===187&&e.charCodeAt(2)===191&&(e=e.slice(3))),(h||g)&&(e=v(e),!e))return;if(!s.length){let t=re(e);t!==``&&ee(t),ne();return}if(e.indexOf(`
`)===-1&&e.indexOf(`\r`)===-1){if(c<Ai&&!te(s.join(``)+e.slice(0,Ai-c))){s.length=0,c=0,h=!0;return}s.push(e),c+=e.length,ne();return}s.push(e);let t=s.join(``);s.length=0,c=0,ee(re(t)),ne()}function v(e){if(e.length===0)return e;if(g)return g=!1,e.charCodeAt(0)===Di?e.slice(1):e;let t=e.indexOf(`\r`),n=e.indexOf(`
`),r=t===-1?n:n===-1||t<n?t:n;return r===-1?``:r===e.length-1&&e.charCodeAt(r)===Oi?(h=!1,g=!0,``):(h=!1,e.slice(r+(e.charCodeAt(r)===Oi&&e.charCodeAt(r+1)===Di?2:1)))}function ee(e){if(e){if(e.charCodeAt(e.length-1)===Oi){ie(e,0,e.length-1),g=!0;return}if(te(e)){s.push(e),c=e.length;return}h=!0}}function te(e){let t=e.charCodeAt(0);return t===58&&!!n||t===100&&Pi(e,`data`)||t===101&&Pi(e,`event`)||t===105&&Pi(e,`id`)||t===114&&Pi(e,`retry`)}function ne(){t!==void 0&&(c+d.length<=t||(m=!0,s.length=0,c=0,u=void 0,d=``,f=0,p=void 0,h=!1,g=!1,r?.(new Ei(`Buffered data exceeded max buffer size of ${t} characters`,{type:`max-buffer-size-exceeded`}))))}function re(e){let t=0;if(e.indexOf(`\r`)===-1){let n=e.indexOf(`
`,t);for(;n!==-1;){if(t===n){u!==void 0&&a?.(u),f>0&&i?.({id:u,event:p,data:d}),u=void 0,d=``,f=0,p=void 0,t=n+1,n=e.indexOf(`
`,t);continue}let r=e.charCodeAt(t);if(Mi(e,t,r)){let r=e.charCodeAt(t+5)===ki?t+6:t+5,o=e.slice(r,n);if(f===0&&e.charCodeAt(n+1)===Di){u!==void 0&&a?.(u),i?.({id:u,event:p,data:o}),u=void 0,d=``,p=void 0,t=n+2,n=e.indexOf(`
`,t);continue}d=f===0?o:`${d}\n${o}`,f++}else Ni(e,t,r)?p=e.slice(e.charCodeAt(t+6)===ki?t+7:t+6,n)||void 0:ie(e,t,n);t=n+1,n=e.indexOf(`
`,t)}return e.slice(t)}for(;t<e.length;){let n=e.indexOf(`\r`,t),r=e.indexOf(`
`,t),i=-1;if(n!==-1&&r!==-1?i=n<r?n:r:n===-1?r!==-1&&(i=r):i=n===e.length-1?-1:n,i===-1)break;ie(e,t,i),t=i+1,e.charCodeAt(t-1)===Oi&&e.charCodeAt(t)===Di&&t++}return e.slice(t)}function ie(e,t,r){if(t===r){oe();return}let i=e.charCodeAt(t);if(Mi(e,t,i)){let n=e.charCodeAt(t+5)===ki?t+6:t+5,i=e.slice(n,r);d=f===0?i:`${d}\n${i}`,f++;return}if(Ni(e,t,i)){p=e.slice(e.charCodeAt(t+6)===ki?t+7:t+6,r)||void 0;return}if(i===105&&e.charCodeAt(t+1)===100&&e.charCodeAt(t+2)===58){let n=e.slice(e.charCodeAt(t+3)===ki?t+4:t+3,r);n.includes(`\0`)||(u=n);return}if(i===58){if(n){let i=e.slice(t,r);n(i.slice(e.charCodeAt(t+1)===ki?2:1))}return}let a=e.slice(t,r),o=a.indexOf(`:`);if(o===-1){ae(a,``,a);return}let s=a.slice(0,o),c=a.charCodeAt(o+1)===ki?2:1;ae(s,a.slice(o+c),a)}function ae(e,t,n){switch(e){case`event`:p=t||void 0;break;case`data`:d=f===0?t:`${d}\n${t}`,f++;break;case`id`:t.includes(`\0`)||(u=t);break;case`retry`:/^\d+$/.test(t)?o?.(parseInt(t,10)):r?.(new Ei(`Invalid \`retry\` value: "${t}"`,{type:`invalid-retry`,value:t,line:n}));break;default:r?.(new Ei(`Unknown field "${e.length>20?`${e.slice(0,20)}…`:e}"`,{type:`unknown-field`,field:e,value:t,line:n}))}}function oe(){u!==void 0&&a?.(u),f>0&&i?.({id:u,event:p,data:d}),u=void 0,d=``,f=0,p=void 0}function se(e={}){if(e.consume&&s.length>0){let e=s.join(``);ie(e,0,e.length)}l=!0,u=void 0,d=``,f=0,p=void 0,s.length=0,c=0,m=!1,h=!1,g=!1}return{feed:_,reset:se}}function Mi(e,t,n){return n===100&&e.charCodeAt(t+1)===97&&e.charCodeAt(t+2)===116&&e.charCodeAt(t+3)===97&&e.charCodeAt(t+4)===58}function Ni(e,t,n){return n===101&&e.charCodeAt(t+1)===118&&e.charCodeAt(t+2)===101&&e.charCodeAt(t+3)===110&&e.charCodeAt(t+4)===116&&e.charCodeAt(t+5)===58}function Pi(e,t){let n=1;for(;n<e.length&&n<t.length;){if(e.charCodeAt(n)!==t.charCodeAt(n))return!1;n++}return e.length<=t.length||e.charCodeAt(t.length)===58}var Fi=104857600,Ii=class extends EventTarget{static CONNECTING=0;static OPEN=1;static CLOSED=2;CONNECTING=0;OPEN=1;CLOSED=2;get readyState(){return this.#e}get url(){return this.#t.href}get withCredentials(){return this.#r}get onerror(){return this.#u}set onerror(e){this.#u&&this.removeEventListener(`error`,this.#u),this.#u=e,e&&this.addEventListener(`error`,e)}get onmessage(){return this.#d}set onmessage(e){this.#d&&this.removeEventListener(`message`,this.#d),this.#d=e,e&&this.addEventListener(`message`,e)}get onopen(){return this.#f}set onopen(e){this.#f&&this.removeEventListener(`open`,this.#f),this.#f=e,e&&this.addEventListener(`open`,e)}addEventListener(e,t,n){let r=t;super.addEventListener(e,r,n)}removeEventListener(e,t,n){let r=t;super.removeEventListener(e,r,n)}constructor(e,t){super();try{if(e instanceof URL)this.#t=e;else if(typeof e==`string`)this.#t=new URL(e,Ri());else throw Error(`Invalid URL`)}catch{throw Ci(`An invalid or illegal string was specified`)}this.#l=ji({maxBufferSize:t?.maxBufferSize??Fi,onEvent:this.#v,onError:this.#b,onId:this.#_,onRetry:this.#y}),this.#e=this.CONNECTING,this.#a=3e3,this.#i=t?.fetch??globalThis.fetch,this.#r=t?.withCredentials??!1,this.#p()}close(){this.#o&&clearTimeout(this.#o),this.#e!==this.CLOSED&&(this.#c&&this.#c.abort(),this.#e=this.CLOSED,this.#c=void 0)}#e;#t;#n;#r;#i;#a;#o;#s=null;#c;#l;#u=null;#d=null;#f=null;#p(){this.#e=this.CONNECTING,this.#c=new AbortController;let e=this.#i;e(this.#t,this.#g()).then(this.#m).catch(this.#h)}#m=async e=>{this.#l.reset();let{body:t,redirected:n,status:r,headers:i}=e;if(r===204){this.#x(`Server sent HTTP 204, not reconnecting`,204),this.close();return}if(this.#n=n?new URL(e.url):void 0,r!==200){this.#x(`Non-200 status code (${r})`,r);return}if(!(i.get(`content-type`)||``).startsWith(`text/event-stream`)){this.#x(`Invalid content type, expected "text/event-stream"`,r);return}if(this.#e===this.CLOSED)return;this.#e=this.OPEN;let a=new Event(`open`);if(this.dispatchEvent(a),typeof t!=`object`||!t||!(`getReader`in t)){this.#x(`Invalid response body, expected a web ReadableStream`,r),this.close();return}let o=new TextDecoder,s=t.getReader(),c=!0;do{let{done:e,value:t}=await s.read();if(this.#e===this.CLOSED){c=!1;break}t&&this.#l.feed(o.decode(t,{stream:!e})),e&&(c=!1,this.#l.reset(),this.#S())}while(c)};#h=e=>{this.#c=void 0,e.name!==`AbortError`&&e.type!==`aborted`&&this.#S(wi(e))};#g(){let e={mode:`cors`,redirect:`follow`,headers:{Accept:`text/event-stream`,...this.#s?{"Last-Event-ID":this.#s}:void 0},cache:`no-store`,signal:this.#c?.signal};return`window`in globalThis&&(e.credentials=this.withCredentials?`include`:`same-origin`),e}#_=e=>{this.#s=e};#v=e=>{let t=this.#n?this.#n.origin:this.#t.origin,n=this.#s??``,r=new MessageEvent(e.event||`message`,{data:e.data,origin:t,lastEventId:n});r.origin!==t&&zi(r,`origin`,t),r.lastEventId!==n&&zi(r,`lastEventId`,n),this.dispatchEvent(r)};#y=e=>{this.#a=e};#b=e=>{e.type===`max-buffer-size-exceeded`&&(this.close(),this.#x(e.message))};#x(e,t){this.#e!==this.CLOSED&&(this.#e=this.CLOSED);let n=new Si(`error`,{code:t,message:e});this.dispatchEvent(n)}#S(e,t){if(this.#e===this.CLOSED)return;this.#e=this.CONNECTING;let n=new Si(`error`,{code:t,message:e});this.dispatchEvent(n);let r=setTimeout(this.#C,this.#a);typeof r==`object`&&r&&`unref`in r&&r.unref(),this.#o=r}#C=()=>{this.#o=void 0,this.#e===this.CONNECTING&&this.#p()}};Object.defineProperty(Ii,"name",{value:`EventSource`}),Object.defineProperty(Ii,Symbol.for(`eventsource.supports-fetch-override`),{value:!0,writable:!1,configurable:!1,enumerable:!1});var Li=Ii;function Ri(){let e=`document`in globalThis?globalThis.document:void 0;return e&&typeof e==`object`&&`baseURI`in e&&typeof e.baseURI==`string`?e.baseURI:void 0}function zi(e,t,n){Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0})}var Bi=class extends Error{constructor(e,t={}){let{status:n,...r}=t;super(e,r),C(this,`name`,`ConnectionFailedError`),C(this,`status`,void 0),this.status=n}},Vi=class extends Error{constructor(e,t,n={}){super(e,n),C(this,`name`,`DisconnectError`),C(this,`reason`,void 0),this.reason=t}},Hi=class extends Error{constructor(e,t){super(e),C(this,`name`,`ChannelError`),C(this,`data`,void 0),this.data=t}},Ui=class extends Error{constructor(e,t,n={}){super(e,n),C(this,`name`,`MessageError`),C(this,`data`,void 0),this.data=t}},Wi=class extends Error{constructor(...e){super(...e),C(this,`name`,`MessageParseError`)}},Gi=[`channelError`,`disconnect`];function Ki(e,t){return _n(()=>{let t=e();return ln(t)?t:sn(t)}).pipe(pn(e=>qi(e,t)))}function qi(e,t){return new b(n=>{let i=new Set(t),a=e=>i.has(e),o=a(`open`);function s(t){if(`data`in t){let[e,i]=Ji(t);n.error(e||!i?new Wi(`Unable to parse EventSource error message`,{cause:e}):new Ui(r(i.data)&&typeof i.data.message==`string`?i.data.message:``,i));return}if(t.code!==void 0){n.error(new Bi(`EventSource connection failed`,{status:t.code}));return}if(e.readyState===e.CLOSED)n.error(new Bi(`EventSource connection failed`));else{let e=`reconnect`;a(e)&&n.next({type:e})}}function c(){let e=`open`;a(e)&&n.next({type:e})}function l(t){let[i,o]=Ji(t);if(i||!o){n.error(new Wi(`Unable to parse EventSource message`,{cause:i}));return}if(t.type===`channelError`){let t=new URL(e.url).searchParams.get(`tag`);n.error(new Hi(Yi(o?.data,t),o.data));return}if(t.type===`disconnect`){n.error(new Vi(`Server disconnected client: ${r(o.data)&&typeof o.data.reason==`string`&&o.data.reason||`unknown error`}`));return}a(t.type)&&n.next({type:t.type,id:t.lastEventId,...o.data?{data:o.data}:{}})}e.addEventListener(`error`,s),o&&e.addEventListener(`open`,c);let u=[...new Set([...Gi,...t])].filter(e=>e!==`error`&&e!==`open`&&e!==`reconnect`);return u.forEach(t=>e.addEventListener(t,l)),()=>{e.removeEventListener(`error`,s),o&&e.removeEventListener(`open`,c),u.forEach(t=>e.removeEventListener(t,l)),e.close()}})}function Ji(e){try{let t=typeof e.data==`string`&&JSON.parse(e.data);return[null,{type:e.type,id:e.lastEventId,...Xi(t)?{}:{data:t}}]}catch(e){return[e,null]}}function Yi(e,t){let n=r(e)?e.error:void 0;if(!n){let t=r(e)?e.message:void 0;return typeof t==`string`&&t||`Unknown listener error`}if(r(n)){if(Bn(n))return Vn(n,t);if(typeof n.description==`string`)return n.description}return typeof n==`string`?n:JSON.stringify(n,null,2)}function Xi(e){for(let t in e)return!1;return!0}function Zi(e){if(typeof e==`string`)return{id:e};if(Array.isArray(e))return{query:`*[_id in $ids]`,params:{ids:e}};if(typeof e==`object`&&e&&`query`in e&&typeof e.query==`string`)return`params`in e&&typeof e.params==`object`&&e.params!==null?{query:e.query,params:e.params}:{query:e.query};let t=[`* Document ID (<docId>)`,`* Array of document IDs`,"* Object containing `query`"].join(`
`);throw Error(`Unknown selection - must be one of:\n\n${t}`)}function Qi(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function E(e,t,n){Qi(e,t),t.set(e,n)}function D(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function O(e,t,n){return e.set(D(e,t),n),n}function k(e,t){return e.get(D(e,t))}var $i=class{constructor(e,t={}){C(this,`selection`,void 0),C(this,`operations`,void 0),this.selection=e,this.operations=t}set(e){return this._assign(`set`,e)}setIfMissing(e){return this._assign(`setIfMissing`,e)}diffMatchPatch(e){return cr(`diffMatchPatch`,e),this._assign(`diffMatchPatch`,e)}unset(e){if(!Array.isArray(e))throw Error(`unset(attrs) takes an array of attributes to unset, non-array given`);return this.operations=Object.assign({},this.operations,{unset:e}),this}inc(e){return this._assign(`inc`,e)}dec(e){return this._assign(`dec`,e)}insert(e,t,n){return mr(e,t,n),this._assign(`insert`,{[e]:t,items:n})}append(e,t){return this.insert(`after`,`${e}[-1]`,t)}prepend(e,t){return this.insert(`before`,`${e}[0]`,t)}splice(e,t,n,r){let i=n===void 0||n===-1,a=t<0?t-1:t,o=i?-1:Math.max(0,t+n),s=`${e}[${a}:${a<0&&o>=0?``:o}]`;return this.insert(`replace`,s,r||[])}ifRevisionId(e){return this.operations.ifRevisionID=e,this}serialize(){return{...Zi(this.selection),...this.operations}}toJSON(){return this.serialize()}reset(){return this.operations={},this}_assign(e,t,n=!0){return cr(e,t),this.operations=Object.assign({},this.operations,{[e]:Object.assign({},n&&this.operations[e]||{},t)}),this}_set(e,t){return this._assign(e,t,!1)}},ea=new WeakMap,ta=class e extends $i{constructor(e,t,n){super(e,t),E(this,ea,void 0),O(ea,this,n)}clone(){return new e(this.selection,{...this.operations},k(ea,this))}commit(e){if(!k(ea,this))throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");let t=typeof this.selection==`string`,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return k(ea,this).mutate({patch:this.serialize()},n)}},na=new WeakMap,ra=class e extends $i{constructor(e,t,n){super(e,t),E(this,na,void 0),O(na,this,n)}clone(){return new e(this.selection,{...this.operations},k(na,this))}commit(e){if(!k(na,this))throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");let t=typeof this.selection==`string`,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return k(na,this).mutate({patch:this.serialize()},n)}},ia={returnDocuments:!1},aa=class{constructor(e=[],t){C(this,`operations`,void 0),C(this,`trxId`,void 0),this.operations=e,this.trxId=t}create(e){return cr(`create`,e),this._add({create:e})}createIfNotExists(e){let t=`createIfNotExists`;return cr(t,e),ur(t,e),this._add({[t]:e})}createOrReplace(e){let t=`createOrReplace`;return cr(t,e),ur(t,e),this._add({[t]:e})}delete(e){return lr(`delete`,e),this._add({delete:{id:e}})}transactionId(e){return e?(this.trxId=e,this):this.trxId}serialize(){return[...this.operations]}toJSON(){return this.serialize()}reset(){return this.operations=[],this}_add(e){return this.operations.push(e),this}},oa=new WeakMap,sa=class e extends aa{constructor(e,t,n){super(e,n),E(this,oa,void 0),O(oa,this,t)}clone(){return new e([...this.operations],k(oa,this),this.trxId)}commit(e){if(!k(oa,this))throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return k(oa,this).mutate(this.serialize(),Object.assign({transactionId:this.trxId},ia,e||{}))}patch(e,t){let n=typeof t==`function`,r=typeof e!=`string`&&e instanceof ra,i=typeof e==`object`&&(`query`in e||`id`in e);if(r)return this._add({patch:e.serialize()});if(n){let n=t(new ra(e,{},k(oa,this)));if(!(n instanceof ra))throw Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}if(i){let n=new ra(e,t||{},k(oa,this));return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}},ca=new WeakMap,la=class e extends aa{constructor(e,t,n){super(e,n),E(this,ca,void 0),O(ca,this,t)}clone(){return new e([...this.operations],k(ca,this),this.trxId)}commit(e){if(!k(ca,this))throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return k(ca,this).mutate(this.serialize(),Object.assign({transactionId:this.trxId},ia,e||{}))}patch(e,t){let n=typeof t==`function`;if(typeof e!=`string`&&e instanceof ta)return this._add({patch:e.serialize()});if(n){let n=t(new ta(e,{},k(ca,this)));if(!(n instanceof ta))throw Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}},ua=[`headers`,`signal`,`tag`,`timeout`,`token`];function da(e,t={}){let n={};e.headers&&Object.assign(n,e.headers);let r=t.token||e.token;r&&(n.Authorization=`Bearer ${r}`),!t.useGlobalApi&&!e.useProjectHostname&&e.projectId&&(n[`X-Sanity-Project-ID`]=e.projectId);let i={url:t.url,headers:Object.assign(n,t.headers||{})};t.method&&(i.method=t.method),t.body!==void 0&&(i.body=t.body),t.query&&(i.query=fa(t.query)),t.signal&&(i.signal=t.signal),(t.withCredentials===void 0?e.withCredentials:t.withCredentials)&&(i.credentials=`include`),typeof t.maxRedirects==`number`&&(i.redirect=t.maxRedirects===0?`manual`:`follow`);let a=t.timeout===void 0?e.timeout:t.timeout;i.timeout=a===void 0?3e5:a!==0&&a,t.useAbortSignal===!1&&!i.signal&&(i.timeout=typeof i.timeout==`number`&&i.timeout>0&&{total:i.timeout,signal:!1});let o=typeof t.fetch==`object`&&typeof e.fetch==`object`?{...e.fetch,...t.fetch}:t.fetch||e.fetch;return typeof o==`function`?i.fetch=o:typeof o==`object`&&o&&(i.meta={...i.meta,fetchInit:o}),!i.fetch&&e.resolveFetch&&(i.fetch=e.resolveFetch(typeof e.proxy==`string`?e.proxy:void 0)),typeof t.maxRetries==`number`&&(i.maxRetries=t.maxRetries),typeof e.lineage==`string`&&e.lineage&&(i.meta={...i.meta,lineage:e.lineage}),i}function fa(e){if(e instanceof URLSearchParams||!e||typeof e!=`object`||!Object.values(e).some(Array.isArray))return e;let t=new URLSearchParams;for(let[n,r]of Object.entries(e))if(r!=null){if(Array.isArray(r))for(let e of r)e!=null&&t.append(n,`${e}`);else t.append(n,`${r}`)}return t}var pa=({query:e,params:t={},options:n={}})=>{let r=new URLSearchParams,{tag:i,includeMutations:a,returnQuery:o,...s}=n;i&&r.append(`tag`,i),r.append(`query`,e);for(let[e,n]of Object.entries(t))n!==void 0&&r.append(`$${e}`,JSON.stringify(n));for(let[e,t]of Object.entries(s))t&&r.append(e,`${t}`);return o===!1&&r.append(`returnQuery`,`false`),a===!1&&r.append(`includeMutations`,`false`),`?${r}`},ma=(e,t)=>e===!1?void 0:e===void 0?t:e,ha=(e={})=>({dryRun:e.dryRun,returnIds:!0,returnDocuments:ma(e.returnDocuments,!0),visibility:e.visibility||`sync`,autoGenerateArrayKeys:e.autoGenerateArrayKeys,skipCrossDatasetReferenceValidation:e.skipCrossDatasetReferenceValidation}),ga=(e,t)=>e.reduce((e,n)=>(e[t(n)]=n,e),Object.create(null));function _a(e,t,n){let r=`stega`in n?{...e,...typeof n.stega==`boolean`?{enabled:n.stega}:n.stega||{}}:e,i=r.enabled?qr(t):t,a=n.filterResponse===!1?e=>e:e=>e.result,{cache:o,next:s,...c}={useAbortSignal:n.signal!==void 0,resultSourceMap:r.enabled?`withKeyArraySelector`:n.resultSourceMap,...n,returnQuery:n.filterResponse===!1&&n.returnQuery!==!1};return{stega:r,params:i,mapResponse:a,reqOpts:o!==void 0||s!==void 0?{...c,fetch:{cache:o,next:s}}:c}}function va(e,t,n,r,i={},a={}){return j(a.signal,o=>ya(e,t,n,r,i,{...a,signal:o}))}function ya(e,t,r,i,a={},o={}){let{stega:s,params:c,mapResponse:l,reqOpts:u}=_a(r,a,o),d=Wa(e,t,`query`,{query:i,params:c},u);return s.enabled?Promise.all([d,n(()=>import(`./BSZuZdi7.js`).then(e=>e.n),[],import.meta.url)]).then(([e,{stegaEncodeSourceMap:t}])=>{let n=t(e.result,e.resultSourceMap,s);return l({...e,result:n})}):d.then(l)}function ba(e,t,n,r={}){return j(r.signal,i=>M(e,t,Sa(e,n,{...r,signal:i})).then(e=>Ca(e,r.includeAllVersions)))}function xa(e,t,n,r={}){return M(e,t,Sa(e,n,r)).then(e=>Ca(e,r.includeAllVersions))}function Sa(e,t,n){let r=t;if(n.releaseId){let e=ci(t);if(!e){if(ti(t))throw Error(`The document ID (\`${t}\`) is a draft, but \`options.releaseId\` is set as \`${n.releaseId}\``);r=si(t,n.releaseId)}else if(e!==n.releaseId)throw Error(`The document ID (\`${t}\`) is already a version of \`${e}\` release, but this does not match the provided \`options.releaseId\` (\`${n.releaseId}\`)`)}return{url:P(e,`doc`,r),tag:n.tag,signal:n.signal,query:n.includeAllVersions===void 0?void 0:{includeAllVersions:n.includeAllVersions}}}function Ca(e,t){let n=e.documents;return n?t?n:n[0]:t?[]:void 0}function wa(e,t,n,r={}){return j(r.signal,i=>Ta(e,t,n,{...r,signal:i}))}function Ta(e,t,n,r={}){return M(e,t,Ea(e,n,r)).then(e=>Da(e,n))}function Ea(e,t,n){return{url:P(e,`doc`,t.join(`,`)),tag:n.tag,signal:n.signal}}function Da(e,t){let n=ga(e.documents||[],e=>e._id);return t.map(e=>n[e]||null)}function Oa(e,t,n,r={}){return j(r.signal,i=>ka(e,t,n,{...r,signal:i}))}async function ka(e,t,n,r={}){let i=new Set;if(n.length===0)return i;for(let a=0;a<n.length;a+=100){let o=n.slice(a,a+100),s=await M(e,t,{url:P(e,`doc`,o.map(encodeURIComponent).join(`,`)),tag:r.tag,signal:r.signal,query:{excludeContent:!0}}),c=new Set;for(let e of s.omitted||[])e.reason===`existence`&&c.add(e.id);for(let e of o)c.has(e)||i.add(e)}return i}function Aa(e,t,n,r={}){return j(r.signal,i=>ja(e,t,n,{...r,signal:i}))}function ja(e,t,n,r={}){return Wa(e,t,`query`,{query:`*[sanity::partOfRelease($releaseId)]`,params:{releaseId:n}},r)}function Ma(e,t,n,r){return j(r?.signal,i=>Ya(e,t,n,{...r,signal:i}))}function Na(e,t,n,r){return j(r?.signal,i=>Xa(e,t,n,{...r,signal:i}))}function Pa(e,t,n,r,i){return j(i?.signal,a=>Za(e,t,n,r,{...i,signal:a}))}function Fa(e,t,n,r,i,a,o){return j(o?.signal,s=>Qa(e,t,n,r,i,a,{...o,signal:s}))}function Ia(e,t,n,r){return j(r?.signal,i=>Ja(e,t,n,{...r,signal:i}))}function La(e,t,n,r=!1,i){return j(i?.signal,a=>$a(e,t,n,r,{...i,signal:a}))}function Ra(e,t,n,r){return j(r?.signal,i=>eo(e,t,n,{...r,signal:i}))}function za(e,t,n,r,i){return j(i?.signal,a=>to(e,t,n,r,{...i,signal:a}))}function Ba(e,t,n,r){return j(r?.signal,i=>qa(e,t,n,{...r,signal:i}))}function Va(e,t,n,r){return j(r?.signal,i=>A(e,t,n,{...r,signal:i}))}function Ha(e,t,n,r={}){let i=t===`mutate`,a=t===`actions`,o=t===`query`,s=i||a?``:pa(n),c=!i&&!a&&s.length<11264,l=c?s:``,u=r.returnFirst,{timeout:d,token:f,tag:p,headers:m,returnQuery:h,lastLiveEventId:g,cacheMode:_}=r,v=P(e,t,l);return{reqOptions:{method:c?`GET`:`POST`,url:v,body:c?void 0:n,query:i&&ha(r),timeout:d,headers:m,token:f,tag:p,returnQuery:h,perspective:r.perspective,variant:r.variant,resultSourceMap:r.resultSourceMap,lastLiveEventId:Array.isArray(g)?g[0]:g,cacheMode:_,canUseCdn:o,signal:r.signal,fetch:r.fetch,useAbortSignal:r.useAbortSignal,useCdn:r.useCdn},isMutation:i,returnFirst:u}}function Ua(e,t,n,r){if(!t)return e;let i=e.results||[];if(r)return n?i[0]&&i[0].document:i.map(e=>e.document);let a=n?`documentId`:`documentIds`,o=n?i[0]&&i[0].id:i.map(e=>e.id);return{transactionId:e.transactionId,results:i,[a]:o}}function Wa(e,t,n,r,i={}){let{reqOptions:a,isMutation:o,returnFirst:s}=Ha(e,n,r,i);return M(e,t,a).then(e=>Ua(e,o,s,i.returnDocuments))}function Ga(e,t,n,r,i={}){return j(i.signal,a=>Ka(e,t,n,r,{...i,signal:a}))}function Ka(e,t,n,r,i={}){let a={[r]:n},o=Object.assign({returnFirst:!0,returnDocuments:!0},i);return Wa(e,t,`mutate`,{mutations:[a]},o)}function A(e,t,n,r){return Wa(e,t,`actions`,{actions:Array.isArray(n)?n:[n],transactionId:r&&r.transactionId||void 0,skipCrossDatasetReferenceValidation:r&&r.skipCrossDatasetReferenceValidation||void 0,dryRun:r&&r.dryRun||void 0},r)}function qa(e,t,n,r){let i;return i=n instanceof ra||n instanceof ta?{patch:n.serialize()}:n instanceof sa||n instanceof la?n.serialize():n,Wa(e,t,`mutate`,{mutations:Array.isArray(i)?i:[i],transactionId:r&&r.transactionId||void 0},r)}function Ja(e,t,n,r){return Wa(e,t,`mutate`,{mutations:[{delete:Zi(n)}]},r)}function Ya(e,t,n,r){return ur(`createIfNotExists`,n),Ka(e,t,n,`createIfNotExists`,r)}function Xa(e,t,n,r){return ur(`createOrReplace`,n),Ka(e,t,n,`createOrReplace`,r)}function Za(e,t,n,r,i){return ur(`createVersion`,n),fr(`createVersion`,n),Er(),A(e,t,{actionType:`sanity.action.document.version.create`,publishedId:r,document:n},i)}function Qa(e,t,n,r,i,a,o){if(!r)throw Error("`createVersion()` requires `baseId` when no `document` is provided");if(!n)throw Error("`createVersion()` requires `publishedId` when `baseId` is provided");return lr(`createVersion`,r),lr(`createVersion`,n),A(e,t,{actionType:`sanity.action.document.version.create`,publishedId:n,baseId:r,versionId:i?si(n,i):oi(n),ifBaseRevisionId:a},o)}function $a(e,t,n,r=!1,i){return A(e,t,{actionType:`sanity.action.document.version.discard`,versionId:n,purge:r},i)}function eo(e,t,n,r){return ur(`replaceVersion`,n),fr(`replaceVersion`,n),A(e,t,{actionType:`sanity.action.document.version.replace`,document:n},r)}function to(e,t,n,r,i){return A(e,t,{actionType:`sanity.action.document.version.unpublish`,versionId:n,publishedId:r},i)}var no=e=>{let t=e.config();return t.dataset!==void 0&&t.projectId!==void 0||t.resource!==void 0},ro=(e,t)=>no(e)&&t.startsWith(P(e,`query`)),io=(e,t)=>no(e)&&t.startsWith(P(e,`mutate`)),ao=(e,t)=>no(e)&&t.startsWith(P(e,`doc`,``)),oo=(e,t)=>no(e)&&t.startsWith(P(e,`listen`)),so=(e,t)=>no(e)&&t.startsWith(P(e,`history`,``)),co=(e,t)=>t.startsWith(`/data/`)||ro(e,t)||io(e,t)||ao(e,t)||oo(e,t)||so(e,t);function lo(e,t){t.uri!==void 0&&Dr();let n=t.uri||t.url;if(typeof n!=`string`)throw TypeError("Request options must include a `url`");let r=e.config(),i=t.canUseCdn===void 0?[`GET`,`HEAD`].indexOf(t.method||`GET`)>=0&&co(e,n):t.canUseCdn,a=(t.useCdn??r.useCdn)&&i,o=t.tag&&r.requestTagPrefix?[r.requestTagPrefix,t.tag].join(`.`):t.tag||r.requestTagPrefix;if(o&&t.tag!==null&&(t.query={tag:gr(o),...t.query}),[`GET`,`HEAD`,`POST`].indexOf(t.method||`GET`)>=0&&ro(e,n)){let e=t.resultSourceMap??r.resultSourceMap;e!==void 0&&e!==!1&&(t.query={resultSourceMap:e,...t.query});let n=t.perspective||r.perspective;n!==void 0&&(n===`previewDrafts`&&Sr(),Nr(n),t.query={perspective:Array.isArray(n)?n.join(`,`):n,...t.query},(Array.isArray(n)&&n.length>0||n===`previewDrafts`||n===`drafts`)&&a&&(a=!1,xr()));let i=t.variant||r.variant;typeof i==`string`&&(t.query={variant:i,...t.query}),typeof i==`object`&&(t.query={variantCondition:go(i),...t.query}),t.lastLiveEventId&&(t.query={...t.query,lastLiveEventId:t.lastLiveEventId}),t.returnQuery===!1&&(t.query={returnQuery:`false`,...t.query}),a&&t.cacheMode==`noStale`&&(t.query={cacheMode:`noStale`,...t.query})}return da(r,Object.assign({},t,{url:fo(e,n,a)}))}function j(e,t){return new b(n=>{let r=new AbortController;return t(e?AbortSignal.any([e,r.signal]):r.signal).then(e=>{n.next(e),n.complete()},e=>n.error(e)),()=>r.abort()})}function M(e,t,n){return t(lo(e,n),e.config().requestHandler).then(e=>e)}function N(e,t,n){return j(n.signal,r=>M(e,t,{...n,signal:r}))}function uo(e,t){let n=lo(e,t),r=e.config().requester,i=new b(e=>r(n).subscribe(e)).pipe(bn(e=>e?.type===`progress`||e?.type===`response`),S(e=>e.type===`progress`?{type:`progress`,stage:e.stage,percent:e.percent,total:e.total,loaded:e.loaded,lengthComputable:e.lengthComputable}:{type:`response`,body:e.body}));return t.signal?i.pipe(po(t.signal)):i}function P(e,t,n){let r=e.config();if(r.resource)return _r(r),`${ho(r)}/${n===void 0?t:`${t}/${n}`}`.replace(/\/($|\?)/,`$1`);let i=`/${t}/${hr(r)}`;return`/data${n===void 0?i:`${i}/${n}`}`.replace(/\/($|\?)/,`$1`)}function fo(e,t,n=!1){let{url:r,cdnUrl:i}=e.config();return`${n?i:r}/${t.replace(/^\//,``)}`}function po(e){return t=>new b(n=>{let r=()=>n.error(mo(e));if(e&&e.aborted){r();return}let i=t.subscribe(n);return e.addEventListener(`abort`,r),()=>{e.removeEventListener(`abort`,r),i.unsubscribe()}})}function mo(e){return new DOMException(e?.reason??`The operation was aborted.`,`AbortError`)}var ho=e=>{let t=e.resource;if(!t)throw Error("`resource` must be provided to perform resource queries");let{type:n,id:r}=t;switch(n){case`dataset`:{let e=r.split(`.`);if(e.length!==2)throw Error(`Dataset ID must be in the format "project.dataset"`);return`/projects/${e[0]}/datasets/${e[1]}`}case`canvas`:return`/canvases/${r}`;case`knowledge-base`:return`/knowledge-bases/${r}`;case`media-library`:return`/media-libraries/${r}`;case`dashboard`:return`/dashboards/${r}`;default:throw Error(`Unsupported resource type: ${n.toString()}`)}};function go(e){return Object.entries(e).map(([e,t])=>`${e}:${t}`).toSorted()}function _o(e,t,n){return N(e,t,{method:`POST`,url:`/agent/action/generate/${hr(e.config())}`,body:n})}function vo(e,t,n){return M(e,t,{method:`POST`,url:`/agent/action/generate/${hr(e.config())}`,body:n})}function yo(e,t,n){return M(e,t,{method:`POST`,url:`/agent/action/patch/${hr(e.config())}`,body:n})}function bo(e,t,n){return M(e,t,{method:`POST`,url:`/agent/action/prompt/${hr(e.config())}`,body:n})}function xo(e,t,n){return N(e,t,{method:`POST`,url:`/agent/action/transform/${hr(e.config())}`,body:n})}function So(e,t,n){return M(e,t,{method:`POST`,url:`/agent/action/transform/${hr(e.config())}`,body:n})}function Co(e,t,n){return N(e,t,{method:`POST`,url:`/agent/action/translate/${hr(e.config())}`,body:n})}function wo(e,t,n){return M(e,t,{method:`POST`,url:`/agent/action/translate/${hr(e.config())}`,body:n})}var To=new WeakMap,Eo=new WeakMap,Do=class{constructor(e,t){E(this,To,void 0),E(this,Eo,void 0),O(To,this,e),O(Eo,this,t)}generate(e){return _o(k(To,this),k(Eo,this),e)}transform(e){return xo(k(To,this),k(Eo,this),e)}translate(e){return Co(k(To,this),k(Eo,this),e)}},Oo=new WeakMap,ko=new WeakMap,Ao=class{constructor(e,t){E(this,Oo,void 0),E(this,ko,void 0),O(Oo,this,e),O(ko,this,t)}generate(e){return vo(k(Oo,this),k(ko,this),e)}transform(e){return So(k(Oo,this),k(ko,this),e)}translate(e){return wo(k(Oo,this),k(ko,this),e)}prompt(e){return bo(k(Oo,this),k(ko,this),e)}patch(e){return yo(k(Oo,this),k(ko,this),e)}},jo=new WeakMap,Mo=new WeakMap,No=class{constructor(e,t){E(this,jo,void 0),E(this,Mo,void 0),O(jo,this,e),O(Mo,this,t)}upload(e,t,n){return zo(k(jo,this),k(Mo,this),e,t,n)}},Po=new WeakMap,Fo=new WeakMap,Io=class{constructor(e,t){E(this,Po,void 0),E(this,Fo,void 0),O(Po,this,e),O(Fo,this,t)}upload(e,t,n){return x(zo(k(Po,this),k(Fo,this),e,t,n).pipe(bn(e=>e.type===`response`),S(e=>Ro(e.body))))}};function Lo(e){return`asset`in e}function Ro(e){return Lo(e)?e.asset:e.document}function zo(e,t,r,i,a={}){sr(r);let o=a.extract||void 0;o&&!o.length&&(o=[`none`]);let s=e.config(),c=Ho(a,i),{tag:l,label:u,title:d,description:f,creditLine:p,filename:m,source:h}=c,g=s.resource?.type===`media-library`,_=g?{title:d,filename:m}:{label:u,title:d,description:f,filename:m,meta:o,creditLine:p};h&&!g&&(_.sourceId=h.id,_.sourceName=h.name,_.sourceUrl=h.url);let v=c.contentType?{"Content-Type":c.contentType}:{},ee={tag:l,method:`POST`,timeout:c.timeout||0,url:Vo(s,r),headers:v,query:_,body:i};return typeof XMLHttpRequest<`u`?_n(async()=>{let{uploadWithProgress:t}=await n(async()=>{let{uploadWithProgress:e}=await import(`./CLfg-xfS.js`);return{uploadWithProgress:e}},[],import.meta.url),r=lo(e,{...ee});return t({url:Bo(r.url,r.query),method:r.method??`POST`,headers:r.headers,body:i,withCredentials:r.credentials===`include`,timeout:typeof r.timeout==`object`?r.timeout.total:r.timeout,signal:r.signal})}).pipe(mn()):uo(e,ee)}function Bo(e,t){if(!t)return e;let n=(t instanceof URLSearchParams?t:new URLSearchParams(Object.entries(t).flatMap(([e,t])=>t==null?[]:[[e,`${t}`]]))).toString();return n?e+(e.includes(`?`)?`&`:`?`)+n:e}function Vo(e,t){let n=t===`image`?`images`:`files`,r=e.resource;if(r){let{type:e,id:t}=r;switch(e){case`dataset`:throw Error("Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead.");case`canvas`:return`/canvases/${t}/assets/${n}`;case`knowledge-base`:throw Error("Assets are not supported for knowledge-base resources. Use `client.context.imports` to add content instead.");case`media-library`:return`/media-libraries/${t}/upload`;case`dashboard`:return`/dashboards/${t}/assets/${n}`;default:throw Error(`Unsupported resource type: ${e.toString()}`)}}return`assets/${n}/${hr(e)}`}function Ho(e,t){return typeof File>`u`||!(t instanceof File)?e:Object.assign({filename:e.preserveFilename===!1?void 0:t.name,contentType:t.type},e)}var Uo=(e,t)=>Object.keys(t).concat(Object.keys(e)).reduce((n,r)=>(n[r]=e[r]===void 0?t[r]:e[r],n),{}),Wo=(e,t)=>t.reduce((t,n)=>(e[n]===void 0||(t[n]=e[n]),t),{}),Go=new Set([408,429]);function Ko(){return function(e){return e.pipe(xn((e,t)=>e instanceof Bi&&(typeof e.status!=`number`||e.status<400||e.status>=500||Go.has(e.status))?gn(sn({type:`reconnect`}),vn(1e3).pipe(pn(()=>t))):cn(()=>e)))}}function qo(e,t={}){let n=t.headers,r=t.withCredentials?`include`:void 0;return function(t,i){let a=Jo(e),o={...i};if(n){let e=new Headers(i?.headers);for(let[t,r]of Object.entries(n))e.set(t,r);o.headers=e}return r!==void 0&&(o.credentials=r),a(typeof t==`string`?t:t.href,o)}}function Jo(e){return e.resolveFetch?e.resolveFetch(typeof e.proxy==`string`?e.proxy:void 0):globalThis.fetch.bind(globalThis)}var Yo=[`includePreviousRevision`,`includeResult`,`includeMutations`,`includeAllVersions`,`visibility`,`effectFormat`,`enableResume`,`tag`],Xo={includeResult:!0};function Zo(e,t,n={}){let{url:r,requestTagPrefix:i}=this.config(),a=n.tag&&i?[i,n.tag].join(`.`):n.tag,o={...Uo(n,Xo),tag:a},s=pa({query:e,params:t,options:{tag:a,...Wo(o,Yo)}}),c=`${r}${P(this,`listen`,s)}`;if(c.length>14800)return cn(()=>Error(`Query too large for listener`));let l=o.events?o.events:[`mutation`];return Qo(this,c,l)}function Qo(e,t,n){let r=e.config(),{token:i,withCredentials:a,headers:o}=r,s={};return i&&(s.Authorization=`Bearer ${i}`),o&&Object.assign(s,o),Ki(()=>new Li(t,{fetch:qo(r,{headers:Object.keys(s).length?s:void 0,withCredentials:a})}),n).pipe(Ko(),bn(e=>n.includes(e.type)),S(e=>({type:e.type,...`data`in e?e.data:{}})))}var $o=[`headers`,`signal`,`tag`,`timeout`,`token`];function es(e){if(!e)throw Error(`Comment ID must be provided`);return`/collaboration/comments/${encodeURIComponent(e)}`}function ts(e){let{resource:t,projectId:n,dataset:r}=e.config();if(t)return t;if(n&&r)return{type:`dataset`,id:`${n}.${r}`};throw Error("`resource` or `projectId` and `dataset` must be configured to use collaboration comments")}function ns(e){let{collaboration:t}=e.config(),n=t?.organizationId;if(!n)throw Error("`collaboration.organizationId` must be configured to use collaboration comments");let r=ts(e);return{organizationId:n,resourceId:r.id,resourceType:r.type}}function rs(e,t){if(!t)throw Error(`Document ID must be provided`);let n=ts(e);return`${n.type}:${n.id}:${li(t)}`}function is(e,t,n,r,i,a={}){return N(e,t,{method:n,url:r,body:i,query:{...ns(e),...a.transactionId?{transactionId:a.transactionId}:{}},...Wo(a,$o)})}function as(e,...t){return is(...t).pipe(S(({results:t})=>{let n=e?t.find(({id:t})=>t===e):t[0];if(!n?.document)throw Error(`Comment write did not return a comment document`);return n.document}))}function os(...e){return is(...e).pipe(S(({transactionId:e,results:t})=>({transactionId:e,documentIds:t.map(e=>e.id),results:t})))}function ss(e,t,n,r){return as(n._id,e,t,`POST`,`/collaboration/comments`,n,r)}function cs(e,t,n,r,i){return as(n,e,t,`PATCH`,es(n),r,i)}function ls(e,t,n,r){return os(e,t,`DELETE`,es(n),void 0,r)}function us(e,t,n,r,i){return as(n,e,t,`POST`,`${es(n)}/reactions`,{shortName:r},i)}function ds(e,t,n,r,i){return as(n,e,t,`DELETE`,`${es(n)}/reactions/${encodeURIComponent(r)}`,void 0,i)}function fs(e,t,n,r,i){let a=ns(e);return N(e,t,{...pa({query:n,params:r}).length<11264?{method:`GET`,url:`/collaboration/comments/query${pa({query:n,params:r,options:a})}`}:{method:`POST`,url:`/collaboration/comments/query`,query:a,body:{query:n,params:r??{}}},...Wo(i||{},$o)}).pipe(S(e=>e.result))}function ps(e,t,n,r){let i=r??{},{requestTagPrefix:a}=e.config(),o=i.tag&&a?[a,i.tag].join(`.`):i.tag,s=pa({query:t,params:n,options:{...Wo({...Uo(i,Xo),tag:o},Yo),...ns(e)}}),c=`${e.getUrl(`/collaboration/comments/listen`)}${s}`;return c.length>14800?cn(()=>Error(`Query too large for listener`)):Qo(e,c,i.events?i.events:[`mutation`])}var F=new WeakMap,ms=new WeakMap,hs=class{constructor(e,t){E(this,F,void 0),E(this,ms,void 0),O(F,this,e),O(ms,this,t)}create(e,t){return ss(k(F,this),k(ms,this),e,t)}update(e,t,n){return cs(k(F,this),k(ms,this),e,t,n)}delete(e,t){return ls(k(F,this),k(ms,this),e,t)}addReaction(e,t,n){return us(k(F,this),k(ms,this),e,t,n)}removeReaction(e,t,n){return ds(k(F,this),k(ms,this),e,t,n)}getTargetDocumentRef(e){return rs(k(F,this),e)}fetch(e,t,n){return fs(k(F,this),k(ms,this),e,t,n)}listen(e,t,n){return ps(k(F,this),e,t,n)}},gs=new WeakMap,_s=new WeakMap,vs=class{constructor(e,t){E(this,gs,void 0),E(this,_s,void 0),O(gs,this,e),O(_s,this,t)}create(e,t){return x(ss(k(gs,this),k(_s,this),e,t))}update(e,t,n){return x(cs(k(gs,this),k(_s,this),e,t,n))}delete(e,t){return x(ls(k(gs,this),k(_s,this),e,t))}addReaction(e,t,n){return x(us(k(gs,this),k(_s,this),e,t,n))}removeReaction(e,t,n){return x(ds(k(gs,this),k(_s,this),e,t,n))}getTargetDocumentRef(e){return rs(k(gs,this),e)}fetch(e,t,n){return x(fs(k(gs,this),k(_s,this),e,t,n))}listen(e,t,n){return ps(k(gs,this),e,t,n)}};function ys(e){let t=e.config().context?.organizationId;if(!t)throw Error("`context.organizationId` must be configured to query Context documents");return t}function bs(e,t){return`/context/organizations/${encodeURIComponent(ys(e))}/${t}`}function xs(e,t,n,r,i){let a=bs(e,`query`);return N(e,t,{...pa({query:n,params:r}).length<11264?{method:`GET`,url:`${a}${pa({query:n,params:r})}`}:{method:`POST`,url:a,body:{query:n,params:r??{}}},...Wo(i||{},ua)}).pipe(S(e=>e.result))}function Ss(e,t,n,r){let i=r??{},{requestTagPrefix:a}=e.config(),o=i.tag&&a?[a,i.tag].join(`.`):i.tag,s=pa({query:t,params:n,options:Wo({...Uo(i,Xo),tag:o},Yo)}),c=`${e.getUrl(bs(e,`listen`))}${s}`;return c.length>14800?cn(()=>Error(`Query too large for listener`)):Qo(e,c,i.events?i.events:[`mutation`])}var Cs=`sanity.context.entry`,ws=`sanity.context.issue`,Ts=`sanity.context.mcp`;function Es(e,t,n,r,i){return x(xs(e,t,n,r,i))}async function Ds(e,t,n,r,i){let a=[],o;for(;;){let s=await x(xs(e,t,`*[${o?`${n} && (_createdAt > \$c || (_createdAt == \$c && _id > \$i))`:n}] | order(_createdAt asc, _id asc) [0...200]`,o?{...r,...o}:r,i));if(a.push(...s),s.length<200)return a;let c=s[s.length-1];o={c:c._createdAt,i:c._id}}}function Os(e,t,n,r,i){return Es(e,t,`*[_type == "${Cs}" && knowledgeBaseId == $kb && path == $path][0]`,{kb:n,path:r},i)}async function ks(e,t,n,r){let i=[],a=``;for(;;){let o=await x(xs(e,t,`*[_type == "${Cs}" && knowledgeBaseId == $kb && path > $after] | order(path asc) [0...200] {_id, path, title, tldr, status}`,{kb:n,after:a},r));if(i.push(...o),o.length<200)return i;a=o[o.length-1].path}}function As(e,t,n,r,i){return Ds(e,t,`_type == "${ws}" && knowledgeBaseId == $kb${r===void 0?``:` && status == $status`}`,r===void 0?{kb:n}:{kb:n,status:r},i)}function js(e,t,n,r,i){return Es(e,t,`*[_type == "${ws}" && knowledgeBaseId == $kb && _id == $id][0]`,{kb:n,id:r},i)}function Ms(e,t,n,r){return Ds(e,t,`_type == "sanity.context.instruction" && knowledgeBaseId == $kb && schemaVersion == 1`,{kb:n},r)}function Ns(e,t,n){return x(xs(e,t,`*[_type == "${Ts}" && organizationId == $org] | order(_createdAt asc, _id asc) [0...500]`,{org:ys(e)},n))}function Ps(e,t,n,r){return Es(e,t,`*[_type == "${Ts}" && organizationId == $org && name == $name][0]`,{org:ys(e),name:n},r)}function Fs(e,t,n,r){return Es(e,t,`*[_type == "sanity.context.conversation" && organizationId == $org && threadId == $threadId][0]`,{org:ys(e),threadId:n},r)}function Is(e,t){Qi(e,t),t.add(e)}var Ls=`/context/knowledge-bases`;function I(e){let t=e.config().resource;if(t?.type!==`knowledge-base`)throw Error("`resource` of type `knowledge-base` must be configured to use knowledge-base methods");return t.id}function Rs(e,t=``){return`${Ls}/${encodeURIComponent(e)}${t}`}function zs(e,t){let n=e.config().context?.organizationId;if(!n)throw Error("`context.organizationId` must be configured to record conversations");if(!t)throw Error("`threadId` must be provided");return`/context/organizations/${encodeURIComponent(n)}/conversations/${encodeURIComponent(t)}`}function Bs(e){return Object.fromEntries(Object.entries(e).flatMap(([e,t])=>t===void 0?[]:[[e,`${t}`]]))}function Vs(e){return ArrayBuffer.isView(e)?e.buffer instanceof ArrayBuffer?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):Uint8Array.from(e):e}var L=new WeakMap,R=new WeakMap,z=new WeakSet,Hs=class{constructor(e,t){Is(this,z),E(this,L,void 0),E(this,R,void 0),C(this,`knowledgeBases`,{create:(e,t)=>M(k(L,this),k(R,this),{url:Ls,method:`POST`,body:e,...t}),list:e=>M(k(L,this),k(R,this),{url:Ls,query:Bs({organizationId:e.organizationId,cursor:e.cursor,limit:e.limit}),signal:e.signal,tag:e.tag}),get:(e,t)=>M(k(L,this),k(R,this),{url:Rs(e),...t}),edit:(e,t,n)=>M(k(L,this),k(R,this),{url:Rs(e),method:`PATCH`,body:t,...n}),delete:async(e,t)=>{await M(k(L,this),k(R,this),{url:Rs(e),method:`DELETE`,...t})}}),C(this,`conversations`,{save:(e,t)=>{let{threadId:n,...r}=e;return M(k(L,this),k(R,this),{url:zs(k(L,this),n),method:`PUT`,body:r,...t})},classify:(e,t)=>{let{threadId:n,...r}=e;return M(k(L,this),k(R,this),{url:zs(k(L,this),n),method:`PATCH`,body:r,...t})},get:(e,t)=>Fs(k(L,this),k(R,this),e.threadId,t)}),C(this,`imports`,{create:(e,t)=>e.type===`file`?D(z,this,Ws).call(this,e,t):D(z,this,B).call(this,`/imports`,{method:`POST`,body:e,...t}),list:e=>D(z,this,Us).call(this,`/imports`,e),get:(e,t)=>D(z,this,B).call(this,`/imports/${encodeURIComponent(e.importId)}`,t),download:(e,t)=>D(z,this,B).call(this,`/imports/${encodeURIComponent(e.importId)}/download`,t),delete:async(e,t)=>{await D(z,this,B).call(this,`/imports/${encodeURIComponent(e.importId)}`,{method:`DELETE`,...t})}}),C(this,`jobs`,{get:(e,t)=>D(z,this,B).call(this,`/jobs/${encodeURIComponent(e.jobId)}`,t)}),C(this,`issues`,{list:(e,t)=>As(k(L,this),k(R,this),I(k(L,this)),e?.status,t),get:(e,t)=>js(k(L,this),k(R,this),I(k(L,this)),e.issueId,t),resolve:(e,t)=>{let{issueId:n,...r}=e;return D(z,this,B).call(this,`/issues/${encodeURIComponent(n)}/resolve`,{method:`POST`,body:r,...t})},dismiss:(e,t)=>D(z,this,B).call(this,`/issues/${encodeURIComponent(e.issueId)}/dismiss`,{method:`POST`,...t}),reopen:(e,t)=>D(z,this,B).call(this,`/issues/${encodeURIComponent(e.issueId)}/reopen`,{method:`POST`,...t}),apply:(e,t)=>D(z,this,B).call(this,`/issues/apply`,{method:`POST`,body:e,...t})}),C(this,`instructions`,{create:(e,t)=>D(z,this,B).call(this,`/instructions`,{method:`POST`,body:e,...t}),list:e=>Ms(k(L,this),k(R,this),I(k(L,this)),e),edit:(e,t)=>{let{instructionId:n,...r}=e;return D(z,this,B).call(this,`/instructions/${encodeURIComponent(n)}`,{method:`PATCH`,body:r,...t})},delete:async(e,t)=>{await D(z,this,B).call(this,`/instructions/${encodeURIComponent(e.instructionId)}`,{method:`DELETE`,...t})}}),C(this,`entries`,{list:e=>ks(k(L,this),k(R,this),I(k(L,this)),e),get:(e,t)=>Os(k(L,this),k(R,this),I(k(L,this)),e.path,t),rebuild:(e,t)=>D(z,this,B).call(this,`/entries/${encodeURIComponent(e.path)}/rebuild`,{method:`POST`,...t})}),C(this,`mcpEndpoints`,{list:e=>Ns(k(L,this),k(R,this),e),get:(e,t)=>Ps(k(L,this),k(R,this),e.name,t)}),C(this,`sources`,{list:e=>D(z,this,Us).call(this,`/sources`,e,{status:e?.status,importId:e?.importId,ids:e?.ids?.join(`,`)}),get:(e,t)=>D(z,this,B).call(this,`/sources/${encodeURIComponent(e.sourceId)}`,t),content:(e,t)=>D(z,this,B).call(this,`/sources/${encodeURIComponent(e.sourceId)}/content`,{query:Bs({startLine:e.startLine,endLine:e.endLine}),...t}),delete:async(e,t)=>{await D(z,this,B).call(this,`/sources/${encodeURIComponent(e.sourceId)}`,{method:`DELETE`,...t})}}),O(L,this,e),O(R,this,t)}fetch(e,t,n){return x(xs(k(L,this),k(R,this),e,t,n))}listen(e,t,n){return Ss(k(L,this),e,t,n)}build(e){return D(z,this,B).call(this,`/build`,{method:`POST`,...e})}cancelBuild(e){return D(z,this,B).call(this,`/build/cancel`,{method:`POST`,...e})}refresh(e){return D(z,this,B).call(this,`/refresh`,{method:`POST`,...e})}};function B(e,t={}){return M(k(L,this),k(R,this),{url:Rs(I(k(L,this)),e),...t})}function Us(e,t,n){return D(z,this,B).call(this,e,{query:Bs({cursor:t?.cursor,limit:t?.limit,...n}),signal:t?.signal,tag:t?.tag})}async function Ws(e,t){let n=await D(z,this,B).call(this,`/imports/uploads`,{method:`POST`,body:{filename:e.filename,...e.contentType&&{contentType:e.contentType}},...t}),r=k(L,this).config(),i=await(r.resolveFetch?.(r.proxy)??globalThis.fetch)(n.uploadUrl,{method:`PUT`,body:Vs(e.file),...e.contentType&&{headers:{"content-type":e.contentType}},signal:t?.signal});if(!i.ok)throw Error(`File upload failed: ${i.status} ${i.statusText}`);return D(z,this,B).call(this,`/imports/uploads/${encodeURIComponent(n.importId)}/complete`,{method:`POST`,body:{},...t})}var V=new WeakMap,H=new WeakMap,Gs=class{constructor(e,t){E(this,V,void 0),E(this,H,void 0),C(this,`knowledgeBases`,{create:(e,t)=>j(t?.signal,n=>M(k(V,this),k(H,this),{url:Ls,method:`POST`,body:e,tag:t?.tag,signal:n})),list:e=>j(e.signal,t=>M(k(V,this),k(H,this),{url:Ls,query:Bs({organizationId:e.organizationId,cursor:e.cursor,limit:e.limit}),tag:e.tag,signal:t})),get:(e,t)=>j(t?.signal,n=>M(k(V,this),k(H,this),{url:Rs(e),tag:t?.tag,signal:n})),edit:(e,t,n)=>j(n?.signal,r=>M(k(V,this),k(H,this),{url:Rs(e),method:`PATCH`,body:t,tag:n?.tag,signal:r})),delete:(e,t)=>j(t?.signal,n=>M(k(V,this),k(H,this),{url:Rs(e),method:`DELETE`,tag:t?.tag,signal:n}))}),C(this,`conversations`,{save:(e,t)=>{let{threadId:n,...r}=e;return j(t?.signal,e=>M(k(V,this),k(H,this),{url:zs(k(V,this),n),method:`PUT`,body:r,tag:t?.tag,signal:e}))},classify:(e,t)=>{let{threadId:n,...r}=e;return j(t?.signal,e=>M(k(V,this),k(H,this),{url:zs(k(V,this),n),method:`PATCH`,body:r,tag:t?.tag,signal:e}))},get:(e,t)=>j(t?.signal,n=>Fs(k(V,this),k(H,this),e.threadId,{...t,signal:n}))}),C(this,`entries`,{list:e=>j(e?.signal,t=>ks(k(V,this),k(H,this),I(k(V,this)),{...e,signal:t})),get:(e,t)=>j(t?.signal,n=>Os(k(V,this),k(H,this),I(k(V,this)),e.path,{...t,signal:n})),rebuild:(e,t)=>j(t?.signal,n=>M(k(V,this),k(H,this),{url:Rs(I(k(V,this)),`/entries/${encodeURIComponent(e.path)}/rebuild`),method:`POST`,tag:t?.tag,signal:n}))}),C(this,`issues`,{list:(e,t)=>j(t?.signal,n=>As(k(V,this),k(H,this),I(k(V,this)),e?.status,{...t,signal:n})),get:(e,t)=>j(t?.signal,n=>js(k(V,this),k(H,this),I(k(V,this)),e.issueId,{...t,signal:n}))}),C(this,`instructions`,{list:e=>j(e?.signal,t=>Ms(k(V,this),k(H,this),I(k(V,this)),{...e,signal:t}))}),C(this,`mcpEndpoints`,{list:e=>j(e?.signal,t=>Ns(k(V,this),k(H,this),{...e,signal:t})),get:(e,t)=>j(t?.signal,n=>Ps(k(V,this),k(H,this),e.name,{...t,signal:n}))}),O(V,this,e),O(H,this,t)}fetch(e,t,n){return xs(k(V,this),k(H,this),e,t,n)}listen(e,t,n){return Ss(k(V,this),e,t,n)}};function Ks(e,t){return qs(typeof e==`function`?{predicate:e,...t}:e)}function qs(e){return t=>{let n,r=!1,{predicate:i,...a}=e;return yn(t.pipe(Tn(t=>{e.predicate(t)&&(r=!0,n=t)}),Sn(()=>{r=!1,n=void 0}),Cn(a)),new b(e=>{r&&e.next(n),e.complete()}))}}var Js=`2021-03-25`,Ys=new WeakMap,Xs=class{constructor(e){E(this,Ys,void 0),O(Ys,this,e)}events({includeDrafts:e=!1,tag:t,waitFor:n}={}){let r=k(Ys,this).config(),{projectId:i,apiVersion:a,token:o,withCredentials:s,requestTagPrefix:c,headers:l}=r,u=a.replace(/^v/,``);if(u!==`X`&&u<Js)throw Error(`The live events API requires API version ${Js} or later. The current API version is ${u}. Please update your API version to use this feature.`);if(e&&!o&&!s)throw Error(`The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.`);let d=P(k(Ys,this),`live/events`),f=new URL(k(Ys,this).getUrl(d,!1)),p=t&&c?[c,t].join(`.`):t;p&&f.searchParams.set(`tag`,p),e&&f.searchParams.set(`includeDrafts`,`true`),n&&f.searchParams.set(`waitFor`,n);let m={};e&&o&&(m.Authorization=`Bearer ${o}`),l&&Object.assign(m,l);let h=!!(e&&s),g=Qs.get(r.resolveFetch);g||(g=new Map,Qs.set(r.resolveFetch,g));let _=JSON.stringify([f.href,typeof r.proxy==`string`?r.proxy:null,m,h]),v=g.get(_);if(v)return v;let ee=Ki(()=>new Li(f.href,{fetch:qo(r,{headers:Object.keys(m).length?m:void 0,withCredentials:h})}),[`message`,`restart`,`welcome`,`reconnect`,`goaway`]),te=Zs(new URL(k(Ys,this).getUrl(`/check/cors`,!1)),i,h,Jo(r)),ne=ee.pipe(Ko(),pn(e=>e.type===`reconnect`?te.pipe(pn(()=>sn(e))):sn(e)),xn(e=>e instanceof qn?cn(()=>e):te.pipe(pn(()=>{throw e}))),S(e=>{if(e.type===`message`){let{data:t,...n}=e;return{...n,tags:t.tags}}return e})).pipe(Sn(()=>{g.delete(_),g.size===0&&Qs.delete(r.resolveFetch)}),Ks({predicate:e=>e.type===`welcome`}));return g.set(_,ne),ne}};function Zs(e,t,n,i){return new b(a=>{let o=new AbortController,{signal:s}=o;return i(e.href,{method:`GET`,credentials:`omit`,signal:s}).then(e=>{if(!(s.aborted||!e.ok))return e.text()}).then(e=>{if(s.aborted)return;let i=e===void 0?void 0:JSON.parse(e),o=r(i)?i.result:void 0;if(n&&r(o)&&o.withCredentials===!1){a.error(new qn({projectId:t,credentials:!0}));return}if(r(o)&&o.allowed===!1){a.error(new qn({projectId:t,credentials:n}));return}a.next(),a.complete()}).catch(()=>{s.aborted||a.closed||(a.next(),a.complete())}),()=>o.abort()})}var Qs=new Map,U=new WeakMap,$s=new WeakMap,ec=class{constructor(e,t){E(this,U,void 0),E(this,$s,void 0),O(U,this,e),O($s,this,t)}create(e,t){return ic(k(U,this),k($s,this),`PUT`,e,t)}edit(e,t){return ic(k(U,this),k($s,this),`PATCH`,e,t)}delete(e){return ic(k(U,this),k($s,this),`DELETE`,e)}list(){w(`dataset`,k(U,this).config());let e=k(U,this).config(),t=e.projectId,n=`/datasets`;return e.useProjectHostname===!1&&(n=`/projects/${t}/datasets`),N(k(U,this),k($s,this),{url:n,tag:null})}getEmbeddingsSettings(e){return w(`dataset`,k(U,this).config()),ar(e),N(k(U,this),k($s,this),{url:rc(k(U,this),e),tag:null})}editEmbeddingsSettings(e,t){return w(`dataset`,k(U,this).config()),ar(e),N(k(U,this),k($s,this),{method:`PUT`,url:rc(k(U,this),e),body:t,tag:null})}},W=new WeakMap,tc=new WeakMap,nc=class{constructor(e,t){E(this,W,void 0),E(this,tc,void 0),O(W,this,e),O(tc,this,t)}create(e,t){return w(`dataset`,k(W,this).config()),ac(k(W,this),k(tc,this),`PUT`,e,t)}edit(e,t){return w(`dataset`,k(W,this).config()),ac(k(W,this),k(tc,this),`PATCH`,e,t)}delete(e){return w(`dataset`,k(W,this).config()),ac(k(W,this),k(tc,this),`DELETE`,e)}list(){w(`dataset`,k(W,this).config());let e=k(W,this).config(),t=e.projectId,n=`/datasets`;return e.useProjectHostname===!1&&(n=`/projects/${t}/datasets`),M(k(W,this),k(tc,this),{url:n,tag:null})}getEmbeddingsSettings(e){return w(`dataset`,k(W,this).config()),ar(e),M(k(W,this),k(tc,this),{url:rc(k(W,this),e),tag:null})}editEmbeddingsSettings(e,t){return w(`dataset`,k(W,this).config()),ar(e),M(k(W,this),k(tc,this),{method:`PUT`,url:rc(k(W,this),e),body:t,tag:null})}};function rc(e,t){let n=e.config();return n.useProjectHostname===!1?`/projects/${n.projectId}/datasets/${t}/settings/embeddings`:`/datasets/${t}/settings/embeddings`}function ic(e,t,n,r,i){return w(`dataset`,e.config()),ar(r),N(e,t,{method:n,url:`/datasets/${r}`,body:i,tag:null})}function ac(e,t,n,r,i){return w(`dataset`,e.config()),ar(r),M(e,t,{method:n,url:`/datasets/${r}`,body:i,tag:null})}var oc=[`sanity.function.pubsub`],sc=[`sanity.function.durable`,`sanity.function.pubsub`,`sanity.function.queue`],cc=[...new Set([...oc,...sc])],lc=(e,t)=>{let n=t?.organizationId||e.organizationId;if(n)return{"X-Sanity-Scope-Type":`organization`,"X-Sanity-Scope-Id":n};let{projectId:r}=e;if(!r)throw Error("`functions.invoke()` requires a `projectId` to be set in the client config, or an `organizationId` for a stack deployed at organization scope");return{"X-Sanity-Scope-Type":`project`,"X-Sanity-Scope-Id":r}},uc=(e,t)=>{let n=t?.stackId||e.stackId;if(!n)throw Error("`functions.invoke()` requires a `stackId`, either in the client config or on the request. Function names are only unique within a stack.");return n};function dc(e,t,n,r,i,a,o){return N(e,t,{method:`GET`,url:`/blueprints/stacks/${r}`,headers:i,signal:a?.signal}).pipe(S(e=>{let t=(e?.resources||[]).find(e=>e.type?.startsWith(`sanity.function.`)&&e.name===n);if(!t)throw Error(`Function "${n}" not found in stack "${r}"`);if(!t.externalId)throw Error(`Function "${n}" is declared in stack "${r}" but is not deployed`);if(!cc.includes(t.type))throw Error(`Function invocation is not supported for ${t.type}`);if(o&&!oc.includes(t.type))throw Error(`Synchronous function invocation is not supported for ${t.type}`);if(!o&&!sc.includes(t.type))throw Error(`Asynchronous function invocation is not supported for ${t.type}`);return t.externalId}))}function fc(e,t,n,r,i){return _n(()=>{let a=e.config(),o=lc(a,r),s=uc(a,r),c=i?.sync??!1;return dc(e,t,n,s,o,r,c).pipe(pn(n=>N(e,t,{method:`POST`,url:`/functions/${n}/invoke${c?`?sync=true`:``}`,headers:o,body:{event:{data:r?.event?.data??{}}},timeout:r?.timeout,signal:r?.signal})))})}var pc=new WeakMap,mc=new WeakMap,hc=class{constructor(e,t){E(this,pc,void 0),E(this,mc,void 0),O(pc,this,e),O(mc,this,t)}invoke(e,t,n){return fc(k(pc,this),k(mc,this),e,t,n)}},gc=new WeakMap,_c=new WeakMap,vc=class{constructor(e,t){E(this,gc,void 0),E(this,_c,void 0),O(gc,this,e),O(_c,this,t)}invoke(e,t,n){return x(fc(k(gc,this),k(_c,this),e,t,n))}},yc=new WeakMap,bc=new WeakMap,xc=class{constructor(e,t){E(this,yc,void 0),E(this,bc,void 0),O(yc,this,e),O(bc,this,t)}getPlaybackInfo(e,t={}){let n=k(yc,this).config(),r=(n.resource||n[`~experimental_resource`])?.id,{instanceId:i,libraryId:a}=Dc(e),o=a||r;if(!o)throw Error(`Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR`);let s=Oc(i,o),c=kc(t);return N(k(yc,this),k(bc,this),{method:`GET`,url:s,query:c})}},Sc=new WeakMap,Cc=new WeakMap,wc=class{constructor(e,t){E(this,Sc,void 0),E(this,Cc,void 0),O(Sc,this,e),O(Cc,this,t)}getPlaybackInfo(e,t={}){let n=k(Sc,this).config(),r=(n.resource||n[`~experimental_resource`])?.id,{instanceId:i,libraryId:a}=Dc(e),o=a||r;if(!o)throw Error(`Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR`);let s=Oc(i,o),c=kc(t);return M(k(Sc,this),k(Cc,this),{method:`GET`,url:s,query:c})}},Tc=/^media-library:(ml[^:]+):([^:]+)$/;function Ec(e){return typeof e==`object`&&`_ref`in e}function Dc(e){let t=Ec(e)?e._ref:e,n=Tc.exec(t);if(n){let[,e,t]=n;return{libraryId:e,instanceId:t}}if(typeof e==`string`&&e.startsWith(`video-`))return{instanceId:e};throw Error(`Invalid video asset instance identifier "${t}": must be a valid video instance id or a Global Dataset Reference (GDR) to the video asset in the Media Library`)}function Oc(e,t){return`/media-libraries/${t}/video/${e}/playback-info`}function kc(e){let t={};if(e.transformations){let{thumbnail:n,animated:r,storyboard:i}=e.transformations;n&&(n.width&&(t.thumbnailWidth=n.width),n.height&&(t.thumbnailHeight=n.height),n.time!==void 0&&(t.thumbnailTime=n.time),n.fit&&(t.thumbnailFit=n.fit),n.format&&(t.thumbnailFormat=n.format)),r&&(r.width&&(t.animatedWidth=r.width),r.height&&(t.animatedHeight=r.height),r.start!==void 0&&(t.animatedStart=r.start),r.end!==void 0&&(t.animatedEnd=r.end),r.fps&&(t.animatedFps=r.fps),r.format&&(t.animatedFormat=r.format)),i&&i.format&&(t.storyboardFormat=i.format)}return e.expiration&&(t.expiration=e.expiration),t}var Ac=new WeakMap,jc=new WeakMap,Mc=class{constructor(e,t){E(this,Ac,void 0),E(this,jc,void 0),O(Ac,this,e),O(jc,this,t)}list(e){let t={};return e?.includeMembers===!1&&(t.includeMembers=`false`),e?.includeFeatures===!1&&(t.includeFeatures=`false`),e?.organizationId&&(t.organizationId=e.organizationId),e?.onlyExplicitMembership&&(t.onlyExplicitMembership=`true`),N(k(Ac,this),k(jc,this),{url:`/projects`,query:t})}getById(e){return N(k(Ac,this),k(jc,this),{url:`/projects/${e}`})}},Nc=new WeakMap,Pc=new WeakMap,Fc=class{constructor(e,t){E(this,Nc,void 0),E(this,Pc,void 0),O(Nc,this,e),O(Pc,this,t)}list(e){let t={};return e?.includeMembers===!1&&(t.includeMembers=`false`),e?.includeFeatures===!1&&(t.includeFeatures=`false`),e?.organizationId&&(t.organizationId=e.organizationId),e?.onlyExplicitMembership&&(t.onlyExplicitMembership=`true`),M(k(Nc,this),k(Pc,this),{url:`/projects`,query:t})}getById(e){return M(k(Nc,this),k(Pc,this),{url:`/projects/${e}`})}};function Ic(){let e=``;for(;e.length<8;){let t=crypto.getRandomValues(new Uint8Array(8-e.length));for(let n of t){let t=n&63;t<62&&(e+=`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`[t])}}return e}var Lc=(e,t)=>t?si(e,t):oi(e);function Rc(e,{releaseId:t,publishedId:n,document:r}){if(n&&r._id){let e=Lc(n,t);return pr(e,r),e}if(r._id){let n=ti(r._id),i=ni(r._id);if(!n&&!i)throw Error(`\`${e}()\` requires a document with an \`_id\` that is a version or draft ID`);if(t){if(n)throw Error(`\`${e}()\` was called with a document ID (\`${r._id}\`) that is a draft ID, but a release ID (\`${t}\`) was also provided.`);let i=ci(r._id);if(i!==t)throw Error(`\`${e}()\` was called with a document ID (\`${r._id}\`) that is a version ID, but the release ID (\`${t}\`) does not match the document's version ID (\`${i}\`).`)}return r._id}if(n)return Lc(n,t);throw Error(`\`${e}()\` requires either a publishedId or a document with an \`_id\``)}var zc=(e,t)=>{if(typeof e==`object`&&e&&(`releaseId`in e||`metadata`in e)){let{releaseId:n=Ic(),metadata:r={}}=e;return[n,r,t]}return[Ic(),{},e]},Bc=(e,t)=>{let[n,r,i]=zc(e,t);return{action:{actionType:`sanity.action.release.create`,releaseId:n,metadata:{...r,releaseType:r.releaseType||`undecided`}},options:i}},G=new WeakMap,K=new WeakMap,Vc=class{constructor(e,t){E(this,G,void 0),E(this,K,void 0),O(G,this,e),O(K,this,t)}get({releaseId:e},t){return ba(k(G,this),k(K,this),`_.releases.${e}`,t)}create(e,t){let{action:n,options:r}=Bc(e,t),{releaseId:i,metadata:a}=n;return Va(k(G,this),k(K,this),n,r).pipe(S(e=>({...e,releaseId:i,metadata:a})))}edit({releaseId:e,patch:t},n){let r={actionType:`sanity.action.release.edit`,releaseId:e,patch:t};return Va(k(G,this),k(K,this),r,n)}publish({releaseId:e},t){let n={actionType:`sanity.action.release.publish`,releaseId:e};return Va(k(G,this),k(K,this),n,t)}archive({releaseId:e},t){let n={actionType:`sanity.action.release.archive`,releaseId:e};return Va(k(G,this),k(K,this),n,t)}unarchive({releaseId:e},t){let n={actionType:`sanity.action.release.unarchive`,releaseId:e};return Va(k(G,this),k(K,this),n,t)}schedule({releaseId:e,publishAt:t},n){let r={actionType:`sanity.action.release.schedule`,releaseId:e,publishAt:t};return Va(k(G,this),k(K,this),r,n)}unschedule({releaseId:e},t){let n={actionType:`sanity.action.release.unschedule`,releaseId:e};return Va(k(G,this),k(K,this),n,t)}delete({releaseId:e},t){let n={actionType:`sanity.action.release.delete`,releaseId:e};return Va(k(G,this),k(K,this),n,t)}fetchDocuments({releaseId:e},t){return Aa(k(G,this),k(K,this),e,t)}},q=new WeakMap,J=new WeakMap,Hc=class{constructor(e,t){E(this,q,void 0),E(this,J,void 0),O(q,this,e),O(J,this,t)}get({releaseId:e},t){return xa(k(q,this),k(J,this),`_.releases.${e}`,t)}async create(e,t){let{action:n,options:r}=Bc(e,t),{releaseId:i,metadata:a}=n;return{...await A(k(q,this),k(J,this),n,r),releaseId:i,metadata:a}}edit({releaseId:e,patch:t},n){let r={actionType:`sanity.action.release.edit`,releaseId:e,patch:t};return A(k(q,this),k(J,this),r,n)}publish({releaseId:e},t){let n={actionType:`sanity.action.release.publish`,releaseId:e};return A(k(q,this),k(J,this),n,t)}archive({releaseId:e},t){let n={actionType:`sanity.action.release.archive`,releaseId:e};return A(k(q,this),k(J,this),n,t)}unarchive({releaseId:e},t){let n={actionType:`sanity.action.release.unarchive`,releaseId:e};return A(k(q,this),k(J,this),n,t)}schedule({releaseId:e,publishAt:t},n){let r={actionType:`sanity.action.release.schedule`,releaseId:e,publishAt:t};return A(k(q,this),k(J,this),r,n)}unschedule({releaseId:e},t){let n={actionType:`sanity.action.release.unschedule`,releaseId:e};return A(k(q,this),k(J,this),n,t)}delete({releaseId:e},t){let n={actionType:`sanity.action.release.delete`,releaseId:e};return A(k(q,this),k(J,this),n,t)}fetchDocuments({releaseId:e},t){return ja(k(q,this),k(J,this),e,t)}},Uc=new WeakMap,Wc=new WeakMap,Gc=class{constructor(e,t){E(this,Uc,void 0),E(this,Wc,void 0),O(Uc,this,e),O(Wc,this,t)}getById(e){return N(k(Uc,this),k(Wc,this),{url:`/users/${e}`})}},Kc=new WeakMap,qc=new WeakMap,Jc=class{constructor(e,t){E(this,Kc,void 0),E(this,qc,void 0),O(Kc,this,e),O(qc,this,t)}getById(e){return M(k(Kc,this),k(qc,this),{url:`/users/${e}`})}},Yc=new WeakMap,Y=new WeakMap,Xc=class e{constructor(e,t=kr){C(this,`assets`,void 0),C(this,`datasets`,void 0),C(this,`live`,void 0),C(this,`mediaLibrary`,void 0),C(this,`projects`,void 0),C(this,`users`,void 0),C(this,`agent`,void 0),C(this,`collaboration`,void 0),C(this,`functions`,void 0),C(this,`releases`,void 0),C(this,`context`,void 0),E(this,Yc,void 0),E(this,Y,void 0),C(this,`listen`,Zo),this.config(t),O(Y,this,e),this.assets=new No(this,k(Y,this)),this.datasets=new ec(this,k(Y,this)),this.live=new Xs(this),this.mediaLibrary={video:new xc(this,k(Y,this))},this.projects=new Mc(this,k(Y,this)),this.users=new Gc(this,k(Y,this)),this.agent={action:new Do(this,k(Y,this))},this.collaboration={comments:new hs(this,k(Y,this))},this.functions=new hc(this,k(Y,this)),this.releases=new Vc(this,k(Y,this)),this.context=new Gs(this,k(Y,this))}clone(){return new e(k(Y,this),this.config())}config(e){if(e===void 0)return{...k(Yc,this)};if(k(Yc,this)&&k(Yc,this).allowReconfigure===!1)throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return O(Yc,this,Pr(e,k(Yc,this)||{})),this}withConfig(t){let n=this.config();return new e(k(Y,this),{...n,...t,stega:{...n.stega,...typeof t?.stega==`boolean`?{enabled:t.stega}:t?.stega||{}}})}fetch(e,t,n){return va(this,k(Y,this),k(Yc,this).stega,e,t,n)}getDocument(e,t){if(t?.includeAllVersions===!0)return ba(this,k(Y,this),e,{...t,includeAllVersions:!0});let n={signal:t?.signal,tag:t?.tag,releaseId:t?.releaseId,...t&&`includeAllVersions`in t?{includeAllVersions:!1}:{}};return ba(this,k(Y,this),e,n)}getDocuments(e,t){return wa(this,k(Y,this),e,t)}documentsExists(e,t){return Oa(this,k(Y,this),e,t)}create(e,t){return Ga(this,k(Y,this),e,`create`,t)}createIfNotExists(e,t){return Ma(this,k(Y,this),e,t)}createOrReplace(e,t){return Na(this,k(Y,this),e,t)}createVersion({document:e,publishedId:t,releaseId:n,baseId:r,ifBaseRevisionId:i},a){if(!e)return Fa(this,k(Y,this),t,r,n,i,a);let o=Rc(`createVersion`,{document:e,publishedId:t,releaseId:n}),s={...e,_id:o},c=t||li(e._id);return Pa(this,k(Y,this),s,c,a)}delete(e,t){return Ia(this,k(Y,this),e,t)}discardVersion({releaseId:e,publishedId:t},n,r){let i=Lc(t,e);return La(this,k(Y,this),i,n,r)}replaceVersion({document:e,publishedId:t,releaseId:n},r){let i=Rc(`replaceVersion`,{document:e,publishedId:t,releaseId:n}),a={...e,_id:i};return Ra(this,k(Y,this),a,r)}unpublishVersion({releaseId:e,publishedId:t},n){let r=si(t,e);return za(this,k(Y,this),r,t,n)}mutate(e,t){return Ba(this,k(Y,this),e,t)}patch(e,t){return new ta(e,t,this)}transaction(e){return new la(e,this)}action(e,t){return Va(this,k(Y,this),e,t)}request(e){return N(this,k(Y,this),e)}getUrl(e,t){return fo(this,e,t)}getDataUrl(e,t){return P(this,e,t)}},Zc=new WeakMap,X=new WeakMap,Qc=class e{constructor(e,t=kr){C(this,`assets`,void 0),C(this,`datasets`,void 0),C(this,`live`,void 0),C(this,`mediaLibrary`,void 0),C(this,`projects`,void 0),C(this,`users`,void 0),C(this,`agent`,void 0),C(this,`collaboration`,void 0),C(this,`functions`,void 0),C(this,`releases`,void 0),C(this,`context`,void 0),C(this,`observable`,void 0),E(this,Zc,void 0),E(this,X,void 0),C(this,`listen`,Zo),this.config(t),O(X,this,e),this.assets=new Io(this,k(X,this)),this.datasets=new nc(this,k(X,this)),this.live=new Xs(this),this.mediaLibrary={video:new wc(this,k(X,this))},this.projects=new Fc(this,k(X,this)),this.users=new Jc(this,k(X,this)),this.agent={action:new Ao(this,k(X,this))},this.collaboration={comments:new vs(this,k(X,this))},this.functions=new vc(this,k(X,this)),this.releases=new Hc(this,k(X,this)),this.context=new Hs(this,k(X,this)),this.observable=new Xc(e,t)}clone(){return new e(k(X,this),this.config())}config(e){if(e===void 0)return{...k(Zc,this)};if(k(Zc,this)&&k(Zc,this).allowReconfigure===!1)throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return this.observable&&this.observable.config(e),O(Zc,this,Pr(e,k(Zc,this)||{})),this}withConfig(t){let n=this.config();return new e(k(X,this),{...n,...t,stega:{...n.stega,...typeof t?.stega==`boolean`?{enabled:t.stega}:t?.stega||{}}})}fetch(e,t,n){return ya(this,k(X,this),k(Zc,this).stega,e,t,n)}getDocument(e,t){if(t?.includeAllVersions===!0)return xa(this,k(X,this),e,{...t,includeAllVersions:!0});let n={signal:t?.signal,tag:t?.tag,releaseId:t?.releaseId,...t&&`includeAllVersions`in t?{includeAllVersions:!1}:{}};return xa(this,k(X,this),e,n)}getDocuments(e,t){return Ta(this,k(X,this),e,t)}documentsExists(e,t){return ka(this,k(X,this),e,t)}create(e,t){return Ka(this,k(X,this),e,`create`,t)}createIfNotExists(e,t){return Ya(this,k(X,this),e,t)}createOrReplace(e,t){return Xa(this,k(X,this),e,t)}createVersion({document:e,publishedId:t,releaseId:n,baseId:r,ifBaseRevisionId:i},a){if(!e)return Qa(this,k(X,this),t,r,n,i,a);let o=Rc(`createVersion`,{document:e,publishedId:t,releaseId:n}),s={...e,_id:o},c=t||li(e._id);return Za(this,k(X,this),s,c,a)}delete(e,t){return Ja(this,k(X,this),e,t)}discardVersion({releaseId:e,publishedId:t},n,r){let i=Lc(t,e);return $a(this,k(X,this),i,n,r)}replaceVersion({document:e,publishedId:t,releaseId:n},r){let i=Rc(`replaceVersion`,{document:e,publishedId:t,releaseId:n}),a={...e,_id:i};return eo(this,k(X,this),a,r)}unpublishVersion({releaseId:e,publishedId:t},n){let r=si(t,e);return to(this,k(X,this),r,t,n)}mutate(e,t){return qa(this,k(X,this),e,t)}patch(e,t){return new ra(e,t,this)}transaction(e){return new sa(e,this)}action(e,t){return A(this,k(X,this),e,t)}request(e){return M(this,k(X,this),e)}dataRequest(e,t,n){return Wa(this,k(X,this),e,t,n)}getUrl(e,t){return fo(this,e,t)}getDataUrl(e,t){return P(this,e,t)}};function $c(e,t){return{requester:Jn(e).observable,createClient:n=>{let{observable:r,promise:i}=Jn(e,{ignoreWarnings:n.ignoreWarnings,maxRetries:n.maxRetries,retryDelay:n.retryDelay}),a=async e=>(await i({redirect:`manual`,...e})).body;return new t((e,t)=>t?t(e,a):a(e),{...n,requester:r,resolveFetch:n.resolveFetch??e.resolveFetch})}}}var el=$c({middleware:[]},Qc);el.requester;var tl=el.createClient,nl=`image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg`;function rl(e){let[,t,n,r]=e.split(`-`);if(!t||!n||!r)throw Error(`Malformed asset _ref '${e}'. Expected an id like "${nl}".`);let[i,a]=n.split(`x`),o=+i,s=+a;if(!(isFinite(o)&&isFinite(s)))throw Error(`Malformed asset _ref '${e}'. Expected an id like "${nl}".`);return{id:t,width:o,height:s,format:r}}var il=e=>{let t=e;return t?typeof t._ref==`string`:!1},al=e=>{let t=e;return t?typeof t._id==`string`:!1},ol=e=>{let t=e;return t&&t.asset?typeof t.asset.url==`string`:!1},sl=e=>{if(typeof e==`object`&&e){let t=e;return t._upload&&(!t.asset||!t.asset._ref)}return!1};function cl(e){if(!e)return null;let t;if(typeof e==`string`&&ll(e))t={asset:{_ref:ul(e)}};else if(typeof e==`string`)t={asset:{_ref:e}};else if(il(e))t={asset:e};else if(al(e))t={asset:{_ref:e._id||``}};else if(ol(e))t={asset:{_ref:ul(e.asset.url)}};else if(typeof e.asset==`object`)t={...e};else return null;let n=e;return n.crop&&(t.crop=n.crop),n.hotspot&&(t.hotspot=n.hotspot),dl(t)}function ll(e){return/^https?:\/\//.test(`${e}`)}function ul(e){return`image-${e.split(`/`).slice(-1)[0]}`.replace(/\.([a-z]+)$/,`-$1`)}function dl(e){if(e.crop&&e.hotspot)return e;let t={...e};return t.crop||={left:0,top:0,bottom:0,right:0},t.hotspot||={x:.5,y:.5,height:1,width:1},t}var fl=[[`width`,`w`],[`height`,`h`],[`format`,`fm`],[`download`,`dl`],[`blur`,`blur`],[`sharpen`,`sharp`],[`invert`,`invert`],[`orientation`,`or`],[`minHeight`,`min-h`],[`maxHeight`,`max-h`],[`minWidth`,`min-w`],[`maxWidth`,`max-w`],[`quality`,`q`],[`fit`,`fit`],[`crop`,`crop`],[`saturation`,`sat`],[`auto`,`auto`],[`dpr`,`dpr`],[`pad`,`pad`],[`frame`,`frame`]];function pl(e){let t={...e||{}},n=t.source;delete t.source;let r=cl(n);if(!r){if(n&&sl(n))return`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=`;throw Error(`Unable to resolve image URL from source (${JSON.stringify(n)})`)}let i=rl(r.asset._ref||r.asset._id||``),a=Math.round(r.crop.left*i.width),o=Math.round(r.crop.top*i.height),s={left:a,top:o,width:Math.round(i.width-r.crop.right*i.width-a),height:Math.round(i.height-r.crop.bottom*i.height-o)},c=r.hotspot.height*i.height/2,l=r.hotspot.width*i.width/2,u=r.hotspot.x*i.width,d=r.hotspot.y*i.height,f={left:u-l,top:d-c,right:u+l,bottom:d+c};return t.rect||t.focalPoint||t.ignoreImageParams||t.crop||(t={...t,...hl({crop:s,hotspot:f},t)}),ml({...t,asset:i})}function ml(e){let t=(e.baseUrl||`https://cdn.sanity.io`).replace(/\/+$/,``),n=e.vanityName?`/${e.vanityName}`:``,r=`${e.asset.id}-${e.asset.width}x${e.asset.height}.${e.asset.format}${n}`,i;i=e.mediaLibraryId?`${t}/media-libraries/${e.mediaLibraryId}/images/${r}`:e.canvasId?`${t}/images/canvases/${e.canvasId}/${r}`:`${t}/images/${e.projectId}/${e.dataset}/${r}`;let a=[];if(e.rect){let{left:t,top:n,width:r,height:i}=e.rect;(t!==0||n!==0||i!==e.asset.height||r!==e.asset.width)&&a.push(`rect=${t},${n},${r},${i}`)}e.bg&&a.push(`bg=${e.bg}`),e.focalPoint&&(a.push(`fp-x=${e.focalPoint.x}`),a.push(`fp-y=${e.focalPoint.y}`));let o=[e.flipHorizontal&&`h`,e.flipVertical&&`v`].filter(Boolean).join(``);return o&&a.push(`flip=${o}`),fl.forEach(t=>{let[n,r]=t;typeof e[n]<`u`?a.push(`${r}=${encodeURIComponent(e[n])}`):typeof e[r]<`u`&&a.push(`${r}=${encodeURIComponent(e[r])}`)}),a.length===0?i:`${i}?${a.join(`&`)}`}function hl(e,t){let n,r=t.width,i=t.height;if(!(r&&i))return{width:r,height:i,rect:e.crop};let a=e.crop,o=e.hotspot,s=r/i;if(a.width/a.height>s){let e=Math.round(a.height),t=Math.round(e*s),r=Math.max(0,Math.round(a.top)),i=Math.round((o.right-o.left)/2+o.left),c=Math.max(0,Math.round(i-t/2));c<a.left?c=a.left:c+t>a.left+a.width&&(c=a.left+a.width-t),n={left:c,top:r,width:t,height:e}}else{let e=a.width,t=Math.round(e/s),r=Math.max(0,Math.round(a.left)),i=Math.round((o.bottom-o.top)/2+o.top),c=Math.max(0,Math.round(i-t/2));c<a.top?c=a.top:c+t>a.top+a.height&&(c=a.top+a.height-t),n={left:r,top:c,width:e,height:t}}return{width:r,height:i,rect:n}}var gl=[`clip`,`crop`,`fill`,`fillmax`,`max`,`scale`,`min`],_l=[`top`,`bottom`,`left`,`right`,`center`,`focalpoint`,`entropy`],vl=[`format`];function yl(e){return e&&`config`in e?typeof e.config==`function`:!1}function bl(e){return e&&`clientConfig`in e?typeof e.clientConfig==`object`:!1}function xl(e){let{apiHost:t,projectId:n,dataset:r}=e,i={baseUrl:(t||`https://api.sanity.io`).replace(/^https:\/\/api\./,`https://cdn.`)},a=e.resource??e[`~experimental_resource`];if(a?.type===`media-library`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Media library clients must include an id in "resource"`);return{...i,mediaLibraryId:a.id}}if(a?.type===`canvas`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Canvas clients must include an id in "resource"`);return{...i,canvasId:a.id}}if(a?.type===`dataset`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Dataset clients must include an id in "resource"`);let[e,t]=a.id.split(`.`);if(!e||!t)throw Error(`Dataset resource id must be in the format "projectId.dataset", got: `+a.id);return{...i,projectId:e,dataset:t}}return{...i,projectId:n,dataset:r}}function Sl(e){let t=fl;for(let n of t){let[t,r]=n;if(e===t||e===r)return t}return e}function Cl(e){let t={};return t=yl(e)?xl(e.config()):bl(e)?xl(e.clientConfig):e||{},t}function wl(e,t){return new e(null,Cl(t))}function Tl(e){return wl(Dl,e)}function El(e,t){let n=t.baseUrl||e.baseUrl,r={baseUrl:n};for(let e in t)if(t.hasOwnProperty(e)){let n=Sl(e);r[n]=t[e]}return{baseUrl:n,...r}}var Dl=class e{options;constructor(e,t){this.options=e?{...e.options||{},...t||{}}:{...t||{}}}withOptions(t){let n=El(this.options,t);return new e(this,n)}image(e){return this.withOptions({source:e})}dataset(e){return this.withOptions({dataset:e})}projectId(e){return this.withOptions({projectId:e})}withClient(t){let n=Cl(t),r={...this.options};return delete r.baseUrl,delete r.projectId,delete r.dataset,delete r.mediaLibraryId,delete r.canvasId,new e(null,{...n,...r})}bg(e){return this.withOptions({bg:e})}dpr(e){return this.withOptions(e&&e!==1?{dpr:e}:{})}width(e){return this.withOptions({width:e})}height(e){return this.withOptions({height:e})}focalPoint(e,t){return this.withOptions({focalPoint:{x:e,y:t}})}maxWidth(e){return this.withOptions({maxWidth:e})}minWidth(e){return this.withOptions({minWidth:e})}maxHeight(e){return this.withOptions({maxHeight:e})}minHeight(e){return this.withOptions({minHeight:e})}size(e,t){return this.withOptions({width:e,height:t})}blur(e){return this.withOptions({blur:e})}sharpen(e){return this.withOptions({sharpen:e})}rect(e,t,n,r){return this.withOptions({rect:{left:e,top:t,width:n,height:r}})}format(e){return this.withOptions({format:e})}invert(e){return this.withOptions({invert:e})}orientation(e){return this.withOptions({orientation:e})}quality(e){return this.withOptions({quality:e})}forceDownload(e){return this.withOptions({download:e})}flipHorizontal(){return this.withOptions({flipHorizontal:!0})}flipVertical(){return this.withOptions({flipVertical:!0})}ignoreImageParams(){return this.withOptions({ignoreImageParams:!0})}fit(e){if(gl.indexOf(e)===-1)throw Error(`Invalid fit mode "${e}"`);return this.withOptions({fit:e})}crop(e){if(_l.indexOf(e)===-1)throw Error(`Invalid crop mode "${e}"`);return this.withOptions({crop:e})}saturation(e){return this.withOptions({saturation:e})}auto(e){if(vl.indexOf(e)===-1)throw Error(`Invalid auto mode "${e}"`);return this.withOptions({auto:e})}pad(e){return this.withOptions({pad:e})}vanityName(e){return this.withOptions({vanityName:e})}frame(e){if(e!==1)throw Error(`Invalid frame value "${e}"`);return this.withOptions({frame:e})}url(){return pl(this.options)}toString(){return this.url()}};function Ol(e){let t=!1,n;return(...r)=>(t||=(n=e(...r),!0),n)}(e=>Ol((...t)=>{console.warn(e.join(` `),...t)}))(["The default export of @sanity/image-url has been deprecated. Use the named export `createImageUrlBuilder` instead."]);var kl=s;if(!kl)throw Error(`Missing PUBLIC_SANITY_PROJECT_ID — set it in .env (local) or GitHub variables (CI)`);var Z=tl({projectId:kl,dataset:`production`,apiVersion:`2024-01-01`,useCdn:!0,perspective:`published`}),Al=Tl(Z);function jl(e){return Al.image(e)}var Q=new class{cache={};timers={};set(e,t,n=3e5){this.timers[e]&&clearTimeout(this.timers[e]),this.cache[e]=t,n>0&&(this.timers[e]=setTimeout(()=>{this.delete(e)},n))}get(e){return this.cache[e]||null}has(e){return e in this.cache}delete(e){delete this.cache[e],this.timers[e]&&(clearTimeout(this.timers[e]),delete this.timers[e])}clear(){Object.keys(this.timers).forEach(e=>clearTimeout(this.timers[e])),this.cache={},this.timers={}}getGlobalKey(e,t){return`global_${t}_${e}`}getPageKey(e,t,n){return`page_${t}_${e}${n?`_${n}`:``}`}};function Ml(e,...t){let n=e.length-1;return e.slice(0,n).reduce((e,n,r)=>e+n+t[r],``)+e[n]}var Nl=e=>Ml`
  *[_type == "homePage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "cta": hero.cta.${e},
      "ctaLink": hero.ctaLink,
      "viewWork": hero.viewWork.${e},
      "viewWorkLink": hero.viewWorkLink
    },
    "servicesSection": {
      "title": servicesSection.title.${e},
      "subtitle": servicesSection.subtitle.${e},
      "badge": servicesSection.badge.${e}
    },
    "portfolioSection": {
      "title": portfolioSection.title.${e},
      "subtitle": portfolioSection.subtitle.${e},
      "badge": portfolioSection.badge.${e},
      "viewAllProject": portfolioSection.viewAllProject.${e},
      "viewAllProjectLink": portfolioSection.viewAllProjectLink
    },
    "blogSection": {
      "title": blogSection.title.${e},
      "subtitle": blogSection.subtitle.${e},
      "badge": blogSection.badge.${e},
      "viewAllPosts": blogSection.viewAllPosts.${e},
      "viewAllPostsLink": blogSection.viewAllPostsLink
    },
    "testimonialsSection": {
      "title": testimonialsSection.title.${e},
      "subtitle": testimonialsSection.subtitle.${e},
      "badge": testimonialsSection.badge.${e}
    },
    "companyStatsSection": {
      "title": companyStatsSection.title.${e},
      "subtitle": companyStatsSection.subtitle.${e},
      "badge": companyStatsSection.badge.${e},
      "items": companyStatsSection.items[] {
        _key,
        "value": value,
        "label": label.${e}
      }
    },
    "servicesPage": {
      "ctaSection": {
        "title": pages.services.ctaSection.title.${e},
        "subtitle": pages.services.ctaSection.subtitle.${e},
        "ctaText1": pages.services.ctaSection.ctaText1.${e},
        "ctaLink1": pages.services.ctaSection.ctaLink1
      }
    }
  }
`,Pl=e=>Ml`
  *[_type == "portfolioPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e}
    },
    "itemLabels": {
      "challenge": itemLabels.challenge.${e},
      "solution": itemLabels.solution.${e},
      "result": itemLabels.result.${e},
      "notFound": itemLabels.notFound.${e},
      "notFoundDesc": itemLabels.notFoundDesc.${e},
      "viewAllProjects": itemLabels.viewAllProjects.${e},
      "galleryImage": itemLabels.galleryImage.${e}
    },
    "cta": {
      "heading": cta.heading.${e},
      "text": cta.text.${e},
      "getStarted": cta.getStarted.${e},
      "getStartedLink": cta.getStartedLink,
      "exploreServices": cta.exploreServices.${e},
      "exploreLink": cta.exploreLink
    }
  }
`,Fl=e=>Ml`
  *[_type == "servicesPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "ctaText1": hero.ctaText1.${e},
      "ctaText2": hero.ctaText2.${e},
      "ctaLink1": hero.ctaLink1,
      "ctaLink2": hero.ctaLink2
    },
    "servicesSection": servicesSection {
      "badge": badge.${e},
      "title": title.${e},
      "subtitle": subtitle.${e}
    },
    "processSection": processSection {
      "badge": badge.${e},
      "title": title.${e},
      "subtitle": subtitle.${e},
      "processItems": processItems[] {
        _key,
        "icon": icon,
        "title": title.${e},
        "subtitle": subtitle.${e}
      }
    },
    "whySection": whySection {
      "badge": badge.${e},
      "title": title.${e},
      "subtitle": subtitle.${e},
      "whyItems": whyItems[] {
        _key,
        "icon": icon,
        "title": title.${e},
        "subtitle": subtitle.${e}
      }
    },
    "ctaSection": ctaSection {
      "badge": badge.${e},
      "title": title.${e},
      "subtitle": subtitle.${e},
      "ctaText1": ctaText1.${e},
      "ctaText2": ctaText2.${e},
      "ctaLink1": ctaLink1,
      "ctaLink2": ctaLink2
    },
    "serviceDetail": {
      "hero": {
        "badge": serviceDetail.hero.badge.${e},
        "buttonCta": serviceDetail.hero.buttonCta.${e},
        "stats": serviceDetail.hero.stats[] {
          _key,
          "value": value,
          "label": label.${e}
        }
      },
      "subService": {
        "badge": serviceDetail.subService.badge.${e},
        "title": serviceDetail.subService.title.${e},
        "subtitle": serviceDetail.subService.subtitle.${e}
      },
      "benefits": {
        "badge": serviceDetail.benefits.badge.${e},
        "title": serviceDetail.benefits.title.${e},
        "subtitle": serviceDetail.benefits.subtitle.${e},
        "stats": serviceDetail.benefits.stats[] {
          _key,
          "value": value,
          "label": label.${e}
        }
      },
      "cta": {
        "badge": serviceDetail.cta.badge.${e},
        "title": serviceDetail.cta.title.${e},
        "subtitle": serviceDetail.cta.subtitle.${e},
        "btnCta": serviceDetail.cta.btnCta.${e},
        "linkCta": serviceDetail.cta.linkCta
      }
    }
  }
`;async function Il(e){let t=Q.getGlobalKey(e,`contactPage`);if(Q.has(t))return Q.get(t);try{let n=Ul(e),r=await Z.fetch(n);return Q.set(t,r,36e5),r}catch(t){return console.error(`Error fetching contact page for locale ${e}:`,t),null}}var Ll=e=>Ml`
  *[_type == "privacyPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "lastUpdated": hero.lastUpdated.${e}
    },
    "content": {
      "tocLabel": content.tocLabel.${e},
      "sectionLabel": content.sectionLabel.${e},
      "noticeTitle": content.noticeTitle.${e},
      "noticeSubtitle": content.noticeSubtitle.${e}
    },
    "contact": {
      "title": contact.title.${e}
    },
    "sections": sections[] {
      _key,
      "title": title.${e},
      "items": items[] {
        _key,
        "subtitle": subtitle.${e},
        "text": text.${e}
      }
    }
  }
`,Rl=e=>Ml`
  *[_type == "termsPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "lastUpdated": hero.lastUpdated.${e}
    },
    "content": {
      "tocLabel": content.tocLabel.${e},
      "sectionLabel": content.sectionLabel.${e},
      "noticeTitle": content.noticeTitle.${e},
      "noticeSubtitle": content.noticeSubtitle.${e}
    },
    "contact": {
      "title": contact.title.${e}
    },
    "sections": sections[] {
      _key,
      "title": title.${e},
      "items": items[] {
        _key,
        "subtitle": subtitle.${e},
        "text": text.${e}
      }
    }
  }
`;async function zl(e){let t=Q.getGlobalKey(e,`privacyPage`);if(Q.has(t))return Q.get(t);try{let n=Ll(e),r=await Z.fetch(n);return Q.set(t,r,36e5),r}catch(t){return console.error(`Error fetching privacy page for locale ${e}:`,t),null}}async function Bl(e){let t=Q.getGlobalKey(e,`termsPage`);if(Q.has(t))return Q.get(t);try{let n=Rl(e),r=await Z.fetch(n);return Q.set(t,r,36e5),r}catch(t){return console.error(`Error fetching terms page for locale ${e}:`,t),null}}var Vl=e=>Ml`
  *[_type == "blogPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "searchArticle": hero.searchArticle.${e}
    },
    "content": {
      "allCategories": content.allCategories.${e},
      "categories": content.categories.${e},
      "latestArticles": content.latestArticles.${e},
      "articlesCount": content.articlesCount.${e},
      "clearFilters": content.clearFilters.${e},
      "adjustSearchFilter": content.adjustSearchFilter.${e},
      "viewAllArticles": content.viewAllArticles.${e},
      "loadMore": content.loadMore.${e},
      "comingSoon": content.comingSoon.${e}
    },
    "searchModal": {
      "trendingTags": searchModal.trendingTags.${e},
      "noArticlesFound": searchModal.noArticlesFound.${e},
      "quickLinks": searchModal.quickLinks.${e},
      "resultsFor": searchModal.resultsFor.${e},
      "toSelect": searchModal.toSelect.${e},
      "toClose": searchModal.toClose.${e},
      "noResults": searchModal.noResults.${e}
    },
    "detail": {
      "readArticle": detail.readArticle.${e},
      "writtenBy": detail.writtenBy.${e},
      "inThisArticle": detail.inThisArticle.${e},
      "relatedBadge": detail.relatedBadge.${e},
      "shareArticle": detail.shareArticle.${e},
      "postNotFound": detail.postNotFound.${e},
      "postNotFoundDesc": detail.postNotFoundDesc.${e},
      "goHome": detail.goHome.${e}
    }
  }
`,Hl=e=>Ml`
  *[_type == "aboutPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "contact": hero.contact.${e},
      "portfolio": hero.portfolio.${e},
      "experience": hero.experience.${e},
      "experienceValue": hero.experienceValue,
      "client": hero.client.${e},
      "clientValue": hero.clientValue,
      "project": hero.project.${e},
      "projectValue": hero.projectValue
    },
    "vision": {
      "badge": vision.badge.${e},
      "title": vision.title.${e},
      "subtitle": vision.subtitle.${e},
      "visionTitle": vision.visionTitle.${e},
      "visionDesc": vision.visionDesc.${e},
      "missionTitle": vision.missionTitle.${e},
      "missionDesc": vision.missionDesc.${e}
    },
    "timeline": {
      "badge": timeline.badge.${e},
      "title": timeline.title.${e},
      "subtitle": timeline.subtitle.${e},
      "end": timeline.end.${e},
      "stories": timeline.stories[] {
        _key,
        "title": title.${e},
        "description": description.${e},
        icon,
        year
      }
    },
    "principles": {
      "badge": principles.badge.${e},
      "title": principles.title.${e},
      "subtitle": principles.subtitle.${e},
      "ready": principles.ready.${e},
      "readySubtitle": principles.readySubtitle.${e},
      "connect": principles.connect.${e},
      "keys": principles.keys[] {
        _key,
        "title": title.${e},
        "description": description.${e},
        icon
      }
    },
    "teams": {
      "badge": teams.badge.${e},
      "title": teams.title.${e},
      "subtitle": teams.subtitle.${e},
      "ctaTitle": teams.ctaTitle.${e},
      "ctaSubtitle": teams.ctaSubtitle.${e},
      "ctaButton": teams.ctaButton.${e}
    }
  }
`,Ul=e=>Ml`
  *[_type == "contactPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${e},
      "description": seo.description.${e},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${e},
      "title": hero.title.${e},
      "subtitle": hero.subtitle.${e},
      "email": hero.email.${e},
      "telp": hero.telp.${e},
      "whatsapp": hero.whatsapp.${e}
    },
    "form": {
      "title": form.title.${e},
      "subtitle": form.subtitle.${e},
      "name": form.name.${e},
      "email": form.email.${e},
      "phone": form.phone.${e},
      "type": form.type.${e},
      "inquiryTypeItems": form.inquiryTypeItems[]{
        value,
        "label": label.${e},
        "description": description.${e},
        "detailLabel": detailLabel.${e},
        "detailPlaceholder": detailPlaceholder.${e},
        "detailItems": detailItems[]{
          value,
          "label": label.${e}
        }
      },
      "message": form.message.${e},
      "verification": form.verification.${e},
      "verified": form.verified.${e},
      "send": form.send.${e},
      "namePlaceholder": form.namePlaceholder.${e},
      "emailPlaceholder": form.emailPlaceholder.${e},
      "phonePlaceholder": form.phonePlaceholder.${e},
      "messagePlaceholder": form.messagePlaceholder.${e},
      "sending": form.sending.${e},
      "successTitle": form.successTitle.${e},
      "successDesc": form.successDesc.${e},
      "errorTitle": form.errorTitle.${e},
      "errorDesc": form.errorDesc.${e},
      "turnstileRequired": form.turnstileRequired.${e},
      "turnstileComplete": form.turnstileComplete.${e}
    },
    "info": {
      "contactInfo": info.contactInfo.${e},
      "visit": info.visit.${e},
      "emailUs": info.emailUs.${e},
      "callUs": info.callUs.${e},
      "needHelp": info.needHelp.${e},
      "helpDesc": info.helpDesc.${e},
      "chatWhatsApp": info.chatWhatsApp.${e}
    },
    "faq": {
      "badge": faq.badge.${e},
      "title": faq.title.${e},
      "subtitle": faq.subtitle.${e},
      "faqItems": faq.faqItems[]{
        _key,
        "question": question.${e},
        "answer": answer.${e}
      },
      "helpTitle": faq.helpTitle.${e},
      "helpDesc": faq.helpDesc.${e},
      "email": faq.email.${e},
      "whatsapp": faq.whatsapp.${e}
    }
  }
`;async function Wl(e){let t=Q.getGlobalKey(e,`layoutGlobal`);if(Q.has(t))return Q.get(t);let n=`{
        "information": *[_type == "informationSettings"][0] {
            siteTitle,
            "siteDescription": siteDescription.${e},
            siteTagline,
            "siteIcon": siteIcon { asset->{ url }, alt },
            "siteLogo": siteLogo { asset->{ url }, alt },
            siteURL,
            siteEmail,
            siteTelp,
            siteWhatsApp,
            siteAddress,
            googleMaps,
            instagram,
            tiktok,
            youtube,
            github
        },
        "navigation": *[_type == "menuSettings"][0] {
            "items": navigation | order(order asc) {
                href, 
                "label": label.${e}, 
                isService, 
                order
            }
        },
        "general": *[_type == "generalSettings"][0] {
            "newsletterTitle": newsletterTitle.${e},
            "newsletterSubtitle": newsletterSubtitle.${e},
            "newsletterButton": newsletterButton.${e},
            "newsletterBadge": newsletterBadge.${e},
            "emailPlaceholder": emailPlaceholder.${e},
            "subscribeSuccess": subscribeSuccess.${e},
            "quickLinksTitle": quickLinksTitle.${e},
            "servicesFooterTitle": servicesFooterTitle.${e},
            "locationTitle": locationTitle.${e},
            "connectWithUs": connectWithUs.${e},
            "craftedWith": craftedWith.${e},
            "inIndonesia": inIndonesia.${e},
            "privacyPolicy": privacyPolicy.${e},
            "termsOfService": termsOfService.${e},
            "skipToContent": skipToContent.${e},
            "closeMenu": closeMenu.${e},
            "openMenu": openMenu.${e},
            "socialLabels": {
                "email": socialLabels.email.${e},
                "phone": socialLabels.phone.${e},
                "whatsapp": socialLabels.whatsapp.${e},
                "maps": socialLabels.maps.${e},
                "github": socialLabels.github.${e},
                "youtube": socialLabels.youtube.${e},
                "instagram": socialLabels.instagram.${e},
                "tiktok": socialLabels.tiktok.${e}
            }
        },
        "clients": *[_type == "client"] | order(coalesce(orderRank, _createdAt) asc) {
            _id, name, "logoUrl": logo.asset->url, icon, url
        },
        "services": *[_type == "service"] | order(coalesce(order, 99999) asc) {
            _id,
            "title": title.${e},
            "slug": slug.current,
            icon,
            "seo": { "description": seo.description.${e} },
            order
        },
        "config": *[_type == "configuration"][0] {
            "homepage": {
                "featuredServices": homepage.featuredServices,
                "featuredProjects": homepage.featuredProjects,
                "latestPosts": homepage.latestPosts,
                "teamMembers": homepage.teamMembers
            },
            "listingPages": {
                "servicesPerPage": listingPages.servicesPerPage,
                "projectsPerPage": listingPages.projectsPerPage,
                "postsPerPage": listingPages.postsPerPage
            }
        },
        "servicesPage": *[_type == "servicesPage"][0] {
            "ctaSection": ctaSection {
                "headline1": headline1.${e},
                "headline2": headline2.${e},
                "subtitle": subtitle.${e},
                "ctaText1": ctaText1.${e},
                "ctaLink1": ctaLink1
            }
        }
    }`;try{let e=await Z.fetch(n);return Q.set(t,e,36e5),e}catch(e){return console.error(`Error fetching global layout data:`,e),null}}function $(e,t,n){return`"${t}": ${e?`${e}.`:``}${t}.${n}`}async function Gl(e,t,n){let r=Q.getPageKey(e,`homePageDetailed`,`p${t}_post${n}`);if(Q.has(r))return Q.get(r);let i=`{
        "homePage": ${Nl(e)},
        "projects": *[_type == "project"] | order(publishedAt desc) [0...$projectsLimit] {
            _id,
            ${$(``,`title`,e)},
            slug,
            "client": client-> { name, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${e},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${$(``,`title`,e)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "testimonials": *[_type == "project" && defined(testimonial)] | order(_createdAt desc) [0...3] {
            "testimonial": testimonial {
                name,
                ${$(``,`content`,e)}
            },
            "client": client-> {
                name,
                "logoUrl": logo.asset->url,
                "iconUrl": icon.asset->url
            },
            "projectTitle": title.${e},
            "projectSlug": slug.current,
            "projectCategory": category->title.${e}
        },
        "posts": *[_type == "post"] | order(publishedAt desc) [0...$postsLimit] {
            _id,
            ${$(``,`title`,e)},
            slug,
            "imageUrl": image.asset->url,
            "seo": {
                ${$(`seo`,`description`,e)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url 
            },
            "category": category-> { 
                _id, 
                ${$(``,`title`,e)}, 
                slug, 
                color 
            },
            tags,
            publishedAt
        }
    }`;try{let a=await Z.fetch(i,{locale:e,projectsLimit:t,postsLimit:n});return Q.set(r,a,36e5),a}catch(e){return console.error(`Error fetching combined home page data:`,e),null}}async function Kl(e){let t=Q.getPageKey(e,`aboutPageDetailed`);if(Q.has(t))return Q.get(t);let n=`{
        "aboutPage": ${Hl(e)},
        "teamMembers": *[_type == "team"] | order(order asc) {
            _id,
            name,
            slug,
            ${$(``,`role`,e)},
            ${$(``,`bio`,e)},
            image,
            "social": social { instagram, github, youtube },
            order
        }
    }`;try{let r=await Z.fetch(n,{locale:e});return Q.set(t,r,36e5),r}catch(e){return console.error(`Error fetching combined about page data:`,e),null}}async function ql(e,t,n=1){let r=Math.max(1,n),i=(r-1)*t,a=i+t,o=Q.getPageKey(e,`portfolioPageDetailed`,`lim${t}-page${r}`);if(Q.has(o))return Q.get(o);let s=`{
        "portfolioPage": ${Pl(e)},
        "homePageStats": *[_type == "homePage"][0] { 
            "items": companyStatsSection.items[] {
                _key,
                value,
                "label": label.${e}
            }
        },
        "totalProjects": count(*[_type == "project"]),
        "projects": *[_type == "project"] | order(publishedAt desc) [$start...$end] {
            _id,
            ${$(``,`title`,e)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${e},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${$(``,`title`,e)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "allProjects": *[_type == "project"] | order(publishedAt desc) {
            _id,
            ${$(``,`title`,e)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${e},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${$(``,`title`,e)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "categories": *[_type == "category" && (type == "portfolio" || type == "both")] | order(title.${e} asc) {
            _id,
            ${$(``,`title`,e)},
            slug,
            color,
            icon,
            type
        }
    }`;try{let n=await Z.fetch(s,{locale:e,limit:t,start:i,end:a});return Q.set(o,n,36e5),n}catch(e){return console.error(`Error fetching combined portfolio page data:`,e),null}}async function Jl(e,t=12,n=1){let r=Math.max(1,n),i=(r-1)*t,a=i+t,o=Q.getPageKey(e,`blogPageDetailed`,`limit_${t}-page${r}`);if(Q.has(o))return Q.get(o);let s=`{
        "blogPage": ${Vl(e)},
        "totalPosts": count(*[_type == "post"]),
        "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
            _id,
            ${$(``,`title`,e)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${$(`seo`,`description`,e)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url,
                ${$(``,`role`,e)}
            },
            "category": category-> { 
                _id, 
                ${$(``,`title`,e)}, 
                slug, 
                color 
            },
            tags,
            featured
        },
        "allPosts": *[_type == "post"] | order(publishedAt desc) {
            _id,
            ${$(``,`title`,e)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${$(`seo`,`description`,e)}
            },
            "author": author-> {
                name,
                "avatarUrl": image.asset->url,
                ${$(``,`role`,e)}
            },
            "category": category-> {
                _id,
                ${$(``,`title`,e)},
                slug,
                color
            },
            tags,
            featured
        },
        "categories": *[_type == "category" && (type == "blog" || type == "both")] | order(title.${e} asc) {
            _id,
            ${$(``,`title`,e)},
            slug,
            color
        },
        "allTags": array::unique(*[_type == "post" && defined(tags)].tags[])
    }`;try{let n=await Z.fetch(s,{locale:e,limit:t,start:i,end:a});return Q.set(o,n,36e5),n}catch(e){return console.error(`Error fetching combined blog page data:`,e),null}}async function Yl(e,t){let n=Q.getPageKey(e,`servicesPageDetailed`,`lim${t}`);if(Q.has(n))return Q.get(n);let r=`{
        "servicesPage": ${Fl(e)},
        "services": *[_type == "service"] | order(coalesce(order, 99999) asc) [0...$limit] {
            _id,
            "title": title.${e},
            "slug": slug.current,
            icon,
            "longDescription": longDescription.${e},
            "seo": {
                "description": seo.description.${e}
            },
            "imageUrl": image.asset->url,
            order
        }
    }`;try{let i=await Z.fetch(r,{locale:e,limit:t});return Q.set(n,i,36e5),i}catch(e){return console.error(`Error fetching combined services page data:`,e),null}}async function Xl(e,t){let n=Q.getPageKey(t,`projectDetail`,e);if(Q.has(n))return Q.get(n);let r=`*[_type == "project" && slug.current == $slug][0] {
        "project": {
            _id,
            ${$(``,`title`,t)},
            slug,
            "client": client-> { _id, name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${t},
            ${$(``,`challenge`,t)},
            ${$(``,`solution`,t)},
            ${$(``,`result`,t)},
            "imageUrl": image.asset->url,
            "gallery": gallery[] { _key, "url": asset->url },
            "category": category-> { _id, ${$(``,`title`,t)}, slug, color },
            techStack,
            "stats": stats[] { _key, value, "label": label.${t} },
            "testimonial": testimonial { name, "content": content.${t} },
            publishedAt,
            "seo": { 
                "title": seo.title.${t},
                "description": seo.description.${t},
                "keywords": seo.keywords
            },
            "categoryRef": category._ref,
            "clientRef": client._ref
        },
        "portfolioPage": ${Pl(t)}
    }`;try{let i=await Z.fetch(r,{slug:e,locale:t});if(!i?.project)return i;let{categoryRef:a,clientRef:o}=i.project,s=i.project.techStack||[],c=`*[_type == "project" && slug.current != $slug] {
            _id,
            ${$(``,`title`,t)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${$(``,`title`,t)},
                slug,
                color
            },
            techStack,
            featured,
            publishedAt,
            "categoryMatch": category._ref == $categoryRef,
            "clientMatch": client._ref == $clientRef,
            "techStackMatches": count(techStack[@ in $techStack])
        } | order(
            select(
                clientMatch => 100,
                categoryMatch && techStackMatches > 0 => 50 + techStackMatches,
                categoryMatch => 30,
                techStackMatches > 2 => 20 + techStackMatches,
                techStackMatches > 0 => techStackMatches,
                featured => 5,
                0
            ) desc,
            publishedAt desc
        ) [0...6] {
            _id,
            title,
            slug,
            imageUrl,
            category,
            techStack,
            featured,
            publishedAt
        }`,l=await Z.fetch(c,{slug:e,locale:t,categoryRef:a||``,clientRef:o||``,techStack:s}),u={...i.project};delete u.categoryRef,delete u.clientRef;let d={project:u,portfolioPage:i.portfolioPage,relatedProjects:l||[]};return Q.set(n,d,18e5),d}catch(e){return console.error(`Error fetching combined project detail data:`,e),null}}async function Zl(e,t){let n=Q.getPageKey(t,`postDetail`,e);if(Q.has(n))return Q.get(n);let r=`*[_type == "post" && slug.current == $slug][0] {
        "post": {
            _id,
            ${$(``,`title`,t)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "body": body.${t},
            "author": author-> { 
                _id,
                name, 
                "avatarUrl": image.asset->url, 
                ${$(``,`role`,t)},
                ${$(``,`bio`,t)} 
            },
            "category": category-> { 
                _id, 
                ${$(``,`title`,t)}, 
                slug, 
                color 
            },
            tags,
            featured,
            "seo": { 
                "title": seo.title.${t},
                "description": seo.description.${t},
                "keywords": seo.keywords
            },
            "categoryRef": category._ref,
            "authorRef": author._ref
        },
        "blogPage": *[_type == "blogPage"][0] {
            "detail": {
                "writtenBy": detail.writtenBy.${t},
                "inThisArticle": detail.inThisArticle.${t},
                "readArticle": detail.readArticle.${t},
                "shareArticle": detail.shareArticle.${t},
                "postNotFound": detail.postNotFound.${t},
                "postNotFoundDesc": detail.postNotFoundDesc.${t},
                "goHome": detail.goHome.${t}
            }
        }
    }`;try{let i=await Z.fetch(r,{slug:e,locale:t});if(!i?.post)return i;let{categoryRef:a,authorRef:o}=i.post,s=i.post.tags||[],c=`*[_type == "post" && slug.current != $slug] {
            _id,
            ${$(``,`title`,t)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${$(``,`title`,t)},
                slug,
                color
            },
            tags,
            featured,
            publishedAt,
            "categoryMatch": category._ref == $categoryRef,
            "authorMatch": author._ref == $authorRef,
            "tagMatches": count(tags[@ in $tags])
        } | order(
            select(
                authorMatch => 100,
                categoryMatch && tagMatches > 0 => 50 + tagMatches,
                categoryMatch => 30,
                tagMatches > 2 => 20 + tagMatches,
                tagMatches > 0 => tagMatches,
                featured => 5,
                0
            ) desc,
            publishedAt desc
        ) [0...6] {
            _id,
            title,
            slug,
            imageUrl,
            category,
            tags,
            featured,
            publishedAt
        }`,l=await Z.fetch(c,{slug:e,locale:t,categoryRef:a||``,authorRef:o||``,tags:s}),u={...i.post};delete u.categoryRef,delete u.authorRef;let d={post:u,blogPage:i.blogPage,relatedPosts:l||[]};return Q.set(n,d,18e5),d}catch(e){return console.error(`Error fetching combined post detail data:`,e),null}}async function Ql(e,t){let n=Q.getPageKey(t,`serviceDetail`,e);if(Q.has(n))return Q.get(n);let r=`{
        "service": *[_type == "service" && slug.current == $slug][0] {
            _id,
            "title": title.${t},
            "slug": slug.current,
            icon,
            "longDescription": longDescription.${t},
            "imageUrl": image.asset->url,
            "benefits": benefits[] { 
                _key, 
                "title": ${t}
            },
            "subServices": subServices[] { 
                _key, 
                icon,
                "title": title.${t}, 
                "description": description.${t} 
            },
            "seo": { 
                "title": seo.title.${t},
                "description": seo.description.${t},
                "keywords": seo.keywords 
            }
        },
        "servicesPage": ${Fl(t)}
    }`;try{let i=await Z.fetch(r,{slug:e,locale:t});return Q.set(n,i,18e5),i}catch(e){return console.error(`Error fetching combined service detail data:`,e),null}}function $l(e,t){return e?e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`mailto:`)||e.startsWith(`#`)||e.startsWith(`/en`)||e.startsWith(`/id`)?e:`/${t}${e.startsWith(`/`)?e:`/${e}`}`:`/`}function eu(e){let t=e.split(`/`).filter(Boolean);return t[0]===`id`||t[0]===`en`?t[0]:`id`}function tu(e,t){let n=`/${t}`;return e.startsWith(n)?e.substring(n.length)||`/`:e}var nu=new Set([`$$slots`,`$$events`,`$$legacy`]);function ru(n,r){let a=e(r,nu),o=[[`path`,{d:`m9 18 6-6-6-6`}]];i(n,t({name:`chevron-right`},()=>a,{get iconNode(){return o}}))}export{Qn as A,xi as C,Fn as D,Hr as E,l as F,u as I,a as M,o as N,In as O,c as P,_i as S,yi as T,jl as _,Kl as a,mi as b,Gl as c,Xl as d,Ql as f,Bl as g,zl as h,$l as i,b as j,Nn as k,ql as l,Il as m,eu as n,Jl as o,Yl as p,tu as r,Wl as s,ru as t,Zl as u,bi as v,Xr as w,Jr as x,hi as y};