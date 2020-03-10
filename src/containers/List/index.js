import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { makeSelectList } from './selectors';

import { fetchList } from './actions';

import Carousel from '@/components/Carousel';
import Loading from '@/components/Loading';

import $style from './index.module.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let categoryId = _.get(this.props, 'match.params.categoryId', null);
    if (categoryId) {
      this.props.onFetchList(categoryId);
    }
  }

  render() {
    const { list } = this.props;

    if (_.isEmpty(list)) {
      return <Loading />;
    }

    return (
      <div className={$style.list}>
        <Carousel images={list.images} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchList: categoryId => {
      dispatch(fetchList(categoryId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
