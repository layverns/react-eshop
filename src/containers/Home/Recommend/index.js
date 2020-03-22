import React from 'react';
import _ from 'lodash';
import $style from './index.module.scss';

import ProductZoom from '@/components/ProductZoom';
import Loading from '@/components/Loading';
import Panel from '../../../components/Panel';

class Recommend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
    };
  }

  changeTab = index => {
    this.setState({
      tabIndex: index,
    });
  };

  render() {
    const { recommends, bestSells } = this.props;
    const { tabIndex } = this.state;

    if (_.isEmpty(recommends) || _.isEmpty(recommends)) {
      return <Loading />;
    }

    let products = tabIndex === 0 ? recommends : bestSells;

    let first = products[0];

    let tabs = [
      {
        title: '编辑推荐',
        callback: this.changeTab,
      },
      {
        title: ' 热销总榜',
        callback: this.changeTab,
      },
    ];

    let firstRowProducts = products.slice(1, 4);
    let secondRowProducts = products.slice(4, 7);

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
