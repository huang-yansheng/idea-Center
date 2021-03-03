<template>
  <div class="money">
    <go-home class="go-home"></go-home>
    <audio ref="audio">
      <source src="~assets/mp3/money.mp3" />
    </audio>
    <div class="money-one" v-if="isShow == 'status-one'">
      <div class="header">欢迎来到彩票攒钱游戏</div>
      <money-reles @gameStart="gameStart"></money-reles>
    </div>
    <div v-else-if="isShow == 'status-two'" class="mid" :style="midstyle">
      <money-num-ball @ballPush="ballPush" v-show="isSelect" class="Num-list" wh=40 :color="selectColor" :number="num"></money-num-ball>
      <money-ready @opening="opening" @superDouble="superDouble" v-show="readyGo" class="money-ready"></money-ready>
      <money-interface @selectNum="selectNum" :redNum="redNum" :blueNum="blueNum"></money-interface>
    </div>
    <div v-else>
      <money-end @again='again' :playerNum="redNum.concat(blueNum)" :doubled="double"></money-end>
    </div>
  </div>
</template>

<script>
  import goHome from 'components/content/goHome.vue'
  import moneyReles from './child/moneyRules.vue'
  import moneyInterface from './child/moneyInterface.vue'
  import moneyNumBall from './child/moneyNumBall.vue'
  import moneyReady from './child/moneyReady.vue'
  import moneyEnd from './child/moneyEnd.vue'
  export default {
    name: "Money",
    data() {
      return {
        //用isShow记录money页面的三个状态，规则-开始选号-开奖
        isShow: 'status-one',
        isSelect: false,
        selectColor: "",
        num: 1,
        //关于球的事件
        currentColor:"",
        redNum: ['?'],
        blueNum: ['?'],
        blueStatus: 0,
        redStatus: 0,
        redIndex:0,
        redClickVal:'',
        double:1,
        //
        midstyle:{
          justifyContent: 'flex-end',
          // space-between
        }
      }
    },
    components: {
      moneyReles,
      moneyInterface,
      moneyNumBall,
      moneyReady,
      moneyEnd,
      goHome
    },
    computed:{
      readyGo(){
        if(this.blueStatus && this.redStatus){
          return true
        }
      }
    },
    methods: {
      gameStart() {
        this.isShow = 'status-two';
      },
      //选择?球时的自定义事件
      selectNum(clickObj,index) {
        this.midstyle.justifyContent = 'space-between'
        this.isSelect = true
        switch (clickObj) {
          case "red":
            this.num = 33
            this.selectColor = "#ee4640"
            this.currentColor = clickObj
            //将点击的红球的值和坐标保存起来
            this.redIndex = index
            this.redClickVal =  this.redNum[index]
            break;
          case "blue":
            this.num = 16
            this.selectColor = "#0558d4"
            this.currentColor = clickObj
            break;
        }
      },
      //点击添加小双色球事件
      ballPush(item) {
        if(this.currentColor == 'blue'){
          this.blueBallClick(item)
        }else{
          this.redBallClick(item)
        }
      },
      //点击添加蓝球时
      blueBallClick(item){
        this.blueNum.push(item);
        this.blueNum.shift();
        //当选择蓝球时，蓝球已经准备就绪，因为只有1个
        this.blueStatus = 1;
      },
      //点击添加红球时
      redBallClick(item){
        //当点击替换的红球是问号,也就是字符串时执行push
        //如果点击的不是问号时，则执行替换操作
        if(typeof this.redClickVal == 'string'){
          this.redPush(item);
        }else{
          this.redReplace(item)
        }
      },
      redPush(item){
        //选择红球时，判断目前红球数组里面有没有这个球。没有就返回true
        let Repeat = this.redNum.every(val => val !== item)
        //选择的非重复红球时，再继续判断是添加还是替换
        //如果点击的是重复的，则什么事情都不发生
        if(Repeat){
          if(this.redNum.length > 5){
            this.redNum.push(item);
            this.redNum.shift();
            //当替换红球时，说明已经准备就绪,只有满6个才会替换
            this.redStatus = 1;
          }else{
            this.redNum.push(item);
          }
        }
      },
      redReplace(item){
        this.redNum.splice(this.redIndex,1,item)
      },
      //开奖了。
      opening(){
        //播放音乐
        this.$refs.audio.play()
        
        this.isSelect = false;
        this.blueStatus = 0;
        this.isShow = 'status-three';
      },
      //将倍数保存起来
      superDouble(val){
        this.double = val;
      },
      again(){
        this.midstyle.justifyContent = 'flex-end'
        //重新开始,数组回到原来的样子
        this.isShow = "status-two"
        this.redNum = ['?']
        this.blueNum=['?']
        this.blueStatus = 0;
        this.redStatus = 0;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .money{
    height: 100%;
  }
  .go-home{
    position: fixed;
    top: 25px;
    left: 100px;
  }
  .header{
    font-size: 30px;
    color: #44be85;
    text-shadow: -1px 3px 10px rgba(0,0,0,.8);
    position: relative;
    top: -30px;
  }
  .money-one {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Num-list {
    // width: 630px;
    // height: 300px;
    z-index: 5;
    // margin-bottom: 50px;
    // @include center;
    // top: -300px;
  }
  .money-ready {
    height: 300px;
    // margin-bottom: 50px;
  }
 .mid{
    @include center;
    background-color: #6fddc2;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
 }
</style>
