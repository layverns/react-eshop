import React, { forwardRef } from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

const Product = ({ className, product, size = 'normal' }) => {
  return (
    <div className={classnames(size == 'normal' ? $style.productNormal : $style.productLarge, className)}>
      <a className={size == 'normal' ? $style.productNormal__header : $style.productLarge__header}>
        <img className={size == 'normal' ? $style.productNormal__img : $style.productLarge__img} src={product.image} />
      </a>
      <div className={size == 'normal' ? $style.productNormal__content : $style.productLarge__content}>
        <div className={size == 'normal' ? $style.productNormal__tags : $style.productLarge__tags}>
          {product.tags.map(tag => (
            <span key={tag} className={size == 'normal' ? $style.productNormal__tag : $style.productLarge__tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={size == 'normal' ? $style.productNormal__title : $style.productLarge__title}>
          <a>{product.title}</a>
        </div>
        <div className={size == 'normal' ? $style.productNormal__price : $style.productLarge__price}>¥{product.price}</div>
      </div>
    </div>
  );
};

export default Product;
