<template>
  <div class="animate__animated animate__fadeInLeft">
    <div class="rules">
      <div class="test">------------------------- 前情提要 -------------------------</div>
      <p>珍爱生命,远离赌博</p>
      <p>此游戏是为了存钱增加乐趣</p>
      <p>通过每天一张彩票为自己存钱</p>
      <p>中奖了,就从自己的奖池中拿钱出来挥霍</p>
      <p>然后你就会发现,买彩票中不了奖,钱越存越多</p>
      <p>由于本网站不涉及真实RMB,大家给自己开个小金库吧</p>
      <div class="game-rules test">------------------------- 规则如下 -------------------------</div>
      <p>根据真实彩票改编</p>
      <p>共分为红色球和蓝色球两种</p>
      <p>红色球数字有1-33,蓝色球数字由1-16</p>
      <p>从红色球中任意选6个,蓝色球中任意选择1个</p>
      <p>投注一定金额,不中奖则存进奖池,中奖了就从奖池拿钱</p>
    </div>
    <div class="money-btn">
      <button class="left animate__animated "
              :disabled="disabled" @click="leftChange"
              :class="{'animate__shakeX': leftBtn}"
              >
        不,我不玩
       </button>
      <button class="right" @click="start">试试</button>
    </div>
  </div>
</template>

<script>
  export default{
     name:"moneyRules",
     data(){
       return {
         disabled:null,
         leftBtn:false
       }
     },
     methods:{
       leftChange(){
        this.leftBtn = true;
        this.disabled = true;
       },
       start(){
         this.$emit('gameStart')
       }
     }
  }
</script>

<style lang="scss" scoped>
  .rules{
    width: 600px;
    height: 480px;
    border: 1px solid black;
    padding: 10px;
    color: $red;
    text-align: center;
    background-color: #6fddc2;
    box-shadow: 0 5px 20px 5px rgba(0,0,0,.2);
    border-radius: 5px;
    .test{
      font-size: 24px;
      margin-bottom: 20px;
      color: #eeeeee;
      text-shadow: -1px 3px 5px #000000;
    }
    p{
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 22px;
    }
  }
  .money-btn{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    button{
      @include btn
    }
    .left{
      cursor: not-allowed;
    }
    .right{
      cursor: pointer;
    }
  }
  .game-rules{
    margin-top: 25px;
  }
</style>
