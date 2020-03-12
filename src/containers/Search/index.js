import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { makeSelectCarousels, makeSelectCategory, makeSelectThirdCategories, makeSelectProducts } from './selectors';

import { search } from './actions';

import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import EHeader from '@/containers/EHeader';
import Nav from '@/containers/Nav';
import ProductList from '@/components/ProductList';

import $style from './index.module.scss';
import moment from 'moment';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let keyword = _.get(this.props, 'match.params.keyword', null);
    if (keyword) {
      this.props.onSearch(keyword);
    }
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className={$style.list}>
        <Nav />
        <EHeader />

        <div className={classnames('container', $style.content)}>
          <Breadcrumb className={$style.breadcrumb} separator=">">
            <Breadcrumb.Item>
              <Link className={$style.breadcrumb__link} to="/">
                首页
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{category.title}</Breadcrumb.Item>
          </Breadcrumb>

          <div className={$style.panel}>
            <div className={$style.filter}>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>分类：</div>
                {thirdCategoryNode}
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>排序：</div>
                <div className={$style.filter__items}>
                  <div className={classnames($style.filter__item, sort == null ? $style.filter__item_active : '')}>默认</div>
                  <div
                    className={classnames($style.filter__item, sort == 'price' ? $style.filter__item_active : '')}
                    onClick={() => this.setState(prevState => ({ sort: 'price', order: prevState.order == 'asc' ? 'desc' : 'asc' }))}
                  >
                    价格
                    {sort == 'price' && (
                      <span className={$style.filter__icon}>
                        {order == 'asc' && <span className={$style.filter__up}></span>}
                        {order == 'desc' && <span className={$style.filter__down}></span>}
                      </span>
                    )}
                  </div>
                  <div
                    className={classnames($style.filter__item, sort == 'time' ? $style.filter__item_active : '')}
                    onClick={() => this.setState(prevState => ({ sort: 'time', order: prevState.order == 'asc' ? 'desc' : 'asc' }))}
                  >
                    上架时间
                    {sort == 'time' && (
                      <span className={$style.filter__icon}>
                        {order == 'asc' && <span className={$style.filter__up}></span>}
                        {order == 'desc' && <span className={$style.filter__down}></span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {listNode}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onSearch: keyword => dispatch(search(keyword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
