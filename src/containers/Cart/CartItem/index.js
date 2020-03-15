import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '@/components/Loading';
import Checkbox from '@/components/Checkbox';
import Count from '@/components/Count';
import { getInfoOfSpecs } from '@/utils/libs';
import $style from './index.module.scss';

function CartItem({ className, product, onDelete, onCheck, onChangeQuantity }) {
  if (_.isEmpty(product)) {
    return <Loading />;
  }

  const { id, title, images, specs, productSpecs, quantity, productInfo, isChecked } = product;
  const { prices } = productInfo;

  let specNodes = specs.map((s, index) => {
    const productSpec = productSpecs[index];
    const spec = productSpec.filter(ps => ps.id == s)[0];
    return (
      <div className={$style.spec} key={s}>
        {spec.title}
      </div>
    );
  });

  let price = getInfoOfSpecs(specs, productSpecs, prices);

  let totalPrice = price * quantity;

  return (
    <div className={classnames(className, $style.item)}>
      <Checkbox className={$style.checkbox} isChecked={isChecked} onCheck={() => onCheck(product)} />
      <Link to={`/products/${id}`}>
        <img className={$style.image} src={images[0]} />
      </Link>
      <div className={$style.body}>
        <Link className={$style.title} to={`/products/${id}`}>
          {title}
        </Link>
        <div className={$style.specs}>{specNodes}</div>
      </div>
      <div className={$style.price}>¥{price}</div>
      <Count
        className={$style.quantity}
        height="26px"
        btnWidth="26px"
        inputWidth="58px"
        value={quantity}
        onChange={quantity => onChangeQuantity(product, quantity)}
      />
      <div className={$style.totalPrice}>¥{totalPrice}</div>
      <div className={$style.del} onClick={() => onDelete(product)}>
        删除
      </div>
    </div>
  );
}

export default CartItem;
