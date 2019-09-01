<template>
  <div>
    <div v-if="fileUrl && unUpload">
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="handleUpload"
        :class="{hide:hideUpload}"
        :file-list="[{name: '缩略图', url: fileUrl}]"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <div v-else>
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUpload"
        :on-change="handleChange"
        :class="{hide:hideUpload}"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" fit="contain" alt="">
    </el-dialog>
  </div>

</template>

<script>
export default {
  props: ['fileUrl'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: true,
      limitCount: 1,
      unUpload: true,
      uploadUrl: process.env.VUE_APP_UPLOAD_API
    }
  },
  created(){
    this.hideUpload = this.fileUrl ? true : false
  },
  methods: {
    handleRemove(file, fileList) {
      this.unUpload = false
      this.hideUpload = fileList.length >= this.limitCount
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.unUpload = false
      this.hideUpload = fileList.length >= this.limitCount
    },
    handleUpload(res) {
      this.$emit('uploaded', res.data.file_id)
    }
  }
}
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
