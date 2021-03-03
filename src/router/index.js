import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

const Home = () => import('views/home/Home.vue')
const Money = () => import('views/money/Money.vue')

Vue.use(VueRouter)

const routes = [
  {
  	path:'/',
  	redirect:"/home"
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/money',
    component:Money,
    meta:{
      permissions:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

//跳转路由时判断是否登录
// router.beforeEach((to,from,next)=>{
//     //页面刷新时，随时保存token
//     store.commit('saveMsg')
//     //判断访问的页面是否需要登录
//     if(to.meta.permissions){
//       //判断是否已经登录，sessionStorage中有没有token
//       if(sessionStorage.getItem('token')){
//         next();
//       }else{
//         //弹出登录组件，并且将点击时的路由保存起来
//         store.commit('changeLoginStatus')
//         store.commit('savePath',to.path)
//       }
//     }else{
//       next()
//     }
// })

export default router
