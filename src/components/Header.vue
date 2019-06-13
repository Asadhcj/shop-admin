<template>
    <div class="box">
        <el-row type="flex" class="row-bg" justify="space-between">
            <div class="arrow" @click="handleshow" v-show="show">
                 <i class="el-icon-back"></i>
            </div>
             <div class="arrow" @click="handleshow" v-show="hidden">
                 <i class="el-icon-right"></i>
            </div>
            <div>
                <span>{{user.uname}}——</span>
                <span>{{user.realname}}——</span>
                <button class="btn" @click="handlesingleout">退出</button>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
        data:function(){
            return {
                show:true,
                hidden:false,
                user:{}
            }
        },
        methods:{
            handleshow:function(){
                this.show=!this.show
                this.hidden=!this.hidden
                this.$emit("show")
            },
            handlesingleout(){
                this.$axios({
                    url:"http://localhost:8899/admin/account/logout",
                    method:"GET",
                    withCredentials: true
                }).then(res=>{
                    const {status,message}=res.data
                    if(status==0){
                        this.$message.success(message)
                        setTimeout(()=>{
                            this.$router.push("/login")
                        },2000)
                        window.localStorage.removeItem("users")
                    }
                })
            }
        },
        mounted(){
            this.user=this.$store.state.user
        }
}
</script>

<style scoped>
    .box{
        height: 60px;
        line-height: 60px;
    }
    .arrow{
        cursor: pointer;
        font-size: 20px;
    }
    .btn{
      background-color:#fff;
      border:none;
      font-size: 16px;
      cursor: pointer;
    }
</style>
