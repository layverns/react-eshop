import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Loading from '@/components/Loading';
import { getInfoOfSpecs } from '@/utils/libs';
import $style from './index.module.scss';

function CartItem({ className, product }) {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  const {
    title,
    images,
    specs,
    productSpecs,
    quantity,
    productInfo: { prices },
  } = product;

  let specNodes = null;
  specNodes = specs.map((s, index) => {
    const productSpec = productSpecs[index];
    const spec = productSpec.filter(ps => ps.id === s)[0];
    return (
      <div className={$style.spec} key={s}>
        {spec.title}
      </div>
    );
  });

  let price = getInfoOfSpecs(specs, productSpecs, prices);

  let totalPrice = Math.round(price * quantity * 100) / 100;

  return (
    <div className={classnames(className, $style.item)}>
      <img className={$style.image} src={images[0]} alt="product" />
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
