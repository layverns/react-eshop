import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { makeSelectProducts, makeSelectProductCount, makeSelectCategories, makeSelectKeyword } from './selectors';
import { search } from './actions';
import { PRODUCTS_PER_PAGE } from './constants';
import Loading from '@/components/Loading';
import Footer from '@/components/Footer';
import Header from '@/containers/Header';
import Nav from '@/containers/Nav';
import Arrow from '@/components/Arrow';
import ProductList from '@/components/ProductList';
import Pagination from '@/components/Pagination';

import $style from './index.module.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      categoryId: null,
      sort: null,
      order: 'asc',
      page: 1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.keyword !== prevState.keyword) {
      let keyword = nextProps.keyword;
      const { categoryId, sort, order, page } = prevState;
      nextProps.onSearch({ keyword, categoryId, sort, order, page });

      return {
        keyword: nextProps.keyword,
      };
    }
    return null;
  }

  onChangeCategory = categoryId => {
    this.setState(
      {
        categoryId,
        page: 1,
      },
      () => {
        const { keyword, categoryId, sort, order, page } = this.state;
        this.props.onSearch({ keyword, categoryId, sort, order, page });
      }
    );
  };

  onChangeSort = (sort, order) => {
    order = order == 'asc' ? 'desc' : 'asc';

    this.setState(
      {
        sort,
        order,
      },
      () => {
        const { keyword, categoryId, sort, order, page } = this.state;
        this.props.onSearch({ keyword, categoryId, sort, order, page });
      }
    );
  };

  onChangeProductPage = page => {
    this.setState(
      {
        page,
      },
      () => {
        const { keyword, categoryId, sort, order, page } = this.state;
        this.props.onSearch({ keyword, categoryId, sort, order, page });
      }
    );
  };

  render() {
    const { categories, products, productCount } = this.props;
    const { categoryId, sort, order, page } = this.state;

    return (
      <div className={$style.search}>
        <Nav />
        <Header />

        <div className={classnames('container', $style.content)}>
          <Breadcrumb className={$style.breadcrumb} separator=">">
            <Breadcrumb.Item>
              <Link className={$style.breadcrumb__link} to="/">
                首页
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>搜索</Breadcrumb.Item>
          </Breadcrumb>

          <div className={$style.panel}>
            <div className={$style.filter}>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>分类：</div>
                {!_.isEmpty(categories) && (
                  <div className={$style.filter__items}>
                    <div
                      className={classnames($style.filter__item, categoryId == null ? $style.filter__item_active : '')}
                      key={0}
                      onClick={() => this.onChangeCategory(null)}
                    >
                      全部
                    </div>
                    {categories.map(c => (
                      <div
                        className={classnames($style.filter__item, categoryId == c.id ? $style.filter__item_active : '')}
                        key={c.id}
                        onClick={() => this.onChangeCategory(c.id)}
                      >
                        {c.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={$style.filter__row}>
                <div className={$style.filter__title}>排序：</div>
                <div className={$style.filter__items}>
                  <div className={classnames($style.filter__item, sort == null ? $style.filter__item_active : '')}>默认</div>
                  <div
                    className={classnames($style.filter__item, sort == 'price' ? $style.filter__item_active : '')}
                    onClick={() => this.onChangeSort('price', order)}
                  >
                    价格
                    {sort == 'price' && <Arrow order={order} />}
                  </div>
                  <div
                    className={classnames($style.filter__item, sort == 'createdAt' ? $style.filter__item_active : '')}
                    onClick={() => this.onChangeSort('createdAt', order)}
                  >
                    上架时间
                    {sort == 'createdAt' && <Arrow order={order} />}
                  </div>
                </div>
              </div>
            </div>
            {_.isNull(products) ? (
              <Loading />
            ) : _.isEmpty(products) ? (
              <div className={$style.empty}>
                <div className={$style.empty__img}></div>
                <div className={$style.empty__title}>没有你想要的结果!</div>
              </div>
            ) : (
              <ProductList className={$style.products} products={products} />
            )}
            {!_.isEmpty(products) && (
              <Pagination
                className={$style.pagination}
                page={page}
                pageCount={Math.ceil(productCount / PRODUCTS_PER_PAGE)}
                onChangePage={this.onChangeProductPage}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  productCount: makeSelectProductCount(),
  categories: makeSelectCategories(),
  keyword: makeSelectKeyword(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSearch: ({ keyword, categoryId, sort, order, page }) => dispatch(search({ keyword, categoryId, sort, order, page })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
