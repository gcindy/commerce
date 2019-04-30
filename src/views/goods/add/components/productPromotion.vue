<template>
  <div class="containers">
    <el-form
      ref="form"
      :model="form"
      class="demo-ruleForm"
      label-width="120px"
    >
      <el-form-item label="赠送积分：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="赠送成长值：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="积分购买限制：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="预告商品：">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <el-switch
          v-model="form.delivery"
          active-text="新品"
        >
        </el-switch>
        <el-switch
          v-model="form.delivery"
          active-text="推荐"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="服务保证：">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="无忧退换"></el-checkbox>
          <el-checkbox label="快速退货"></el-checkbox>
          <el-checkbox label="免费包邮"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详细页标题：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="详细页描述：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品备注：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="选择优惠方式：">
        <el-input
          type="textarea"
          v-model="form.desc"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handlePrev"
        >上一步,填写商品信息</el-button>
        <!-- <el-button>下一步,选择商品关联</el-button> -->
        <el-button
          type="primary"
          size="medium"
          @click="handleNext('productAttribute')"
        >下一步,填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        checkList: []
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleNext(formName) {
      this.$emit("nextStep");
    },
    handlePrev() {
      this.$emit("prevStep");
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding-top: 50px;
  .el-textarea {
    width: 490px;
  }
}
</style>
