import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import $style from './index.module.scss';

import { loadApp } from './actions';

import Home from '@/containers/Home';
import Login from '@/containers/Login';

class App extends React.Component {
  componentWillMount() {
    this.props.loadApp();
  }

  render() {
    return (
      <div className={$style.app}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }

}
const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
  loadApp: () => dispatch(loadApp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

