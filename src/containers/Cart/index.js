import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { showLogin } from '@/containers/Login/actions';
import { makeSelectUser } from '@/containers/Login/selectors';
import { makeSelectCarts, makeSelectIsCheckAll, makeSelectIsCheckOne } from './selectors';
import { delFromCart, changeCartQuantity, checkCart } from '@/containers/Cart/actions';
import { checkAll, unCheckAll } from './actions';
import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';
import Header from '@/containers/Header';
import Nav from '@/containers/Nav';
import CartItem from './CartItem';
import { getInfoOfSpecs } from '@/utils/libs';

import $style from './index.module.scss';

export class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onDelete = product => {
    this.props.onDelFromCart(product);
  };

  onCheck = product => {
    this.props.onCheckCart(product);
  };

  onChangeQuantity = (product, quantity) => {
    product.quantity = quantity;
    this.props.onChangeCartQuantity(product);
  };

  onClickBuy = () => {
    if (!this.props.isCheckOne) {
      return;
    }

    if (_.isEmpty(this.props.user)) {
      this.props.onShowLogin();
    } else {
      this.props.onClickBuy();
    }
  };

  render() {
    const { carts, isCheckAll, onCheckAll, onUnCheckAll, isCheckOne } = this.props;

    let sumPrice = 0;
    if (!_.isEmpty(carts)) {
      sumPrice = carts.reduce((total, c) => {
        const {
          specs,
          productSpecs,
          productInfo: { prices },
        } = c;
        let price = getInfoOfSpecs(specs, productSpecs, prices);
        return total + price * c.quantity;
      }, 0);

      sumPrice = Math.round(sumPrice * 100) / 100;
    }

    return (
      <div className={$style.cart}>
        <Nav />
        <Header />
        <div className={classnames('container', $style.content)}>
          <div className={$style.header}>
            <Checkbox className={$style.header__checkbox} isChecked={isCheckAll} onCheck={() => (isCheckAll ? onUnCheckAll() : onCheckAll())} />
            <div className={$style.header__all}>全选</div>
            <div className={$style.header__info}>商品信息</div>
            <div className={$style.header__price}>单价</div>
            <div className={$style.header__quantity}>数量</div>
            <div className={$style.header__sum}>小计</div>
            <div className={$style.header__option}>操作</div>
          </div>
          <div className={$style.cart}>
            {_.isEmpty(carts) ? (
              <Loading />
            ) : (
              carts.map(p => {
                let id = p.id + p.specs.join('');
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
              })
            )}
          </div>
          <div className={$style.footer}>
            <div className={$style.footer__left}>
              <Checkbox className={$style.footer__checkbox} isChecked={isCheckAll} onCheck={() => (isCheckAll ? onUnCheckAll() : onCheckAll())} />
              <div className={$style.footer__all}>全选</div>
            </div>
            <div className={$style.footer__right}>
              <div className={$style.footer__sum}>
                <div>应付总额：</div>
                <div className={$style.footer__price}>¥{sumPrice}</div>
              </div>
              <div
                className={classnames($style.footer__order, isCheckOne ? '' : $style.footer__order_disabled)}
                disabled={!isCheckOne}
                onClick={this.onClickBuy}
              >
                下单
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
  isCheckAll: makeSelectIsCheckAll(),
  isCheckOne: makeSelectIsCheckOne(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDelFromCart: product => dispatch(delFromCart(product)),
    onCheckCart: product => dispatch(checkCart(product)),
    onChangeCartQuantity: product => dispatch(changeCartQuantity(product)),
    onCheckAll: () => dispatch(checkAll()),
    onUnCheckAll: () => dispatch(unCheckAll()),
    onClickBuy: () => dispatch(push('/confirm')),
    onShowLogin: () => dispatch(showLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
