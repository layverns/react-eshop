import React from 'react';
import _ from 'lodash';

import $style from './index.module.scss';

import ProductBargain from '@/components/ProductBargain';
import ProductPresent from '@/components/ProductPresent';
import Loading from '@/components/Loading';

import Panel from '../../../components/Panel';

class Welfare extends React.Component {
  render() {
    const { welfareProducts, presentProducts } = this.props;

    return (
      <Panel title="福利社" more="查看全部福利" bgtype="gold">
        <div className={$style.body}>
          <div className={$style.left}>
            <img className={$style.left__image} src={require('@/assets/home/welfare.jpg')} alt="backgroud" />
          </div>
          {_.isEmpty(welfareProducts) ? (
            <Loading />
          ) : (
            <div className={$style.middle}>
              <div className={$style.middle__header}>
                <div className={$style.middle__title}>今日特价</div>
                <div className={$style.middle__more}>查看全部 ></div>
              </div>
              <div className={$style.middle__body}>
                <div className={$style.middle__row}>
                  <ProductBargain className={$style.middle__product} product={welfareProducts[0]} key={welfareProducts[0].id} />
                  <ProductBargain className={$style.middle__product} product={welfareProducts[1]} key={welfareProducts[1].id} />
                </div>
                <div className={$style.middle__row}>
                  <ProductBargain className={$style.middle__product} product={welfareProducts[2]} key={welfareProducts[2].id} />
                  <ProductBargain className={$style.middle__product} product={welfareProducts[3]} key={welfareProducts[3].id} />
                </div>
              </div>
            </div>
          )}
          {_.isEmpty(presentProducts) ? (
            <Loading />
          ) : (
            <div className={$style.right}>
              <div className={$style.right__header}>
                <div className={$style.right__title}>今日买赠</div>
                <div className={$style.right__more}>全部 ></div>
              </div>
              <div className={$style.right__body}>
                {presentProducts.map(p => (
                  <ProductPresent className={$style.right__product} product={p} key={p.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

export default Welfare;
