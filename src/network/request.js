import axios from 'axios'

export function request(config){
  const instance = axios.create({
  	baseURL:'http://localhost:3001',
  	timeout:10000,
  })


  instance.interceptors.request.use(config=>{
    //过滤掉password2属性
    delete config.data.password2
    console.log(config)
  	return config
  },err=>{//响应失败时调用
				console.log(err)
			})

  return instance(config)//返回给调用者，是一个promise对象
}
