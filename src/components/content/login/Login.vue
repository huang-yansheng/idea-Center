<template>
  <div class="login" v-if="$store.state.LoginStatus">
    <login-views class="views"></login-views>
  </div>
</template>

<script>
  import loginViews from './loginViews.vue'
  export default {
    name:"Login",
    components:{
      loginViews
    },
    data(){
      return {
        isLogin:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login{
    background-color: rgba(0,0,0,.3);
    @include center
  }
  .views{
    @include center
  }
</style>
