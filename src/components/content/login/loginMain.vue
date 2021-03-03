<template>
  <div class="register" v-if="Object.keys(form).length !== 0">
    <el-form label-position="right" label-width="60px">
      <el-form-item label="用户名:" class="user">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" class="user">
        <el-input v-model="form.password"  type="password" ></el-input>
      </el-form-item>
      <el-form-item class="btn">
          <el-button type="primary" @click = 'userLogin'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {login} from 'network/login.js'
  export default {
    props:{
      form:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      //按下登录按钮
      userLogin(){
        //登录成功，用sessionStorage保存登录信息
        login(this.form).then((res)=>{
          sessionStorage.setItem('username',res.data.user.username)
          sessionStorage.setItem('token',res.data.token)
          //控制登录组件关闭，改变路由
          this.$store.commit('changeLoginStatus')
          this.$router.push(this.$store.state.nextPath)
        }).catch((err)=>{
          this.$toast.show(err.response.data.message)
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .register{
    margin: 0 auto;
    margin-top: 100px;
    width: 400px;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
  }
  .user{
    margin-bottom: 50px;
  }
</style>
