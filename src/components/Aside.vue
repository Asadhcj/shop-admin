<template>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo "
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isShow">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>购物商城</span>
            </template>
            <router-link to="/admin/goods-list">
                <el-menu-item  index="1-1"> 
                    商品列表
                </el-menu-item >
            </router-link>
            <router-link to="/admin/category-list"> 
                <el-menu-item  index="1-2">
                 项目列表 
                </el-menu-item >
            </router-link>
      </el-submenu>
      <el-submenu index="2">
           <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </template>
             <el-menu-item  index="2-1">选项1</el-menu-item >
            <el-menu-item  index="2-2"> 选项1</el-menu-item >
      </el-submenu>
      <el-submenu index="3" >
            <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </template>
             <el-menu-item  index="3-1">选项1</el-menu-item >
            <el-menu-item  index="3-2"> 选项1</el-menu-item >
      </el-submenu>
      <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </template>
             <el-menu-item  index="4-1">选项1</el-menu-item >
            <el-menu-item  index="4-2"> 选项1</el-menu-item >
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data:function(){
        return {
            bread:["商品列表"]
        }
    },
  props: ["isShow"]
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}
a{
    text-decoration: none;
}
</style>
