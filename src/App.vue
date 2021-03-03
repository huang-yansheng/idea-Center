<template>
  <div id="app">
    <all-money class="all-money"></all-money>
    <router-view></router-view>
    <!-- <login></login> -->
  </div>
</template>

<script>
 import AllMoney from 'components/content/AllMoney.vue'
 // import Login from './components/content/login/Login.vue'
 export default {
   name:"app",
   components:{
     AllMoney,
     // Login
   }
 }
</script>

<style lang="scss" scoped>
@import url("assets/css/base.css");

#app{
  position: relative;
  height: 100%;
}
.all-money{
  position: fixed;
  right: 100px;
  top: 10px;
}

</style>
