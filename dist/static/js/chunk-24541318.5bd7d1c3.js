(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24541318"],{"1ab2":function(e,a,r){},"8fd0":function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",[r("h1",{staticStyle:{"text-align":"center","margin-top":"30px"}},[e._v("乐众小店商家入驻申请")]),e._v(" "),r("el-card",{staticClass:"form-card"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"140px",rules:e.rules}},[r("el-row",[r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"商家名称：",prop:"name"}},[r("el-input",{attrs:{placeholder:"请填写商家名称"},model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"手机号码：",prop:"mobile"}},[r("el-input",{attrs:{placeholder:"请填写手机号码"},model:{value:e.form.mobile,callback:function(a){e.$set(e.form,"mobile",a)},expression:"form.mobile"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"所在地区：",prop:"area"}},[r("el-cascader",{staticClass:"full-width",attrs:{options:e.areaOptions,placeholder:"请选择所在地区"},model:{value:e.form.area,callback:function(a){e.$set(e.form,"area",a)},expression:"form.area"}})],1)],1),e._v(" "),r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"详细地址：",prop:"address"}},[r("el-input",{attrs:{placeholder:"请填写详细地址"},model:{value:e.form.address,callback:function(a){e.$set(e.form,"address",a)},expression:"form.address"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"行业选择：",prop:"category"}},[r("el-cascader",{staticClass:"full-width",attrs:{options:e.categoryOptions,placeholder:"请选择行业"},model:{value:e.form.category,callback:function(a){e.$set(e.form,"category",a)},expression:"form.category"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{sm:8}},[r("el-form-item",{attrs:{label:"营业执照：",prop:"licence"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.uploadHeaders,"show-file-list":!1,"on-success":e.handleUploadLicenceSuccess,"before-upload":e.beforeUpload},model:{value:e.form.licence,callback:function(a){e.$set(e.form,"licence",a)},expression:"form.licence"}},[e.form.licence?r("img",{staticClass:"avatar",attrs:{src:e.form.licence}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),r("el-col",{attrs:{sm:8}},[r("el-form-item",{attrs:{label:"身份证人像面：",prop:"id_card"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.uploadHeaders,"show-file-list":!1,"on-success":e.handleUploadIdCardSuccess,"before-upload":e.beforeUpload},model:{value:e.form.id_card,callback:function(a){e.$set(e.form,"id_card",a)},expression:"form.id_card"}},[e.form.id_card?r("img",{staticClass:"avatar",attrs:{src:e.form.id_card}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),r("el-col",{attrs:{sm:8}},[r("el-form-item",{attrs:{label:"身份证国徽面：",prop:"id_card_back"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.uploadHeaders,"show-file-list":!1,"on-success":e.handleUploadIdCardBackSuccess,"before-upload":e.beforeUpload},model:{value:e.form.id_card_back,callback:function(a){e.$set(e.form,"id_card_back",a)},expression:"form.id_card_back"}},[e.form.id_card_back?r("img",{staticClass:"avatar",attrs:{src:e.form.id_card_back}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{sm:12}},[r("el-form-item",{attrs:{label:"银行卡号：",prop:"bank_card"}},[r("el-input",{attrs:{placeholder:"请填写银行卡号"},model:{value:e.form.bank_card,callback:function(a){e.$set(e.form,"bank_card",a)},expression:"form.bank_card"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{offset:9,sm:2}},[r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("立即申请")])],1)],1)],1)],1)],1)],1)},l=[],s=r("cf0d"),o=r("73f5"),c=r("c405"),i={data:function(){return{areaOptions:s,categoryOptions:[],form:{name:"",mobile:"",area:[],address:"",category:[],licence:"",id_card:"",id_card_back:"",bank_card:""},uploadUrl:"http://api.jiangsulezhong.com/admin/system/upload",uploadHeaders:{},rules:{name:[{required:!0,message:"请填写商家名称",trigger:"blur"}],mobile:[{required:!0,message:"请填写手机号码",trigger:"blur"}],area:[{required:!0,message:"请选择所在地区",trigger:"change"}],address:[{required:!0,message:"请填写详细地址",trigger:"blur"}],category:[{required:!0,message:"请选择行业",trigger:"change"}],licence:[{required:!0,message:"请上传营业执照图片",trigger:"blur"}],id_card:[{required:!0,message:"请上传身份证人像面",trigger:"blur"}],id_card_back:[{required:!0,message:"请上传身份证国徽面",trigger:"blur"}],bank_card:[{required:!0,message:"请填写银行卡号",trigger:"blur"}]}}},created:function(){this.getCategory()},methods:{getCategory:function(){var e=this;Object(c["d"])().then((function(a){e.categoryOptions=a.data.options}))},submit:function(){var e=this;this.$refs["form"].validate((function(a){console.log(a),a?Object(o["a"])(e.form).then((function(a){e.$notify({title:"已成功提交申请信息，请耐心等待客服审核",message:"成功",type:"success",duration:2e3}),e.$emit("getList"),e.handleClose()})):e.$message({message:"请先填写必填项，再进行提交",type:"error"})}))},handleUploadLicenceSuccess:function(e){this.form.licence=e.data.preview_url},handleUploadIdCardSuccess:function(e){this.form.id_card=e.data.preview_url},handleUploadIdCardBackSuccess:function(e){this.form.id_card_back=e.data.preview_url},beforeUpload:function(){},handlePreview:function(e){this.previewImageUrl=e,this.previewVisible=!0}}},d=i,n=(r("d807"),r("2877")),m=Object(n["a"])(d,t,l,!1,null,null,null);a["default"]=m.exports},d807:function(e,a,r){"use strict";var t=r("1ab2"),l=r.n(t);l.a}}]);