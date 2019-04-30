<template>
  <div class="container">
    <div class="form">
      <div class="p">
        <i class="el-icon-search padding_30"></i>
        搜索结果
      </div>
      <el-form
        ref="form"
        :model="form"
        :inline="true"
      >
        <el-form-item
          label="输入搜索："
          prop="keyword"
        >
          <el-input
            v-model="form.keyword"
            placeholder="订单编号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收货人："
          prop="receiverKeyword"
        >
          <el-input v-model="form.receiverKeyword"></el-input>
        </el-form-item>
        <el-form-item
          label="提交时间："
          prop="createTime"
        >
          <date v-model="form.createTime"></date>
        </el-form-item>
        <el-form-item
          label="订单状态："
          prop="status"
        >
          <el-select
            v-model="form.status"
            placeholder="请选择订单状态"
          >
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="订单分类："
          prop="orderType"
        >
          <el-select
            v-model="form.orderType"
            placeholder="请选择订单分类"
          >
            <el-option
              v-for="item in classification"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="订单来源："
          prop="sourceType"
        >
          <el-select
            v-model="form.sourceType"
            placeholder="请选择订单来源"
          >
            <el-option
              v-for="item in orderSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="get_table_data">查询结果</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="demonstration">
      <i class="el-icon-document padding_30"></i>
      <span>数据列表</span>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
    >
      <el-table-column
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="orderSn"
        label="订单编号"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
      >
        <template slot-scope="scope">
          {{scope.row.createTime | formatCreateTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="memberUsername"
        label="用户账号"
      >
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="订单金额"
      >
      </el-table-column>
      <el-table-column
        label="订单来源"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.sourceType | formatSourceType}}
        </template>
      </el-table-column>
      <el-table-column
        prop="payType"
        label="支付方式"
      >
        <template slot-scope="scope">
          {{scope.row.payType | formatPayType}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
      >
        <template slot-scope="scope">
          {{scope.row.status | formatOrderStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="selectOrder"
          >查看订单</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteOrder(scope.row.id)"
          >删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="obj.pageNum"
      :page-size="obj.pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import filters from "../../js/filter";
import { Message } from "element-ui";
import date from "../../components/date";
export default {
  data() {
    return {
      form: {
        keyword: "",
        receiverKeyword: "",
        createTime: [],
        status: [],
        orderType: [],
        sourceType: []
      },
      // 获取订单状态
      orderStatus: [
        {
          label: "待付款",
          value: 0
        },
        {
          label: "待发货",
          value: 1
        },
        {
          label: "已发货",
          value: 2
        },
        {
          label: "已完成",
          value: 3
        },
        {
          label: "已关闭",
          value: 4
        }
      ],
      // 获取订单分类
      classification: [
        {
          label: "正常订单",
          value: 0
        },
        {
          label: "秒杀订单",
          value: 1
        }
      ],
      // 获取订单来源
      orderSource: [
        {
          label: "PC订单",
          value: 0
        },
        {
          label: "APP订单",
          value: 1
        }
      ],
      tableData: [{}],
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      obj: {
        pageSize: this.currentPage, //每页显示多少数据
        pageNum: this.length //当前页码
      }
    };
  },
  mounted() {
    this.get_table_data();
  },
  methods: {
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    // 获取列表数据
    get_table_data() {
      let self = this;
      self.$axios
        .get("order/list", {
          params: {
            pageSize: self.length, //每页大小
            pageNum: self.currentPage, //当前页码
            keyword: self.form.keyword,
            receiverKeyword: self.form.receiverKeyword,
            createTime: self.form.createTime,
            status: self.form.status,
            orderType: self.form.orderType,
            sourceType: self.form.sourceType
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.code === 200) {
            //把数据返回到tableData列表上
            self.tableData = res.data.list;
            self.pageCount = res.data.pageCount;
            self.total = res.data.total;
          } else {
            self.$error("列表获取错误" + res.data.message);
          }
        });
    },
    selectOrder() {
      this.$info("查看单条订单");
    },
    deleteOrder(id) {
      const self = this;
      this.$confirm("确认删除吗?").then(() => {
        this.$axios
          .post("order/delete?ids=" + id)
          .then(function(response) {
            console.log(response);
            const data = response.data;
            if (response.code === 200) {
              self.$success("成功");
            } else {
              self.$error("失败");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  },
  components: {
    date
  }
};
</script>
<style lang="less">
.form {
  border: 1px solid #ebeef5;
  text-align: left;
  padding-left: 30px;
  .p {
    padding: 10px 0;
    box-sizing: border-box;
    .btn {
      display: inline-block;
      margin: 0 0 10px 601px;
    }
  }
  .el-select {
    width: 208px;
  }
  .el-form--inline .el-form-item {
    margin-right: 107px;
  }
}
.el-table td,
.el-table th {
  text-align: center;
}

.el-switch__label.is-active {
  color: #303133;
}
</style>