import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import $style from './index.module.scss';
import PromoItem from './PromoItem';

function Promotion({ items }) {
  items = [
    {
      title: '等春来',
      subtitle: '超值满额减',
      image:
        'https://yanxuan-item.nosdn.127.net/0434f5cb29b2c6c6ade2f1c0487ae97c.png',
    },
    {
      title: '防疫专区',
      subtitle: '防疫日用',
      image:
        'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
    {
      title: '超值特卖',
      subtitle: '抵至2折',
      image:
        'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
    {
      title: '春日物语',
      subtitle: '新品上新',
      image:
        'https://yanxuan-item.nosdn.127.net/4876c2c18d8f8deabc5b714d8108da05.png',
    },
  ];

  let itemsNode = null;
  if (!_.isEmpty(items)) {
    itemsNode = items.map(item => <PromoItem item={item} />);
  }

  return (
    <div className={classnames($style.promotion)}>
      <div className="container">
        <div className={$style.promotion_title}></div>
        <div className={$style.promotion_items}>{itemsNode}</div>
      </div>
    </div>
  );
}

export default Promotion;
