
import React from 'react';
import { Layout } from 'antd';

import $style from './index.module.scss';

import EHeader from '@/components/EHeader';

function Home() {
  return (
    <Layout >
      <EHeader></EHeader>
      Home
    </Layout>
  );
}

export default Home;
