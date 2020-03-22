import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { pca, pcaa } from 'area-data';

import Loading from '@/components/Loading';
import $style from './index.module.scss';

function Selection({ className, onClick, contact, active }) {
  if (_.isEmpty(contact)) {
    return <Loading />;
  }

  const { id, province, city, district, address, person, phone, isDefault } = contact;

  return (
    <div className={classnames(className, $style.selection, active ? $style.selection_active : '')} onClick={() => onClick(id)}>
      <div className={$style.row}>
        <div className={$style.title}>收 货 人:</div>
        <div className={$style.text}>{person}</div>
      </div>
      <div className={$style.row}>
        <div className={$style.title}>联系方式:</div>
        <div className={$style.text}>{phone}</div>
      </div>
      <div className={$style.row}>
        <div className={$style.title}>收货地址:</div>
        <div className={$style.text}>{pca[86][province] + pcaa[province][city] + pcaa[city][district] + address}</div>
      </div>
      {isDefault === 1 && <div className={$style.default}>默认地址</div>}
      <div className={$style.icon}></div>
    </div>
  );
}

export default Selection;
