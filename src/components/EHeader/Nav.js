import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import $style from './Nav.module.scss';

function Nav({
  notices = [
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
  ],
}) {
  let [curNoticeIndex, setCurNoticeIndex] = useState(0);

  let noticeNode = null;
  if (!_.isEmpty(notices)) {
    let notice = notices[curNoticeIndex];
    noticeNode = <a>{notice.title}</a>;
  }

  setTimeout(() => {
    let index = curNoticeIndex + 1;
    if (index >= notices.length) {
      index = 0;
    }
    setCurNoticeIndex(index);
  }, 10000);

  return (
    <nav className={$style.nav}>
      <div className={classnames($style.nav__content, 'container')}>
        <div className={classnames($style.notice)}>
          <img
            className={$style.notice__img}
            src={require('@/assets/home/speaker.gif')}
          />
          <ul className={$style.notice__list}>
            <SwitchTransition>
              <CSSTransition
                key={curNoticeIndex}
                timeout={500}
                classNames="Header_notice__text"
              >
                <li className={$style.notice__item}>{noticeNode}</li>
              </CSSTransition>
            </SwitchTransition>
          </ul>
        </div>

        <div className={$style.link}>
          <ul className={$style.link__list}>
            <li className={$style.link__item}>
              <a>登录/注册</a>
            </li>
            <li className={$style.link__item}>
              <a>我的订单</a>
            </li>
            <li className={$style.link__item}>
              <a>会员</a>
            </li>
            <li className={$style.link__item}>
              <a>甄选家</a>
            </li>
            <li className={$style.link__item}>
              <a>企业采购</a>
            </li>
            <li className={$style.link__item}>
              <a>客户服务</a>
            </li>
            <li className={$style.link__item}>
              <a>
                <span className={$style.link__appIcon}></span>
                APP
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
