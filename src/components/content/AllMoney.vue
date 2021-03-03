<template>
  <div class="all">
    <img src="~assets/img/common/allmoney.png" title="奖池">
    <span>￥{{$store.state.allMoney}}</span>
  </div>
</template>

<script>
  export default {
    name:"AllMoney"
  }
</script>

<style scoped lang="scss">
  .all{
    display: flex;
    align-items: flex-end;
    font-size: 18px;
    color: $colorMain;
    cursor: pointer;
    span{
      margin-bottom: 10px;
    }
  }
</style>
