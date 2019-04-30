// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// 引入公用css文件
import "./assets/css/common.css";
import "./assets/css/bass.less";
//引入饿了么组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入store
import store from "./store";
// 引入权限控制
import "./permission";
//引入svg
import "./assets/icon";
// 引入axios
import axios from "./utils/axios";
// 引入自定义组件
import plugin from './js/plugin'
// 引入混入mixin
import mixins from "./js/mixin"
// 引入filter.js
import filters from "./js/filter.js";
// 使用filter.js
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// 使用组件
Vue.use(ElementUI);
Vue.use(plugin);
// 全局混入
Vue.mixin(mixins);
// 是否开启vue调试工具
Vue.config.devtools = true;
// 发布后是否显示提示
Vue.config.productionTip = false;
//axios全局引入后掉接口为$axios
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
