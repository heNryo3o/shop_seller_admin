(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6e180ea"],{"1c64":function(e,t,n){},"1cc6":function(e,t,n){"use strict";var i=n("1c64"),a=n.n(i);a.a},"333d":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},a=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,i){return e/=i/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function l(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,n){var i=l(),a=e-i,s=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=s;var l=Math.easeInOutQuad(c,i,a,t);r(l),c<t?o(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&s(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},u=c,d=(n("1cc6"),n("2877")),p=Object(d["a"])(u,i,a,!1,null,"f3b72548",null);t["a"]=p.exports},3846:function(e,t,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"41ca":function(e,t,n){"use strict";var i=n("de7c"),a=n.n(i);a.a},4381:function(e,t,n){"use strict";n("6762"),n("2fdb");var i=n("4360"),a={inserted:function(e,t,n){var a=t.value,o=i["a"].getters&&i["a"].getters.roles;if(!(a&&a instanceof Array&&a.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var r=a,l=o.some(function(e){return!!o.includes("super_admin")||r.includes(e)});l||e.parentNode&&e.parentNode.removeChild(e)}},o=function(e){e.directive("permission",a)};window.Vue&&(window["permission"]=a,Vue.use(o)),a.install=o;t["a"]=a},"456d":function(e,t,n){var i=n("4bf8"),a=n("0d58");n("5eda")("keys",function(){return function(e){return a(i(e))}})},"495b":function(e,t,n){},"589d":function(e,t,n){},"5d3e":function(e,t,n){"use strict";var i=n("d35f"),a=n.n(i);a.a},"5dbc":function(e,t,n){var i=n("d3f4"),a=n("8b97").set;e.exports=function(e,t,n){var o,r=t.constructor;return r!==n&&"function"==typeof r&&(o=r.prototype)!==n.prototype&&i(o)&&a&&a(e,o),e}},"5eda":function(e,t,n){var i=n("5ca1"),a=n("8378"),o=n("79e5");e.exports=function(e,t){var n=(a.Object||{})[e]||Object[e],r={};r[e]=t(n),i(i.S+i.F*o(function(){n(1)}),"Object",r)}},6724:function(e,t,n){"use strict";n("8d41");var i="@@wavesContext";function a(e,t){function n(n){var i=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),l=o.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",o.appendChild(l)),a.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(n.pageY-r.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(n.pageX-r.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=a.color,l.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var o={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t["a"]=o},"6b54":function(e,t,n){"use strict";n("3846");var i=n("cb7c"),a=n("0bfb"),o=n("9e1e"),r="toString",l=/./[r],s=function(e){n("2aba")(RegExp.prototype,r,e,!0)};n("79e5")(function(){return"/a/b"!=l.call({source:"a",flags:"b"})})?s(function(){var e=i(this);return"/".concat(e.source,"/","flags"in e?e.flags:!o&&e instanceof RegExp?a.call(e):void 0)}):l.name!=r&&s(function(){return l.call(this)})},"73f5":function(e,t,n){"use strict";n.d(t,"c",function(){return o}),n.d(t,"b",function(){return r}),n.d(t,"a",function(){return l});var i=n("b775"),a="/store";function o(e){return Object(i["a"])({url:a+"/info",method:"get",params:e})}function r(e){return Object(i["a"])({url:a+"/edit",method:"post",data:e})}function l(e){return Object(i["a"])({url:a+"/create",method:"post",data:e})}},8276:function(e,t,n){"use strict";var i=n("495b"),a=n.n(i);a.a},"8b97":function(e,t,n){var i=n("d3f4"),a=n("cb7c"),o=function(e,t){if(a(e),!i(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,i){try{i=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),i(e,[]),t=!(e instanceof Array)}catch(a){t=!0}return function(e,n){return o(e,n),t?e.__proto__=n:i(e,n),e}}({},!1):void 0),check:o}},"8d41":function(e,t,n){},aa77:function(e,t,n){var i=n("5ca1"),a=n("be13"),o=n("79e5"),r=n("fdef"),l="["+r+"]",s="​",c=RegExp("^"+l+l+"*"),u=RegExp(l+l+"*$"),d=function(e,t,n){var a={},l=o(function(){return!!r[e]()||s[e]()!=s}),c=a[e]=l?t(p):r[e];n&&(a[n]=c),i(i.P+i.F*l,"String",a)},p=d.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(u,"")),e};e.exports=d},ad53:function(e,t,n){"use strict";var i=n("589d"),a=n.n(i);a.a},c405:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r});var i=n("b775"),a="/category";function o(){return Object(i["a"])({url:a+"/options",method:"get"})}function r(){return Object(i["a"])({url:a+"/sub-options",method:"get"})}},c5f6:function(e,t,n){"use strict";var i=n("7726"),a=n("69a8"),o=n("2d95"),r=n("5dbc"),l=n("6a99"),s=n("79e5"),c=n("9093").f,u=n("11e9").f,d=n("86cc").f,p=n("aa77").trim,f="Number",m=i[f],h=m,v=m.prototype,g=o(n("2aeb")(v))==f,b="trim"in String.prototype,y=function(e){var t=l(e,!1);if("string"==typeof t&&t.length>2){t=b?t.trim():p(t,3);var n,i,a,o=t.charCodeAt(0);if(43===o||45===o){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===o){switch(t.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+t}for(var r,s=t.slice(2),c=0,u=s.length;c<u;c++)if(r=s.charCodeAt(c),r<48||r>a)return NaN;return parseInt(s,i)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof m&&(g?s(function(){v.valueOf.call(n)}):o(n)!=f)?r(new h(y(t)),n,m):y(t)};for(var w,_=n("9e1e")?c(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)a(h,w=_[k])&&!a(m,w)&&d(m,w,u(h,w));m.prototype=v,v.constructor=m,n("2aba")(i,f,m)}},d35f:function(e,t,n){},de7c:function(e,t,n){},f560:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"输入商品名称搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1),e._v(" "),n("el-col",{attrs:{sm:3}},[n("el-select",{attrs:{placeholder:"状态",size:"small",clearable:""},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.statusOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})}),1)],1),e._v(" "),n("el-col",{attrs:{sm:6}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right",size:"small","unlink-panels":"","range-separator":"-","start-placeholder":"发布开始日期","end-placeholder":"发布结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd",format:"yyyy年 MM月 dd日"},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}})],1),e._v(" "),n("el-col",{attrs:{sm:5}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:e.handleFilter}},[e._v("\n        搜索\n      ")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/edit-role"],expression:"['role/edit-role']"}],attrs:{type:"success",size:"small",icon:"el-icon-edit"},on:{click:function(t){return e.handleViewProduct({id:0,skus:[]})}}},[e._v("\n        发布新商品\n      ")])],1)],1),e._v(" "),n("div",{staticClass:"table-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[n("el-table-column",{attrs:{label:"商品名称",width:"210"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewProduct(i)}}},[e._v(e._s(i.name))]),e._v(" "),1==i.is_dapai?n("el-tag",{attrs:{size:"mini",type:"danger"}},[e._v("大牌抢购")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"分类",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.category_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"价格",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.price))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"发布时间",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.created_at))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-tag",{attrs:{type:1==i.status?"":"danger",size:"small"}},[n("span",[e._v(e._s(1==i.status?"上架中":"已下架"))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/edit-role"],expression:"['role/edit-role']"}],attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleViewProduct(i)}}},[e._v("\n            编辑\n          ")]),e._v(" "),1==i.status?n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/change-status"],expression:"['role/change-status']"}],attrs:{size:"mini",type:"warning"},on:{click:function(t){return e.handleChangeStatus(i,2)}}},[e._v("\n            下架\n          ")]):n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/change-status"],expression:"['role/change-status']"}],attrs:{size:"mini",type:"success"},on:{click:function(t){return e.handleChangeStatus(i,1)}}},[e._v("\n            上架\n          ")])]}}])})],1)],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("product-info",{attrs:{"product-info":e.productInfo,"info-visible":e.productVisible,"is-online":e.isOnline},on:{"update:infoVisible":function(t){e.productVisible=t},"update:info-visible":function(t){e.productVisible=t},updateList:e.getList}})],1)},a=[],o=n("b775"),r="/product";function l(e){return Object(o["a"])({url:r+"/index",method:"get",params:e})}function s(e){return Object(o["a"])({url:r+"/edit",method:"post",data:e})}function c(e){return Object(o["a"])({url:r+"/create",method:"post",data:e})}function u(e){return Object(o["a"])({url:r+"/change-status",method:"post",data:e})}var d=n("73f5"),p=n("6724"),f=n("4381"),m=n("333d"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-drawer",{attrs:{title:"商品信息",size:"75%",visible:e.infoVisible,wrapperClosable:!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.infoVisible=t},open:e.handleOpen}},[n("div",{staticStyle:{"overflow-y":"auto","overflow-x":"hidden",width:"94%",margin:"auto"}},[n("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:e.info}},[n("div",{staticClass:"edit-container"},[n("el-row",{attrs:{gutter:30}},[n("el-col",{attrs:{span:15}},[n("el-form-item",{staticStyle:{"margin-bottom":"20px"},attrs:{prop:"name"}},[n("MDinput",{attrs:{maxlength:100,name:"name",required:""},model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}},[e._v("\n                  商品名称\n                ")])],1),e._v(" "),n("div",{staticStyle:{"font-size":"17px","font-weight":"600","margin-bottom":"10px"}},[e._v("商品描述：")]),e._v(" "),n("el-form-item",{attrs:{prop:"content"}},[e.freshEditor?n("Tinymce",{ref:"editor",attrs:{height:420},model:{value:e.info.content,callback:function(t){e.$set(e.info,"content",t)},expression:"info.content"}}):e._e()],1),e._v(" "),2==e.isOnline?n("div",{staticStyle:{"font-size":"17px","font-weight":"600","margin-bottom":"10px"}},[e._v("注意事项：")]):e._e(),e._v(" "),n("el-form-item",{attrs:{prop:"attention"}},[e.freshEditor&&2==e.isOnline?n("Tinymce",{ref:"editor",attrs:{height:300},model:{value:e.info.attention,callback:function(t){e.$set(e.info,"attention",t)},expression:"info.attention"}}):e._e()],1)],1),e._v(" "),n("el-col",{attrs:{span:9}},[n("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("商品设置")])]),e._v(" "),n("el-form-item",{attrs:{label:"分类：",prop:"category"}},[n("el-cascader",{staticClass:"full-width",staticStyle:{width:"230px"},attrs:{options:e.cateOptions,placeholder:"请选择分类"},model:{value:e.info.category,callback:function(t){e.$set(e.info,"category",t)},expression:"info.category"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"封面图：",prop:"thumb"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,"show-file-list":!1,"on-success":e.handleUploadSuccess,"before-upload":e.beforeUpload}},[e.thumb?n("img",{staticClass:"avatar",attrs:{src:e.thumb}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),n("el-form-item",{attrs:{label:"一级推广赏金：",prop:"retail_1"}},[n("el-input",{staticStyle:{width:"230px"},attrs:{placeholder:"一级推广赏金范围在5-8元之间"},model:{value:e.info.retail_1,callback:function(t){e.$set(e.info,"retail_1",t)},expression:"info.retail_1"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"二级推广赏金：",prop:"retail_2"}},[n("el-input",{staticStyle:{width:"230px"},attrs:{placeholder:"二级推广赏金范围在1-3元之间"},model:{value:e.info.retail_2,callback:function(t){e.$set(e.info,"retail_2",t)},expression:"info.retail_2"}})],1)],1)],1)],1),e._v(" "),n("el-row",[n("div",{staticStyle:{"margin-top":"30px","margin-bottom":"20px"}},[n("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"success"},on:{click:e.handleAddSku}},[e._v("\n                    添加新规格\n                  ")])],1),e._v(" "),e._l(e.info.skus,function(t,i){return n("div",{key:t.id},[n("div",{staticStyle:{"margin-bottom":"10px"}},[n("span",{staticStyle:{"font-size":"17px","font-weight":"600"}},[e._v("规格"+e._s(i+1))]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"20px"},attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelSku(i)}}},[e._v("\n                      删除规格\n                    ")])],1),e._v(" "),n("el-form-item",{attrs:{label:"规格名称：","label-width":"100px"}},[n("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写规格名称,如S,M,L等"},model:{value:t.title,callback:function(n){e.$set(t,"title",n)},expression:"item.title"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"价格：","label-width":"100px"}},[n("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写价格"},model:{value:t.price,callback:function(n){e.$set(t,"price",n)},expression:"item.price"}})],1),e._v(" "),1==e.isOnline?n("el-form-item",{attrs:{label:"剩余库存：","label-width":"100px"}},[n("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写剩余库存数量"},model:{value:t.stock,callback:function(n){e.$set(t,"stock",n)},expression:"item.stock"}})],1):e._e()],1)})],2)],1)]),e._v(" "),n("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:10}},[n("el-col",{staticClass:"button-group",attrs:{sm:24}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"small",type:"primary",icon:"el-icon-check"},on:{click:e.handleEdit}},[e._v("\n                保存\n              ")])],1)],1)],1)])],1)])],1)},v=[],g=(n("6b54"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"material-input__component",class:e.computedClasses},[n("div",{class:{iconClass:e.icon}},[e.icon?n("i",{staticClass:"el-input__icon material-input__icon",class:["el-icon-"+e.icon]}):e._e(),e._v(" "),"email"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"email"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"url"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"url"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"number"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,step:e.step,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,max:e.max,min:e.min,minlength:e.minlength,maxlength:e.maxlength,required:e.required,type:"number"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"password"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,max:e.max,min:e.min,required:e.required,type:"password"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"tel"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"tel"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"text"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,minlength:e.minlength,maxlength:e.maxlength,required:e.required,type:"text"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),n("span",{staticClass:"material-input-bar"}),e._v(" "),n("label",{staticClass:"material-label"},[e._t("default")],2)])])}),b=[],y=(n("c5f6"),{name:"MdInput",props:{icon:String,name:String,type:{type:String,default:"text"},value:[String,Number],placeholder:String,readonly:Boolean,disabled:Boolean,min:String,max:String,step:String,minlength:Number,maxlength:Number,required:{type:Boolean,default:!0},autoComplete:{type:String,default:"off"},validateEvent:{type:Boolean,default:!0}},data:function(){return{currentValue:this.value,focus:!1,fillPlaceHolder:null}},computed:{computedClasses:function(){return{"material--active":this.focus,"material--disabled":this.disabled,"material--raised":Boolean(this.focus||this.currentValue)}}},watch:{value:function(e){this.currentValue=e}},methods:{handleModelInput:function(e){var t=e.target.value;this.$emit("input",t),"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.change",[t]),this.$emit("change",t)},handleMdFocus:function(e){this.focus=!0,this.$emit("focus",e),this.placeholder&&""!==this.placeholder&&(this.fillPlaceHolder=this.placeholder)},handleMdBlur:function(e){this.focus=!1,this.$emit("blur",e),this.fillPlaceHolder=null,"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.blur",[this.currentValue])}}}),w=y,_=(n("ad53"),n("2877")),k=Object(_["a"])(w,g,b,!1,null,"d9b004ee",null),x=k.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tinymce-container",class:{fullscreen:e.fullscreen},style:{width:e.containerWidth}},[n("textarea",{staticClass:"tinymce-textarea",attrs:{id:e.tinymceId}}),e._v(" "),n("div",{staticClass:"editor-custom-btn-container"},[n("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#409EFF"},on:{successCBK:e.imageSuccessCBK}})],1)])},S=[],O=(n("ac6a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload-container"},[n("el-button",{attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("\n    上传图片\n  ")]),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogVisible,modal:!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":e.fileList,"show-file-list":!0,"on-remove":e.handleRemove,"on-success":e.handleSuccess,"before-upload":e.beforeUpload,action:e.uploadUrl,"list-type":"picture-card"}},[n("el-button",{attrs:{type:"primary"}},[e._v("\n        点击上传\n      ")])],1),e._v(" "),n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("\n      取消\n    ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("\n      确认\n    ")])],1)],1)}),I=[],V=(n("456d"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[],uploadUrl:"https://api.jiangsulezhong.com/seller/system/upload"}},methods:{checkAllSuccess:function(){var e=this;return Object.keys(this.listObj).every(function(t){return e.listObj[t].hasSuccess})},handleSubmit:function(){var e=this,t=Object.keys(this.listObj).map(function(t){return e.listObj[t]});this.checkAllSuccess()?(this.$emit("successCBK",t),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待图片上传完毕!")},handleSuccess:function(e,t){for(var n=t.uid,i=Object.keys(this.listObj),a=0,o=i.length;a<o;a++)if(this.listObj[i[a]].uid===n)return this.listObj[i[a]].url=e.data.preview_url,void(this.listObj[i[a]].hasSuccess=!0)},handleRemove:function(e){for(var t=e.uid,n=Object.keys(this.listObj),i=0,a=n.length;i<a;i++)if(this.listObj[n[i]].uid===t)return void delete this.listObj[n[i]]},beforeUpload:function(e){var t=this,n=window.URL||window.webkitURL,i=e.uid;return this.listObj[i]={},new Promise(function(a,o){var r=new Image;r.src=n.createObjectURL(e),r.onload=function(){t.listObj[i]={hasSuccess:!1,uid:e.uid,width:this.width,height:this.height}},a(!0)})}}}),N=V,$=(n("5d3e"),Object(_["a"])(N,O,I,!1,null,"0af5fe99",null)),E=$.exports,j=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],z=j,M=["bold italic underline strikethrough alignleft aligncenter alignright outdent indent hr forecolor backcolor"],T=M,P=(n("ac4d"),n("8a81"),[]);function F(){return window.tinymce}var L=function(e,t){var n=document.getElementById(e),i=t||function(){};if(!n){var a=document.createElement("script");a.src=e,a.id=e,document.body.appendChild(a),P.push(i);var o="onload"in a?r:l;o(a)}function r(t){t.onload=function(){this.onerror=this.onload=null;for(var e=0,n=P;e<n.length;e++){var i=n[e];i(null,t)}P=null},t.onerror=function(){this.onerror=this.onload=null,i(new Error("Failed to load "+e),t)}}function l(e){e.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var t=!0,n=!1,i=void 0;try{for(var a,o=P[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var r=a.value;r(null,e)}}catch(l){n=!0,i=l}finally{try{t||null==o.return||o.return()}finally{if(n)throw i}}P=null}}}n&&i&&(F()?i(null,n):P.push(i))},q=L,A="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",B={name:"Tinymce",components:{editorImage:E},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var e=this.width;return/^[\d]+(\.[\d]+)?$/.test(e)?"".concat(e,"px"):e}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(t.tinymceId).setContent(e||"")})}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var e=this;q(A,function(t){t?e.$message.error(t.message):e.initTinymce()})},initTinymce:function(){var e=this,t=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:"zh_CN",height:this.height,body_class:"panel-body ",object_resizing:!1,inline:!1,toolbar:this.toolbar.length>0?this.toolbar:T,menubar:"",plugins:z,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(n){t.value&&n.setContent(t.value),t.hasInit=!0,n.on("NodeChange Change KeyUp SetContent",function(){e.hasChange=!0,e.$emit("input",n.getContent())})},setup:function(e){e.on("FullscreenStateChanged",function(e){t.fullscreen=e.state})}})},destroyTinymce:function(){var e=window.tinymce.get(this.tinymceId);this.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(e){var t=this;e.forEach(function(e){window.tinymce.get(t.tinymceId).insertContent('<img class="wscnph" src="'.concat(e.url,'" >'))})}}},U=B,Q=(n("8276"),Object(_["a"])(U,C,S,!1,null,"a49cff62",null)),H=Q.exports,R=n("c405"),D={name:"ProductInfo",components:{MDinput:x,Tinymce:H},directives:{waves:p["a"],permission:f["a"]},props:["infoVisible","productInfo","isOnline"],data:function(){return{info:{id:0,name:"",content:"",thumb:""},uploadUrl:"https://api.jiangsulezhong.com/seller/system/upload",previewVisible:!1,previewImageUrl:"",dialogImageUrl:"",dialogVisible:!1,freshEditor:!1,loading:!1,loaded:!1,cateOptions:[],thumb:""}},methods:{handleUploadSuccess:function(e){this.info.thumb=e.data.preview_url,this.thumb=e.data.preview_url},beforeUpload:function(){},handlePreview:function(e){this.previewImageUrl=e,this.previewVisible=!0},handleDelSku:function(e){this.info.skus.splice(e,1)},handleAddSku:function(){this.info.skus.push({id:0,title:"",price:0,stock:""})},getCateOptions:function(){var e=this;Object(R["b"])({}).then(function(t){console.log(t.data),e.cateOptions=t.data.options})},handleClose:function(){this.freshEditor=!1,this.$emit("update:infoVisible",!1)},handleOpen:function(){this.getCateOptions(),this.info=this.productInfo,this.freshEditor=!0},handleEdit:function(){var e=this;this.info.id>0?s(this.info).then(function(t){e.$emit("updateList"),e.$notify({title:"成功",message:"保存成功",type:"success",duration:2e3}),e.handleClose()}):c(this.info).then(function(t){e.$emit("updateList"),e.$notify({title:"成功",message:"发布成功",type:"success",duration:2e3}),e.handleClose()})},handleUploaded:function(e){this.info.thumb=e},getInfo:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){var t=this;this.loading=!0,getInfo({id:e}).then(function(e){t.info=e.data,t.info.status=1===t.info.status?"1":"2",t.loading=!1,t.loaded=!0})})}},K=D,W=(n("41ca"),Object(_["a"])(K,h,v,!1,null,null,null)),X=W.exports,G={components:{Pagination:m["a"],ProductInfo:X},directives:{waves:p["a"],permission:f["a"]},data:function(){return{isOnline:0,productInfo:{},productVisible:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},statusOptions:[{name:"上架中",key:1},{name:"已下架",key:2}],list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"}}},created:function(){this.getInfo(),this.getList()},methods:{getInfo:function(){var e=this;Object(d["c"])().then(function(t){e.isOnline=t.data.is_online})},sortChange:function(e){var t=e.prop,n=e.order;this.listQuery.sort="ascending"===n?"+"+t:"-"+t,this.handleFilter()},getList:function(){var e=this;this.listLoading=!0,l(this.listQuery).then(function(t){e.list=t.data.list,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){})},handleViewProduct:function(e){this.productInfo=e,this.productVisible=!0},handleChangeStatus:function(e,t){var n=this,i=1===t?"商品上架成功":"商品下架成功";u({id:e.id,status:t}).then(function(e){n.$notify({title:"成功",message:i,type:"success",duration:2e3}),n.getList()})}}},Y=G,J=Object(_["a"])(Y,i,a,!1,null,null,null);t["default"]=J.exports},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);