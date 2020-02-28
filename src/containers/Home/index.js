import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';

import { fetchCategories, fetchCarousels } from './actions';
import { makeSelectCategories, makeSelectCarousels } from './selectors';
import $style from './index.module.scss';

import EHeader from '@/containers/EHeader';
import ECarousel from '@/components/ECarousel';
import Promotion from '@/components/Promotion';
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

  componentWillMount() {
    this.props.getCategories();
    this.props.getCarousels();
  }

  render() {
    const { categories } = this.props;
    // const { carousels } = this.props;
    let carousels = [
      {
        productId: 1,
        image: 'https://yanxuan.nosdn.127.net/619dae0493f6cd078a0d7180edc5acef.jpg',
      },
      {
        productId: 2,
        image: 'https://yanxuan.nosdn.127.net/9ff3f2e986220f4eaef23a846e02bac0.png',
      },
      {
        productId: 3,
        image: 'https://yanxuan.nosdn.127.net/ec0eb292a835db49ddf433e83b23e5eb.jpg',
      },
    ];
    return (
      <div>
        <EHeader></EHeader>
        <ECarousel carousels={carousels}></ECarousel>
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

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  carousels: makeSelectCarousels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getCarousels: () => dispatch(fetchCarousels()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
