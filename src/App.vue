<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body {
    font-size: 14px;
  }

 .filter-container {
    margin-bottom: 15px;
  }

  .table-container .el-table th,.table-container .el-table td{
    text-align: center;
    min-width: 120px;
    padding: 8px 0;
  }

  .link-type {
    cursor: pointer;
    color: #409eff;
    font-weight: 600;
  }

  .cursor-type{
    cursor: pointer;
  }

  .button-group{
    text-align: center;
  }

  .tags-in-table{
    margin-left: 10px;
  }
  
  .full-width{
    width: 100%;
  }
</style>
