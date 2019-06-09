<template>
    <div class="box">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form">
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> 
       </el-form>
    </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            uname: this.ruleForm.username,
            upwd: this.ruleForm.password
          };
          this.$axios({
            url: "http://localhost:8899/admin/account/login",
            method: "post",
            data,
            //解决session的验证问题
            withCredentials: true
          }).then(res => {
            var { message, status } = res.data;
            if (status === 1) {
              this.$message({
                showClose: true,
                message,
                type: "error"
              });
            }
            if (status === 0) {
             this.$router.push("/")
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #666;
}
.input {
  width: 400px;
}
.box {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 200px;
  margin-left: -250px;
  margin-top: -100px;
}
</style>
