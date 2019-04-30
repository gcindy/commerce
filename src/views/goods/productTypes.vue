<template>
  <div class="container">
    <div class="demonstration">
      <i class="el-icon-document"></i>
      <span>数据列表</span>
      <el-button
        size="small"
        @click="dialogVisible = true"
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
        label="类型名称"
      >
      </el-table-column>
      <el-table-column
        prop="attributeCount"
        label="属性数量"
      >
      </el-table-column>
      <el-table-column
        prop="paramCount"
        label="参数数量"
      >
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getAttributeList"
          >属性列表</el-button>
          <el-button
            size="mini"
            @click="getParameterList"
          >参数列表</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editInfo(scope.row.id)"
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

    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        status-icon
        :rules="rules"
      >
        <el-form-item
          label="类型名称"
          prop="name"
        >
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addInfo('addForm')"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
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
      dialogVisible: false,
      addForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "类型名称不能为空", trigger: "blur" }]
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
        .get("/productAttribute/category/list", {
          params: {
            pageSize: self.length, //每页大小
            pageNum: self.currentPage //当前页码
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
    // 属性列表
    getAttributeList() {
      this.$info("这是属性列表");
    },
    // 参数列表
    getParameterList() {
      this.$info("这是参数列表");
    },
    // 添加
    addInfo(formName) {
      // return false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const self = this;
          this.$confirm("是否提交数据").then(() => {
            self.$axios
              .post("productCategory/create", {
                name: self.addForm.name
              })
              .then(function(response) {
                console.log(response);
                const data = response.data;
                if (response.code === 200) {
                  self.$success("添加成功");
                } else {
                  self.$error("添加失败" + data.message);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          });
        } else {
          this.$error("验证失败");
          return false;
        }
      });
    },
    // 修改
    editInfo(id) {
      const self = this;
      self.$confirm("确认修改吗?").then(() => {
        self.$axios
          .post("productAttribute/category/update/" + id, {
            name: self.name
          })
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
    },
    // 删除
    deleteInfo(id) {
      const self = this;
      self.$confirm("确认删除该条信息吗?").then(() => {
        self.$axios
          .get("productAttribute/category/delete/" + id)
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