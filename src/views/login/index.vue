<template>
  <div class="login-container">
    <el-card class="box-card">
      <h2 class="mb_20 c_409eff">commerce商店</h2>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="form"
        :rules="rules2"
        ref="form"
      >
        <el-form-item
          label="用户名:"
          prop="name"
        >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码:"
          prop="password"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button
            type="primary"
            @click="submitForm()"
          >登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "",
      form: {
        username: "admin",
        password: "123456"
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Login", this.form)
            .then(() => {
              this.$router.push({ path: "/layOut" });
              this.$message({
                message: "登陆成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("登录失败");
            });
        } else {
          this.$message({
            message: "参数验证不合法！",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/bgc.png") no-repeat center / 100%;
  .box-card {
    width: 360px;
    margin: 60px auto;
    position: absolute;
    left: 0;
    right: 0;
    border-top: 10px solid #409eff;
  }
}
</style>