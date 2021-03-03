<template>
  <div class="login-view">
    <div class="view-btn">
      <div v-for="(item,index) in btns"
           :key="index"
           class="btn"
           :class="{'active': item.val == currentIndex}"
           @click="change(index)"
        >
        {{item.val}}
      </div>
    </div>
    <login-form @success="success" v-if="currentIndex == '注册'"></login-form>
    <register-success v-if="currentIndex == '注册成功'"></register-success>
    <login-main v-if="currentIndex == '登录'" :form="userForm"></login-main>
  </div>
</template>

<script>
  import loginForm from './loginForm.vue'
	import registerSuccess from './registerSuccess.vue'
  import loginMain from './loginMain.vue'
  export default {
    name:"loginViews",
    data(){
      return {
        currentIndex:'注册',
        btns:{
          btn1:{
            val:"注册"
          },
          btn2:{
            val:"登录"
          }
        },
        isRegister:true,
        isSuccess:false,
        isLogin:false,
        userForm:{
          username:'',
          password:''
        },
        timer:null
      }
    },
    components:{
      loginForm,
			registerSuccess,
      loginMain
    },
    methods:{
      //点击切换注册/登录
      change(index){
        this.currentIndex = this.btns[index].val
        clearTimeout(this.timer)
      },
      //注册成功后的自定义事件
      success(username,password){
        console.log(username,password)
        //将注册的值保存起来，给登录界面
        this.userForm.username = username
        this.userForm.password = password
        //跳转到注册成功
        this.currentIndex = '注册成功'
         this.timer = setTimeout(()=>{
            this.currentIndex = '登录'
          },4000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-view{
    width: 500px;
    height: 480px;
    background-color: #fff;
    border-radius: 5px;
    .view-btn{
      display: flex;
    }
    .btn{
      padding: 20px 0;
      background-color: #28ab70;
      flex: 1;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
    .active{
      background-color: #30cc86;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.5) inset;
    }
  }
</style>
