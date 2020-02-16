import React from 'react';
import classnames from 'classnames';
import { Button, Icon } from 'antd';
import $style from './Header.module.scss';
import logo from '@/assets/login/logo.png';

function Header() {
  return (
    <header className={$style.header}>
      <div className={classnames('container', $style.header__content)}>
        <img className={$style.header__logo} src={logo} />
        <Button className={$style.header__feedback} type="link">
          <Icon type="form" />
          意见反馈
        </Button>
      </div>
    </header>
  );
}

export default Header;
