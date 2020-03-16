import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Sidebar({ selected, className }) {
  let zhangHaos = [
    {
      id: 'gerenzhongxin',
      title: '个人中心',
    },
    {
      id: 'xiaoxintongzhi',
      title: '消息通知',
    },
    {
      id: 'zhanghaoxinxi',
      title: '账号信息',
    },
    {
      id: 'dizhiguanli',
      title: '地址管理',
    },
    {
      id: 'zhanghaoanquan',
      title: '账号安全',
    },
    {
      id: 'wodejifen',
      title: '我的积分',
    },
  ];
  let zhangHaoList = zhangHaos.map(z => <li className={classnames($style.category__item, selected == z.id ? $style.category__item_active : '')}>{z.title}</li>);

  let jiaoYis = [
    {
      id: 'dingdanguanli',
      title: '订单管理',
    },
    {
      id: 'youhuiquan',
      title: '优惠券',
    },
  ];
  let jiaoYiList = jiaoYis.map(z => <li className={classnames($style.category__item, selected == z.id ? $style.category__item_active : '')}>{z.title}</li>);

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
