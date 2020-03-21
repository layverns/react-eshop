import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {} from '@/containers/App/selectors';
import { makeOrder } from './actions';
import { makeSelectCheckedCarts } from '@/containers/Cart/selectors';
import { makeSelectContact } from './Contact/selectors';

import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import Header from '@/containers/Header';
import Nav from '@/containers/Nav';
import Contact from './Contact';
import CartItem from './CartItem';
import { getInfoOfSpecs } from '@/utils/libs';

import $style from './index.module.scss';

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onClickPay = () => {
    const { contact, checkedCarts, onMakeOrder } = this.props;

    if (_.isEmpty(contact)) {
      return Alert.info('请添加收货信息!');
    }
    if (_.isEmpty(checkedCarts)) {
      return Alert.info('购物车没有商品!');
    }

    console.log('onClickPay: ', contact);
    console.log('checkedCarts: ', checkedCarts);
    console.log('onMakeOrder: ', onMakeOrder);
    onMakeOrder();
  };

  render() {
    const { checkedCarts } = this.props;

    let sumPrice = checkedCarts.reduce((total, c) => {
      const {
        specs,
        productSpecs,
        productInfo: { prices },
      } = c;
      let price = getInfoOfSpecs(specs, productSpecs, prices);
      return total + price * c.quantity;
    }, 0);
    let transportFee = 0;
    let discounts = 0;
    let finalPrice = sumPrice - transportFee - discounts;

    return (
      <div className={$style.confirm}>
        <Nav />
        <Header />
        <div className={classnames('container', $style.content)}>
          <Contact className={$style.contact} />
          {_.isEmpty(checkedCarts) ? (
            <Loading />
          ) : (
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
                  {checkedCarts.map(p => {
                    let id = p.id  + p.specs.join('');
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
          )}
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
                  <div className={$style.info__text}>¥{sumPrice}</div>
                </div>
                <div className={$style.info__row}>
                  <div className={$style.info__title}>运费 :</div>
                  <div className={$style.info__text}>¥{transportFee}</div>
                </div>
                <div className={$style.info__row}>
                  <div className={$style.info__title}>活动优惠 :</div>
                  <div className={$style.info__text}>¥{discounts}</div>
                </div>
              </div>
            </div>
            <div className={$style.footer__row}>
              <div className={$style.control}>
                <div className={$style.sum}>
                  <div className={$style.sum__title}>应付总额 :</div>
                  <div className={$style.sum__text}>${finalPrice}</div>
                </div>
                <Button className={$style.buy} onClick={this.onClickPay}>
                  去付款
                </Button>
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
  checkedCarts: makeSelectCheckedCarts(),
  contact: makeSelectContact(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onMakeOrder: () => dispatch(makeOrder()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
