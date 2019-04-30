<template>
  <div class="container">
    <product-detail :is-edit='false'></product-detail>
  </div>
</template>
<script>
import productDetail from "./components/ProductDetail";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: { productDetail }
};
</script>
<style lang="less">
.el-col .el-card {
  width: 800px;
  margin: 20px auto;
}
</style>