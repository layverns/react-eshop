import React, { forwardRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

const ProductTime = ({ className, product }) => {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  return (
    <div className={classnames(className, $style.product)}>
      <Link className={$style.header} to={'/products/' + product.id}>
        <img className={$style.image} src={product.images[0]} />
      </Link>
      <div className={$style.content}>
        <Link className={$style.title} to={'/products/' + product.id}>
          {product.title}
        </Link>
        <Link className={$style.subtitle} to={'/products/' + product.id}>
          {product.subtitle}
        </Link>
        <div className={$style.progress}>
          <div className={$style.progress__bar}>
            <div className={$style.progress__inner} style={{ width: (product.remain * 152) / product.quantity }}></div>
          </div>
          <div className={$style.progress__title}>还剩{product.remain}件</div>
        </div>
        <div className={$style.price}>
          <span className={$style.price__title}>限时价</span>
          <span className={$style.price__now}>¥{product.price}</span>
          {product.oldPrice > 0 && <span className={$style.price__old}>¥{product.oldPrice}</span>}
        </div>
        <Link className={$style.buy} to={'/products/' + product.id}>
          立即抢购
        </Link>
      </div>
    </div>
  );
};

export default ProductTime;
