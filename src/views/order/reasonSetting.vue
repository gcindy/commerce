<template>
  <div class="container">
    <div class="demonstration">
      <i class="el-icon-document  "></i>
      <span>数据列表</span>
      <el-button size="small">添加</el-button>
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
        label="编号"
        width="50"
      >
      </el-table-column>
      <el-table-column label="原因类型">
      </el-table-column>
      <el-table-column label="排序">
      </el-table-column>
      <el-table-column label="是否可用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="添加时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="240"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="selectBulletBox(scope.row.brandId)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="selectBulletBox(scope.row.brandId)"
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
    <el-dialog
      title="查看信息"
      :visible.sync="lookDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="seleteForm"
        :inline="true"
        :model="seleteForm"
      >
        <el-form-item label="品牌编号">
          <el-input
            v-model="eobj.id"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌ID">
          <el-input
            v-model="eobj.brandId"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input
            v-model="eobj.brandName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="子标题">
          <el-input
            v-model="eobj.subTitle"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品类别名称">
          <el-input
            v-model="eobj.productCategoryName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="低库存">
          <el-input
            v-model="eobj.lowStock"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import filters from "../../js/filter";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        search: "",
        code: "",
        classification: [],
        brand: [],
        sStatus: [],
        aStatus: []
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
      value1: true,
      value2: true,
      value3: true,
      eid: "",
      eobj: {}, //接收表格返回的数据
      // 上架状态
      publishStatusOptions: [
        {
          value: 1,
          label: "上架"
        },
        {
          value: 0,
          label: "下架"
        }
      ],
      // 审核状态
      verifyStatusOptions: [
        {
          label: "审核通过"
        },
        {
          value: 0,
          label: "未审核"
        }
      ],
      lookDialogVisible: false,
      seleteForm: {
        id: null,
        brandId: null,
        brandName: null,
        subTitle: null,
        productCategoryName: null,
        lowStock: null
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
    // 跳转添加页面
    handler() {
      this.$router.push("/goods/addGoods");
    },
    // 获取列表数据
    get_table_data() {
      let self = this;
      self.$axios
        .get("product/list", {
          params: {
            pageSize: self.length, //每页大小
            pageNum: self.currentPage, //当前页码
            keyword: self.form.keyword, //商品名称模糊关键字
            productSn: self.form.productSn, //商品货号
            productCategoryId: self.form.productCategoryId, //商品分类编号
            brandId: self.form.brandId, //商品品牌编号
            publishStatus: self.form.publishStatus, //上架状态
            verifyStatus: self.form.verifyStatus //审核状态
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
      let self = this;
      this.eid = id;
      self.lookDialogVisible = true;
      self.$axios
        .get("/product/list", {
          params: {
            brandId: self.eid //商品品牌编号
          }
        })
        .then(function(res) {
          if (res.code === 200) {
            console.log(res);
            self.eobj = res.data.list;
            console.log("数据:" + self.eobj);
            console.log("id:" + self.eobj.id);
            console.log("商品编号:" + self.eobj.brandId);
            console.log("商品名称:" + self.eobj.brandName);
            console.log("子标题:" + self.eobj.subTitle);
            console.log("产品类别名称:" + self.eobj.productCategoryName);
            console.log("库存:" + self.eobj.lowStock);
          } else {
            Message.error("列表获取错误" + res.data.message);
          }
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