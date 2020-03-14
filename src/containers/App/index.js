import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import $style from './index.module.scss';

import { loadCart } from '@/containers/Cart/actions';
import { validateToken } from '@/containers/Login/actions';

import Home from '@/containers/Home';
import Notice from '@/containers/Notice';
import Product from '@/containers/Product';
import List from '@/containers/List';
import Cart from '@/containers/Cart';
import Confirm from '@/containers/Confirm';

class App extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <BrowserRouter>
        <div className={$style.app}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/notices/:id" component={Notice} />
            <Route path="/products/:id" component={Product} />
            <Route path="/lists/:categoryId" component={List} />
            <Route path="/cart/" component={Cart} />
            <Route path="/confirm/" component={Confirm} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(validateToken());
    dispatch(loadCart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
