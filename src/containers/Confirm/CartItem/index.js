import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';
import Checkbox from '@/components/Checkbox';
import Count from '@/components/Count';
import { getElmOfArray } from '@/utils/libs';
import $style from './index.module.scss';

function CartItem({ className, product }) {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  const { title, images, specs, productSpecs, quantity, productInfo } = product;
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

  let totalPrice = price * quantity;

  return (
    <div className={classnames(className, $style.item)}>
      <img className={$style.image} src={images[0]} />
      <div className={$style.body}>
        <div className={$style.title}>{title}</div>
        <div className={$style.specs}>{specNodes}</div>
      </div>
      <div className={$style.price}>¥{price}</div>
      <div className={$style.quantity}>{quantity}</div>
      <div className={$style.totalPrice}>¥{totalPrice}</div>
      <div className={$style.final}>¥{totalPrice}</div>
    </div>
  );
}

export default CartItem;
