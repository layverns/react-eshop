import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

import { Link } from 'react-router-dom';
import $style from './index.module.scss';
import { ORDER_STATUS } from '../constants';

function OrderItem({ className, order, onClickPay }) {
  const { orderItems, statusText, status } = order;

  let imgList = null;
  if (!_.isEmpty(orderItems)) {
    imgList = orderItems.slice(0, 3).map(oi => (
      <Link to={`/products/${oi.productId}`} key={oi.id}>
        <img className={$style.image} src={oi.image} alt="product" />
      </Link>
    ));
  }

  let sumPrice = orderItems.reduce((total, oi) => total + oi.price, 0);
  sumPrice = Math.round(sumPrice * 100) / 100;

  return (
    <div className={classnames($style.item, className)}>
      <div className={$style.header}>
        <div className={$style.header__date}>下单时间: {moment(order.createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>
        <div className={$style.header__no}>订单号: {order.no}</div>
        {order.status === 5 && <div className={$style.header__del}></div>}
      </div>
      <div className={$style.body}>
        <div className={$style.col}>
          <div className={$style.images}>{imgList}</div>
          <div className={$style.num}>共{orderItems.length}种商品</div>
          <div className={classnames($style.status, status === ORDER_STATUS[0].STATUS && $style.status_red)}>{statusText}</div>
        </div>
        <div className={$style.col}>
          <div className={$style.price}>¥{sumPrice}</div>
        </div>
        <div className={classnames($style.col, $style.operation)}>
          {order.status === 0 && (
            <div className={$style.pay} onClick={() => onClickPay(order.id)}>
              付款
            </div>
          )}
          <div className={$style.detail}>查看详情</div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
