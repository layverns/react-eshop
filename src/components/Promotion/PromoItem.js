import React from 'react';
import classnames from 'classnames';

import $style from './PromoItem.module.scss';

function PromoItem({ item }) {
  const { title, subtitle, image } = item;
  return (
    <div className={classnames($style.promoItem)}>
      <div className={$style.promoItem__header}>
        <div className={$style.promoItem__title}>{title}</div>
        <div className={$style.promoItem__subtitle}>{subtitle}</div>
      </div>
      <img className={$style.promoItem__image} src={image} />
    </div>
  );
}

export default PromoItem;
