<template>
  <div class="dashboard-container">
    <el-card class="box-card" shadow="never">
      <div class="msg-text">
        『 好好工作 认真生活 』 —— 江苏乐众
      </div>
      <div class="user-content">
        <div class="avatar">
          <img :src="avatar" />
        </div>
        <div class="hello-content">
          <div class="hello">
            {{ date_tip }}{{ name }}，祝你开心每一天！
          </div>
          <div class="department">
            {{ duty ? duty+' | ' : '' }} {{ department }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Dashboard',
  data() {
    return {
      msg: {},
      date: new Date(),
      date_tip: '',
      name: store.state.user.name,
      duty: store.state.user.duty,
      department: store.state.user.department,
      avatar: store.state.user.avatar
    }
  },

  created() {
    this.getDateTip()
  },
  methods: {
    getDateTip() {
      var date = new Date()
      var hour = date.getHours()

      if (hour > 17 || hour < 8) {
        this.date_tip = '在加班吗？辛苦了，'
      } else if (hour >= 8 && hour <= 11) {
        this.date_tip = '今天又是元气满满的一天吖，'
      } else if (hour === 12) {
        this.date_tip = '吃饱了才有力气减肥哦，'
      } else if (hour > 12 && hour <= 14) {
        this.date_tip = '来杯奶茶提提神？'
      } else if (hour > 14 && hour <= 17) {
        this.date_tip = '努力工作的人运气不会太差，'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .msg-text {
    line-height: 20px;
    color: #808695;
    font-weight: 400;
    font-family: Chinese Quote;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .user-content {
    display: flex;
    align-items: center;
    line-height: 33px;

    .avatar {
      height: 64px;
      width: auto;
      img {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        border-style: none;
        margin-right: 15px;
      }
    }

    .hello {
      font-size: 20px;
      font-weight: 600;
      color: #515a6e;
    }

    .department {
      font-size: 14px;
      color: #808695;
      font-weight: 400;
      font-family: Chinese Quote;
    }
  }
</style>
