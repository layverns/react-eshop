import React from 'react';
import { Layout } from 'antd';

import $style from './index.module.scss';

const { Header } = Layout;

function EHeader() {
  return (
    <Header>
      <img className={$style.logo} src={require('@/assets/logo.png')} />
    </Header>
  );
}

export default EHeader;