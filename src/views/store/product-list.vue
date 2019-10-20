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
        <el-table-column label="商品名称" width="210">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleViewProduct(row)">{{ row.name }}</span>
            <el-tag size="mini" type="danger" v-if="row.is_dapai == 1">大牌抢购</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="150">
          <template slot-scope="{row}">
            <span>{{ row.category_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="价格" width="120">
          <template slot-scope="{row}">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="160">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status == 1 ? '' : 'danger'" size="small"><span>{{ row.status == 1 ? '上架中' : '已下架' }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleViewProduct(row)">
              编辑
            </el-button>
            <el-button v-if="row.status == 1" v-waves v-permission="['role/change-status']" size="mini" type="warning"
              @click="handleChangeStatus(row,2)">
              下架
            </el-button>
            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              上架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <product-info :product-info="productInfo" :info-visible.sync="productVisible" :is-online="isOnline" @updateList="getList" />

  </div>
</template>

<script>
  import {
    getList,
    changeStatus,
    edit,
    create
  } from '@/api/product'
  import {
    getInfo
  } from '@/api/store'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import ProductInfo from '@/components/User/ProductInfo'

  export default {
    components: {
      Pagination,
      ProductInfo
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        isOnline: 0,
        productInfo: {},
        productVisible: false,
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
            name: '上架中',
            key: 1
          },
          {
            name: '已下架',
            key: 2
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
      this.getInfo()
      this.getList()
    },
    methods: {
      getInfo() {
          getInfo().then(response => {
              this.isOnline = response.data.is_online
          })
      },
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

      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {

        })
      },

      handleViewProduct(row) {
        this.productInfo = row
        this.productVisible = true
      },

      handleChangeStatus(row, status) {
        var message = status === 1 ? '商品上架成功' : '商品下架成功'
        changeStatus({
          id: row.id,
          status: status
        }).then(response => {
          this.$notify({
            title: '成功',
            message: message,
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
