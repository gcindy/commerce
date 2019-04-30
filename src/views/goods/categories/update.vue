<template>
  <div class="update">
    <el-form
      ref="form"
      :model="form"
      status-icon
      label-width="100px"
      :rules="rules"
    >
      <el-form-item
        label="分类名称："
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select
          v-model="form.parentId"
          placeholder="请选择上级分类"
        >
          <!-- :label  后端返回的选择项 -->
          <el-option
            v-for="item in classification"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位数量：">
        <el-input v-model="form.productUnit"></el-input>
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
      <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="form.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="分类图标："
        prop="icon"
      >
        <upload></upload>
      </el-form-item>
      <el-form-item label="筛选属性：">
        <el-cascader
          :change-on-select="true"
          :props="defaultParams"
          :options="attributes"
          v-model="selectedOptions"
          :clearable="true"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="form.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input
          type="textarea"
          v-model="form.description"
        ></el-input>
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
      attributes: [],
      selectedOptions: [],
      defaultParams: {
        label: "name",
        value: "id",
        children: "productAttributeList"
      },
      form: {
        name: "",
        productUnit: "",
        sort: "",
        delivery: "",
        keywords: "",
        description: "",
        parentId: 0,
        selectedOptions: [],
        navStatus: "",
        showStatus: ""
      },
      classification: [], //获取上级分类
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.singleQuery();
    this.getParentData();
    this.getAttributes();
  },
  methods: {
    // 获取下拉框数据
    getParentData() {
      const self = this;
      self.$axios
        .get("productCategory/list/" + 0, {
          params: {
            pageNum: 1, //当前页码
            pageSize: 100 //每页大小
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.code === 200) {
            const data = response.data;
            const array = [];
            self.classification = data.list;
            self.classification.unshift({ id: 0, name: "无上级分类" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取单条数据
    singleQuery() {
      let id = this.$route.query.id;
      const self = this;
      self.$axios
        .get("/productCategory/" + id)
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
    // 获取筛选属性
    getAttributes() {
      const self = this;
      self.$axios
        .get("productAttribute/category/list/withAttr")
        .then(function(response) {
          console.log(response);
          const data = response.data;
          if (response.code === 200) {
            self.attributes = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$route.query.id;
          const self = this;
          this.$confirm("确认修改吗?").then(() => {
            self.$axios
              .post("productCategory/update/" + id)
              .then(function(response) {
                console.log(response);
                const data = response.data;
                if (response.code === 200) {
                  self.attributes = data;
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
