<template>
  <div class="show">
    <el-card
      class="box-card"
      shadow="never"
    >
      <p>退货商品</p>
      <el-table
        :data="shopData"
        border
      >
        <el-table-column
          prop="date"
          label="商品图片"
        >
          <template slot-scope="scope">
            <img
              style="height: 80px"
              :src="scope.row.productPic"
            ></template>
        </el-table-column>
        <el-table-column
          prop="productBrand"
          label="商品名称"
        >
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
            <p>品牌：{{scope.row.productBrand}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号">
          <template slot-scope="scope">
            <p>价格:￥{{scope.row.productRealPrice}}</p>
            <p>货号:NO.{{scope.row.productId}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productAttr"
          label="属性"
        >
        </el-table-column>
        <el-table-column
          prop="productCount"
          label="数量"
        >
        </el-table-column>
        <el-table-column
          prop="productRealPrice"
          label="小计"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="never">
      <p>服务单信息</p>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="服务单号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-button
            type="text"
            @click="select"
          >查看</el-button>
          <el-input v-model="form.orderSn"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input v-model="form.createTime">
            <!-- <p>{{createTime}}</p> -->
          </el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="form.memberUsername"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.returnName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.returnPhone"></el-input>
        </el-form-item>
        <el-form-item label="退货原因">
          <el-input v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="凭证图片">
          <template slot-scope="scope">
            <img :src="scope.row.productPic">
          </template>
        </el-form-item> -->
        <el-form-item label="订单金额">
          <el-input v-model="form.productRealPrice"></el-input>
        </el-form-item>
        <el-form-item label="确认退款金额">
          <el-input v-model="form.productRealPrice"></el-input>
        </el-form-item>
        <el-form-item label="处理人员">
          <el-input v-model="form.handleMan"></el-input>
        </el-form-item>
        <el-form-item label="处理时间">
          <el-input v-model="form.handleTime"></el-input>
        </el-form-item>
        <el-form-item label="处理备注">
          <el-input v-model="form.handleNote"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
const defaultOrderReturnApply = {
  id: null,
  orderId: null,
  companyAddressId: null,
  productId: null,
  orderSn: null,
  createTime: null,
  memberUsername: null,
  returnAmount: null,
  returnName: null,
  returnPhone: null,
  status: null,
  handleTime: null,
  productPic: null,
  productName: null,
  productBrand: null,
  productAttr: null,
  productCount: null,
  productPrice: null,
  productRealPrice: null,
  reason: null,
  description: null,
  proofPics: null,
  handleNote: null,
  handleMan: null,
  receiveMan: null,
  receiveTime: null,
  receiveNote: null
};
export default {
  data() {
    return {
      shopData: null,
      info: [],
      form: {
        id: "",
        status: "",
        orderSn: "",
        createTime: "",
        memberUsername: "",
        returnName: "",
        returnPhone: "",
        reason: "",
        description: "",
        productRealPrice: "",
        handleMan: "",
        handleTime: "",
        handleNote: ""
      },
      id: null
    };
  },
  mounted() {
    this.get_table_data();
    this.id = this.$route.query.id;
  },
  methods: {
    get_table_data() {
      let id = this.$route.query.id;
      let self = this;
      self.$axios.get("returnApply/" + id).then(function(res) {
        console.log(res);
        const data = res.data;
        if (res.code === 200) {
          // self.$success(res.message);
          //把数据返回到tableData列表上
          self.shopData = [];
          self.shopData.push(data);
          self.form = data;
        } else {
          Message.error("列表获取错误" + res.message);
        }
      });
    },
    select() {
      this.$router.push({
        path: "/order/orderDetails",
        query: { id: this.form.orderId }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-card {
  width: 900px;
  margin: 50px auto;
  border: 1px solid #ebeef5;
  color: #303133;
  transition: 0.3s;
  p {
    text-align: left;
    margin-bottom: 20px;
  }
  .el-input {
    width: 480px;
  }
}
</style>