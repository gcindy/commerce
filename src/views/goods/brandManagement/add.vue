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
      <el-form-item
        label="品牌首字母："
        prop="firstLetter"
      >
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
      <el-form-item
        label="品牌故事："
        prop="brandStory"
      >
        <el-input v-model="form.brandStory"></el-input>
      </el-form-item>
      <el-form-item
        label="排序："
        prop="sort"
      >
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item
        label="是否显示："
        prop="showStatus"
      >
        <el-radio-group v-model="form.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="品牌制造商："
        prop="factoryStatus"
      >
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
        <el-button
          type="primary"
          @click="resetForm('form')"
        >重置</el-button>
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = {
            name: this.form.name,
            firstLetter: this.form.firstLetter,
            logo: this.form.logo,
            bigPic: this.form.bigPic,
            brandStory: this.form.brandStory,
            sort: this.form.sort,
            showStatus: this.form.showStatus,
            factoryStatus: this.form.factoryStatus
          };
          const self = this;
          this.$confirm("是否提交数据").then(() => {
            self.$axios
              .post("/brand/create", formData)
              .then(function(response) {
                console.log(response);
                const data = response.data;
                if (response.code === 200) {
                  self.$success("添加成功");
                } else {
                  self.$error("添加失败" + data.message);
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
