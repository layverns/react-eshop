import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { makeSelectCarousels, makeSelectCategory, makeSelectThirdCategories, makeSelectProducts } from './selectors';

import { fetchCarousels, fetchProducts } from './actions';

import Carousel from '@/components/Carousel';
import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Header from '@/containers/Header';
import Nav from '@/containers/Nav';
import ProductList from '@/components/ProductList';

import $style from './index.module.scss';
import moment from 'moment';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thridCategoryId: null,
      region: null,
      sort: null,
      order: 'asc',
    };
  }

  componentDidMount() {
    let categoryId = _.get(this.props, 'match.params.categoryId', null);
    if (categoryId) {
      this.props.onFetchCarousels(categoryId);
      this.props.onFetchProducts(categoryId);
    }
  }

  componentDidUpdate() {
    let categoryId = _.get(this.props, 'match.params.categoryId', null);
    const { category } = this.props;

    if (!_.isEmpty(category) && categoryId != category.id) {
      this.props.onFetchCarousels(categoryId);
      this.props.onFetchProducts(categoryId);
    }
  }

  render() {
    const { carousels, category, thirdCategories, products } = this.props;
    const { thridCategoryId, region, sort, order } = this.state;

    if (_.isEmpty(products)) {
      return <Loading />;
    }
    let filtedThirdCategories = thirdCategories.filter(tc => tc.categoryId == category.id);

    let listNode = null;
    if (_.isNull(thridCategoryId) && !_.isEmpty(thirdCategories) && !_.isEmpty(products)) {
      //全部分类
      if (sort == null) {
        listNode = filtedThirdCategories.map(tc => (
          <ProductList className={$style.products} key={tc.id} products={products.filter(p => p.thirdCategoryId === tc.id)} title={tc.title} />
        ));
      } else {
        let filtedProducts = products.filter(p => _.findIndex(filtedThirdCategories, tc => p.thirdCategoryId === tc.id) > 0);
        filtedProducts.sort((a, b) => {
          if (sort == 'price') {
            return order == 'asc' ? a.price - b.price : b.price - a.price;
          } else if (sort == 'time') {
            return order == 'asc' ? moment(a.createdAt).isAfter(b.createdAt) : moment(b.createdAt).isAfter(a.createdAt);
          }
        });
        listNode = <ProductList className={$style.products} products={filtedProducts} />;
      }
    } else if (!_.isNull(thridCategoryId) && !_.isEmpty(products)) {
      //选择单个分类
      let filtedProducts = products.filter(p => p.thirdCategoryId === thridCategoryId);
      filtedProducts.sort((a, b) => {
        if (sort == 'price') {
          return order == 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sort == 'time') {
          return order == 'asc' ? moment(a.createdAt).isAfter(b.createdAt) : moment(b.createdAt).isAfter(a.createdAt);
        }
      });
      listNode = <ProductList className={$style.products} products={filtedProducts} />;
    }

    let regions = [
      { id: null, title: '全部' },
      { id: 'xianggang', title: '香港' },
      { id: 'aomen', title: '澳门' },
      { id: 'taiwan', title: '台湾' },
      { id: 'rihan', title: '日韩' },
      { id: 'ouzhou', title: '欧洲' },
      { id: 'meizhou', title: '美洲' },
    ];

    return (
      <div className={$style.list}>
        <Nav />
        <Header />

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
                {!_.isEmpty(filtedThirdCategories) && (
                  <div className={$style.filter__items}>
                    <div
                      className={classnames($style.filter__item, thridCategoryId == null ? $style.filter__item_active : '')}
                      key={0}
                      onClick={() => this.setState({ thridCategoryId: null })}
                    >
                      全部
                    </div>
                    {filtedThirdCategories.map(tc => (
                      <div
                        className={classnames($style.filter__item, thridCategoryId == tc.id ? $style.filter__item_active : '')}
                        key={tc.id}
                        onClick={() => this.setState({ thridCategoryId: tc.id })}
                      >
                        {tc.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>配送地区：</div>
                <div className={$style.filter__items}>
                  {regions.map(r => (
                    <div
                      key={r.id}
                      className={classnames($style.filter__item, region == r.id ? $style.filter__item_active : '')}
                      onClick={() => this.setState({ region: r.id })}
                    >
                      {r.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>排序：</div>
                <div className={$style.filter__items}>
                  <div
                    className={classnames($style.filter__item, sort == null ? $style.filter__item_active : '')}
                    onClick={() => this.setState({ sort: null, order: 'asc' })}
                  >
                    默认
                  </div>
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

const mapStateToProps = createStructuredSelector({
  carousels: makeSelectCarousels(),
  category: makeSelectCategory(),
  thirdCategories: makeSelectThirdCategories(),
  products: makeSelectProducts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCarousels: categoryId => dispatch(fetchCarousels(categoryId)),
    onFetchProducts: categoryId => dispatch(fetchProducts(categoryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
