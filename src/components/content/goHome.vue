<template>
  <div class="gohome" @click="goHome">
    <img src="~assets/img/common/goHome.png" title="回到首页">
  </div>
</template>

<script>
  export default {
    name:"goHome",
    methods:{
      goHome(){
        this.$router.replace('/home').catch(err=>err)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gohome{
    cursor: pointer;
    img{
      width: 50px;
      height: 50px;
    }
  }
</style>
