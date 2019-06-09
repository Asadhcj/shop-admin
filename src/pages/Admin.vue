<template>
    <el-container>
        <el-aside width="auto">
            <Aside :isShow="Show"></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header @show="handleChangeshow"></Header>
            </el-header>
            <el-main>
                <Maintitle></Maintitle>               
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
import Maintitle from "../components/Main-title.vue"
export default {
    data:function(){
        return {
            Show:false
        }
    },
    components:{
        Header,
        Aside,
        Maintitle
      },
      methods:{
          handleChangeshow:function(){
              this.Show=!this.Show
          }
      }
}
</script>

<style scoped>
     .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
