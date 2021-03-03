<template>
  <div class="home-main">
    <home-main-item path="/money" color="pink" text="攒钱系统"></home-main-item>
    <home-main-item path="/money" color="skyblue" text="备忘库"></home-main-item>
    <home-main-item path="/money" color="#FAF6A2" text="记单词"></home-main-item>
  </div>
</template>

<script>
  import HomeMainItem from './HomeMainItem.vue'
  export default{
    name:"HomeMain",
    components:{
      HomeMainItem
    }
  }
</script>

<style lang="scss" scoped>
  .home-main{
      position: absolute;
      width: 60%;
      min-width: 300px;
      height: 500px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
  }
 @media screen and (max-width:720px){
    .home-main{
      justify-content: center;
      flex: 1;
    }
  }
</style>
