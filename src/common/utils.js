//生成随机数
export function ramdon(minNum,maxNum){
  let poor = maxNum - minNum;
  let value = Math.floor(Math.random()*poor+minNum)
  return value;
}

