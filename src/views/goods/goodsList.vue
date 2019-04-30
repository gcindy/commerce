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
          <el-input v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item label="商品货号：">
          <el-input v-model="form.productSn"></el-input>
        </el-form-item>
        <el-form-item label="商品分类：">
          <el-select
            v-model="form.classification"
            placeholder="请选择商品分类"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品品牌：">
          <el-select
            v-model="form.brand"
            placeholder="请选择商品品牌"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态：">
          <el-select
            v-model="form.publishStatus"
            placeholder="请选择上架状态"
          >
            <el-option
              v-for="item in publishStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select
            v-model="form.verifyStatus"
            placeholder="请选择审核状态"
          >
            <el-option
              v-for="item in verifyStatusOptions"
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
      <i class="el-icon-document"></i>
      <span>数据列表</span>
      <el-button size="small">添加商品</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
      v-loading="load_data"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
      ></el-table-column>
      <el-table-column
        label="数量"
        type="index"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="50"
      >
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            style="height: 80px"
            :src="scope.row.pic"
          ></template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="480"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
          <p>品牌:{{ scope.row.brandName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="价格/货号">
        <template slot-scope="scope">
          <p> 价格:{{scope.row.price}}</p>
          <p> 货号:{{scope.row.productSn}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="标签"
      >
        <template slot-scope="scope">
          <p>
            <el-switch
              v-model="scope.row.value1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="上架:"
            >
            </el-switch>
          </p>
          <p>
            <el-switch
              v-model="scope.row.value2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="新品:"
            >
            </el-switch>
          </p>
          <p>
            <el-switch
              v-model="scope.row.value3"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="推荐:"
            >
            </el-switch>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="SKU库存"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="clickStock(scope.row.brandId)"
          ></el-button>
          <!-- <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="clickStock()"
          ></el-button> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="sale"
        label="销量"
      >
      </el-table-column>
      <el-table-column
        prop="verifyStatus"
        label="审核状态"
      >
        <template slot-scope="scope">
          {{ scope.row.verifyStatus | verifyStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="240"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="selectBulletBox(scope.row.brandId)"
          >查看</el-button>
          <el-button
            size="mini"
            @click="edit"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deletes"
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
      //请求时的loading效果
      load_data: true,
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
            self.load_data = false;
          } else {
            Message.error("列表获取错误" + res.data.message);
          }
        });
    },
    //sku库存
    clickStock() {
      this.$message({
        showClose: true,
        message: "这是sku库存哦",
        type: "warning"
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
          // let self = this;
          // console.log(id);
          // self.$axios
          //   .post(self.$config.base + "/sys/role/delete", { roleId: id })
          //   .then(function(response) {
          //     console.log(response);
          //     self.$message({
          //       type: "success",
          //       message: "删除成功!"
          //     });
          //     self.get_table_data();
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //     self.$message.error("删除失败");
          //   });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
          // let self = this;
          // console.log(id);
          // self.$axios
          //   .post("/product/update/deleteStatus", { ids: id, deleteStatus: 1 })
          //   .then(function(response) {
          //     console.log(response);
          //     self.$message({
          //       type: "success",
          //       message: "删除成功!"
          //     });
          //     self.get_table_data();
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //     self.$message.error("删除失败");
          //   });
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