<template>
  <div>
    <el-drawer title="订单信息" size='75%' :visible.sync="infoVisible" @open="handleOpen" :wrapperClosable="false"
      :before-close="handleClose">
      <el-card class="box-card user-wrapper">
        <div>
          <el-card class="box-card mb-20" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">基本信息</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">订单编号：</span>{{ info.no }}</el-col>
              <el-col :sm="8"><span class="info-label">发起时间：</span>{{ info.created_at }}</el-col>
              <el-col :sm="8"><span class="info-label">付款时间：</span>{{ info.pay_at }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :sm="8"><span class="info-label">订单总额：</span>{{ info.total_amount }}</el-col>
              <el-col :sm="8"><span class="info-label">状态：</span>
                <el-tag type="danger" size="mini">{{ info.state }}</el-tag>
              </el-col>
              <el-col :sm="8"><span class="info-label">评分：{{ info.rate }}</span></el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-20" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">商品信息</span>
            </div>
            <div v-for="(item,index) in info.items" :key="item.id" style="margin-bottom: 20px;">
              <h4>商品 {{index+1}}</h4>
              <el-row :gutter="10" class="mb-10">
                <el-col :sm="20"><span class="info-label">商品名称：</span>{{ item.product_name }}</el-col>
              </el-row>
              <el-row :gutter="10" class="mb-10">
                <el-col :sm="20"><span class="info-label">规格：</span>{{ item.title }}</el-col>
              </el-row>
              <el-row :gutter="10" class="mb-10">
                <el-col :sm="20"><span class="info-label">数量：</span>{{ item.amount }}</el-col>
              </el-row>
              <el-row :gutter="10" class="mb-10">
                <el-col :sm="20"><span class="info-label">单价：</span>{{ item.price }}</el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card mb-20" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">收货地址</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">收货地址：</span>{{ info.address }}</el-col>
              <el-col :sm="8"><span class="info-label">收货人手机号码：</span>{{ info.mobile }}</el-col>
              <el-col :sm="8"><span class="info-label">收货人姓名：</span>{{ info.linkman }}</el-col>
            </el-row>
          </el-card>
          <el-row style="margin-top: 20px;" v-if="info.status == 2">
            <el-col :sm="24" class="button-group">
              <el-button v-waves size="small" type="primary" icon="el-icon-check" @click="sendProduct">
                确认发货
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission' // permission directive
  import {
    sendProduct,
    agreeRefund
  } from '@/api/order'

  export default {
    name: 'OrderInfo',
    directives: {
      waves,
      permission
    },
    props: [
      'infoVisible', 'orderInfo'
    ],
    data() {
      return {
        info: {}
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:infoVisible', false)
      },
      handleOpen() {
        this.info = this.orderInfo
      },
      sendProduct() {
        sendProduct(
          {
            id: this.info.id
          }
        ).then(response => {
          this.$emit('updateList')
          this.$notify({
            title: '成功',
            message: '确认发货成功',
            type: 'success',
            duration: 2000
          })
          this.handleClose()
        })
      }
    }
  }
</script>

<style>
  .el-drawer__header {
    margin-bottom: 10px;
  }

  .user-wrapper {
    width: 94%;
    margin: auto;
  }

  .id-card-image {
    height: 160px;
  }

  .licence-image {
    height: 240px;
  }

  .service-table-expand {
    font-size: 0;
  }

  .service-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .service-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-drawer__body {
    overflow-y: scroll;
  }

  .info-col {
    margin-bottom: 20px;
  }
</style>
