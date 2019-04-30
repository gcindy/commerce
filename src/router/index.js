import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "../views/layOut";

export const constantRouterMap = [
  {
    path: "/",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/layOut",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home"),
        meta: { title: "首页", icon: "home" }
      }
    ]
  },
  // 商品
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/goodsList",
    meta: { title: "商品", icon: "product" },
    children: [
      {
        path: "/goods/goodsList",
        component: resolve => {
          require(["@/views/goods/goodsList"], resolve);
        },
        meta: { title: "商品列表" }
      },
      {
        path: "/goods/addGoods",
        name: "addGoods",
        component: resolve => {
          require(["@/views/goods/add/index"], resolve);
        },
        meta: { title: "添加商品" }
      },
      {
        path: "/goods/brandManagement",
        name: "brandManagement",
        component: resolve => {
          require(["@/views/goods/brandManagement/index"], resolve);
        },
        meta: { title: "品牌管理" }
      },
      {
        path: "/goods/brandManagement/update",
        name: "bmEdit",
        component: resolve => {
          require(["@/views/goods/brandManagement/update"], resolve);
        },
        meta: { title: "品牌管理/修改" }
      },
      {
        path: "/goods/brandManagement/add",
        name: "bmAdd",
        component: resolve => {
          require(["@/views/goods/brandManagement/add"], resolve);
        },
        meta: { title: "品牌管理/添加" }
      },
      {
        path: "/goods/categories",
        name: "categories",
        component: resolve => {
          require(["@/views/goods/categories/index"], resolve);
        },
        meta: { title: "商品分类" }
      },
      {
        path: "/goods/categories/update",
        name: "categoriesEdit",
        component: resolve => {
          require(["@/views/goods/categories/update"], resolve);
        },
        meta: { title: "商品分类/修改" }
      },
      {
        path: "/goods/categories/add",
        name: "categoriesAdd",
        component: resolve => {
          require(["@/views/goods/categories/add"], resolve);
        },
        meta: { title: "商品分类/添加" }
      },
      {
        path: "/goods/productTypes",
        name: "productTypes",
        component: resolve => {
          require(["@/views/goods/productTypes"], resolve);
        },
        meta: { title: "商品类型" }
      }
    ]
  },
  // 订单
  {
    path: "/order",
    component: Layout,
    redirect: "/order/orderList",
    meta: { title: "商品", icon: "product" },
    children: [
      {
        path: "/order/orderList",
        component: resolve => {
          require(["@/views/order/orderList"], resolve);
        },
        meta: { title: "订单列表" }
      },
      {
        path: "/order/orderSetting",
        name: "orderSetting",
        component: resolve => {
          require(["@/views/order/orderSetting"], resolve);
        },
        meta: { title: "订单设置" }
      },
      {
        path: "/order/applicationProcessing",
        name: "applicationProcessing",
        component: resolve => {
          require(["@/views/order/applicationProcessing"], resolve);
        },
        meta: { title: "退货申请处理" }
      },
      {
        path: "/order/returnApplyDetail",
        name: "returnApplyDetail",
        component: resolve => {
          require(["@/views/order/returnApplyDetail"], resolve);
        },
        meta: { title: "退货原因详情" }

      },
      {
        path: "/order/reasonSetting",
        name: "reasonSetting",
        component: resolve => {
          require(["@/views/order/reasonSetting"], resolve);
        },
        meta: { title: "退货原因设置" }
      },
      {
        path: "/order/orderDetails",
        name: "orderDetails",
        component: resolve => {
          require(["@/views/order/orderDetails"], resolve);
        },
        meta: { title: "订单详情" }
      }
    ]
  },
  //运营
  {
    path: "/operation",
    component: Layout,
    redirect: "/operation/spikeActivityList",
    meta: { title: "运营", icon: "product" },
    children: [
      {
        path: "/operation/spikeActivityList",
        name: "spikeActivityList",
        component: resolve => {
          require(["@/views/operation/spikeActivityList"], resolve);
        },
        meta: { title: "秒杀活动列表" }
      },
      {
        path: "/operation/couponList",
        name: "couponList",
        component: resolve => {
          require(["@/views/operation/couponList"], resolve);
        },
        meta: { title: "优惠券列表" }
      },
      {
        path: "/operation/brandRecommendation",
        name: "brandRecommendation",
        component: resolve => {
          require(["@/views/operation/brandRecommendation"], resolve);
        },
        meta: { title: "品牌推荐" }
      },
      {
        path: "/operation/newProducts",
        name: "newProducts",
        component: resolve => {
          require(["@/views/operation/newProducts"], resolve);
        },
        meta: { title: "新品推荐" }
      },
      {
        path: "/operation/popularRecommendation",
        name: "popularRecommendation",
        component: resolve => {
          require(["@/views/operation/popularRecommendation"], resolve);
        },
        meta: { title: "人气推荐" }
      },
      {
        path: "/operation/recommendedTopics",
        name: "recommendedTopics",
        component: resolve => {
          require(["@/views/operation/recommendedTopics"], resolve);
        },
        meta: { title: "专题推荐" }
      },
      {
        path: "/operation/advertisingRecommendation",
        name: "advertisingRecommendation",
        component: resolve => {
          require(["@/views/operation/advertisingRecommendation"], resolve);
        },
        meta: { title: "广告推荐" }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: resolve => {
      require(["@/views/error"], resolve);
    },
  },
  // 测试
  {
    path: "/apply",
    name: "apply",
    component: resolve => {
      require(["@/views/order/apply"], resolve);
    },
  }
];
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
