import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {} from './selectors';
import { makeSelectCarts, makeSelectIsCheckAll, makeSelectIsCheckOne } from './selectors';
import { delFromCart, changeCartQuantity, checkCart } from '@/containers/Cart/actions';
import { checkAll, unCheckAll } from './actions';

import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';
import EHeader from '@/containers/EHeader';
import Nav from '@/containers/Nav';
import CartItem from './CartItem';
import { getInfoOfSpecs } from '@/utils/libs';

import $style from './index.module.scss';

class Cart extends React.Component {
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

  render() {
    const { carts, isCheckAll, onCheckAll, onUnCheckAll, isCheckOne } = this.props;

    const sumPrice = carts.reduce((total, c) => {
      const {
        specs,
        productSpecs,
        productInfo: { prices },
      } = c;
      let price = getInfoOfSpecs(specs, productSpecs, prices);
      return total + price * c.quantity;
    }, 0);

    return (
      <div className={$style.cart}>
        <Nav />
        <EHeader />
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
              <Link className={classnames($style.footer__order, isCheckOne ? '' : $style.footer__order_disabled)} to="/confirm" disabled={!isCheckOne}>
                下单
              </Link>
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onDelFromCart: product => dispatch(delFromCart(product)),
    onCheckCart: product => dispatch(checkCart(product)),
    onChangeCartQuantity: product => dispatch(changeCartQuantity(product)),
    onCheckAll: () => dispatch(checkAll()),
    onUnCheckAll: () => dispatch(unCheckAll()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
