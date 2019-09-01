<template>
  <div class="app-container">
    <el-row class="filter-container" :gutter="10">
      <el-col :sm="4">
        <el-input
          v-model="listQuery.username"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入手机号搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="4">
        <el-input
          v-model="listQuery.username"
          size="medium"
          prefix-icon="el-icon-search"
          placeholder="输入管理员姓名搜索"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.role_id" size="medium" placeholder="角色" clearable>
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :sm="3">
        <el-select v-model="listQuery.status" size="medium" placeholder="管理员状态" clearable>
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-col>
      <el-col :sm="10">
        <el-button v-waves type="primary" size="medium" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="['admin/edit-admin']" size="medium" type="success" icon="el-icon-edit" @click="handleCreate">
          新增管理员
        </el-button>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        sort-change="handleSortChange"
        :data="list"
        size="mini"
        border
        fit
        highlight-current-row
        style="font-size: 14px;"
        @sort-change="sortChange"
      >
        <el-table-column label="手机号码" width="180">
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="150">
          <template slot-scope="{row}">
            <span>{{ row.true_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="200">
          <template slot-scope="{row}">
            <el-tag v-for="item in row.roles_name" :key="item" class="tags-in-table" type="info" size="small">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="当前状态" width="140">
          <template slot-scope="{row}">
            <div v-if="row.status == 1">
              <el-tag size="small"><span>在职</span></el-tag>
            </div>
            <div v-else>
              <el-tag size="small" type="danger"><span>离职</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-waves v-permission="['admin/edit-admin']" type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>

            <el-button
              v-if="row.status == 1"
              v-waves
              v-permission="['admin/change-status']"
              size="mini"
              type="warning"
              @click="handleChangeStatus(row,2)"
            >
              离职
            </el-button>
            <el-button v-else v-waves v-permission="['admin/change-status']" size="mini" type="success" @click="handleChangeStatus(row,1)">
              入职
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 编辑 新增管理员 -->
    <el-dialog :title="textMap[dialogStatus]" width="700px" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="姓名" prop="true_name">
          <el-input v-model="temp.true_name" />
        </el-form-item>

        <el-form-item label="手机号码" prop="username">
          <el-input v-model="temp.username" maxlength="11" @keyup.native="number" />
        </el-form-item>

        <el-form-item label="状态">
          <div>
            <el-radio v-model="temp.status" label="1" border size="medium">在职</el-radio>
            <el-radio v-model="temp.status" label="2" border size="medium">离职</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <el-divider>设置权限</el-divider>

      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="所属角色">
          <el-select v-model="temp.roles_id" multiple placeholder="请选择" style="width: 400px;" @change="handleRoleChange(temp)">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
  changeStatus,
  getAdminPermissions
} from '@/api/admin'
import {
  getRoleOptions
} from '@/api/role'
import {
  getPermissionOptions
} from '@/api/permission'
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
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '-id'
      },
      roleOptions: [],
      statusOptions: [{
        name: '在职中',
        key: 1
      },
      {
        name: '已离职',
        key: 2
      }
      ],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑管理员',
        create: '新增管理员'
      },
      rules: {},
      permissionOptions: []
    }
  },
  created() {
    this.getList()
    this.getRoleOptions()
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
    getRoleOptions() {
      getRoleOptions().then(response => {
        this.roleOptions = response.data.options
      })
    },
    getPermissionOptions() {
      getPermissionOptions().then(response => {
        this.permissionOptions = response.data.options
      })
    },
    handleRoleChange() {
      getAdminPermissions({
        id: this.temp.id,
        roles: this.temp.roles_id
      }).then(response => {
        this.temp.permissions = response.data.permissions
        this.$refs.tree.setCheckedKeys(response.data.permissions)
      })
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
        this.$refs.tree.setCheckedKeys([])
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.status = this.temp.status === 1 ? '1' : '2'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(row.permissions)
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.temp.permissions = this.$refs.tree.getCheckedKeys()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.id > 0) {
            edit(this.temp).then(response => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改管理员信息成功',
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
                message: '创建管理员成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },
    handleChangeStatus(row, status) {
      var message = status === 1 ? '管理员入职成功' : '管理员离职成功'
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
