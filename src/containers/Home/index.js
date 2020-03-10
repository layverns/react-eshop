import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';

import {
  fetchCarousels,
  fetchNewProducts,
  fetchRecommendProducts,
  fetchBestSellProducts,
  fetchTimeProducts,
  fetchWelfareProducts,
  fetchPresentProducts,
  fetchCategoryCarousels,
} from './actions';
import {
  makeSelectCarousels,
  makeSelectNewProducts,
  makeSelectRecommendProducts,
  makeSelectBestSellProducts,
  makeSelectTimeProducts,
  makeSelectWelfareProducts,
  makeSelectPresentProducts,
  makeSelectCategoryCarousels,
} from './selectors';

import Nav from '@/containers/Nav';
import EHeader from '@/containers/EHeader';
import Footer from '@/components/Footer';
import Carousel from './Carousel';
import NewProduct from './NewProduct';
import Recommend from './Recommend';
import FlashSale from './FlashSale';
import Welfare from './Welfare';
import Category from './Category';

import $style from './index.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { carousels, newProducts, recommendProducts, bestSellProducts, timeProducts, welfareProducts, presentProducts, categoryCarousels } = this.props;
    return (
      <div>
        <Nav />
        <EHeader />
        <Carousel carousels={carousels} />
        <NewProduct newProducts={newProducts} />
        <Recommend recommends={recommendProducts} bestSells={bestSellProducts} />
        <FlashSale timeProducts={timeProducts} />
        <Welfare welfareProducts={welfareProducts} presentProducts={presentProducts} />
        {_.isEmpty(categoryCarousels) ? null : categoryCarousels.map(cs => <Category carousel={cs} />)}
        <Footer />
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
  welfareProducts: makeSelectWelfareProducts(),
  presentProducts: makeSelectPresentProducts(),
  categoryCarousels: makeSelectCategoryCarousels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(fetchCarousels());
      dispatch(fetchNewProducts());
      dispatch(fetchRecommendProducts());
      dispatch(fetchBestSellProducts());
      dispatch(fetchTimeProducts());
      dispatch(fetchWelfareProducts());
      dispatch(fetchPresentProducts());
      dispatch(fetchCategoryCarousels());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
