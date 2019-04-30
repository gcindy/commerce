export default {
  data() {
    return {
      visibleSearch: false,
      input: '',
      isAdd: true,
      stockTypeList: [],
      // //当前页码
      // currentPage: 1,
      // //数据总条目
      // total: 0,
      // //每页显示多少条数据
      // length: 5,
      // obj: {
      //   pageSize: this.currentPage, //每页显示多少数据
      //   pageNum: this.length //当前页码
      // },
    }
  },
  methods: {
    // dialog关闭按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    get_table_data() {
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.$axios.get(url, Object.assign(param, params))
        .then(function (res) {
          console.log(res);
          if (res.data === 200) {
            this.tableData = res.data.list;
            this.pageCount = res.data.pageCount;
            this.total = res.data.total;
          } else {
            this.$error("列表获取错误" + res.data.message);
          }
        }
        )
    },
    //返回上个页面
    back() {
      this.$router.go(-1);
    },
    // 时间选择器change时间
    handleDate(val) {
      if (val) {
        this.beginTime = val[0];
        this.endTime = val[1];
        this.getList();
      } else {
        this.beginTime = '';
        this.endTime = '';
        this.getList();
      }
    },
    // 批量处理
    confirmBatch(val) {
      if (val && this.checkItemId.length > 0) {
        if (val == 'delete') {
          this.remove(this.checkItemId);
        } else if (val == 'shift') {
          this.shiftItem(this.checkItemId);
        } else if (val == 'restore') {
          this.restore(this.checkItemId);
        } else if (val == 'show') {
          this.batchShow(this.checkItemId, 1);
        } else if (val == 'hide') {
          this.batchShow(this.checkItemId, 0);
        } else if (val == 'close') {
          this.closeItem(this.checkItemId);
        }
      } else {
        this.$msgWar("未选择操作项");
      }
    },
    // 全选change事件
    handleChangeAll(val) {
      if (val) {
        this.$refs.table.toggleAllSelection();
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
