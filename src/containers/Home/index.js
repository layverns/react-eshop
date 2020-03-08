import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';

import { fetchCarousels, fetchNewProducts, fetchRecommendProducts, fetchBestSellProducts, fetchTimeProducts } from './actions';
import { makeSelectCarousels, makeSelectNewProducts, makeSelectRecommendProducts, makeSelectBestSellProducts, makeSelectTimeProducts } from './selectors';

import Nav from '@/containers/Nav';
import EHeader from '@/containers/EHeader';
import Carousel from '@/containers/Home/Carousel';
import NewProduct from '@/containers/Home/NewProduct';
import Recommend from './Recommend';
import FlashSale from './FlashSale';

import $style from './index.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { carousels, newProducts, recommendProducts, bestSellProducts, timeProducts } = this.props;
    return (
      <div>
        <Nav />
        <EHeader></EHeader>
        <Carousel carousels={carousels}></Carousel>
        <NewProduct newProducts={newProducts}></NewProduct>
        <Recommend recommends={recommendProducts} bestSells={bestSellProducts}></Recommend>
        <FlashSale timeProducts={timeProducts}></FlashSale>
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

const mapStateToProps = createStructuredSelector({
  carousels: makeSelectCarousels(),
  newProducts: makeSelectNewProducts(),
  recommendProducts: makeSelectRecommendProducts(),
  bestSellProducts: makeSelectBestSellProducts(),
  timeProducts: makeSelectTimeProducts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(fetchCarousels());
      dispatch(fetchNewProducts());
      dispatch(fetchRecommendProducts());
      dispatch(fetchBestSellProducts());
      dispatch(fetchTimeProducts());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
