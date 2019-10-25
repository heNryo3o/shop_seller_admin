<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="showPassword()">修改密码</span>
          </el-dropdown-item>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="个人资料" width="700px" :visible.sync="editShow">

      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">

        <el-form-item label="手机号码">
          <el-input v-model="temp.username" placeholder="请填写手机号码" />
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="temp.true_name" placeholder="请填写姓名" />
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="editShow = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" width="700px" :visible.sync="editPassword">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 550px; margin-left:50px;">
        <el-form-item label="新密码">
          <el-input v-model="password" placeholder="请填写新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="editPassword = false">
          取消
        </el-button>
        <el-button type="primary" @click="updatePassword()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import Screenfull from '@/components/Screenfull'
  import Search from '@/components/HeaderSearch'
  import {
    edit,
    changePassword
  } from '@/api/user'
  import store from '@/store'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      Search
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
    },
    data() {
      return {
        editShow: false,
        editPassword: false,
        password: '',
        temp: {
          id: store.state.user.id,
          username: store.state.user.mobile,
          true_name: store.state.user.name
        }
      }
    },
    methods: {
      updatePassword() {
        changePassword({
          password: this.password
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '修改密码成功',
            type: 'success',
            duration: 2000
          })
          this.editPassword = false
        })
      },
      showPassword() {
        this.editPassword = true
      },
      showEdit() {
        console.log(1)
        this.editShow = true
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      updateData() {
        edit(this.temp).then(response => {
          this.$notify({
            title: '成功',
            message: '修改信息成功',
            type: 'success',
            duration: 2000
          })
          window.location.reload()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
