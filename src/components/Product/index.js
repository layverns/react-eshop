import React, { forwardRef } from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

const Product = forwardRef(({ className, product }, ref) => {
  return (
    <div ref={ref} className={classnames($style.product, className)}>
      <a className={$style.product__header}>
        <img className={$style.product__img} src={product.image} />
        <img className={$style.product__altImg} src={product.altImage} />
      </a>
      <div className={$style.product__content}>
        <div className={$style.product__tags}>
          {product.tags.map(tag => (
            <span key={tag} className={$style.product__tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={$style.product__title}>
          <a>{product.title}</a>
        </div>
        <div className={$style.product__price}>¥{product.price}</div>
      </div>
    </div>
  );
});

export default Product;
