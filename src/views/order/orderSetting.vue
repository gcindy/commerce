<template>
  <div class="setting">
    <el-form
      ref="productPromotion"
      :model="form"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="订单秒杀价超过:"
        prop="pass"
      >
        <el-input
          placeholder="请输入内容"
          v-model="form.flashOrderOvertime"
        >
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="正常订单超过:">
        <el-input
          placeholder="请输入内容"
          v-model="form.normalOrderOvertime"
        >
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过:">
        <el-input
          placeholder="请输入内容"
          v-model="form.confirmOvertime"
        >
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过:">
        <el-input
          placeholder="请输入内容"
          v-model="form.finishOvertime"
          class="ml_41"
        >
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过:">
        <el-input
          placeholder="请输入内容"
          v-model="form.commentOvertime"
          class="ml_54"
        >
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        flashOrderOvertime: "",
        confirmOvertime: "",
        finishOvertime: "",
        flashOrderOvertime: "",
        normalOrderOvertime: ""
      }
    };
  },
  mounted() {
    this.get_table_data();
  },
  methods: {
    get_table_data() {
      const self = this;
      this.$axios
        .get("orderSetting/" + 1)
        .then(function(response) {
          console.log(response);
          const data = response.data;
          if (response.code === 200) {
            self.$success("成功");
            self.form = data;
          } else {
            self.$error("失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less">
.setting {
  width: 800px;
  margin: auto;
  border: 1px solid #ebeef5;
  .el-form {
    padding: 50px;
    .el-input {
      width: 290px;
    }
    .note-margin {
      margin-left: 15px;
    }
  }
}
</style>
