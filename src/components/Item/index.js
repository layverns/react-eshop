import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';


function Item() {
  return (
    <div className={classnames($style.item)}>
      <a>
        <img src="https://yanxuan-item.nosdn.127.net/487de4b51822cf85b859bb94cd65e9a6.png?type=webp&quality=95&thumbnail=180y180&imageView" />
        <div className={classnames($style.item__tag)}>包邮</div>
        <div className={classnames($style.item__title)}>我是标题</div>
        <div className={classnames($style.item__price)}>￥200</div>
        <div className={classnames($style.item__desc)}>非常舒适的体验</div>
      </a>
    </div>
  );
}

export default Item;