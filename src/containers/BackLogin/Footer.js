import React from 'react';
import $style from './Footer.module.scss';

function Footer() {
  return (
    <footer className={$style.footer}>
      <ul className={$style.footer__link}>
        <li>
          <a>关于我们</a>
        </li>
        <li>
          <a>联系我们</a>
        </li>
        <li>
          <a>帮助中心</a>
        </li>
        <li>
          <a>法律声明</a>
        </li>
      </ul>
      <p className={$style.footer__copyright}>Copyright © 2020 eshop.com 版权所有</p>
    </footer>
  );
}

export default Footer;
