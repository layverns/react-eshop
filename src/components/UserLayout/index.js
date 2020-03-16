import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import Nav from '@/containers/Nav';
import Header from '@/containers/Header';
import Footer from '@/components/Footer';
import Sidebar from './Sidebar';
import $style from './index.module.scss';

function UserLayout({ selected, title, children }) {
  return (
    <div className={classnames($style.layout)}>
      <Nav />
      <Header />

      <div className={classnames('container', $style.content)}>
        <Breadcrumb className={$style.breadcrumb} separator=">">
          <Breadcrumb.Item>
            <Link className={$style.breadcrumb__link} to="/">
              首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={classnames($style.body)}>
          <Sidebar className={$style.sidebar} selected={selected} />
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserLayout;
