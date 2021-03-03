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
    }
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})
