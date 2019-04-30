<template>

  <el-pagination
    background
    @current-change="handleCurrentChange"
    :current-page.sync="obj.pageNum"
    :page-size="obj.pageSize"
    layout="total,prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>

</template>
<script>
export default {
  data() {
    return {
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 5,
      obj: {
        pageSize: this.currentPage, //每页显示多少数据
        pageNum: this.length //当前页码
      }
    };
  },
  methods: {
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    }
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  }
};
</script>