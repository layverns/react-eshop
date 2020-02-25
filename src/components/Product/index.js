import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Product({ className }) {
  return (
    <div className={classnames($style.product, className)}>
      <a className={$style.product__header}>
        <img
          className={$style.product__img}
          src="https://yanxuan-item.nosdn.127.net/087f2417881276a2537d35a2a63d7b52.jpg"
        />
        {/* <img
          className={$style.product__altImg}
          src="https://yanxuan-item.nosdn.127.net/087f2417881276a2537d35a2a63d7b52.jpg"
        /> */}
      </a>
      <div className={$style.product__content}>
        <div className={$style.product__title}>
          复工装备随身防护 日本空气净化除菌卡
        </div>
        <div className={$style.product__price}>¥79</div>
      </div>
    </div>
  );
}

export default Product;
