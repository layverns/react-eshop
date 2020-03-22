import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import {
  fetchCarousels,
  fetchNewProducts,
  fetchRecommendProducts,
  fetchBestSellProducts,
  fetchTimeProducts,
  fetchWelfareProducts,
  fetchPresentProducts,
  fetchCategoryList,
} from './actions';
import {
  makeSelectCarousels,
  makeSelectNewProducts,
  makeSelectRecommendProducts,
  makeSelectBestSellProducts,
  makeSelectTimeProducts,
  makeSelectWelfareProducts,
  makeSelectPresentProducts,
  makeSelectCategoryList,
} from './selectors';

import Nav from '@/containers/Nav';
import Header from '@/containers/Header';
import Footer from '@/components/Footer';
import Carousel from './Carousel';
import NewProduct from './NewProduct';
import Recommend from './Recommend';
import FlashSale from './FlashSale';
import Welfare from './Welfare';
import Category from './Category';

export class Home extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const { carousels, newProducts, recommendProducts, bestSellProducts, timeProducts, welfareProducts, presentProducts, categoryList } = this.props;
    return (
      <div>
        <Nav />
        <Header />
        <Carousel carousels={carousels} />
        <NewProduct newProducts={newProducts} />
        <Recommend recommends={recommendProducts} bestSells={bestSellProducts} />
        <FlashSale timeProducts={timeProducts} />
        <Welfare welfareProducts={welfareProducts} presentProducts={presentProducts} />
        {_.isEmpty(categoryList) ? null : categoryList.map(c => <Category key={c.id} category={c} />)}
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
  categoryList: makeSelectCategoryList(),
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
      dispatch(fetchCategoryList());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
