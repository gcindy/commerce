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
            v-model="form.keyword"
            placeholder="品牌名/关键字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getTableData">查询结果</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        label="品牌名称"
      >
      </el-table-column>
      <el-table-column
        prop="firstLetter"
        label="品牌首字母"
      >
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop="factoryStatus"
        label="品牌制造商"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.factoryStatus"
            active-color="#409eff"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="showStatus"
        label="是否显示"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            active-color="#409eff"
            inactive-color="#DCDFE6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="相关"
      >
        <template slot-scope="scope">
          <span>商品:</span>
          <el-button
            size="mini"
            type="text"
          >100
          </el-button>
          <span>评价:</span>
          <el-button
            size="mini"
            type="text"
          >1000
          </el-button>
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
export default {
  data() {
    return {
      tableData: [{}],
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
      form: {
        keyword: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    getTableData() {
      let self = this;
      self.$axios
        .get("brand/list", {
          params: {
            pageSize: self.length, //每页大小
            pageNum: self.currentPage, //当前页码
            keyword: self.form.keyword //商品名称模糊关键字
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.code === 200) {
            //把数据返回到tableData列表上
            self.tableData = res.data.list;
            self.pageCount = res.data.pageCount;
            self.total = res.data.total;
            self.load_data = false;
          } else {
            Message.error("列表获取错误" + res.data.message);
          }
        });
    },
    handleEdit(id) {
      this.$router.push("/goods/brandManagement/update?id=" + id);
    },
    handleAdd() {
      this.$router.push("/goods/brandManagement/add");
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