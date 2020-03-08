import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import $style from './index.module.scss';

function Loading({ className }) {
  return (
    <div className={classnames(className, $style.loading)}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}

export default Loading;
