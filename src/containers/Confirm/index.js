import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {} from '@/containers/App/selectors';
import {} from './actions';
import { makeSelectCarts } from '@/containers/Cart/selectors';

import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';

import EHeader from '@/containers/EHeader';
import Nav from '@/containers/Nav';
import Contact from './Contact';
import CartItem from './CartItem';

import $style from './index.module.scss';

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { carts } = this.props;

    return (
      <div className={$style.confirm}>
        <Nav />
        <EHeader />
        <div className={classnames('container', $style.content)}>
          <Contact className={$style.contact} />
          <div className={$style.order}>
            <div className={$style.header}>
              <div className={$style.header__product}>商品信息</div>
              <div className={$style.header__price}>单价</div>
              <div className={$style.header__quantity}>数量</div>
              <div className={$style.header__sum}>小计</div>
              <div className={$style.header__final}>实付</div>
            </div>
            <div className={$style.body}>
              <div className={$style.cart}>
                {carts.map(p => {
                  let id = p.id + ' ' + p.specs.join(' ');
                  return (
                    <CartItem
                      className={$style.cart__item}
                      key={id}
                      product={p}
                      onDelete={this.onDelete}
                      onCheck={this.onCheck}
                      onChangeQuantity={this.onChangeQuantity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={$style.footer}>
            <div className={$style.footer__row}>
              <div className={$style.invoice}>
                <div className={$style.invoice__title}>发票信息：</div>
                <div className={$style.invoice__content}>
                  <Checkbox className={$style.invoice__check} />
                  <span className={$style.invoice__text}>我要开发票</span>
                </div>
              </div>
              <div className={$style.info}>
                <div className={$style.info__row}>
                  <div className={$style.info__title}>商品合计 :</div>
                  <div className={$style.info__text}>$322</div>
                </div>
                <div className={$style.info__row}>
                  <div className={$style.info__title}>运费 :</div>
                  <div className={$style.info__text}>$22</div>
                </div>
                <div className={$style.info__row}>
                  <div className={$style.info__title}>活动优惠 :</div>
                  <div className={$style.info__text}>$322</div>
                </div>
              </div>
            </div>
            <div className={$style.footer__row}>
              <div className={$style.control}>
                <div className={$style.sum}>
                  <div className={$style.sum__title}>应付总额 :</div>
                  <div className={$style.sum__text}>$3234</div>
                </div>
                <Button className={$style.buy}>去付款</Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  carts: makeSelectCarts(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
