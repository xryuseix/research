(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[735],{"./node_modules/calculator/calclator_bg.js":function(e,t,n){"use strict";n.a(e,(async function(r){n.d(t,{y:function(){return h}});var o=n("./node_modules/calculator/calclator_bg.wasm");e=n.hmd(e);var a=r([o]);o=(a.then?await a:a)[0];let c=0,s=null;function i(){return null!==s&&s.buffer===o.memory.buffer||(s=new Uint8Array(o.memory.buffer)),s}let l=new("undefined"===typeof TextEncoder?(0,e.require)("util").TextEncoder:TextEncoder)("utf-8");const u="function"===typeof l.encodeInto?function(e,t){return l.encodeInto(e,t)}:function(e,t){const n=l.encode(e);return t.set(n),{read:e.length,written:n.length}};let d=null;function f(){return null!==d&&d.buffer===o.memory.buffer||(d=new Int32Array(o.memory.buffer)),d}let m=new("undefined"===typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function h(e){try{const h=o.__wbindgen_add_to_stack_pointer(-16);var t=function(e,t,n){if(void 0===n){const n=l.encode(e),r=t(n.length);return i().subarray(r,r+n.length).set(n),c=n.length,r}let r=e.length,o=t(r);const a=i();let s=0;for(;s<r;s++){const t=e.charCodeAt(s);if(t>127)break;a[o+s]=t}if(s!==r){0!==s&&(e=e.slice(s)),o=n(o,r,r=s+3*e.length);const t=i().subarray(o+s,o+r);s+=u(e,t).written}return c=s,o}(e,o.__wbindgen_malloc,o.__wbindgen_realloc),n=c;o.calc(h,t,n);var r=f()[h/4+0],a=f()[h/4+1];return s=r,d=a,m.decode(i().subarray(s,s+d))}finally{o.__wbindgen_add_to_stack_pointer(16),o.__wbindgen_free(r,a)}var s,d}m.decode()}))},"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fapps%2Fcalc&absolutePagePath=private-next-pages%2Fapps%2Fcalc.tsx!":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/apps/calc",function(){return n("./pages/apps/calc.tsx")}])},"./components/Layout/index.tsx":function(e,t,n){"use strict";n.d(t,{A:function(){return A}});var r=n("./node_modules/react/jsx-runtime.js"),o=n("./node_modules/next/link.js"),a=n("./components/Layout/Layout.module.css"),c=n.n(a),s=function(e){var t=e.home;return(0,r.jsxs)("footer",{className:c().footer,children:[!t&&(0,r.jsx)("div",{className:c().backToHome,children:(0,r.jsx)(o.default,{href:"/",children:(0,r.jsx)("a",{children:"\u2190 Back to home"})})}),(0,r.jsxs)("div",{className:c().footerName,children:["\xa9 2021,"," ",(0,r.jsxs)("a",{href:"https://xryuseix.github.io",target:"_blank",rel:"noopener noreferrer",children:[(0,r.jsx)("img",{src:"/research/favicon.ico",alt:"xryuseix Logo",width:20,height:20,className:c().logo}),"Ryusei Ishikawa"]})," ","All Right Reserved."]})]})},i=n("./node_modules/react/index.js"),l=n("./node_modules/@mui/material/Box/Box.js"),u=n("./node_modules/@mui/material/AppBar/AppBar.js"),d=n("./node_modules/@mui/material/Toolbar/Toolbar.js"),f=n("./node_modules/@mui/material/IconButton/IconButton.js"),m=n("./node_modules/@mui/icons-material/Menu.js"),h=n("./node_modules/@mui/material/ListItem/listItemClasses.js"),p=n("./node_modules/@mui/material/ListItem/ListItem.js"),_=n("./node_modules/@mui/material/List/List.js"),x=n("./node_modules/@material-ui/core/esm/Button/Button.js"),b=n("./node_modules/@material-ui/core/esm/Drawer/Drawer.js"),j=n("./node_modules/@material-ui/core/esm/ListItemIcon/ListItemIcon.js"),y=n("./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js"),g=n("./node_modules/@material-ui/icons/Home.js"),v=n("./node_modules/@mui/icons-material/Calculate.js"),w=n("./node_modules/@mui/icons-material/Info.js");function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){O(e,t,n[t])}))}return e}function C(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var c,s=e[Symbol.iterator]();!(r=(c=s.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(i){o=!0,a=i}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var I={textTransform:"none",fontWeight:600,fontSize:"1.2em",marginLeft:"1em"},Z=i.forwardRef((function(e,t){var n=e.href,a=C(e,["href"]);return(0,r.jsx)(o.default,{href:n,passHref:!0,children:(0,r.jsx)(p.ZP,k({component:"a",button:!0,ref:t},a))})})),N=function(e){var t=e.children,n=L(i.useState(!1),2),a=n[0],c=n[1],s=function(){c(!a)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.Z,{sx:{flexGrow:1},children:(0,r.jsx)(u.Z,{position:"static",color:"inherit",children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(f.Z,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},onClick:s,children:(0,r.jsx)(m.Z,{})}),(0,r.jsx)(o.default,{href:"/",passHref:!0,children:(0,r.jsx)(x.Z,{color:"inherit",style:I,children:"Research Related Page"})})]})})}),(0,r.jsx)(b.ZP,{variant:"temporary",open:a,onClose:s,children:(0,r.jsxs)(_.Z,{sx:O({},"& .active, & .".concat(h.Z.root,":hover"),{fontWeight:"bold","& svg":{fill:"#474b42"},backgroundColor:"#f5f5f5"}),children:[(0,r.jsxs)(Z,{href:"/",children:[(0,r.jsx)(j.Z,{children:(0,r.jsx)(g.Z,{})}),(0,r.jsx)(y.Z,{primary:"Home"})]}),(0,r.jsxs)(Z,{href:"/info/tech",children:[(0,r.jsx)(j.Z,{children:(0,r.jsx)(w.Z,{})}),(0,r.jsx)(y.Z,{primary:"Info/Tech",secondary:"\u3053\u306e\u30b5\u30a4\u30c8\u3092\u69cb\u6210\u3059\u308b\u6280\u8853",style:{width:"3em"}})]}),(0,r.jsxs)(Z,{href:"/apps/calc",children:[(0,r.jsx)(j.Z,{children:(0,r.jsx)(v.Z,{})}),(0,r.jsx)(y.Z,{primary:"Calculator",secondary:"Computing with WebAssembly",style:{width:"3em"}})]})]})}),(0,r.jsx)("div",{children:t})]})},P=n("./node_modules/next/head.js"),T=function(e){var t=e.title,n=e.description;return(0,r.jsxs)(P.default,{children:[(0,r.jsx)("title",{children:t}),(0,r.jsx)("meta",{name:"description",content:n}),(0,r.jsx)("link",{rel:"icon",href:"/research/favicon.ico"}),(0,r.jsx)("meta",{name:"og:title",content:t}),(0,r.jsx)("meta",{property:"og:type",content:"website"}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,r.jsx)("meta",{property:"og:image",content:"https://raw.githubusercontent.com/xryuseix/research/main/website/public/ogp.png"})]})},A=function(e){var t=e.children,n=e.headerChild,o=e.home,a=e.title,i=e.description;return(0,r.jsxs)("div",{children:[(0,r.jsx)(N,{children:n}),(0,r.jsx)(T,{title:a,description:i}),(0,r.jsx)("main",{className:c().main,children:t}),(0,r.jsx)(s,{home:o})]})}},"./components/calculator.tsx":function(e,t,n){"use strict";n.a(e,(async function(e){var r=n("./node_modules/react/jsx-runtime.js"),o=n("./node_modules/react/index.js"),a=n("./node_modules/calculator/calclator_bg.js"),c=n("./components/calculator.module.css"),s=n.n(c),i=e([a]);function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a=(i.then?await i:i)[0];var h=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},p=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=function(e,t){return!t||"object"!==h(t)&&"function"!==typeof t?l(e):t}(this,d(t).call(this,e))).state={formula:"((1+3)*-2)*3",ans:"-24",equal:"="},n.handleChange=n.handleChange.bind(l(n)),n}var n,o,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,(o=[{key:"handleChange",value:function(e){var t=e.target.value;this.setState({formula:t}),this.setState({equal:t.length?"=":""}),this.setState({ans:a.y(t)})}},{key:"addChar",value:function(e){var t=this.state.formula+e;this.setState({formula:t}),this.setState({ans:a.y(t)})}},{key:"reCalc",value:function(){var e=this.state.formula;this.setState({ans:a.y(e)})}},{key:"render",value:function(){var e=this,t=this,n=this;return(0,r.jsxs)("div",{className:s().calculator_frame,children:[(0,r.jsxs)("div",{className:s().formula,children:[(0,r.jsx)("input",{type:"text",value:this.state.formula,onChange:this.handleChange,className:s().input}),this.state.equal," ",this.state.ans]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:s().calc_button_num,children:Object.keys(m(Array(10))).map((function(t){return(0,r.jsx)("button",{className:s().calc_button,onClick:function(){return e.addChar("".concat(t))},children:t},t)}))}),(0,r.jsxs)("div",{className:s().calc_button_op,children:[["+","-","*","/","%","(",")"].map((function(e){return(0,r.jsx)("button",{className:s().calc_button,onClick:function(){return t.addChar(e)},children:e},e)})),(0,r.jsx)("button",{className:s().calc_recalc_button,onClick:function(){return n.reCalc()},children:"recalc"})]})]})]})}}])&&u(n.prototype,o),c&&u(n,c),t}(o.Component);t.Z=p}))},"./pages/apps/calc.tsx":function(e,t,n){"use strict";n.a(e,(async function(e){n.r(t);var r=n("./node_modules/react/jsx-runtime.js"),o=n("./components/calculator.tsx"),a=n("./components/Layout/index.tsx"),c=e([o]);o=(c.then?await c:c)[0];t.default=function(){return(0,r.jsxs)(a.A,{title:"Calculator",description:"Rust\u3067\u66f8\u3044\u305fWebAssembly\u3092\u7528\u3044\u305f\u9ad8\u901f\u3067\u5b89\u5168\u306a\u96fb\u5353",children:[(0,r.jsx)("h1",{children:"Calculator"}),(0,r.jsx)(o.Z,{})]})}}))},"./components/Layout/Layout.module.css":function(e){e.exports={footer:"Layout_footer__3mkvi",logo:"Layout_logo__2Sc4K",main:"Layout_main__1xI7e",backToHome:"Layout_backToHome__3t10c",footerName:"Layout_footerName__3bGAn"}},"./components/calculator.module.css":function(e){e.exports={formula:"calculator_formula__1lPrW",calculator_frame:"calculator_calculator_frame__2Dbnf",calc_button:"calculator_calc_button__1JLG2",calc_recalc_button:"calculator_calc_recalc_button__2KzdY",input:"calculator_input__1Zht5"}},"./node_modules/calculator/calclator_bg.wasm":function(e,t,n){"use strict";e.exports=n.v(t,e.id,"c7eaf3a1922d6313")}},function(e){e.O(0,[774,961,888,179],(function(){return t="./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fapps%2Fcalc&absolutePagePath=private-next-pages%2Fapps%2Fcalc.tsx!",e(e.s=t);var t}));var t=e.O();_N_E=t}]);