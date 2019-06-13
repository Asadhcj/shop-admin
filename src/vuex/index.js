import vue from "vue"
import Vuex from "vuex"
vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem("users"))||{}
    },
    mutations:{
        setuser(state,data){
            state.user=data
            window.localStorage.setItem("users",JSON.stringify(state.user))
        }
    }
})
export default store
