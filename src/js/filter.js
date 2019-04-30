import { formatDate } from '@/js/date';
export default {
  // 审核状态
  verifyStatusFilter(value) {
    if (value === 1) {
      return "审核通过";
    } else if (value === 0) {
      return "未审核";
    }
  },
  // 转换时间
  formatCreateTime(time) {
    let date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
  },
  // 订单来源
  formatSourceType(value) {
    if (value === 1) {
      return 'APP订单';
    } else {
      return 'PC订单';
    }
  },
  // 支付方式
  formatPayType(value) {
    if (value === 1) {
      return '支付宝';
    } else if (value === 2) {
      return '微信';
    } else {
      return '未支付';
    }
  },
  // 订单状态
  formatOrderStatus(value) {
    if (value === 1) {
      return '待发货';
    } else if (value === 2) {
      return '已发货';
    } else if (value === 3) {
      return '已完成';
    } else if (value === 4) {
      return '已关闭';
    } else if (value === 5) {
      return '无效订单';
    } else {
      return '待付款';
    }
  },
  // 申请状态
  formatApplicationStatus(value) {
    if (value === 0) {
      return '待处理';
    } else if (value === 1) {
      return '退货中';
    } else if (value === 2) {
      return '已完成';
    } else {
      return '已拒绝';
    }
  },
 formatStepStatus(value) {
  if (value === 1) {
   //待发货
   return 2;
  } else if (value === 2) {
   //已发货
   return 3;
  } else if (value === 3) {
   //已完成
   return 4;
  } else {
   //待付款、已关闭、无限订单
   return 1;
  }
 },
}