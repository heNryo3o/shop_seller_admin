<template>
  <div>
    <el-drawer title="用户信息" size="65%" :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <el-card class="box-card user-wrapper">
        <div>
          <el-card class="box-card mb-30" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold;">基本信息</span>
            </div>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">用户编号：</span>{{ info.id }}</el-col>
              <el-col :sm="8"><span class="info-label">手机号码：</span>{{ info.mobile }}</el-col>
              <el-col :sm="8"><span class="info-label">注册倾向：</span>{{ info.prefer == 1 ? '洗车工' : '客户' }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20">
              <el-col :sm="8"><span class="info-label">注册时间：</span>{{ info.created_at }}</el-col>
              <el-col :sm="8"><span class="info-label">昵称：</span>{{ info.nickname }}</el-col>
              <el-col :sm="8"><span class="info-label">状态：</span>{{ info.status == 1 ? '正常' : '禁止登录' }}</el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20" v-if="info.prefer == 1">
              <el-col :sm="8"><span class="info-label">评分：{{ info.rate }}</span></el-col>
              <el-col :sm="8"><span class="info-label">完成订单数：{{ info.completed }}</span></el-col>
              <el-col :sm="8"><span class="info-label">今日收入：{{ info.today_money }}</span></el-col>
            </el-row>
            <el-row :gutter="10" class="mb-20" v-if="info.prefer == 2">
              <el-col :sm="8"><span class="info-label">下单数：{{ info.order_num }}</span></el-col>
              <el-col :sm="8"><span class="info-label">余额：{{ info.remain_money }}</span></el-col>
              <el-col :sm="8"><span class="info-label">消费金额：{{ info.total_money }}</span></el-col>
            </el-row>
          </el-card>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getInfo
  } from '@/api/store'
  export default {
    name: 'StoreInfo',
    props: [
      'infoVisible', 'userId'
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
        this.getInfo()
      },
      getInfo() {
        getInfo({
          id: this.userId
        }).then(response => {
          this.info = response.data
        })
      }
    }
  }
</script>

<style>
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

  .info-col{
    margin-bottom: 20px;
  }
</style>
