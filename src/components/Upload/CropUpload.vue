<template>
  <div>
    <el-button v-waves v-permission="['admin/edit-admin']" size="small" icon="el-icon-picture" @click="show=true">
      点击上传
    </el-button>
    <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail"
      v-model="show" noCircle="true" noSquare="true" :width="400" :height="300" url="/upload" :params="params" :headers="headers"
      img-format="png"></my-upload>
    <img :src="imgDataUrl">
  </div>
</template>

<script>
  import MyUpload from 'vue-image-crop-upload'

  export default {

    name: 'CropUpload',
    components: {
      MyUpload
    },
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style>
  .vicp-step1 {
    margin-top: 20px;
  }

  .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {
    height: 200px;
    padding: 50px;
  }

  .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {
    width: 200px;
  }

  .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item{
      width: 200px;
      height: 200px;
  }


</style>
