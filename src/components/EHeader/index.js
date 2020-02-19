import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';


function EHeader() {
  return (
    <header className={classnames($style.header, 'py4')}>
      <div className={classnames($style.header__content, 'container')}>
        <a className={$style.header__logo}><h2 className={$style.header__title}>eshop</h2></a>
        <nav className={$style.header__nav}>
          <ul >
            <li>登录/注册</li>
            <li>我的订单</li>
            <li>帮助中心</li>
            <li>联系我们</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default EHeader;