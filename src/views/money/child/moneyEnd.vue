<template>
  <div class="money-end animate__animated animate__bounceIn">
    <div class="open-box">
      <ul>
      	<li v-for="(item,index) in ballsMessage.position"
            :style="{left:item+'px',top:400+'px'}"
            :key="index"
            class="sport"
        >{{ballsMessage.results[index]}}</li>
      </ul>
    </div>
    <div class="results">
      <div>
        <button @click.once="start" class="start-game btn">开始摇奖</button>
      </div>
      <div class="end-num">
        <p>本期中奖号码是</p>
        <ul>
        	<li v-for="(item,indey) in ballsMessage.results"
           :key="indey"
          >{{item}}</li>
        </ul>
      </div>
      <div class="start-num">
        <p>您选择的号码是</p>
        <ul>
        	<li v-for="(item,index) in playerNum"
              :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <div class="awards">
        <p>您本期选中的号码</p>
        <ul>
        	<li v-for="(item,indez) in resultsRedNum"
              :key="indez"
              >
              {{item}}
          </li>
          <li v-if="resultsBlueNum" class="blueBalls">{{resultsBlueNum}}</li>
        </ul>
      </div>
      <div class="message" v-show="gameOver">
        <div v-if="endMessage">{{ballsMessage.notice}}*{{doubled}}</div>
        <div v-else>很遗憾,您没有中奖</div>
      </div>
      <div class="again">
        <button class="start-game btn" v-show="gameOver" @click="again">再买一张</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {ramdon} from 'common/utils.js'
  export default {
    name:"moneyEnd",
    props:{
      playerNum:{
        type:Array,
        default(){
          return []
        }
      },
      doubled:{
        type:Number,
        default:1
      }
    },
    data(){
      return {
        width:370,
        height:400,
        timerArr:[],
        resultsTimer:null,
        setTimeoutNum:0,
        ballsMessage:{
          position:[],
          results:['?','?','?','?','?','?','?'],
          notice:""
        },
        //结果
        resultsBlueNum:null,
        resultsRedNum:[],
        //信息
        endMessage:false,
        gameOver:false
      }
    },
    computed:{
      doubleMoney(){
        //判断倍数是否大于等于2，是的话就换种方式显示
        return this.doubled >=2 ? this.ballsMessage.notice + "*"+this.doubled : this.ballsMessage.notice
      }
    },
    created() {
      for(let i=0;i<7;i++){
        //生成20到宽度370之间的任意数字
        let val = ramdon(20,this.width-20)
        //生成一个left值数组,有7个值，代表7个不同位置的球
        this.ballsMessage.position.push(val)
      }
    },
    methods:{
      //开始摇奖
      start(){
        //调用球体运动函数
        this.ballSports();
        //右边出结果
        this.ballResults();
      },
      //左边的摇奖器
      ballSports(){
        let balls = document.querySelectorAll('.sport')
        for(let i=0;i<balls.length;i++){
         //生成随机的x值和y值，为了让不同球体做不一样的运动
         let speedX = Math.floor(Math.random()*5+i+5)
         let speedY = Math.floor(Math.random()*5+i+5)
         // 用一个数组来存储不同的计时器
          this.timerArr[i] = setInterval(()=>{
            //触碰到盒子边界时，反弹,需要有一点边界差，不然可能会溢出去
           if(balls[i].offsetLeft >= this.width-20 || balls[i].offsetLeft <= 20){
             speedX = -speedX
           }
           if(balls[i].offsetTop >= this.height ||  balls[i].offsetTop <= 20){
             speedY = -speedY
           }
           //计时器，不断的增加left的值和top的值，使球体运动起来
           balls[i].style.left = balls[i].offsetLeft + speedX + 'px'
           balls[i].style.top = balls[i].offsetTop + speedY + 'px'
         },10)
        }
      },
      //开奖结果
      ballResults(){
        this.resultsTimer = setTimeout(()=>{
          if(this.setTimeoutNum === 7){
            //调用中奖信息显示的函数
            this.endTips();
            return;
          }
          //开奖的球体停止运动
           this.sportEnd();
          //继续调用setTimeout计时器
           this.ballResults();
        },2000)
      },
      //球体运动结束
      sportEnd(){
        //当前开奖球体运动结束
        clearInterval(this.timerArr[this.setTimeoutNum]);
        //开奖号码的逻辑
        if(this.setTimeoutNum < 6){
          this.redOpening();
        }else{
          this.blueOpening();
        }
        this.setTimeoutNum++;
      },
      redOpening(){
        //停止运动后获得随机值
        let numval = ramdon(1,33)
        //判断有没有重复值,对每个值进行函数判断，只要有一个相等就返回true
        let numRepeat = this.ballsMessage.results.every(val => val !== numval)
        if(numRepeat){
          this.ballsMessage.results.splice(this.setTimeoutNum,1,numval)
          //判断开奖号码和玩家的号码是否相同
          this.redSame(numval);
        }else{
          //如果重复了,则重新调用
          this.redOpening()
        }
      },
      blueOpening(){
        let numval = ramdon(1,16)
        this.ballsMessage.results.splice(this.setTimeoutNum,1,numval)
        //判断开奖号码和玩家的号码是否相同
        this.blueSame(numval);
      },
      redSame(numval){
        //红色球判断是否中奖
        //slice() 方法可从已有的数组中返回选定的元素,不包含6
       let playerRedNum = this.playerNum.slice(0,6)
       let num =  playerRedNum.some(val => val == numval )
       if(num){
          this.resultsRedNum.push(numval)
       }
      },
      blueSame(numval){
        //判断蓝球值是否和玩家的最后一个球相等，最后一个球就是蓝球
         if(numval == this.playerNum[6]){
           this.resultsBlueNum = numval
         }
      },
      //结束后提示信息
      endTips(){
        //显示中奖信息
        this.gameOver = true;
        if(this.resultsBlueNum && this.resultsRedNum.length === 6 ){
          this.ballsMessage.notice = "恭喜您,中了500万!,掏空奖池!"
          this.endMessage = true;
        }else if(this.resultsRedNum.length === 6){
          this.ballsMessage.notice = "恭喜您,中了二等奖!"
          this.endMessage = true;
        }else if(this.resultsBlueNum && this.resultsRedNum.length === 5){
          this.ballsMessage.notice = "恭喜您,中了三等奖!"
          this.endMessage = true;
        }else if(this.resultsRedNum.length === 5){
          this.ballsMessage.notice = "恭喜您,中了四等奖!"
          this.endMessage = true;
        }else if(this.resultsBlueNum && this.resultsRedNum.length >= 3){
          this.ballsMessage.notice = "恭喜您,中了四等奖!"
          this.endMessage = true;
        }else if(this.resultsRedNum.length >= 3){
          this.ballsMessage.notice = "恭喜您,中了五等奖!"
          this.endMessage = true;
        }else if(this.resultsBlueNum && this.resultsRedNum.length >= 1){
          this.ballsMessage.notice = "恭喜您,中了五等奖!,火锅一份"
          this.endMessage = true;
        }else if(this.resultsRedNum.length === 2){
          this.ballsMessage.notice = "恭喜您,中了六等奖!,奶茶一份"
          this.endMessage = true;
        }
        // else{
        //   this.ballsMessage.notice = "很遗憾,您没有中奖"
        // }
      },
      again(){
        console.log("重来")
        this.$emit('again')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .money-end{
    position: relative;
    width: 800px;
    height: 430px;
    display: flex;
    background-color: #6fddc2;
    border-radius: 5px;
    @include center
  }
  .open-box{
    width: 410px;
    height: 430x;
    background-color: white;
    border-radius: 8px;
    li{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid $red;
      padding-right: 1px;
      position: absolute;
      color: $red;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    li:last-child{
      border: 3px solid $blue;
      color: $blue;
    }
  }
  //右边
  .results{
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .start-game{
      font-size: 18px;
      @include btn
    }
  }

  //开奖号码和选择的号码
  .start-num,.end-num{
    text-align: center;
    margin-top: 20px;
    font-size: 22px;
    ul{
      display: flex;
      justify-content: center;
      margin-top: 10px;
      font-size: 16px;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        color: $red;
        width: 30px;
        height: 30px;
        border: 3px solid currentcolor;
        border-radius: 50%;
        padding-right: 1px;
      }
      li:last-child{
        color: $blue;
      }
    }
  }
  //本期中奖号码
  .awards{
    text-align: center;
    margin-top: 20px;
    font-size: 22px;
    ul{
      display: flex;
      justify-content: center;
      margin-top: 10px;
      font-size: 16px;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        color: $red;
        width: 30px;
        height: 30px;
        border: 3px solid currentcolor;
        border-radius: 50%;
        padding-right: 1px;
      }
      .blueBalls{
        color: $blue;
      }
    }
  }
  .message{
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    color: $colorMain;
    margin-bottom: 20px;
    text-shadow:2px 2px 3px rgba(0,0,0,.5);
  }
  .btn:hover{
    box-shadow: 1px 1px 10px 3px rgba(0,0,0,.5);
  }
</style>
