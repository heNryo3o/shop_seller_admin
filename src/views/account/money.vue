<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="small" unlink-panels
          range-separator="-" start-placeholder="结算开始日期" end-placeholder="结算结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">
        <el-table-column label="订单编号" width="210">
          <template slot-scope="{row}">
            <span>{{ row.order_no }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单总额" width="120">
          <template slot-scope="{row}">
            <span>{{ row.order_money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="平台抽成" width="120">
          <template slot-scope="{row}">
            <span>{{ row.cost_money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="一级推手赏金" width="120">
          <template slot-scope="{row}">
            <span>{{ row.retail_1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="二级推手赏金" width="120">
          <template slot-scope="{row}">
            <span>{{ row.retail_2 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="余额增加" width="120">
          <template slot-scope="{row}">
            <span>{{ row.earn_money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="结算时间" min-width="230" class-name="fixed-width">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
  import {
    moneyLog
  } from '@/api/order'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    components: {
      Pagination
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
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
      getList() {
        this.listLoading = true
        moneyLog(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>

<style lang="scss">

</style>
