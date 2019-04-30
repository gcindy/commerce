<template>
  <div class="left-side">
    <div class="left-side-inner">
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index"
        >
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path"
          >
            <i
              class="icon fa"
              :class="item.icon"
            ></i>
            <span
              v-text="item.title"
              class="text"
            ></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else
          >
            <template slot="title">
              <i
                class="icon fa"
                :class="item.icon"
              ></i>
              <span
                v-text="item.title"
                class="text"
              ></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index"
            >
              <span
                v-text="sub_item.title"
                class="text"
              ></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "slide",
  data() {
    return {
      nav_menu_data: [
        {
          title: "主页",
          path: "/home",
          icon: "home"
        },
        {
          title: "商品",
          path: "/goods/goodsList",
          icon: "product",
          child: [
            {
              title: "商品列表",
              path: "/goods/goodsList",
              icon: "product-list"
            },
            {
              title: "添加商品",
              path: "/goods/addGoods",
              icon: "product-add"
            },
            {
              title: "商品分类",
              path: "/goods/categories"
            },
            {
              title: "商品类型",
              path: "/goods/productTypes"
            },
            {
              title: "品牌管理",
              path: "/goods/brandManagement"
            }
          ]
        },
        {
          title: "订单",
          path: "/order/orderList",
          child: [
            {
              title: "订单列表",
              path: "/order/orderList"
            },
            {
              title: "订单设置",
              path: "/order/orderSetting"
            },
            {
              title: "退货申请处理",
              path: "/order/applicationProcessing"
            },
            {
              title: "退货原因设置",
              path: "/order/reasonSetting"
            }
          ]
        },
        {
          title: "运营",
          path: "/operation/spikeActivityList",
          child: [
            {
              title: "秒杀活动列表",
              path: "/operation/spikeActivityList"
            },
            {
              title: "优惠券列表",
              path: "/operation/couponList"
            },
            {
              title: "品牌推荐",
              path: "/operation/brandRecommendation"
            },
            {
              title: "新品推荐",
              path: "/operation/newProducts"
            },
            {
              title: "人气推荐",
              path: "/operation/popularRecommendation"
            },
            {
              title: "专题推荐",
              path: "/operation/recommendedTopics"
            },
            {
              title: "广告推荐",
              path: "/operation/advertisingRecommendation"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.left-side {
  transition: width 0.28s;
  width: 180px !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: #304156;
  .left-side-inner {
    width: 182px;
  }
}
</style>
