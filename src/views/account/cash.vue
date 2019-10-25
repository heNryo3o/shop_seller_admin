<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="6">
        <el-date-picker v-model="listQuery.date_range" type="daterange" align="right" size="small" unlink-panels
          range-separator="-" start-placeholder="申请开始日期" end-placeholder="申请结束日期" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" format="yyyy年 MM月 dd日" style="width: 100%;" />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves type="success" size="small" @click="handleSubmit">
          申请提现
        </el-button>
      </el-col>
    </el-row>
    <el-row class="filter-container">
        <h5>账户余额：{{userInfo.money}}</h5><h5>冻结余额： {{userInfo.money_block}}</h5><h5>可提现余额： {{userInfo.money - userInfo.money_block}}</h5>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">

        <el-table-column label="提现金额" width="280">
          <template slot-scope="{row}">
            <span>{{ row.money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="申请时间" width="280">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" min-width="240" class-name="width-fixed">
          <template slot-scope="{row}">
            <el-tag v-if="row.status == 1" size="small" type="warning"><span>待审核</span></el-tag>
            <el-tag v-if="row.status == 2" size="small" type="success"><span>已打款</span></el-tag>
            <el-tag v-if="row.status == 3" size="small" type="danger"><span>审核失败</span></el-tag>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
  import {
    cashLog,
    cashSubmit
  } from '@/api/order'
  import {
    getInfo
  } from '@/api/user'
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
        },
        userInfo: {
          money: 0,
          money_block: 0
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleSubmit() {
        this.$prompt('请填写申请提现金额，最低100元', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          cashSubmit({
            money: value
          }).then(response => {
            this.$notify({
              title: '成功',
              message: '申请提现成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        })
      },
      getList() {
        this.listLoading = true
        cashLog(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
        getInfo({}).then(response => {
          this.userInfo = response.data
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
