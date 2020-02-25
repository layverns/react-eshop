import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';

import { fetchCategories, fetchCarousels } from './actions';
import { makeSelectCategories, makeSelectCarousels } from './selectors';
import $style from './index.module.scss';

import EHeader from '@/components/EHeader';
import ECarousel from '@/components/ECarousel';
import Promotion from '@/components/Promotion';
import NewProduct from '@/components/NewProduct';

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

    return (
      <div>
        <EHeader></EHeader>
        <ECarousel></ECarousel>
        <Promotion></Promotion>
        <NewProduct></NewProduct>
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
