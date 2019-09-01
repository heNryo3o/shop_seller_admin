<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="6">
        <el-date-picker
          v-model="listQuery.date_range"
          type="daterange"
          align="right"
          size="small"
          unlink-panels
          range-separator="-"
          start-placeholder="上传开始日期"
          end-placeholder="上传结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy年 MM月 dd日"
          style="width: 100%;"
        />
      </el-col>
      <el-col :sm="5">
        <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row size="mini" style="font-size: 14px;">

        <el-table-column label="文件编号" width="150">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="预览" width="180">
          <template slot-scope="{row}">
            <el-image style="width: 80px; height: 80px; border-radius: 10px;" :src="row.full_url" fit="cover" @click="handlePreview(row.full_url)" />
          </template>
        </el-table-column>

        <el-table-column label="用户编号" width="150">
          <template slot-scope="{row}">
            <span>{{ row.uid }}</span>
          </template>
        </el-table-column>

        <el-table-column label="表名称" width="150">
          <template slot-scope="{row}">
            <span>{{ row.table }}</span>
          </template>
        </el-table-column>

        <el-table-column label="记录编号" width="150">
          <template slot-scope="{row}">
            <span>{{ row.item_id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="ip地址" width="180">
          <template slot-scope="{row}">
            <span>{{ row.ip }}</span>
          </template>
        </el-table-column>

        <el-table-column label="上传时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="180" class="small-padding fixed-width">
          <template slot-scope="{row}">
            <a download="test.png" target="_blank" :href="row.full_url">
              <el-button v-waves v-permission="['role/change-status']" size="mini" type="success">
                下载
              </el-button>
            </a>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-dialog :visible.sync="previewVisible">
      <img height="400px" style="margin: auto;" :src="previewImageUrl" fit="contain">
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import {
  fileList
} from '@/api/system'
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
      previewVisible: false,
      previewImageUrl: '',
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
      typeOptions: [{
        name: '登录',
        key: 1
      },
      {
        name: '注册',
        key: 2
      }
      ],
      originOptions: [{
        name: 'pc站',
        key: 'pc'
      },
      {
        name: '手机站',
        key: 'wap'
      },
      {
        name: '小程序',
        key: 'weapp'
      },
      {
        name: '需方app',
        key: 'buyer_app'
      },
      {
        name: '供方app',
        key: 'seller_app'
      }
      ],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '-id'
      },
      infoVisible: false,
      userId: 0
    }
  },
  created() {
    this.getList()
  },

  methods: {

    getList() {
      this.listLoading = true
      fileList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handlePreview(url) {
      this.previewImageUrl = url
      this.previewVisible = true
    }

  }
}
</script>

<style lang="scss">
  .el-dialog__body {
    text-align: center;
  }
</style>
