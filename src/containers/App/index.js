import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import $style from './index.module.scss';

import { loadApp } from './actions';

import Home from '@/containers/Home';
import Notice from '@/containers/Notice';
import Product from '@/containers/Product';
import List from '@/containers/List';
import Cart from '@/containers/Cart';
import Confirm from '@/containers/Confirm';
import Order from '@/containers/Order';
import User from '@/containers/User';
import Search from '@/containers/Search';

class App extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className={$style.app}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
          <Route path="/notices/:id" component={Notice} />
          <Route path="/products/:id" component={Product} />
          <Route path="/lists/:categoryId" component={List} />
          <Route path="/cart/" component={Cart} />
          <Route path="/confirm/" component={Confirm} />
          <Route path="/orders/" component={Order} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(loadApp());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
