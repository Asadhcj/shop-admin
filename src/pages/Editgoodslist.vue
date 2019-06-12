<template>
   <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属类别">
            <el-select v-model="form.category_id" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in categorys" 
                :key="index" 
                :label="item.title"  
                :value="item.category_id">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="是否显示">
            <el-switch v-model="form.is_slide"></el-switch>
        </el-form-item>
        <el-form-item label="推荐类型">
            <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
            <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>
        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8899/admin/article/uploadimg"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>
         <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>
        <el-form-item label="图片相册">
            <el-upload
                action="http://localhost:8899/admin/article/uploadfile"
                list-type="picture-card"
                :on-success="handlePictureSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="内容摘要">
            <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
</el-form>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data() { 
      return {
        form: {
            category_id:"",
            status:false,
            is_slide:false,
            is_top:false,
            is_hot:false,
            title:"",
            sub_title:"",
            imgList:[],
            goods_no:"",
            stock_quantity:"",
            market_price:"",
            sell_price:"",
            fileList:[],
            zhaiyao:"",
            content:""
        },
        categorys:[],
        imageUrl:"",
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
          this.$axios({
              url:"http://localhost:8899/admin/goods/add/goods",
              method:"POST",
              data:this.form,
               withCredentials: true
          }).then(res=>{
              const {status,message}=res.data
              if(status===0){
                  this.$message.success(message)
                
                  setTimeout(()=>{
                    this.$router.back()
                  },2000)
                 
              }else{
                 this.$message.success(message) 
              }
          })
      },
      //上传封面图片成功
      handleAvatarSuccess(res, file, fileList){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.imgList.push(res)
      },
      //上传图片前触发
      beforeAvatarUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
      //上传多张图片成功后触发
      handlePictureSuccess(res, file, fileList){
        const files=fileList.map(e=>{
            return e.response
        })
       this.form.fileList=files
      },
      handlePictureCardPreview(){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //图片移除后触发
      handleRemove(file,fileList){
         const files=fileList.map(e=>{
            return e.response
        })
       this.form.fileList=files
      }
    },
    mounted(){
        this.$axios({
            url:"http://localhost:8899/admin/category/getlist/goods",
            method:"GET"
        }).then(res=>{
           const {status, message} = res.data;
            // 所有的类别数据保存到categorys
            this.categorys = message;
        });
        const {id}=this.$route.params;
        this.$axios({
            url:"http://localhost:8899/admin/goods/getgoodsmodel/"+id,
            method:"GET",
        }).then(res=>{
            const {status,message}=res.data
         
            // 对象合并
            this.form = {
                ...message,
                // category_id转化为数字
                category_id: +message.category_id,
            }   
        })
    }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
   .ql-snow{
       line-height: 1;
   }
</style>
