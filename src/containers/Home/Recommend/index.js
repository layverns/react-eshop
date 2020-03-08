import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

import ProductZoom from '@/components/ProductZoom';
import Loading from '@/components/Loading';
import Panel from '../../../components/Panel';

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.recommends.length !== state.products.length) {
      return {
        products: props.recommends,
      };
    }
    return null;
  }

  changePage = page => {
    const { recommends, bestSells } = this.props;

    if (page == 0) {
      this.setState({
        products: recommends,
      });
    } else {
      this.setState({
        products: bestSells,
      });
    }
  };

  render() {
    const { products } = this.state;

    let first = null;
    if (!_.isEmpty(products)) {
      first = products[0];
    }

    let tabs = [
      {
        title: '编辑推荐',
        callback: this.changePage,
      },
      {
        title: ' 热销总榜',
        callback: this.changePage,
      },
    ];

    let firstRowProducts = products.slice(1, 4);
    let secondRowProducts = products.slice(4, 7);

    if (_.isEmpty(products)) {
      return <Loading />;
    }

    return (
      <Panel tabs={tabs} title="人气推荐" more="更多推荐" bgtype="gold">
        <div className={$style.body}>
          <div className={$style.left}>{first && <ProductZoom product={first} className={$style.first} size="large"></ProductZoom>}</div>
          <div className={$style.right}>
            <div className={$style.right__row}>
              {firstRowProducts.map(p => (
                <ProductZoom className={$style.product} key={p.id} product={p}></ProductZoom>
              ))}
            </div>
            <div className={$style.right__row}>
              {secondRowProducts.map(p => (
                <ProductZoom className={$style.product} key={p.id} product={p}></ProductZoom>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

export default Recommend;
