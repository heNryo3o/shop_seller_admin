<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="small" prefix-icon="el-icon-search" placeholder="输入商品名称搜索" clearable
          @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" placeholder="状态" size="small" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="small" unlink-panels
          range-separator="-" start-placeholder="发布开始日期" end-placeholder="发布结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="['role/edit-role']" type="success" size="small" icon="el-icon-edit" @click="handleViewProduct({id:0,skus:[]})">
          发布新商品
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="订单编号" width="210">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewOrder(row)">{{ row.no }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" width="260">
          <template slot-scope="{row}">
            <el-tag size="small" type="success" v-for="item in row.items" :key="item.id"><span>{{item.product_name}}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="订单总额" width="120">
          <template slot-scope="{row}">
            <span>{{ row.total_amount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="付款时间" width="160">
          <template slot-scope="{row}">
            <span>{{ row.pay_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag size="small"><span>{{ row.state }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleViewOrder(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <order-info :order-info="orderInfo" :info-visible.sync="orderVisible" @updateList="getList" />

  </div>
</template>

<script>
  import {
    getList
  } from '@/api/order'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import OrderInfo from '@/components/User/OrderInfo'

  export default {
    components: {
      Pagination,
      OrderInfo
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        orderInfo: {},
        orderVisible: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        statusOptions: [{
            name: '待付款',
            key: 1
          },
          {
            name: '已付款',
            key: 2
          },
          {
            name: '已发货',
            key: 3
          },
          {
            name: '已收货',
            key: 4
          },
          {
            name: '已评价',
            key: 5
          },
          {
            name: '退款中',
            key: 6
          },
          {
            name: '退款结束',
            key: 7
          },
          {
            name: '待使用',
            key: 8
          }
        ],
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '-id'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      sortChange(data) {
        const {
          prop,
          order
        } = data
        if (order === 'ascending') {
          this.listQuery.sort = '+' + prop
        } else {
          this.listQuery.sort = '-' + prop
        }
        this.handleFilter()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleViewOrder(row) {
        this.orderInfo = row
        this.orderVisible = true
      }
    }
  }
</script>

<style lang="scss">

</style>
