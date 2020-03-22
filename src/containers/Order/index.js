import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ORDER_STATUS } from './constants';
import { makeSelectOrders } from './selectors';
import { fetchOrders, payOrder } from './actions';
import UserLayout from '@/components/UserLayout';
import OrderItem from './OrderItem';
import $style from './index.module.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      unpayOrders: [],
      undeliverOrders: [],
      deliveredOrders: [],
      uncommentOrders: [],
      tabIndex: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { orders: newOrders } = nextProps;
    const { orders } = prevState;
    if (!_.isEqual(newOrders, orders) && !_.isEmpty(nextProps)) {
      return {
        orders: newOrders,
        unpayOrders: newOrders.filter(o => o.status === ORDER_STATUS[0].STATUS),
        undeliverOrders: newOrders.filter(o => o.status === ORDER_STATUS[1].STATUS),
        deliveredOrders: newOrders.filter(o => o.status === ORDER_STATUS[2].STATUS),
        uncommentOrders: newOrders.filter(o => o.status === ORDER_STATUS[3].STATUS),
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.onFetchOrders();
  }

  onClickPay = orderId => {
    this.props.onPayOrder(orderId);
  };

  render() {
    const { orders, unpayOrders, undeliverOrders, deliveredOrders, uncommentOrders, tabIndex } = this.state;

    const orderArray = [orders, unpayOrders, undeliverOrders, deliveredOrders, uncommentOrders];

    let selectedOrders = orderArray[tabIndex];

    let tabs = ['全部订单', '待付款', '待发货', '已发货', '待评价'];
    let tabNodes = tabs.map((t, index) => (
      <li className={classnames($style.tab, tabIndex === index ? $style.tab_active : '')} key={t}>
        <span className={$style.tab__link} onClick={() => this.setState({ tabIndex: index })}>
          {t}
          {orderArray[index].length > 0 && <span className={$style.tab__num}>{orderArray[index].length}</span>}
        </span>
      </li>
    ));

    return (
      <UserLayout selected="dingdanguanli">
        <div className={$style.order}>
          <ul className={$style.tabs}>{tabNodes}</ul>
          <div className={$style.content}>
            {_.isEmpty(selectedOrders) ? (
              <div className={$style.empty}>
                <div className={$style.empty__img}> </div>
                <div className={$style.empty__title}>你已经很久没有下单了!</div>
              </div>
            ) : (
              selectedOrders.map(o => <OrderItem className={$style.item} key={o.id} order={o} onClickPay={this.onClickPay} />)
            )}
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onPayOrder: orderId => dispatch(payOrder(orderId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
