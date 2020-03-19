import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import $style from './index.module.scss';

function Sidebar({ selected, className }) {
  let zhangHaos = [
    {
      id: 'gerenzhongxin',
      title: '个人中心',
      to: '/user',
    },
    {
      id: 'xiaoxintongzhi',
      title: '消息通知',
      to: '/user',
    },
    {
      id: 'zhanghaoxinxi',
      title: '账号信息',
      to: '/user',
    },
    {
      id: 'dizhiguanli',
      title: '地址管理',
      to: '/user',
    },
    {
      id: 'zhanghaoanquan',
      title: '账号安全',
      to: '/user',
    },
    {
      id: 'wodejifen',
      title: '我的积分',
      to: '/user',
    },
  ];
  let zhangHaoList = zhangHaos.map(z => (
    <li className={classnames($style.category__item, selected == z.id ? $style.category__item_active : '')}>
      <Link to={z.to}>{z.title}</Link>
    </li>
  ));

  let jiaoYis = [
    {
      id: 'dingdanguanli',
      title: '订单管理',
      to: '/order',
    },
    {
      id: 'youhuiquan',
      title: '优惠券',
      to: '/order',
    },
  ];
  let jiaoYiList = jiaoYis.map(z => (
    <li className={classnames($style.category__item, selected == z.id ? $style.category__item_active : '')}>
      <Link to={z.to}>{z.title}</Link>
    </li>
  ));

  let fuWus = [
    {
      id: 'shouhoujilu',
      title: '售后记录',
    },
    {
      id: 'bangzhuzhongxin',
      title: '帮助中心',
    },
  ];
  let fuWuList = fuWus.map(z => <li className={classnames($style.category__item, selected == z.id ? $style.category__item_active : '')}>{z.title}</li>);

  return (
    <div className={classnames($style.sidebar, className)}>
      <div className={$style.category}>
        <div className={$style.category__title}>账号管理</div>
        <ul className={$style.category__list}>{zhangHaoList}</ul>
      </div>
      <div className={$style.category}>
        <div className={$style.category__title}>交易管理</div>
        <ul className={$style.category__list}>{jiaoYiList}</ul>
      </div>
      <div className={$style.category}>
        <div className={$style.category__title}>服务中心</div>
        <ul className={$style.category__list}>{fuWuList}</ul>
      </div>
    </div>
  );
}

export default Sidebar;
