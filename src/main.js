import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import VueRouter from "vue-router"
import  Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.use(VueRouter)
var routes=[
    {path:"/",component:Admin},
    {path:"/login",component:Login}
]
var router=new VueRouter({routes})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
