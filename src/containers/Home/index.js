import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';

import { fetchCarousels } from './actions';
import $style from './index.module.scss';

import Nav from '@/containers/Nav';
import EHeader from '@/containers/EHeader';
import Carousel from '@/containers/Carousel';
import Promotion from '@/containers/Promotion';
import NewProduct from '@/components/NewProduct';
import Recommend from '@/components/Recommend';
import FlashSale from '@/components/FlashSale';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carouseIndex: 0,
    };
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <Nav />
        <EHeader></EHeader>
        <Carousel></Carousel>
        <Promotion></Promotion>
        <NewProduct></NewProduct>
        <Recommend></Recommend>
        <FlashSale></FlashSale>
        <div className={classnames($style.panel, 'py60')}>
          <div className={classnames($style.panel__content, 'container')}>
            <div className={$style.panel__header}>
              <h2 className={$style.panel__title}>人气推荐</h2>
            </div>
          </div>
        </div>
        <div>
          <h1>新品首发</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
