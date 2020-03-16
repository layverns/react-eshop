import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';
import { getElmOfArray } from '@/utils/libs';

import $style from './index.module.scss';

function CartItem({ className, product, onClickDel }) {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  const { id, title, images, specs, productSpecs, quantity, productInfo } = product;
  const { prices } = productInfo;
  let specNodes = null;
  let indexs = [];
  specNodes = specs.map((s, index) => {
    const productSpec = productSpecs[index];
    const spec = productSpec.filter(ps => ps.id == s)[0];
    indexs[spec.order] = spec.index;
    return <div className={$style.spec}>{spec.title}</div>;
  });
  let price = getElmOfArray(prices, indexs.slice(0, indexs.length));

  return (
    <div className={classnames($style.item, className)}>
      <Link to={`/products/${id}`}>
        <img className={$style.image} src={images[0]} />
      </Link>
      <div className={$style.body}>
        <Link to={`/products/${id}`}>
          <div className={$style.title}>{title}</div>
        </Link>
        <div className={$style.row}>
          <div className={$style.specs}>{specNodes}</div>
          <div className={$style.quantity}>x{quantity}</div>
        </div>
      </div>
      <div className={$style.price}>¥{price}</div>
      <div className={$style.del} onClick={() => onClickDel(product)}></div>
    </div>
  );
}

export default CartItem;
