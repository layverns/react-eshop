import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { makeSelectCarousels, makeSelectCategory, makeSelectThirdCategories, makeSelectData } from './selectors';

import { fetchCarousels, fetchData } from './actions';

import Carousel from '@/components/Carousel';
import Loading from '@/components/Loading';
import EHeader from '@/containers/EHeader';
import Nav from '@/containers/Nav';
import Products from './Products';

import $style from './index.module.scss';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thridCategoryId: null,
    };
  }

  componentDidMount() {
    let categoryId = _.get(this.props, 'match.params.categoryId', null);
    if (categoryId) {
      this.props.onFetchCarousels(categoryId);
      this.props.onFetchData(categoryId);
    }
  }

  render() {
    const { carousels, category, thirdCategories, data } = this.props;
    const { thridCategoryId } = this.state;

    let thirdCategoryNode = <Loading />;
    if (!_.isEmpty(thirdCategories)) {
      thirdCategoryNode = (
        <div className={$style.filter__items}>
          <div
            className={classnames($style.filter__item, thridCategoryId == null ? $style.filter__item_active : '')}
            key={0}
            onClick={() => this.setState({ thridCategoryId: null })}
          >
            全部
          </div>
          {thirdCategories.map(tc => (
            <div
              className={classnames($style.filter__item, thridCategoryId == tc.id ? $style.filter__item_active : '')}
              key={tc.id}
              onClick={() => this.setState({ thridCategoryId: tc.id })}
            >
              {tc.title}
            </div>
          ))}
        </div>
      );
    }

    let listNode = <Loading />;
    if (!thridCategoryId && !_.isEmpty(thirdCategories) && !_.isEmpty(data)) {
      listNode = thirdCategories.map(tc => (
        <Products className={$style.products} key={tc.id} products={data[tc.id] && data[tc.id].products} title={tc.title} />
      ));
    } else if (thridCategoryId && !_.isEmpty(data)) {
      let products = data[thridCategoryId] && data[thridCategoryId].products;
      listNode = <Products className={$style.products} products={products} />;
    }

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

          <Carousel carousels={carousels} autoHide={true} />

          <div className={$style.panel}>
            <div className={$style.filter}>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>分类：</div>
                {thirdCategoryNode}
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>配送地区：</div>
                <div className={$style.filter__items}>
                  <div className={$style.filter__item}>香港</div>
                  <div className={$style.filter__item}>澳门</div>
                  <div className={$style.filter__item}>台湾</div>
                  <div className={$style.filter__item}>日韩</div>
                  <div className={$style.filter__item}>欧洲</div>
                  <div className={$style.filter__item}>美洲</div>
                </div>
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>排序：</div>
                <div className={$style.filter__items}>
                  <div className={$style.filter__item}>默认</div>
                  <div className={$style.filter__item}>价格</div>
                  <div className={$style.filter__item}>上架时间</div>
                </div>
              </div>
            </div>
            {listNode}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  carousels: makeSelectCarousels(),
  category: makeSelectCategory(),
  thirdCategories: makeSelectThirdCategories(),
  data: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCarousels: categoryId => dispatch(fetchCarousels(categoryId)),
    onFetchData: categoryId => dispatch(fetchData(categoryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
