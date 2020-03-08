import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

const ProductZoom = ({ className, product, size = 'normal' }) => {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  return (
    <div className={classnames(size == 'normal' ? $style.normal : $style.large, className)}>
      <Link className={size == 'normal' ? $style.normal__header : $style.large__header} to={'/products/' + product.id}>
        <img className={size == 'normal' ? $style.normal__image : $style.large__image} src={product.images[0]} />
      </Link>
      <div className={size == 'normal' ? $style.normal__content : $style.large__content}>
        <div className={size == 'normal' ? $style.normal__tags : $style.large__tags}>
          {product.tags.map(tag => (
            <span key={tag.id} className={size == 'normal' ? $style.normal__tag : $style.large__tag}>
              {tag.title}
            </span>
          ))}
        </div>
        <Link className={size == 'normal' ? $style.normal__title : $style.large__title} to={'/products/' + product.id}>
          {product.title}
        </Link>
        <div className={size == 'normal' ? $style.normal__price : $style.large__price}>
          <span>¥{product.price}</span>
          {product.old_price > 0 && <span className={size == 'normal' ? $style.normal__old : $style.large__old}>¥{product.old_price}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductZoom;
