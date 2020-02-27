import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

import ProductZoom from '@/components/ProductZoom';
import Panel from '../Panel';

function NewProduct({ recommends = [], bestSells = [] }) {
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
    recommends.push(temp);
  }
  product = {
    title: '100%桑蚕丝提花被 薄被',
    price: '13',
    tags: ['新品', '顺丰包邮'],
    image: 'https://yanxuan-item.nosdn.127.net/14aca590e6b4d65cfd5dbb1cec45ba8d.png',
  };
  for (let i = 0; i < 10; i++) {
    let temp = { ...product };
    temp.title += i;
    temp.id = i;
    bestSells.push(temp);
  }

  let [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('recommends: ', recommends);
    setProducts(recommends.slice(0, 7));
  }, []);

  let changePage = page => {
    if (page == 0) {
      setProducts(recommends.slice(0, 7));
    } else {
      setProducts(bestSells.slice(0, 7));
    }
  };

  let first = null;
  if (!_.isEmpty(products)) {
    first = products.shift();
  }

  let tabs = [
    {
      title: '编辑推荐',
      callback: changePage,
    },
    {
      title: ' 热销总榜',
      callback: changePage,
    },
  ];

  let firstRowProducts = products.slice(0, 3);
  let secondRowProducts = products.slice(3, 6);
  return (
    <Panel tabs={tabs} title="人气推荐" more="更多推荐" bgtype="gold">
      <div className={$style.body}>
        <div className={$style.left}>{first && <ProductZoom product={first} className={$style.first} size="large"></ProductZoom>}</div>
        <div className={$style.right}>
          <div className={$style.right__row}>
            {firstRowProducts.map(p => (
              <ProductZoom className={$style.product} key={p.id} product={p}></ProductZoom>
            ))}
          </div>
          <div className={$style.right__row}>
            {secondRowProducts.map(p => (
              <ProductZoom className={$style.product} key={p.id} product={p}></ProductZoom>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default NewProduct;
