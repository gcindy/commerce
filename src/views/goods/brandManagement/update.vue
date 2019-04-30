<template>
  <div class="update">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      label-width="100px"
    >
      <el-form-item
        label="品牌字母："
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌首字母：">
        <el-input v-model="form.firstLetter"></el-input>
      </el-form-item>
      <el-form-item
        label="品牌LOGO："
        prop="logo"
      >
        <upload v-model="form.logo"></upload>
      </el-form-item>
      <el-form-item
        label="品牌专区大图："
        prop="bigPic"
      >
        <upload v-model="form.bigPic"></upload>
      </el-form-item>
      <el-form-item label="品牌故事：">
        <el-input v-model="form.brandStory"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="form.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="品牌制造商：">
        <el-radio-group v-model="form.factoryStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from "../../../components/upload";
export default {
  data() {
    return {
      form: {
        name: "",
        firstLetter: "",
        logo: "",
        bigPic: "",
        brandStory: "",
        sort: "",
        showStatus: "",
        factoryStatus: ""
      },
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        logo: [{ required: true, message: "请上传品牌logo", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let id = this.$route.query.id;
      const self = this;
      self.$axios
        .get("/brand/" + id)
        .then(function(response) {
          if (response.code === 200) {
            const data = response.data;
            self.form = data;
          }
        })
        .catch(function(error) {
          console.log(error);
          self.$message.error(error.response.message); //失败信息
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$route.query.id;
          const formData = {
            bigPic: this.form.bigPic,
            brandStory: this.form.brandStory,
            factoryStatus: this.form.factoryStatus,
            firstLetter: this.form.firstLetter,
            logo: this.form.logo,
            name: this.form.name,
            showStatus: this.form.showStatus,
            sort: this.form.sort
          };
          const self = this;
          this.$confirm("确认修改吗?").then(() => {
            self.$axios
              .post("brand/update/" + id, formData)
              .then(function(response) {
                console.log(response);
                const data = response.data;
                if (response.code === 200) {
                  self.$success("修改成功");
                } else {
                  self.$error("修改失败");
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        } else {
          this.$error("验证失败");
          return false;
        }
      });
    }
  },
  components: {
    upload
  }
};
</script>

<style lang="less">
.update {
  width: 600px;
  margin: auto;
  border: 1px solid #ebeef5;
  padding: 50px;
  .el-input,
  .el-textarea {
    width: 416px;
  }
}
</style>
