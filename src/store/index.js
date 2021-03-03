import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //记录登录状态
    LoginStatus:false,
    token:'',
    nextPath:'',
		allMoney:0
  },
  mutations: {
    addMoney(state,cs){
      state.allMoney += cs
      //将金币存进本地存储中
      localStorage.setItem("allMoney", state.allMoney)
    },
    //保存token
    saveMsg(state){
      if(sessionStorage.getItem('token')){
        state.token = sessionStorage.getItem('token')
      }else{
        state.token = ''
      }
    },
    savePath(state,cs){
      state.nextPath = cs
    },
    changeLoginStatus(state,cs){
      state.LoginStatus = !state.LoginStatus
    },
    //进入页面时，刷新金钱
    getMoney(state){
       state.allMoney = +localStorage.getItem('allMoney')
    }
  },
  getters:{
    // getMoney(state){
    //   state.allMoney = +localStorage.getItem('allMoney')
    //   return state.allMoney
    // }
  },
  actions: {
  },
  modules: {
  }
})
