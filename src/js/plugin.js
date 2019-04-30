import { Message, MessageBox } from 'element-ui';

export default {
  install(Vue) {
    Vue.prototype.$success = (content) => {
      Message({
        message: content,
        type: 'success',
        showClose: true
      })
    };
    Vue.prototype.$error = (content) => {
      Message({
        message: content,
        type: 'error',
        showClose: true
      })
    };
    Vue.prototype.$info = (content) => {
      Message({
        message: content,
        type: 'info',
        showClose: true
      })
    };
    Vue.prototype.$warning = (content) => {
      Message({
        message: content,
        type: 'warning',
        showClose: true
      })
    };
    Vue.prototype.$confirm = (content) => {
      return new Promise((resolve, reject) => {
        MessageBox.confirm(content, '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          resolve();
        }, () => {
          reject();
        });
      })
    };
  }
}