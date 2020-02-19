import React from 'react';
import classnames from 'classnames';

import { Icon, Input, Row, Col } from 'antd';

import $style from './index.module.scss';


function ToolBar() {
  return (
    <div className={classnames($style.toolbar, 'py2')}>
      <div className={classnames($style.toolbar__content, 'container')}>
        <a className={classnames($style.logo, 'py6')}>
          <img src={require('@/assets/home/logo.png')}></img>
        </a>
        <div className={classnames($style.search)}>
          <Input.Search
            className={classnames($style.search__input)}
            enterButton
            prefix={(<Icon type="search" />)}
            placeholder="搜索"
            enterButton="搜索"
            allowClear
            onChange={(evt) => { }}
          />
        </div>
        <a className={classnames($style.cart, 'py4')}>
          <Icon type="shopping-cart" className={classnames($style.cart__icon, 'mr6')} />
          <span className={classnames($style.cart__title, 'mr6')}>购物车</span>
          <span className={$style.cart__num}>0</span>
        </a>
      </div>
    </div>
  );
}

export default ToolBar;