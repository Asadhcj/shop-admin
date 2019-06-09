<template>
    <div class="bottom">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
             v-for="(item,index) in breadhead" 
             :key="index" 
             :to="{ path: '/' }">
             {{item}}
             </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            breadhead:[]
        }
    },
    methods:{
        getbreadhead(){
            var arr=this.$route.matched
            let breadhead=[]
                    arr.forEach(e => {
                        breadhead.push(e.meta)
                    });
            this.breadhead=breadhead
        }
    },
  
    watch:{
        $route(){
           this.getbreadhead()
        }
    },
    mounted(){
        this.getbreadhead()
    },

}
</script>

<style>
    .bottom{
        padding-bottom: 10px;
        border-bottom: 1px solid #666;
        margin-bottom:20px;
    }
</style>
