import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';
import { Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';

import { fetchProduct, setSpecs, fetchComments } from './actions';
import { COMMENTS_PER_PAGE } from './constants';
import { makeSelectProduct, makeSelectComments, makeSelectCommentCount, makeSelectCommentPage, makeSelectSpecs, makeSelectCommentAvgStars } from './selectors';
import { makeSelectUser } from '@/containers/Login/selectors';
import { showLogin } from '@/containers/Login/actions';
import { addToCart } from '@/containers/Cart/actions';
import { getInfoOfSpecs } from '@/utils/libs';

import Loading from '@/components/Loading';
import Nav from '@/containers/Nav';
import Header from '@/containers/Header';
import Spec from './Spec/index';
import Count from '@/components/Count';
import Comments from './Comments';
import Info from './Info/index';
import Detail from './Detail';

import $style from './index.module.scss';
import Pagination from '@/components/Pagination';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: '',
      quantity: 1,
      curTab: 0,
    };
  }

  componentDidMount() {
    let id = _.get(this.props, 'match.params.id', null);
    if (!id) {
      return;
    }
    this.props.onFetchProduct(id);
    this.props.onFetchComments(id, 1);
  }

  onSelectSpec = (order, index, id, image) => {
    let { specs } = this.props;
    specs[order] = id;

    if (!_.isEmpty(image)) {
      this.setState({
        preview: image,
      });
    }

    this.props.onSetSpecs(specs.slice(0, specs.length));
  };

  onClickBuy = () => {
    let { user, onShowLogin } = this.props;
    if (_.isEmpty(user)) {
      onShowLogin();
    }
  };

  onClickAddToCart = price => {
    const { product, specs, onAddToCart } = this.props;
    const { quantity } = this.state;

    if (_.isEmpty(specs) || _.isEmpty(product)) {
      message.error('请选择商品规格');
      return;
    }

    onAddToCart({
      ...product,
      price,
      specs,
      quantity,
    });
  };

  onChangeCommentPage = page => {
    console.log('onChangeCommentPage');
    let id = _.get(this.props, 'match.params.id', null);
    if (!id) {
      return;
    }
    this.props.onFetchComments(id, page);
  };

  render() {
    const { product, specs, comments, commentCount, commentPage, commentAvgStars } = this.props;
    const { preview, quantity, curTab } = this.state;

    if (_.isEmpty(product)) {
      return <Loading />;
    }

    let price = 0;
    let oldPrice = 0;
    let score = 0;
    if (!_.isEmpty(product) && !_.isEmpty(product.productInfo) && !_.isEmpty(specs)) {
      const {
        productInfo: { prices, oldPrices, scores },
        productSpecs,
      } = product;

      price = getInfoOfSpecs(specs, productSpecs, prices);
      oldPrice = getInfoOfSpecs(specs, productSpecs, oldPrices);
      score = getInfoOfSpecs(specs, productSpecs, scores);
    }

    const { details } = product;

    return (
      <div>
        <Nav />
        <Header></Header>
        {product && (
          <div className={classnames('container', $style.content)}>
            <Breadcrumb className={$style.breadcrumb} separator=">">
              <Breadcrumb.Item>
                <Link className={$style.breadcrumb__link} to="/">
                  首页
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.category.title}</Breadcrumb.Item>
              <Breadcrumb.Item>{product.thirdCategory.title}</Breadcrumb.Item>
              <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div className={$style.header}>
              {!_.isEmpty(product.images) && (
                <div className={$style.preview}>
                  <img className={$style.preview__img} src={preview || product.images[0]} />
                  <ul className={$style.preview__list}>
                    {product.images.map(img => (
                      <li className={$style.preview__item} key={img} onMouseOver={() => this.setState({ preview: img })}>
                        <img className={$style.preview__icon} src={img} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={$style.detail}>
                <div className={$style.title}>{product.title}</div>
                <div className={$style.subtitle}>{product.subtitle}</div>
                <Info className={$style.info} price={price} oldPrice={oldPrice} score={score} />
                {!_.isEmpty(product.productSpecs) &&
                  product.productSpecs.map(pss => (
                    <div className={$style.spec} key={pss[0].id}>
                      <div className={$style.spec__title}>{pss[0].spec}</div>
                      {pss.map(ps => (
                        <Spec
                          key={ps.id}
                          className={$style.spec__select}
                          title={ps.title}
                          isSelected={specs.includes(ps.id)}
                          image={ps.image}
                          order={ps.order}
                          index={ps.index}
                          id={ps.id}
                          onSelect={this.onSelectSpec}
                        />
                      ))}
                    </div>
                  ))}
                <div className={$style.quantity}>
                  <div className={$style.quantity__title}>数量</div>
                  <Count value={quantity} onChange={val => this.setState({ quantity: val })} />
                </div>
                <div className={$style.action}>
                  <button className={$style.action__buy} onClick={this.onClickBuy}>
                    立即购买
                  </button>
                  <button className={$style.action__cart} onClick={() => this.onClickAddToCart(price)}>
                    <span className={$style.action__icon}></span>
                    <span>加入购物车</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={$style.body}>
              <div className={$style.relevant}>
                <ul className={$style.tabs}>
                  <li className={classnames($style.tab, curTab == 0 && $style.tab_active)} onClick={() => this.setState({ curTab: 0 })}>
                    详情
                  </li>
                  <li className={classnames($style.tab, curTab == 1 && $style.tab_active)} onClick={() => this.setState({ curTab: 1 })}>
                    评价
                  </li>
                  <li className={classnames($style.tab, curTab == 2 && $style.tab_active)} onClick={() => this.setState({ curTab: 2 })}>
                    常见问题
                  </li>
                </ul>
                <div>
                  {curTab == 0 && <Detail details={details} />}
                  {curTab == 1 && <Comments className={$style.comments} comments={comments} count={commentCount} avgStars={commentAvgStars} />}
                  {curTab == 1 && (
                    <Pagination
                      className={$style.pagination}
                      page={commentPage}
                      pageCount={Math.ceil(commentCount / COMMENTS_PER_PAGE)}
                      onChangePage={this.onChangeCommentPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
  user: makeSelectUser(),
  specs: makeSelectSpecs(),
  comments: makeSelectComments(),
  commentCount: makeSelectCommentCount(),
  commentPage: makeSelectCommentPage(),
  commentAvgStars: makeSelectCommentAvgStars(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchProduct: id => dispatch(fetchProduct(id)),
    onFetchComments: (id, page) => dispatch(fetchComments(id, page)),
    onSetSpecs: specs => dispatch(setSpecs(specs)),
    onShowLogin: () => dispatch(showLogin()),
    onAddToCart: product => dispatch(addToCart(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
