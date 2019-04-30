<template>
  <div class="container">
    <div class="data">
      <div class="total_mall">
        <p class="mall_title">今日订单总数</p>
        <p class="mall_content">
          <svg-icon
            icon-class="order"
            class="total-icon"
          >
          </svg-icon>
          200
        </p>
      </div>
      <div class="total_mall">
        <p class="mall_title">今日销售总额</p>
        <p class="mall_content">
          <svg-icon
            icon-class="total-today"
            class="total-icon"
          > </svg-icon>

          5000.00
        </p>
      </div>
      <div class="total_mall">
        <p class="mall_title">昨日销售总额</p>
        <p class="mall_content">
          <svg-icon
            icon-class="total-yesterday"
            class="total-icon"
          >
          </svg-icon>
          5000.00
        </p>
      </div>
      <div class="total_mall">
        <p class="mall_title">近7天销售总额</p>
        <p class="mall_content">
          <svg-icon
            icon-class="total-week"
            class="total-icon"
          >
          </svg-icon>
          50000.00
        </p>
      </div>
    </div>
    <div class="pendingTransaction border_d3dfe6 mt_20">
      <div class="title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span
                style="float: right"
                class="color_f56C6C"
              >(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview flex mt_20">
      <div class="productOverview border_d3dfe6 flex-1">
        <div class="title ">商品总览</div>
        <div style="padding: 40px">
          <el-row>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >100</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >400</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >50</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >500</el-col>
          </el-row>
          <el-row class="font-medium">
            <el-col
              :span="6"
              class="overview-item-title"
            >已下架</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >已上架</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >库存紧张</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >全部商品</el-col>
          </el-row>
        </div>
      </div>
      <div class="userOverview border_d3dfe6 flex-1">
        <div class="title">用户总览</div>
        <div style="padding: 40px">
          <el-row>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >100</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >200</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >1000</el-col>
            <el-col
              :span="6"
              class="color_f56C6C overview-item-value"
            >5000</el-col>
          </el-row>
          <el-row class="font-medium">
            <el-col
              :span="6"
              class="overview-item-title"
            >今日新增</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >昨日新增</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >本月新增</el-col>
            <el-col
              :span="6"
              class="overview-item-title"
            >会员总数</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="orderStatistics border_d3dfe6 mt_20">
      <div class="title">订单统计</div>
      <div
        class="over-hidden"
        style="padding: 10px;border-left:1px solid #DCDFE6"
      >
        <el-date-picker
          style="float: right;z-index: 1"
          size="small"
          v-model="orderCountDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleDateChange"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <!-- <div>
          <ve-line
            :data="chartData"
            :legend-visible="false"
            :data-empty="dataEmpty"
            :settings="chartSettings"
          ></ve-line>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { str2Date } from "@/js/date";
const DATA_FROM_BACKEND = {
  columns: ["date", "orderCount", "orderAmount"],
  rows: [
    { date: "2018-11-01", orderCount: 10, orderAmount: 1093 },
    { date: "2018-11-02", orderCount: 20, orderAmount: 2230 },
    { date: "2018-11-03", orderCount: 33, orderAmount: 3623 },
    { date: "2018-11-04", orderCount: 50, orderAmount: 6423 },
    { date: "2018-11-05", orderCount: 80, orderAmount: 8492 },
    { date: "2018-11-06", orderCount: 60, orderAmount: 6293 },
    { date: "2018-11-07", orderCount: 20, orderAmount: 2293 },
    { date: "2018-11-08", orderCount: 60, orderAmount: 6293 },
    { date: "2018-11-09", orderCount: 50, orderAmount: 5293 },
    { date: "2018-11-10", orderCount: 30, orderAmount: 3293 },
    { date: "2018-11-11", orderCount: 20, orderAmount: 2293 },
    { date: "2018-11-12", orderCount: 80, orderAmount: 8293 },
    { date: "2018-11-13", orderCount: 100, orderAmount: 10293 },
    { date: "2018-11-14", orderCount: 10, orderAmount: 1293 },
    { date: "2018-11-15", orderCount: 40, orderAmount: 4293 }
  ]
};
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一月",
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      chartData: {
        columns: [],
        rows: []
      },
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["orderAmount"] },
        labelMap: { orderCount: "订单数量", orderAmount: "订单金额" }
      },
      dataEmpty: false,
      orderCountDate: ""
    };
  },
  created() {
    this.initOrderCountDate();
    this.getData();
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ["date", "orderCount", "orderAmount"],
          rows: []
        };
        for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
          let item = DATA_FROM_BACKEND.rows[i];
          let currDate = str2Date(item.date);
          let start = this.orderCountDate[0];
          let end = this.orderCountDate[1];
          if (
            currDate.getTime() >= start.getTime() &&
            currDate.getTime() <= end.getTime()
          ) {
            this.chartData.rows.push(item);
          }
        }
        this.dataEmpty = false;
        this.loading = false;
      }, 1000);
    },
    initOrderCountDate() {
      let start = new Date();
      start.setFullYear(2018);
      start.setMonth(10);
      start.setDate(1);
      const end = new Date();
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    handleDateChange() {
      this.getData();
    }
  }
};
</script>
<style lang="less">
.data {
  display: flex;
  .total-icon {
    color: #409eff;
    padding-right: 10px;
  }
  .total_mall {
    width: 346px;
    height: 100px;
    border: 1px solid #d3dfe6;
    margin-left: 45px;
    margin-right: 22px;
    padding: 24px;
    box-sizing: border-box;
    line-height: 30px;
    .mall_title {
      color: #909398;
    }
    .mall_content {
      color: #606266;
    }
  }
}
.title {
  text-align: left;
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: 700;
}
.un-handle-content {
  line-height: 30px;
}
</style>
