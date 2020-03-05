import React, { forwardRef } from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

const ProductFlip = forwardRef(({ className, product }, ref) => {
  return (
    <div ref={ref} className={classnames($style.productFlip, className)}>
      <a className={$style.header}>
        <img className={$style.img} src={product.image} />
        <img className={$style.altImg} src={product.altImage} />
      </a>
      <div className={$style.content}>
        <div className={$style.tags}>
          {product.tags.map(tag => (
            <span key={tag} className={$style.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={$style.title}>
          <a>{product.title}</a>
        </div>
        <div className={$style.price}>¥{product.price}</div>
      </div>
    </div>
  );
});

export default ProductFlip;
