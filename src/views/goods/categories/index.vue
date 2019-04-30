<template>
  <div class="container">
    <div class="demonstration">
      <i class="el-icon-document"></i>
      <span>数据列表</span>
      <el-button
        size="small"
        @click="handleAdd"
      >添加商品</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
    >
      <el-table-column
        prop="id"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="级别"
      >
      </el-table-column>
      <el-table-column
        prop="productCount"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="productUnit"
        label="数量单位"
      >
      </el-table-column>
      <el-table-column
        prop="sort"
        label="导航栏"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.navStatus"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="是否显示"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        label="设置"
        width="220"
      >
        <template slot-scope="scope">
          <el-button size="mini">查看下级</el-button>
          <el-button size="mini">转移商品</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteInfo(scope.row.id)"
          >删除</el-button>
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
import { Message } from "element-ui";
export default {
  data() {
    return {
      // 当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 5,
      obj: {
        pageSize: this.currentPage, //每页显示多少数据
        pageNum: this.length //当前页码
      },
      tableData: [{}],
      value1: true,
      value2: true,

      parentId: 0
    };
  },
  mounted() {
    this.get_table_data();
    this.resetParentId();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    handleAdd() {
      this.$router.push("/goods/categories/add");
    },
    handleEdit(id) {
      this.$router.push("/goods/categories/update?id=" + id);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    resetParentId() {
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    get_table_data() {
      const self = this;
      self.$axios
        .get("productCategory/list/" + this.parentId, {
          params: {
            pageNum: self.currentPage, //当前页码
            pageSize: self.length //每页大小
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
    deleteInfo(id) {
      const self = this;
      this.$confirm("确认删除吗?").then(() => {
        this.$axios.post("/productCategory/delete/" + id).then(
          () => {
            self.$success("删除成功");
            self.get_table_data();
          },
          err => {
            self.$error("删除失败" + res.data.message);
          }
        );
      });
    }
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