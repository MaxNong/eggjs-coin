<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: #222D32">
        <el-header style="background-color: #367FA9;color: #fff;font-weight: 700"><b>网易云音乐</b></el-header>
        Aside
      </el-aside>
      <el-container>
        <el-header style="background-color: #3C8DBC">Header</el-header>
        <el-main><slot name="main">Main</slot></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<script>
  export default {
    name: 'headerAside'
  }
</script>