import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

const ProductPresent = ({ className, product }) => {
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
        <div className={$style.row}>
          <div className={$style.price}>¥{product.price}</div>
          <div className={$style.cart}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPresent;
