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
                admin 超级管理员 退出
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
            }
        },
        methods:{
            handleshow:function(){
                this.show=!this.show
                this.hidden=!this.hidden
                this.$emit("show")
            }
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
</style>
