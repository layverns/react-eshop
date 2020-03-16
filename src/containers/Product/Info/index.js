import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function Info({ className, price, oldPrice, score }) {
  return (
    <div className={classnames(className, $style.info)}>
      <div className={classnames($style.price, $style.info__row)}>
        <div className={classnames($style.info__title, $style.price__title)}>价格</div>
        <div className={$style.price__prefix}>¥</div>
        <div className={$style.price__num}>{price}</div>
      </div>
      <div className={classnames($style.score, $style.info__row)}>
        <div className={$style.info__title}>购物返</div>
        <div className={$style.score__text}>最高返 </div>
        <div className={$style.score__num}>{score}积分</div>
      </div>
      <div className={classnames($style.coupon, $style.info__row)}>
        <div className={$style.info__title}>限制</div>
        <div className={$style.coupon__text}>该商品不可使用优惠券</div>
      </div>
      <div className={classnames($style.delivery, $style.info__row)}>
        <div className={$style.info__title}>配送</div>
        <div className={$style.delivery__text}>
          <div className={$style.delivery__row}>
            至<div className={$style.delivery__menu}>北京市西城区西长安街街道 </div>
          </div>
          <div className={$style.delivery__tips}>防疫品将优先发货，预计48小时内发出，我们会全力为您服务，请您耐心等待</div>
        </div>
      </div>
      <div className={$style.split}></div>
      <div className={classnames($style.service, $style.info__row)}>
        <div className={$style.info__title}>服务</div>
        <ul className={$style.service__list}>
          <li>･&nbsp;支持30天无忧退换货</li>
          <li>･&nbsp;满88元免邮费</li>
          <li>･&nbsp;48小时快速退款</li>
          <li>･&nbsp;不享受企业特权</li>
          <li>･&nbsp;不享受学生特权</li>
          <li>･&nbsp;不支持回馈金抵扣</li>
          <li>･&nbsp;不支持返回馈金</li>
        </ul>
      </div>
      <div className={classnames($style.remark, $style.info__row)}>
        <div className={$style.info__title}>备注</div>
        <div className={$style.remark__text}></div>
      </div>
    </div>
  );
}

export default Info;
