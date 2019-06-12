import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import VueRouter from "vue-router"
import  Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import Goodslist from "./pages/Goodslist.vue"
import Categorylist from "./pages/Categorylist.vue"
import Addgoodslist from "./pages/Addgooslist.vue"
import Editgoodslist from "./pages/Editgoodslist.vue"
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.use(VueRouter)
var routes=[
    {
      path:"/",
      redirect:"/admin/goods-list",
      meta:"首页"
    },
    {
      path:"/login",
      component:Login,
      meta:"登录页"
    },
    {
      path:"/admin",
      component:Admin,
      meta:"后台管理",
      children:[
        {
          path:"goods-list",
          component:Goodslist,
          meta:"商品列表"
        },
        {
          path:"category-list",
          component:Categorylist,
          meta:"项目列表"
        },
        {
          path:"Addgoods-list",
          component:Addgoodslist,
          meta:"添加商品列表"
        },
        {
          path:"Editgoods-list/:id",
          component:Editgoodslist,
          meta:"编辑商品列表"
        }
      ]
    }
]
var router=new VueRouter({routes})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
