import React from 'react';
import _ from 'lodash';

import $style from './index.module.scss';
import ProductPromo from './ProductPromo';

function Promotion({ items }) {
  items = [
    {
      title: '等春来',
      subtitle: '超值满额减',
      image: 'https://yanxuan-item.nosdn.127.net/0434f5cb29b2c6c6ade2f1c0487ae97c.png',
    },
    {
      title: '防疫专区',
      subtitle: '防疫日用',
      image: 'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
    {
      title: '超值特卖',
      subtitle: '抵至2折',
      image: 'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
    {
      title: '春日物语',
      subtitle: '新品上新',
      image: 'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
  ];

  let itemsNode = null;
  if (!_.isEmpty(items)) {
    itemsNode = items.map(item => <ProductPromo className={$style.product} key={item.title} product={item} />);
  }

  return (
    <div className={$style.promotion}>
      <div className="container">
        <div className={$style.body}>
          <div className={$style.title}></div>
          <div className={$style.products}>{itemsNode}</div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
