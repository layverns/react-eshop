import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

const ProductBargain = ({ className, product }) => {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  return (
    <div className={classnames(className, $style.product)}>
      <Link className={$style.header} to={'/products/' + product.id}>
        <img className={$style.header__image} src={product.images[0]} />
      </Link>
      <div className={$style.content}>
        <Link className={$style.title} to={'/products/' + product.id}>
          {product.title}
        </Link>
        <div className={$style.price}>
          <span className={$style.price__title}>限时价 ¥</span>
          <span className={$style.price__now}>{product.price}</span>
        </div>
        <div className={$style.oldprice}>¥{product.oldPrice}</div>
        <Link className={$style.buy} to={'/products/' + product.id}>
          立即抢购
        </Link>
      </div>
    </div>
  );
};

export default ProductBargain;
