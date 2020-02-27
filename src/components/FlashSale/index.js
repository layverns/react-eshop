import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

import ProductTime from '@/components/ProductTime';
import Panel from '../Panel';

function FlashSale({ flashSales = [], bestSells = [] }) {
  let product = {
    title: '安心出行，高效防护-功能护目镜',
    price: '79',
    tags: ['新品', '顺丰包邮'],
    image: 'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
  };
  for (let i = 0; i < 10; i++) {
    let temp = { ...product };
    temp.title += i;
    temp.id = i;
    flashSales.push(temp);
  }

  return (
    <Panel title="限时购" more="更多抢购">
      <div className={$style.body}>
        <div className={$style.left}>
          <a className={$style.left__link}></a>
          <div className={$style.left__title}>14点场</div>
          <div className={$style.left__line}></div>
          <div className={$style.left__subtitle}>距离结束还剩</div>
          <div className={$style.timer}>
            <div className={$style.timer__time}>02</div>
            <div className={$style.timer__colon}>:</div>
            <div className={$style.timer__time}>48</div>
            <div className={$style.timer__colon}>:</div>
            <div className={$style.timer__time}>39</div>
          </div>
          <button className={$style.left__all}>查看全部 ></button>
        </div>
        <div className={$style.right}>
          <div className={$style.right__row}>
            <ProductTime className={$style.product}></ProductTime>
            <ProductTime className={$style.product}></ProductTime>
          </div>
          <div className={$style.right__row}>
            {' '}
            <ProductTime className={$style.product}></ProductTime>
            <ProductTime className={$style.product}></ProductTime>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default FlashSale;
