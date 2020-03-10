import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

const ProductFlip = forwardRef(({ className, product }, ref) => {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  return (
    <Link ref={ref} className={classnames($style.product, className)} to={'/products/' + product.id}>
      <div className={$style.header}>
        <img className={$style.img} src={product.images[0]} />
        <img className={$style.altImg} src={product.images[1]} />
      </div>
      <div className={$style.content}>
        <div className={$style.tags}>
          {product.tags.map(tag => (
            <span key={tag.id} className={$style.tag} style={{ backgroundColor: tag.color }}>
              {tag.title}
            </span>
          ))}
        </div>
        <div className={$style.title}>{product.title}</div>
        <div className={$style.price}>
          <span>¥{product.price}</span>
          {product.old_price > 0 && <span className={$style.price__old}>¥{product.old_price}</span>}
        </div>
      </div>
    </Link>
  );
});

export default ProductFlip;
