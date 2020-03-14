import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {} from './selectors';

import { makeSelectCart } from './selectors';
import { delFromCart, changeCartQuantity, checkCart } from '@/containers/App/actions';
import {} from './actions';

import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';

import EHeader from '@/containers/EHeader';
import Nav from '@/containers/Nav';
import CartItem from './CartItem';

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
    const { cart } = this.props;

    return (
      <div className={$style.cart}>
        <Nav />
        <EHeader />
        <div className={classnames('container', $style.content)}>
          <div className={$style.header}>
            <Checkbox className={$style.header__checkbox} />
            <div className={$style.header__all}>全选</div>
            <div className={$style.header__info}>商品信息</div>
            <div className={$style.header__price}>单价</div>
            <div className={$style.header__quantity}>数量</div>
            <div className={$style.header__sum}>小计</div>
            <div className={$style.header__option}>操作</div>
          </div>
          <div className={$style.cart}>
            {cart.map(p => {
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
              <Checkbox className={$style.footer__checkbox} />
              <div className={$style.footer__all}>全选</div>
              <div className={$style.footer__del}>批量删除</div>
            </div>
            <div className={$style.footer__right}>
              <div className={$style.footer__sum}>
                <div>应付总额：</div>
                <div className={$style.footer__price}>¥1100.00</div>
              </div>
              <div className={$style.footer__order}>下单</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDelFromCart: product => dispatch(delFromCart(product)),
    onCheckCart: product => dispatch(checkCart(product)),
    onChangeCartQuantity: product => dispatch(changeCartQuantity(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
