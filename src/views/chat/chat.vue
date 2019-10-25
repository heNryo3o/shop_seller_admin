<template>
  <div style="height: 100%;width: 100%;text-align: center;">
    <iframe :src="'http://chat.jiangsulezhong.com/#/?username='+username" style="width: 350px;height: 600px;margin-top: 40px;"></iframe>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    data() {
      return {
        username: 'kefu_' + store.state.user.store_id
      }
    }
  }
</script>
