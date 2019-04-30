import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // 验权

const whiteList = ["/"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      // console.log("2222");
      next({ path: "/" }); //报错
      // console.log("33333");
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch("GetInfo")
          .then(res => {
            // 拉取用户信息
            next();
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              Message.error(err || "Verification failed, please login again");
              // next({ path: "/" });
              next({ path: "/" });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      // console.log("1111");
    } else {
      next("/");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
