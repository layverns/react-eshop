import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { fetchProduct } from './actions';
import { makeSelectProduct } from './selectors';
import $style from './index.module.scss';

import Nav from '@/containers/Nav';
import EHeader from '@/containers/EHeader';
import Spec from './Spec';
import Count from './Count';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: '',
      order: 0,
      index: 0,
      quantity: 0,
    };
  }

  componentDidMount() {
    let id = _.get(this.props, 'match.params.id', null);
    if (!id) {
      return;
    }
    this.props.fetchProduct(id);
  }

  onSelectSpec = (order, index) => {
    this.setState({
      order,
      index,
    });
  };

  render() {
    const { product } = this.props;
    const { preview, order, index, quantity } = this.state;

    let price = 0;
    let old_price = 0;
    let score = 0;
    if (!_.isEmpty(product) && !_.isEmpty(product.productInfo)) {
      const {
        productInfo: { prices, old_prices, scores },
      } = product;

      price = prices[order][index];
      old_price = old_prices[order][index];
      score = scores[order][index];
    }

    return (
      <div>
        <Nav />
        <EHeader></EHeader>
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
                <div className={$style.info}>
                  <div className={classnames($style.price, $style.info__row)}>
                    <div className={classnames($style.info__title, $style.price__title)}>价格</div>
                    <div className={$style.price__prefix}>¥</div>
                    <div className={$style.price__num}>{price}</div>
                  </div>
                  <div className={classnames($style.score, $style.info__row)}>
                    <div className={$style.info__title}>购物返</div>
                    <div className={$style.score__text}>最高返 </div>
                    <div className={$style.score__num}>{score}积分</div>
                  </div>
                  <div className={classnames($style.coupon, $style.info__row)}>
                    <div className={$style.info__title}>限制</div>
                    <div className={$style.coupon__text}>该商品不可使用优惠券</div>
                  </div>
                  <div className={classnames($style.delivery, $style.info__row)}>
                    <div className={$style.info__title}>配送</div>
                    <div className={$style.delivery__text}>
                      <div className={$style.delivery__row}>
                        至<div className={$style.delivery__menu}>北京市西城区西长安街街道 </div>
                      </div>
                      <div className={$style.delivery__tips}>防疫品将优先发货，预计48小时内发出，我们会全力为您服务，请您耐心等待</div>
                    </div>
                  </div>
                  <div className={$style.split}></div>
                  <div className={classnames($style.service, $style.info__row)}>
                    <div className={$style.info__title}>服务</div>
                    <ul className={$style.service__list}>
                      <li>･&nbsp;支持30天无忧退换货</li>
                      <li>･&nbsp;满88元免邮费</li>
                      <li>･&nbsp;48小时快速退款</li>
                      <li>･&nbsp;不享受企业特权</li>
                      <li>･&nbsp;不享受学生特权</li>
                      <li>･&nbsp;不支持回馈金抵扣</li>
                      <li>･&nbsp;不支持返回馈金</li>
                    </ul>
                  </div>
                  <div className={classnames($style.remark, $style.info__row)}>
                    <div className={$style.info__title}>备注</div>
                    <div className={$style.remark__text}></div>
                  </div>
                </div>
                {!_.isEmpty(product.productSpecs) &&
                  product.productSpecs.map(pss => (
                    <div className={$style.spec} key={pss[0].id}>
                      <div className={$style.spec__title}>{pss[0].spec}</div>
                      {pss.map(ps => (
                        <Spec
                          key={ps.id}
                          className={$style.spec__select}
                          title={ps.title}
                          isSelected={ps.order == order && ps.index == index}
                          image={ps.image}
                          order={ps.order}
                          index={ps.index}
                          onSelect={this.onSelectSpec}
                        />
                      ))}
                    </div>
                  ))}
                <div className={$style.quantity}>
                  <div className={$style.quantity__title}>数量</div>
                  <Count value={quantity} onChange={val => this.setState({ quantity: val })} />
                </div>
              </div>
            </div>
            <div className={$style.like}></div>
            <div className={$style.body}></div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
