<template>
  <div>
    <el-drawer title="商品信息" size='75%' :visible.sync="infoVisible" @open="handleOpen" :wrapperClosable="false"
      :before-close="handleClose">
      <div style="overflow-y: auto;overflow-x: hidden;width: 94%;margin: auto;">
        <el-form ref="postForm" :model="info" class="form-container">
          <div class="edit-container">
            <el-row :gutter="30">
              <el-col :span="15">
                <el-form-item style="margin-bottom: 20px;" prop="name">
                  <MDinput v-model="info.name" :maxlength="100" name="name" required>
                    商品名称
                  </MDinput>
                </el-form-item>
                <div style="font-size: 17px;font-weight: 600;margin-bottom: 10px;">商品描述：</div>
                <el-form-item prop="content">
                  <Tinymce ref="editor" v-if="freshEditor" v-model="info.content" :height="420" />
                </el-form-item>
                <div v-if="isOnline == 2" style="font-size: 17px;font-weight: 600;margin-bottom: 10px;">注意事项：</div>
                <el-form-item prop="attention">
                  <Tinymce ref="editor" v-if="freshEditor && isOnline == 2" v-model="info.attention" :height="300" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-card class="box-card" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span>商品设置</span>
                  </div>
                  <el-form-item label="分类：" prop="category">
                    <el-cascader v-model="info.category" :options="cateOptions" placeholder="请选择分类" class="full-width"
                      style="width: 230px;" />
                  </el-form-item>
                  <el-form-item label="封面图：" prop="thumb">
                    <el-upload class="avatar-uploader" v-model="info.thumb" :action="uploadUrl" :show-file-list="false"
                      :on-success="handleUploadSuccess" :before-upload="beforeUpload">
                      <img v-if="info.thumb" :src="info.thumb" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="一级推广赏金：" prop="retail_1">
                    <el-input v-model="info.retail_1" placeholder="一级推广赏金范围在5-8元之间" style="width: 230px;" />
                  </el-form-item>
                  <el-form-item label="二级推广赏金：" prop="retail_2">
                    <el-input v-model="info.retail_2" placeholder="二级推广赏金范围在1-3元之间" style="width: 230px;" />
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <div style="margin-top: 30px;margin-bottom: 20px;">
                <el-card class="box-card" shadow="hover">
                  <div slot="header" class="clearfix">
                    <el-button v-waves size="mini" type="success" @click="handleAddSku">
                      添加新规格
                    </el-button>
                  </div>
                  <div v-for="(item,index) in info.skus" :key="item.id">
                    <div style="margin-bottom: 10px;">
                      <span style="font-size: 17px;font-weight: 600;">规格{{index+1}}</span>
                      <el-button v-waves size="mini" type="danger" style="margin-left: 20px;" @click="handleDelSku(index)">
                        删除规格
                      </el-button>
                    </div>
                    <el-form-item label="规格名称：" label-width="100px">
                      <el-input v-model="item.title" placeholder="请填写规格名称,如S,M,L等" style="width: 300px;" />
                    </el-form-item>
                    <el-form-item label="价格：" label-width="100px">
                      <el-input v-model="item.price" placeholder="请填写价格" style="width: 300px;" />
                    </el-form-item>
                    <el-form-item label="剩余库存：" v-if="isOnline == 1" label-width="100px">
                      <el-input v-model="item.stock" placeholder="请填写剩余库存数量" style="width: 300px;" />
                    </el-form-item>
                  </div>
                </el-card>
              </div>
            </el-row>
            <el-row :gutter="10" style="margin-bottom: 20px;">
              <el-col :sm="24" class="button-group">
                <el-button v-waves size="small" type="primary" icon="el-icon-check" @click="handleEdit">
                  保存
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission' // permission directive
  import MDinput from '@/components/MDinput'
  import Tinymce from '@/components/Tinymce'
  import {
    getSubCategory
  } from '@/api/category'
  import {
    edit,
    create
  } from '@/api/product'

  export default {
    name: 'ProductInfo',
    components: {
      MDinput,
      Tinymce
    },
    directives: {
      waves,
      permission
    },
    props: [
      'infoVisible', 'productInfo', 'isOnline'
    ],
    data() {
      return {
        info: {
          id: 0,
          name: '',
          content: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/system/upload',
        previewVisible: false,
        previewImageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        freshEditor: false,
        loading: false,
        loaded: false,
        cateOptions: []
      }
    },
    methods: {
      handleUploadSuccess(res) {
        this.info.thumb = res.data.preview_url
      },
      beforeUpload() {

      },
      handlePreview(url) {
        this.previewImageUrl = url
        this.previewVisible = true
      },
      handleDelSku(index) {
        this.info.skus.splice(index, 1)
      },
      handleAddSku() {
        this.info.skus.push({
          id: 0,
          title: '',
          price: 0.00,
          stock: ''
        })
      },
      getCateOptions() {
        getSubCategory({

        }).then(response => {
          console.log(response.data)
          this.cateOptions = response.data.options
        })
      },
      handleClose() {
        this.freshEditor = false
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.getCateOptions()
        this.info = this.productInfo
        this.freshEditor = true
      },
      handleEdit() {
        // this.info.content = this.$refs.editor.value
        if (this.info.id > 0) {
          edit(
            this.info
          ).then(response => {
            this.$emit('updateList')
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.handleClose()
          })
        } else {
          create(
            this.info
          ).then(response => {
            this.$emit('updateList')
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success',
              duration: 2000
            })
            this.handleClose()
          })
        }
      },
      handleUploaded(thumb) {
        this.info.thumb = thumb
      },
      getInfo(id) {
        this.loading = true
        getInfo({
          id: id
        }).then(response => {
          this.info = response.data
          this.info.status = this.info.status === 1 ? '1' : '2'
          this.loading = false
          this.loaded = true
        })
      }
    }
  }
</script>

<style>
  .el-drawer__header {
    margin-bottom: 10px;
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
