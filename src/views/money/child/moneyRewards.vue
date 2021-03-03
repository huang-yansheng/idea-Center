<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="level"
        label="奖励级别"
        align="center"
        width="90">
      </el-table-column>
      <el-table-column
        align="center"
        prop="conditions"
        label="中奖条件"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="factor"
        label="倍数"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="moneys"
        label="奖金">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          level: '一等奖',
          conditions: '6个红球+1个蓝球全中',
          factor:'-',
          moneys: '掏空奖池,享受人生 * 倍数'
        }, {
          level: '二等奖',
          conditions: '6个红球全中',
          factor:'-',
          moneys: '百分之80的奖池 * 倍数'
        }, {
          level: '三等奖',
          conditions: '5个红球+1个蓝球',
          factor:'-',
          moneys: '百分之60的奖池 * 倍数'
        }, {
          level: '四等奖',
          conditions: '5个红球或者3个红球1个蓝球',
          factor:'-',
          moneys: '百分之30的奖池 * 倍数'
        }, {
          level: '五等奖',
          conditions: '3个红球或者1个蓝球1个红球',
          factor:'-',
          moneys: '吃一顿火锅，钱从奖池扣 * 倍数'
        }, {
          level: '六等奖',
          conditions: '2个红球',
          factor:'-',
          moneys: '喝一杯奶茶，钱从奖池扣 * 倍数'
        }
        ]
      }
    }
  }
</script>

<style scoped>
</style>
