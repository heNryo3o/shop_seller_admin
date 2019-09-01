<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input v-model="listQuery.name" size="medium" prefix-icon="el-icon-search" placeholder="输入权限名称搜索" @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.parent" size="medium" placeholder="父级权限" clearable>
          <el-option v-for="item in permissionParentOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.role_id" size="medium" clearable placeholder="归属角色">
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" size="medium" placeholder="权限状态" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="11">
        <el-button v-waves type="primary" size="medium" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button
          v-waves
          v-permission="['permission/permission-list']"
          type="success"
          size="medium"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          新增权限
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        sort-change="handleSortChange"
        :data="list"
        border
        fit
        highlight-current-row
        style="font-size: 14px;"
        size="mini"
        @sort-change="sortChange"
      >
        <el-table-column label="权限名称" width="180">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限键值" width="180">
          <template slot-scope="{row}">
            <span>{{ row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" width="380">
          <template slot-scope="{row}">
            <el-tag v-for="item in row.roles_name" type="info" size="small" class="tags-in-table" :key="item">
              {{item}}
            </el-tag>
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

        <el-table-column label="操作" align="center" min-width="300" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['permission/edit-permission']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status == 1"
              v-waves
              v-permission="['permission/change-status']"
              size="mini"
              type="warning"
              @click="handleChangeStatus(row,2)"
            >
              禁用
            </el-button>
            <el-button v-else v-waves v-permission="['permission/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              启用
            </el-button>
            <el-button v-waves v-permission="['permission/delete-permission']" size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 编辑 新增管理员 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 450px; margin-left:50px;">

        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="权限键值" prop="key">
          <el-input v-model="temp.key" />
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="small">启用</el-radio>
            <el-radio v-model="temp.status" label="2" border size="small">禁用</el-radio>
          </div>
        </el-form-item>

        <el-form-item label="父级权限" prop="parent_id">
          <div>
            <el-select v-model="temp.parent_id" placeholder="父级权限" style="width: 100%;" clearable>
              <el-option v-for="item in permissionParentOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="归属角色" prop="roles">
          <div>
            <el-select v-model="temp.roles" multiple placeholder="归属角色" style="width: 100%;" clearable>
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" v-if="temp.id > 0" @click="updateData()">
          确认
        </el-button>
        <el-button type="primary" v-else @click="createData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getPermissionParentOptions,
  edit,
  create,
  destroy,
  changeStatus
} from '@/api/permission'
import {
  getRoleOptions
} from '@/api/role'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission' // permission directive
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
        update: '编辑权限',
        create: '新增权限'
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
      },
      downloadLoading: false,
      roleOptions: [],
    }
  },
  created() {
    this.getList()
    this.getPermissionParentOptions()
    this.getRoleOptions()
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
    getPermissionParentOptions() {
      getPermissionParentOptions().then(response => {
        this.permissionParentOptions = response.data.options
      })
    },
    getRoleOptions() {
      getRoleOptions().then(response => {
        this.roleOptions = response.data.options
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        status: '1'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
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
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          create(this.temp).then(response => {
            this.getList()
            this.getPermissionParentOptions()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建新权限成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          edit(this.temp).then(response => {
            this.getList()
            this.getPermissionParentOptions()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改权限信息成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleChangeStatus(row, status) {
      var message = status === 1 ? '权限启用成功' : '权限禁用成功'
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
      this.$confirm('此操作将永久删除该权限, 是否继续?', '删除权限提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroy({
          id: row.id
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '已成功删除权限项',
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

  .parent-select {
    height: 150px;
  }
</style>
