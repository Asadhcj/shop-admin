<template>
    <div>
        <el-row type="flex" class="row-bg" justify="space-between">
           <span>标题</span>
           <span>序列</span>
           <span>设置</span>
        </el-row>
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                
                    <span style="width:33%">{{ data.title }}</span>
                    <span style="width:33%">
                        <input @blur="handleblur($event,data)" :value="data.sort_id" style="width:80px" />
                    </span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                        >
                            编辑
                        </el-button>
                    </span>
               
            </span>
        </el-tree>
               
    </div>
</template>

<script>
    let id = 1000;

export default {
     data() {
      return {
        data:[]
      }
    },
      methods: {
          handleblur(event,data){
              if(event.target.value==data.sort_id){
                  return
              }
              let flage=window.confirm("是否编辑数据")
              data.sort_id=event.target.value
              if(flage){
                   this.$axios({
                  url:`http://localhost:8899/admin/category/edit/${data.category_id}`,
                  method:"POST",
                  data,
                  withCredentials: true
              }).then(res=>{
                    this.getcategorydata()
                     this.$message.success("修改成功");
                })
              }else{
                   this.getcategorydata()
              }
             
          },
          getcategorydata(){
              this.$axios({
                    url:"http://localhost:8899/admin/category/getlist/goods",
                    method:"GET"
                }).then(res=>{
                    const data=res.data
                this.data=data.message
                })
          }
    
    },
    mounted(){
         this.getcategorydata()
    }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
   .row-bg {
    padding: 10px 0px 10px 45px;
    background-color: #f9fafc;
    font-weight: 700;
  }
</style>
