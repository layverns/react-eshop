import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';
import { Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';

import { fetchProduct, setIndexs, setSpecs } from './actions';
import { makeSelectProduct, makeSelectIndexs, makeSelectSpecs } from './selectors';
import { makeSelectUser } from '@/containers/Login/selectors';
import { showLogin } from '@/containers/Login/actions';
import { addToCart } from '@/containers/Cart/actions';
import { getElmOfArray } from '@/utils/libs';

import Loading from '@/components/Loading';
import Nav from '@/containers/Nav';
import Header from '@/containers/Header';
import Spec from './Spec/index';
import Like from './Like/index';
import Count from '@/components/Count';
import Info from './Info/index';

import $style from './index.module.scss';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: '',
      quantity: 1,
    };
  }

  componentDidMount() {
    let id = _.get(this.props, 'match.params.id', null);
    if (!id) {
      return;
    }
    this.props.fetchProduct(id);
  }

  onSelectSpec = (order, index, id, image) => {
    let { indexs, specs } = this.props;
    indexs[order] = index;
    specs[order] = id;

    if (!_.isEmpty(image)) {
      this.setState({
        preview: image,
      });
    }

    this.props.setIndexs(indexs.slice(0, indexs.length));
    this.props.setSpecs(specs.slice(0, specs.length));
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

  render() {
    const { product, indexs } = this.props;
    const { preview, quantity } = this.state;

    let price = 0;
    let oldPrice = 0;
    let score = 0;

    if (!_.isEmpty(product) && !_.isEmpty(product.productInfo) && !_.isEmpty(indexs)) {
      const { productInfo } = product;
      const { prices, oldPrices, scores } = productInfo;

      price = getElmOfArray(prices, indexs.slice(0, indexs.length));
      oldPrice = getElmOfArray(oldPrices, indexs.slice(0, indexs.length));
      score = getElmOfArray(scores, indexs.slice(0, indexs.length));
    }

    if (_.isEmpty(product)) {
      return <Loading />;
    }

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
                          isSelected={indexs[ps.order] == ps.index}
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
            <Like />
            <div className={$style.body}></div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
  indexs: makeSelectIndexs(),
  user: makeSelectUser(),
  specs: makeSelectSpecs(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    setIndexs: indexs => dispatch(setIndexs(indexs)),
    setSpecs: specs => dispatch(setSpecs(specs)),
    onShowLogin: () => dispatch(showLogin()),
    onAddToCart: product => dispatch(addToCart(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
