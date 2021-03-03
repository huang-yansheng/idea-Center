<template>
  <div class="animate__animated animate__fadeIn">
    <ul>
    	<li v-for="(item,index) in number"
          :key = index
          :style="{color: color,width:wh+'px',height:wh+'px'}"
          @click="selectBall(item)"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name:"moneyNumBall",
    props:{
      number:{
        type:Number,
        default:1
      },
      color:{
        type:String,
        default:"red"
      },
      wh:{
        type:String,
        default:50
      }
    },
    methods:{
      selectBall(item){
        this.$emit('ballPush',item)
      }
    }
  }
</script>

<style lang="scss" scoped>
    ul{
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
    }
    li{
      border: 3px solid currentcolor;
      border-radius: 50%;
      font-size: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;
      margin: 0 8px 10px 8px;
  }
</style>
