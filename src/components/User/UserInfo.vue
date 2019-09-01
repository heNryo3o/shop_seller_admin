<template>
  <div>
    <el-drawer title="用户详细信息" size='65%' :visible.sync="infoVisible" :before-close="handleClose" @open="handleOpen">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  import {getInfo} from "@/api/member"
  export default {
    name: 'UserInfo',
    props: [
      'infoVisible', 'userId'
    ],
    data() {
      return {
        info:{}
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:infoVisible', false);
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
</style>
