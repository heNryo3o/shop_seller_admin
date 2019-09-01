<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.name"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入角色名称搜索"
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" size="medium" placeholder="角色状态" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="14">
        <el-button v-waves type="primary" size="medium" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="['role/edit-role']" type="success" size="medium" icon="el-icon-edit" @click="handleCreate">
          新增角色
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        sort-change="handleSortChange"
        size="mini"
        :data="list"
        border
        fit
        highlight-current-row
        style="font-size: 14px;"
        @sort-change="sortChange"
      >
        <el-table-column label="角色名称" width="180">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色描述" width="360">
          <template slot-scope="{row}">
            <span>{{ row.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="210">
          <template slot-scope="{row}">
            {{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="当前状态" width="160">
          <template slot-scope="{row}">
            <div v-if="row.status == 1">
              <el-tag size="small"><span>启用中</span></el-tag>
            </div>
            <div v-else>
              <el-tag size="small" type="danger"><span>已禁用</span></el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="300" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['role/edit-role']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status == 1"
              v-waves
              v-permission="['role/change-status']"
              size="mini"
              type="warning"
              @click="handleChangeStatus(row,2)"
            >
              禁用
            </el-button>
            <el-button v-else v-waves v-permission="['role/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              启用
            </el-button>
            <el-button v-waves v-permission="['role/delete-role']" size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 编辑 新增管理员 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="角色名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="角色描述" prop="describe">
          <el-input v-model="temp.describe" type="textarea" autosize />
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">启用</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">禁用</el-radio>
          </div>
        </el-form-item>

        <el-form-item label="拥有权限">
          <el-tree ref="tree" v-model="temp.permissions" :data="permissionOptions" show-checkbox node-key="value" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  edit,
  create,
  destroy,
  changeStatus
} from '@/api/role'
import {
  getPermissionOptions
} from '@/api/permission'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: {
    Pagination
  },
  directives: {
    waves,
    permission
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1\d{10}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      permissionOptions: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '-id'
      },
      multipleSelection: [],
      permissionParentOptions: [],
      statusOptions: [{
        name: '启用中',
        key: 1
      },
      {
        name: '已禁用',
        key: 2
      }
      ],

      showReviewer: false,
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑角色',
        create: '新增角色'
      },
      dialogPvVisible: false,
      rules: {
        company: [{
          required: true,
          message: '请填写公司名称',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          validator: checkPhone,
          message: '请检查手机号码是否正确填写',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getList()
    this.getPermissionOptions()
  },
  methods: {
    number() {
      this.temp.mobile = this.temp.mobile.replace(/[^\.\d]/g, '')
      this.temp.mobile = this.temp.mobile.replace('.', '')
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

    getPermissionOptions() {
      getPermissionOptions().then(response => {
        this.permissionOptions = response.data.options
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        status: '1',
        'permissions': []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$refs.tree.setCheckedKeys([])
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.status = this.temp.status === 1 ? '1' : '2'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.temp.permissions)
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.permissions = this.$refs.tree.getCheckedKeys()
          if (this.temp.id > 0) {
            edit(this.temp).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改角色成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            create(this.temp).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建角色成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    handleChangeStatus(row, status) {
      var message = status === 1 ? '角色启用成功' : '角色禁用成功'
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
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '删除角色提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroy({
          id: row.id
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '已成功删除角色项',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">
  .permission-select {
    height: 150px;
  }
</style>
