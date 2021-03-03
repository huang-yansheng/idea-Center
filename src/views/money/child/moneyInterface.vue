<template>
  <div class="inter-face">
    <ul class="select">
      <li title="点击选取号码"
          v-for="(item,index) in redNum"
          :key = "index+'red'"
          @click="redClick(index)"
      >{{item}}</li>

      <div class="tips animate__animated animate__heartBeat" v-show="isTips">请点击选取号码球</div>

      <li class="blue"
           title="点击选取号码"
          v-for="(item,indey) in blueNum"
          :key = "indey+'blue'"
          @click="blueClick()"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
 export default {
   name:"moneyInterface",
   props:{
     redNum:{
       type:Array,
       default:['?']
     },
     blueNum:{
       type:Array,
       default:['?']
     }
   },
   data(){
     return {
      clickObj:null,
      isTips:true
     }
   },
   methods:{
     redClick(index){
      this.clickObj = "red"
      //关闭提示信息
      this.isTips = false
      this.$emit('selectNum',this.clickObj,index)
     },
     blueClick(){
      this.clickObj = "blue"
      this.$emit('selectNum',this.clickObj)
      //关闭提示信息
      this.isTips = false
     }
   }
 }
</script>

<style lang="scss" scoped>
  .inter-face{
    // width: 650px;
    // height: 60px;
    z-index: 5;
    // margin-bottom: 50px;
    // @include center;
    // top:400px;
  }
  .select{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    li{
      width: 60px;
      height: 60px;
      color: $red;
      font-size: 25px;
      font-weight: 700;
      border: 4px solid currentcolor;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .2s;
      cursor: pointer;
    }
    li:hover{
      font-size: 28px;
    }
    .blue{
      color: $blue;
    }
    .tips{
      font-size: 24px;
    }
  }
</style>
