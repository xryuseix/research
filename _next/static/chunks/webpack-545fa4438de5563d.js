!function(){"use strict";var n={},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}},u=!0;try{n[r](i,i.exports,e),u=!1}finally{u&&delete t[r]}return i.loaded=!0,i.exports}e.m=n,function(){var n="function"===typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"===typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r=function(n){n&&(n.forEach((function(n){n.r--})),n.forEach((function(n){n.r--?n.r++:n()})))},o=function(n){!--n.r&&n()},i=function(n,t){n?n.push(t):o(t)};e.a=function(e,u,c){var f,a,s,l=c&&[],p=e.exports,b=!0,h=!1,d=function(t,e,r){h||(h=!0,e.r+=t.length,t.map((function(t,o){t[n](e,r)})),h=!1)},v=new Promise((function(n,t){s=t,a=function(){n(p),r(l),l=0}}));v[t]=p,v[n]=function(n,t){if(b)return o(n);f&&d(f,n,t),i(l,n),v.catch(t)},e.exports=v,u((function(e){if(!e)return a();var u,c;f=function(e){return e.map((function(e){if(null!==e&&"object"===typeof e){if(e[n])return e;if(e.then){var u=[];e.then((function(n){c[t]=n,r(u),u=0}));var c={};return c[n]=function(n,t){i(u,n),e.catch(t)},c}}var f={};return f[n]=function(n){o(n)},f[t]=e,f}))}(e);var s=new Promise((function(n,e){(u=function(){n(c=f.map((function(n){return n[t]})))}).r=0,d(f,u,e)}));return u.r?s:c})).then(a,s),b=!1}}(),function(){var n=[];e.O=function(t,r,o,i){if(!r){var u=1/0;for(s=0;s<n.length;s++){r=n[s][0],o=n[s][1],i=n[s][2];for(var c=!0,f=0;f<r.length;f++)(!1&i||u>=i)&&Object.keys(e.O).every((function(n){return e.O[n](r[f])}))?r.splice(f--,1):(c=!1,i<u&&(u=i));if(c){n.splice(s--,1);var a=o();void 0!==a&&(t=a)}}return t}i=i||0;for(var s=n.length;s>0&&n[s-1][2]>i;s--)n[s]=n[s-1];n[s]=[r,o,i]}}(),e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,{a:t}),t},e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},e.hmd=function(n){return(n=Object.create(n)).children||(n.children=[]),Object.defineProperty(n,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+n.id)}}),n},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.v=function(n,t,r,o){var i=fetch(e.p+"static/wasm/"+(t+"").replace(/(^[.-]|[^a-zA-Z0-9_-])+/g,"_")+".wasm");return"function"===typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(i,o).then((function(t){return Object.assign(n,t.instance.exports)})):i.then((function(n){return n.arrayBuffer()})).then((function(n){return WebAssembly.instantiate(n,o)})).then((function(t){return Object.assign(n,t.instance.exports)}))},e.p="/research/_next/",function(){var n={272:0};e.O.j=function(t){return 0===n[t]};var t=function(t,r){var o,i,u=r[0],c=r[1],f=r[2],a=0;if(u.some((function(t){return 0!==n[t]}))){for(o in c)e.o(c,o)&&(e.m[o]=c[o]);if(f)var s=f(e)}for(t&&t(r);a<u.length;a++)i=u[a],e.o(n,i)&&n[i]&&n[i][0](),n[u[a]]=0;return e.O(s)},r=self.webpackChunk_N_E=self.webpackChunk_N_E||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}()}();