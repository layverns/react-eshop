import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Carousel } from 'antd';
import $style from './index.module.scss';
import Product from '@/components/Product';
import Panel from '@/components/Panel';

function NewProduct({ products = [] }) {
  let product = {
    title: '安心出行，高效防护-功能护目镜',
    price: '79',
    tags: ['新品', '顺丰包邮'],
    image: 'https://yanxuan-item.nosdn.127.net/087f2417881276a2537d35a2a63d7b52.jpg',
    altImage: 'https://yanxuan-item.nosdn.127.net/b039293f152b8ccd19d6e8b01e5cef17.png',
  };
  for (let i = 0; i < 10; i++) {
    let temp = { ...product };
    temp.title += i;
    temp.id = i;
    products.push(temp);
  }

  const productRef = useRef();
  const numOfProducts = products.length;
  let [prevDisable, setPrevDisable] = useState(false);
  let [nextDisable, setNextDisable] = useState(false);
  let [curIndex, setCurIndex] = useState(0);
  let [offset, setOffset] = useState(0);
  let nextSlide = () => {
    let nextIndex = curIndex + 4;
    if (nextIndex >= numOfProducts) {
      nextIndex = curIndex;
    }
    if (nextIndex > curIndex) {
      setCurIndex(nextIndex);
      setOffset(nextIndex * -(productRef.current.clientWidth + 10));
      setPrevDisable(false);
    } else {
      setNextDisable(true);
    }
  };
  let prevSlide = () => {
    let nextIndex = curIndex - 4;
    if (nextIndex <= 0) {
      nextIndex = 0;
    }
    if (nextIndex < curIndex) {
      setCurIndex(nextIndex);
      setOffset(nextIndex * -(productRef.current.clientWidth + 10));
      setNextDisable(false);
    } else {
      setPrevDisable(true);
    }
  };

  return (
    <Panel title="新品首发" subtitle="为你寻觅世间好物品" more="更多新品">
      <div className={$style.body}>
        <button className={$style.prev} onClick={prevSlide} disabled={prevDisable}>
          &lt;
        </button>
        <button className={$style.next} onClick={nextSlide} disabled={nextDisable}>
          &gt;
        </button>
        <div className={$style.slide}>
          <div className={$style.slideList} style={{ transform: `translateX(${offset}px)` }}>
            {products.map(p => (
              <Product ref={productRef} key={p.id} product={p} className={$style.product}></Product>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default NewProduct;
