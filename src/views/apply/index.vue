<template>
  <div>
    <h1 style="text-align: center;margin-top: 30px;">乐众小店商家入驻申请</h1>
    <el-card class="form-card">
      <el-form ref="form" :model="form" label-width="140px" :rules="rules">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="商家名称：" prop="name">
              <el-input v-model="form.name" placeholder="请填写商家名称" />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="手机号码：" prop="mobile">
              <el-input v-model="form.mobile" placeholder="请填写手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <el-form-item label="所在地区：" prop="area">
              <el-cascader v-model="form.area" :options="areaOptions" placeholder="请选择所在地区" class="full-width" />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="form.address" placeholder="请填写详细地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <el-form-item label="行业选择：" prop="category">
              <el-cascader v-model="form.category" :options="categoryOptions" placeholder="请选择行业" class="full-width" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="8">
            <el-form-item label="营业执照：" prop="licence">
              <el-upload v-model="form.licence" class="avatar-uploader" :action="uploadUrl" :headers="uploadHeaders"
                :show-file-list="false" :on-success="handleUploadLicenceSuccess" :before-upload="beforeUpload">
                <img v-if="form.licence" :src="form.licence" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="身份证人像面：" prop="id_card">
              <el-upload v-model="form.id_card" class="avatar-uploader" :action="uploadUrl" :headers="uploadHeaders"
                :show-file-list="false" :on-success="handleUploadIdCardSuccess" :before-upload="beforeUpload">
                <img v-if="form.id_card" :src="form.id_card" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="身份证国徽面：" prop="id_card_back">
              <el-upload v-model="form.id_card_back" class="avatar-uploader" :action="uploadUrl" :headers="uploadHeaders"
                :show-file-list="false" :on-success="handleUploadIdCardBackSuccess" :before-upload="beforeUpload">
                <img v-if="form.id_card_back" :src="form.id_card_back" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sm="12">
            <el-form-item label="银行卡号：" prop="bank_card">
              <el-input v-model="form.bank_card" placeholder="请填写银行卡号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="9" :sm="2">
            <el-form-item style="text-align: center;">
              <el-button type="primary" @click="submit">立即申请</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import areaOptions from '@/assets/area.json'
  import { create } from '@/api/store.js'
  import { getCategory } from '@/api/category.js'
  export default {
    data() {
      return {
        areaOptions: areaOptions,
        categoryOptions: [],
        form: {
          name: '',
          mobile: '',
          area: [],
          address: '',
          category: [],
          licence: '',
          id_card: '',
          id_card_back: '',
          bank_card: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        uploadHeaders: {},
        rules: {
          name: [{
            required: true,
            message: '请填写商家名称',
            trigger: 'blur'
          }],
          mobile: [{
            required: true,
            message: '请填写手机号码',
            trigger: 'blur'
          }],
          area: [{
            required: true,
            message: '请选择所在地区',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请填写详细地址',
            trigger: 'blur'
          }],
          category: [{
            required: true,
            message: '请选择行业',
            trigger: 'change'
          }],
          licence: [{
            required: true,
            message: '请上传营业执照图片',
            trigger: 'blur'
          }],
          id_card: [{
            required: true,
            message: '请上传身份证人像面',
            trigger: 'blur'
          }],
          id_card_back: [{
            required: true,
            message: '请上传身份证国徽面',
            trigger: 'blur'
          }],
          bank_card: [{
            required: true,
            message: '请填写银行卡号',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      getCategory() {
          getCategory().then(response => {
            this.categoryOptions = response.data.options
          })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          console.log(valid)
          if (valid) {
            create(this.form).then(response => {
              this.$notify({
                title: '已成功提交申请信息，请耐心等待客服审核',
                message: '成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('getList')
              this.handleClose()
            })
          } else {
            this.$message({
              message: '请先填写必填项，再进行提交',
              type: 'error'
            })
          }
        })
      },

      handleUploadLicenceSuccess(res) {
        this.form.licence = res.data.preview_url
      },
      handleUploadIdCardSuccess(res) {
        this.form.id_card = res.data.preview_url
      },
      handleUploadIdCardBackSuccess(res) {
        this.form.id_card_back = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      }
    }
  }
</script>

<style>
  .form-card {
    width: 80%;
    margin: auto;
    margin-top: 40px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
