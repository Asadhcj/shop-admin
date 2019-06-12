<template>
    <div>
       <el-row type="flex" justify="space-between" >
           <div>
               <el-button @click="handleAddgoodspage">新增</el-button>
               <el-button type="danger"
                     @click="handleDeletes">
                     删除
                </el-button>
           </div>
           <div class="input-serach">
                <el-input placeholder="请输入内容" 
                    class="input-with-select"
                    v-model="searchvalue">
                        <el-button 
                            slot="append" 
                            icon="el-icon-search" 
                            @click="handlesearchvalue"
                            >
                        </el-button>
                 </el-input>
            </div>
       </el-row>
       <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                 <el-table-column
                    type="selection"
                    width="55">
                 </el-table-column>
                 <el-table-column
                    label="标题"
                    width="500"
                    >
                    <template slot-scope="scope">
                        <el-row type="flex" align="middle">
                            <img class="img" :src="scope.row.imgurl" alt="">
                            <div>
                                 {{ scope.row.title }}
                            </div>
                        </el-row>
                        </template>
                 </el-table-column>
                 <el-table-column
                    prop="categoryname"
                    label="类型"
                    width="120">
                 </el-table-column>
                 <el-table-column
                    prop="market_price"
                    label="市价" 
                    width="120">
                 </el-table-column>
                 <el-table-column
                    prop="sell_price"
                    label="售价" 
                    width="120">
                 </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!--current-page：当前页数 -->
        <!--page-size：每页显示信息条数  -->
        <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10,15,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData:[],
        ids:[],
        pageIndex:1,
        pageSize:5,
        total:0,
        searchvalue:""
      }
    },
    methods:{
        handleAddgoodspage(){
            this.$router.push("/admin/Addgoods-list")
        },
        handleSelectionChange(val){
            let arr=val.map(e=>{
                return e.id
            })
            this.ids=arr
        },
        handlegetgoodslist(pageIndex,pageSize,searchvalue){
            this.$axios({
                url:`http://localhost:8899/admin/goods/getlist?pageIndex=${pageIndex}&pageSize=${pageSize}&searchvalue=${searchvalue}`,
                method:"GET",
            }).then((res)=>{
                const data=res.data
                this.tableData=data.message.map(e=>{
                    return {
                        ...e,
                        imgurl:`http://localhost:8899/${e.img_url}`
                    }
                })
                this.total=data.totalcount
            })
        },
        // 分页功能
        handleSizeChange(val){
            this.pageSize=val
              this.handlegetgoodslist(
                this.pageIndex,
                this.pageSize,
                this.searchvalue)
        },
        handleCurrentChange(val){ 
            this.pageIndex=val
            this.handlegetgoodslist(
                this.pageIndex,
                this.pageSize,
                this.searchvalue)
        },
        // 编辑事件
        handleEdit(val){
           this.$router.push("/admin/Editgoods-list/"+val.id)
        },
        // 删除事件
        handleDelete(val){
            this.ids=val.id
            this.delete(this.ids)
        },
        //多项删除
        handleDeletes(){
            this.ids=this.ids.join(",")
            this.delete(this.ids) 
        },
        // 关键字筛选
        handlesearchvalue(){
            this.handlegetgoodslist(
                this.pageIndex,
                this.pageSize,
                this.searchvalue)
        },
        // 删除函数封装
        delete(ids){
            this.$axios({
                url:`http://localhost:8899/admin/goods/del/${ids}`,
                method:"GET",
            }).then(res=>{
                if(res.data.status===0){
                    this.$message.success(res.data.message)
                     this.handlegetgoodslist(
                            this.pageIndex,
                            this.pageSize,
                            this.searchvalue)
                }else{
                     this.$message.error(res.data.message)
                }
            })
        }

    },
    mounted(){
        this.handlegetgoodslist(
                this.pageIndex,
                this.pageSize,
                this.searchvalue)
    }
}
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .input-serach{
        width: 400px;
    }
    .img{
        width: 100px;
        height: 80px;
        border:1px solid #000;
    }
    .table{
        margin:20px auto;
    }
</style>
