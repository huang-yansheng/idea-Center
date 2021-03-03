<template>
  <div class="ready">
    <button class="btn" @click="startGame">{{howMuch}}</button>
    <button class="btn" @click="doubleMuch" :class="{'dontAdd': dontAdd}">超级加倍</button>
    <button class="btn" @click="rewards">查看奖励</button>
    <div class="ready-rewards" v-if="isRewards">
      <div class="rewards-head">奖金对照表</div>
      <money-rewards></money-rewards>
      <div class="test">补充:如果选择了倍数,中奖了就是多倍快乐,比如投了双倍,那六等奖就是两份奶茶</div>
      <button class="rewards-btn" @click="rewards">返回</button>
    </div>
  </div>
</template>

<script>
  import moneyRewards from './moneyRewards.vue'
  export default{
    name:"moneyReady",
    data(){
      return {
        isRewards:false,
        double:1,
        much:2,
        dontAdd:false,
      }
    },
    computed:{
      howMuch(){
        return this.double * this.much+'元'+this.double+'注'
      }
    },
    components:{
      moneyRewards
    },
    methods:{
      rewards(){
        this.isRewards = !this.isRewards
      },
      //超级加倍
      doubleMuch(){
        if(this.double < 10){
          this.double = this.double * 2
        }else{
          this.$toast.show("疯了吧您,不要再加了")
          this.dontAdd = true;
        }
        this.$emit('superDouble',this.double)
      },
      //点击投注按钮
      startGame(){
        //触发开始事件,把倍数传过去
        this.$emit('opening',this.double)
        //将钱添加进奖池内
        let money = this.double * this.much;
        console.log(money)
        this.$store.commit('addMoney',money)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ready{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn{
      position: relative;
      z-index: 10;
      @include btn;
    }
    .btn:hover{
      box-shadow: 1px 1px 10px 3px rgba(0,0,0,.5);
    }
    .dontAdd{
      cursor: no-drop;
      border: 2px solid $red;
      //让按钮失效的css属性
      pointer-events:none;
    }
  }

  .ready-rewards{
    background-color: #fff;
    z-index: 10;
    @include center;
    border-radius: 2px;
  }
  .rewards-head{
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
  .test{
    font-size: 18px;
    padding: 25px;
    line-height: 30px;
    color: $red;
  }
  .rewards-btn{
    position: absolute;
    right: 50px;
    bottom: 50px;
    @include btn;
  }
</style>
