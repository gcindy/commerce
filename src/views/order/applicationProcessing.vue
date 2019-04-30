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
        <el-form-item label="输入搜索：">
          <el-input
            v-model="form.id"
            placeholder="服务单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理状态：">
          <el-select
            v-model="form.status"
            placeholder="全部"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间：">
          <el-date-picker
            v-model="form.createTime"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作人员：">
          <el-input
            v-model="form.handleMan"
            placeholder="全部"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理时间：">
          <el-date-picker
            v-model="form.handleTime"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="get_table_data">查询结果</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="demonstration">
      <div class="list">
        <i class="el-icon-document"></i>
        <span>数据列表</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="服务单号"
      >
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatCreateTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户账号"
        prop="memberUsername"
      >
      </el-table-column>
      <el-table-column label="退款金额">
        <template slot-scope="scope">￥{{scope.row.productRealPrice}}</template>
      </el-table-column>
      <el-table-column label="申请状态">
        <template slot-scope="scope">
          {{scope.row.status | formatApplicationStatus}}
        </template>
      </el-table-column>
      <el-table-column label="处理时间">
        <template slot-scope="scope">
          {{scope.row.handleTime | formatCreateTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="240"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="selectBulletBox(scope.row.id)"
          >查看详情</el-button>
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
import date from "../../components/date";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        id: "",
        createTime: "",
        handleMan: "",
        handleTime: "",
        status: ""
      },
      tableData: [],
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 5,
      obj: {
        pageSize: this.currentPage, //每页显示多少数据
        pageNum: this.length //当前页码
      },
      options: [
        {
          label: "待处理",
          value: 0
        },
        {
          label: "退货中",
          value: 1
        },
        {
          label: "已完成",
          value: 2
        },
        {
          label: "已拒绝",
          value: 3
        }
      ]
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
    // 清空表单
    clear() {
      this.form = {
        id: "",
        createTime: "",
        handleMan: "",
        handleTime: "",
        status: ""
      };
    },
    // 获取列表数据
    get_table_data() {
      let self = this;
      self.$axios
        .get("returnApply/list", {
          params: {
            pageSize: self.length, //每页大小
            pageNum: self.currentPage, //当前页码
            id: self.form.id,
            status: self.form.status,
            createTime: self.form.createTime,
            handleMan: self.form.handleMan,
            handleTime: self.form.handleTime
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
            Message.error("列表获取错误" + res.data.message);
          }
        });
    },
    // 查看
    selectBulletBox(id) {
      this.$router.push({
        path: "/order/returnApplyDetail?id=" + id
      });
    },
    // 修改
    edit() {
      this.$confirm("此操作将永久修改该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 删除
    deletes() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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