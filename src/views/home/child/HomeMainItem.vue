<template>
  <div class="main-item"
      :style="{ backgroundColor:color }"
      @click="changePath"
      >
      {{text}}
  </div>
</template>

<script>
  export default {
    name:"main-item",
    props:{
      color:{
        type:String,
        default:"white"
      },
      text:{
        type:String,
        default:"没有名字"
      },
      path:{
        type:String,
        default:"/home"
      }
    },
    methods:{
      changePath(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-item{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 200px;
    height: 120px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.5s;
    margin: 25px;
  }
  .main-item:hover{
    box-shadow: 0 6px 10px 10px rgba(0,0,0,.3);
    filter:saturate(250%);
    font-size: 19px;
    font-weight: 700;
  }
</style>
