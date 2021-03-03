<template>
  <div class="register">
    <el-form label-position="top" :rules="rules" ref="ruleForm" :model="form" label-width="60px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password"  type="password" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="password2">
        <el-input v-model="form.password2"  type="password" ></el-input>
      </el-form-item>
      <el-form-item class="btn">
          <el-button type="primary" @click="submitForm()">提交注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {register} from 'network/login.js'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.password2 !== '') {
            this.$refs.ruleForm.validateField('password2',error=>{
              if(!error){
                console.log('通过')
              }else{
                 console.log('不通过')
              }
            });
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          username:'',
          password:'',
          password2:''
        },
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          password:[
             { validator: validatePass,required: true, trigger: 'blur' }
          ],
          password2:[
            { validator: validatePass2,required: true, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(){
        // let that = this;
        this.$refs.ruleForm.validate((valid)=>{
         if (valid) {
           //发送网络请求注册信息,请求成功后再触发自定义事件
           register(this.form).then((res)=>{
             console.log(res)
             this.$emit('success',this.form.username,this.form.password)
           }).catch((err)=>{
             this.error(err);
             console.log(err.response)
           })

          } else {
            console.log('不通过');
            return false;
          }
        })
      },
      error(err){
        this.form.username = ""
        this.form.password = ""
        this.form.password2 = ""
        this.$toast.show(err.response.data.message)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .register{
    margin: 0 auto;
    margin-top: 20px;
    width: 400px;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
  }
</style>
