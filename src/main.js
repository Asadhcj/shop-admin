import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import VueRouter from "vue-router"
import  Login from "./components/Login.vue"
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueRouter)
var routes=[
    {path:"/login",component:Login}
]
var router=new VueRouter({routes})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
