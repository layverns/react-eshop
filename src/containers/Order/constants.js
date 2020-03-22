const PREFIX = 'ORDER/';

export const FETCH_ORDERS = PREFIX + 'FETCH_ORDERS';

export const SET_ORDERS = PREFIX + 'SET_ORDERS';

export const PAY_ORDER = PREFIX + 'PAY_ORDER';

export const ORDER_STATUS = [
  { STATUS: 0, TEXT: '未付款' },
  { STATUS: 1, TEXT: '待发货' },
  { STATUS: 2, TEXT: '已发货' },
  { STATUS: 3, TEXT: '待评论' },
  { STATUS: 4, TEXT: '已完成' },
  { STATUS: 5, TEXT: '已取消' },
];
