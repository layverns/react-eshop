import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon, Input } from 'antd';

import { load } from './actions';
import $style from './index.module.scss';
import EInput from '@/components/EInput';
import Nav from './Nav';
import CategoryBar from './CategoryBar';

function EHeader({
  hotWords = [
    {
      id: 1,
      keyword: '抑菌免洗洗手液',
    },
    {
      id: 2,
      keyword: '酒精消毒液',
    },
    {
      id: 3,
      keyword: '日式拉面',
    },
    {
      id: 4,
      keyword: 'PVC食品级手套',
    },
    {
      id: 5,
      keyword: '5555555555',
    },
    {
      id: 6,
      keyword: '6666666666',
    },
    {
      id: 7,
      keyword: '7777777',
    },
  ],
}) {
  let notices = [
    {
      id: 1,
      title: '关于购物返回馈金活动暂停的公告',
    },
    {
      id: 2,
      title: '关于购物返回馈金活动暂停的公告',
    },
    {
      id: 3,
      title: '关于购物返回馈金活动暂停的公告',
    },
  ];

  let [curHotWordIndex, setCurHotWordIndex] = useState(0);

  let howWordNode = null;
  if (!_.isEmpty(hotWords)) {
    let hotWordList = hotWords.slice(curHotWordIndex, Math.min(curHotWordIndex + 4, hotWords.length));
    howWordNode = (
      <ul className={$style.search__list}>
        {hotWordList.map(hw => (
          <li key={hw.id}>
            <a>{hw.keyword}</a>
          </li>
        ))}
      </ul>
    );
  }

  setTimeout(() => {
    let index = curHotWordIndex + 4;
    if (index >= hotWords.length) {
      index = 0;
    }
    setCurHotWordIndex(index);
  }, 5000);

  return (
    <header className={$style.header}>
      <Nav notices={notices} />
      <EInput prefix={<img src={require('@/assets/login/user.png')} />} placeholder="邮箱账号"></EInput>
      <div className={classnames($style.header__content, 'container')}>
        <a className={$style.header__logo}>
          <span className={$style.header__logoImg}></span>
        </a>
        <a className={classnames($style.cart)}>
          <Icon type="shopping-cart" className={classnames($style.cart__icon)} />
          <span className={classnames($style.cart__title)}>购物车</span>
          <span className={$style.cart__num}>0</span>
        </a>
        <div className={classnames($style.search)}>
          <Input.Search className={classnames($style.search__input)} enterButton prefix={<Icon type="search" />} placeholder="搜索" enterButton="搜索" allowClear onChange={evt => {}} />
          <div className={$style.search__hotWord}>
            <SwitchTransition>
              <CSSTransition key={curHotWordIndex} timeout={500} classNames="Header_hotWord__text">
                {howWordNode}
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        <CategoryBar className={$style.categoryBar} />
      </div>
    </header>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(load()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EHeader);
