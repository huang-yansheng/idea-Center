<template>
  <div class="regSuccess">
    <img src="~assets/img/common/Success.png">
    <p>注册成功</p>
    <p class="settime">等待跳转中.......</p>
  </div>
</template>

<script>
  export default {
    name:"registerSuccess"
  }
</script>

<style lang="scss" scoped>
  .regSuccess{
    text-align: center;
    font-size: 22px;
    margin-top: 100px;
    img{
      width: 100px;
      margin-bottom: 15px;
    }
    p{
      margin-bottom: 20px;
    }
    .settime{
      font-size: 18px;
    }
  }
</style>
