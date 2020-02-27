import React, { forwardRef } from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

const Product = ({ className, product, size = 'normal' }) => {
  product = {
    title: '24h保温电水壶',
    subtitle: '长时间保温，不喝滚水',
    originPrice: '129',
    price: '109',
    image: 'https://yanxuan-item.nosdn.127.net/4a3e47e02c2e4c228f244d533ee61fb8.png',
  };

  return (
    <div className={$style.product}>
      <a className={$style.header}>
        <img className={$style.image} src={product.image} />
      </a>
      <div className={$style.content}>
        <a className={$style.title}>{product.title}</a>
        <a className={$style.subtitle}>{product.subtitle}</a>
        <div className={$style.progress}>
          <div className={$style.progress__bar}>
            <div className={$style.progress__inner}></div>
          </div>
          <div className={$style.progress__title}>还剩241件</div>
        </div>
        <div className={$style.price}>
          <span className={$style.price__title}>限时价</span>
          <span className={$style.price__now}>{product.price}</span>
          <span className={$style.price__origin}>{product.originPrice}</span>
        </div>
        <button className={$style.buy}>立即抢购</button>
      </div>
    </div>
  );
};

export default Product;
