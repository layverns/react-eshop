import React from 'react';
import classnames from 'classnames';

import $style from './ProductPromo.module.scss';

function ProductPromo({ product, className }) {
  const { title, subtitle, image } = product;
  return (
    <div className={classnames($style.productPromo, className)}>
      <div className={$style.header}>
        <div className={$style.title}>{title}</div>
        <div className={$style.subtitle}>{subtitle}</div>
      </div>
      <img className={$style.image} src={image} />
    </div>
  );
}

export default ProductPromo;
