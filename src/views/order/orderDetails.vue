<template>
  <div class="container">
    <div>
      <el-steps
        :active="formatStepStatus(order.status)"
        finish-status="success"
        align-center
      >
        <el-step
          title="提交订单"
          :description="formatTime(order.createTime)"
        ></el-step>
        <el-step
          title="支付订单"
          :description="formatTime(order.paymentTime)"
        ></el-step>
        <el-step
          title="平台发货"
          :description="formatTime(order.deliveryTime)"
        ></el-step>
        <el-step
          title="确认收货"
          :description="formatTime(order.receiveTime)"
        ></el-step>
        <el-step
          title="完成评价"
          :description="formatTime(order.commentTime)"
        ></el-step>
      </el-steps>
    </div>
    <el-card shadow="never">
      <div class="operate-container">
        <span class="color_f56C6C">当前订单状态：{{order.status | formatOrderStatus}}</span>
        <div class="btn">
          <el-button
            size="mini"
            @click="orderTracking"
          >订单跟踪</el-button>
          <el-button
            size="mini"
            @click="sendMessage"
          >发送站内信</el-button>
          <el-button
            size="mini"
            @click="remarksOrder"
          >备注订单</el-button>
        </div>
      </div>
      <div class="info">
        <p>基本信息</p>
        <el-table
          :data="basicInformation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            prop="orderSn"
            label="订单编号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="发货单流水号"
          >
          </el-table-column>
          <el-table-column
            prop="memberUsername"
            label="用户账号"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="支付方式"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="订单来源"
          >
          </el-table-column>
          <el-table-column
            prop="deliveryCompany"
            label="配送方式"
          >
          </el-table-column>
          <el-table-column
            prop="deliverySn"
            label="物流单号"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="自动确认收货时间"
          >
          </el-table-column>
          <el-table-column
            prop="integration"
            label="订单可得优币"
          >
          </el-table-column>
          <el-table-column
            prop="growth"
            label="订单可得成长值"
          >
          </el-table-column>
          <el-table-column
            prop="promotionInfo"
            label="活动信息"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <p>收货信息</p>
        <el-table
          :data="deliveryInformation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            prop="receiverName"
            label="收货人"
          >
          </el-table-column>
          <el-table-column
            prop="receiverPhone"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="receiverPostCode"
            label="邮政编码"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="收货地址"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <p>商品信息</p>
        <el-table
          :data="ProductInformation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            prop="productPic"
            label="商品图片"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="价格/货号"
          >
          </el-table-column>
          <el-table-column
            prop="productAttr"
            label="属性"
          >
          </el-table-column>
          <el-table-column
            prop="productQuantity"
            label="数量"
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="小计"
          >
          </el-table-column>
          <div class="count">
            <!-- 合计：{{totalAmount}} -->
          </div>
        </el-table>
      </div>
      <div class="info">
        <p>费用信息</p>
        <el-table
          :data="feeInformation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            prop="totalAmount"
            label="商品合计"
          >
          </el-table-column>
          <el-table-column
            prop="freightAmount"
            label="运费"
          >
          </el-table-column>
          <el-table-column
            prop="couponAmount"
            label="优惠券"
          >
          </el-table-column>
          <el-table-column
            prop="integrationAmount"
            label="积分抵扣"
          >
          </el-table-column>
          <el-table-column
            prop="promotionAmount"
            label="活动优惠"
          >
          </el-table-column>
          <el-table-column
            prop="discountAmount"
            label="折扣金额"
          >
          </el-table-column>
          <el-table-column
            prop="totalAmount"
            label="订单总金额"
          >
          </el-table-column>
          <el-table-column
            prop="payAmount"
            label="应付款金额"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <p>操作信息</p>
        <el-table
          :data="operationalInformation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            prop="productPic"
            label="操作者"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作时间"
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="订单状态"
          >
          </el-table-column>
          <el-table-column
            prop="productAttr"
            label="付款状态"
          >
          </el-table-column>
          <el-table-column
            prop="productQuantity"
            label="发货状态"
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {},
      basicInformation: [],
      deliveryInformation: [],
      ProductInformation: [],
      feeInformation: [],
      operationalInformation: []
    };
  },
  mounted() {
    this.get_table_data();
  },
  methods: {
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    get_table_data() {},

    // 订单跟踪
    orderTracking() {
      this.$info("订单跟踪");
    },
    // 发送站内信
    sendMessage() {
      this.$info("发送站内信");
    },
    // 备注订单
    remarksOrder() {
      this.$info("备注订单");
    }
  }
};
</script>
<style  lang="less" scope>
.el-card {
  width: 1718px;
  margin: auto;
  .operate-container {
    height: 80px;
    line-height: 80px;
    background-color: #f2f6fc;
    margin: -20px -20px 0;
    text-align: left;
    padding-left: 15px;
    .btn {
      display: inline-block;
      margin-right: 100px;
      float: right;
    }
  }
  .info p {
    margin-top: 20px;
    line-height: 38px;
    text-align: left;
  }
}
</style>
