import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

import { fetchCategories, fetchHotWords } from './actions';
import { delFromCart } from '@/containers/App/actions';
import { makeSelectHotWords, makeSelectCategories } from './selectors';
import { makeSelectCart } from '@/containers/App/selectors';
import CategoryBar from '@/containers/EHeader/CategoryBar';
import CartItem from './CartItem';

import $style from './index.module.scss';

class EHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curHotWordIndex: 0,
      isFixedStyle: false,
    };

    this.headerRef = React.createRef();
    this.interval = null;
  }

  componentDidMount() {
    this.props.onLoad();

    this.interval = setInterval(() => {
      if (_.isEmpty(this.props.hotWords)) {
        return;
      }

      this.setState((prevState, props) => {
        let index = prevState.curHotWordIndex + 4;
        if (index >= props.hotWords.length) {
          index = 0;
        }
        return {
          curHotWordIndex: index,
        };
      });
    }, 5000);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleScroll = evt => {
    let scrollTop = window.pageYOffset;
    if (scrollTop > 170 && !this.state.isFixedStyle) {
      this.setState({
        isFixedStyle: true,
      });
    } else if (scrollTop < 170 && this.state.isFixedStyle) {
      this.setState({
        isFixedStyle: false,
      });
    }
  };

  onClickDelCart = product => {
    this.props.onDelFromCart(product);
  };

  render() {
    const { curHotWordIndex } = this.state;
    const { hotWords, categories, cart } = this.props;

    let hotWordsNode = null;
    let placeholder = '搜索';
    if (!_.isEmpty(hotWords)) {
      placeholder = hotWords[0].keyword;
      let hotWordList = hotWords.slice(curHotWordIndex, Math.min(curHotWordIndex + 4, hotWords.length));
      hotWordsNode = (
        <ul className={$style.search__list}>
          {hotWordList.map(hw => (
            <li key={hw.id}>
              <a>{hw.keyword}</a>
            </li>
          ))}
        </ul>
      );
    }

    let cartQuantity = 0;
    let cartSum = 0;
    if (!_.isEmpty(cart)) {
      cartQuantity = cart.reduce((total, c) => total + c.quantity, 0);
      cartSum = cart.reduce((total, c) => total + c.price * c.quantity, 0);
    }

    let cartOverlay = (
      <div>
        <div className={$style.cart__content}>
          {cart.map(p => {
            let id = p.id + ' ' + p.specs.join(' ');
            return <CartItem className={$style.cart__item} key={id} product={p} onClickDel={this.onClickDelCart} />;
          })}
        </div>
        <div className={$style.cart__footer}>
          <div className={$style.price}>
            <div className={$style.price__title}>商品合计：</div>
            <div className={$style.price__sum}>¥{cartSum}</div>
          </div>
          <div className={$style.checkout}>去购物车结算</div>
        </div>
      </div>
    );

    return (
      <header className={classnames($style.header)} ref={this.headerRef}>
        <div className={this.state.isFixedStyle ? $style.header_fixed : ''}>
          <div className={classnames('container', $style.header__content)}>
            <Link className={$style.header__logo} to="/">
              <span className={$style.header__logoImg}></span>
            </Link>
            <Link className={$style.header__smlogo} to="/">
              <span className={$style.header__smlogoImg}></span>
            </Link>
            <Dropdown overlay={cartOverlay} overlayClassName={$style.cart__overlay} getPopupContainer={() => this.headerRef.current} trigger={['hover']}>
              <a className={$style.cart}>
                <span className={$style.cart__icon} />
                <span className={$style.cart__title}>购物车</span>
                <span className={$style.cart__num}>{cartQuantity}</span>
              </a>
            </Dropdown>
            <a className={$style.user}>
              <span className={$style.user__icon} />
            </a>
            <div className={$style.search}>
              <div className={$style.search__main}>
                <div className={$style.search__wrap}>
                  <div className={$style.search__hide}>>></div>
                  <div className={$style.search__prefix}></div>
                  <input type="text" className={$style.search__input} placeholder={placeholder} />
                </div>
                <div className={$style.search__btn}>
                  <div className={$style.search__icon}></div>
                  <div className={$style.search__text}>搜索</div>
                </div>
              </div>
              {hotWordsNode && (
                <div className={$style.search__hotWord}>
                  <SwitchTransition>
                    <CSSTransition key={curHotWordIndex} timeout={500} classNames="Header_hotWord__text">
                      {hotWordsNode}
                    </CSSTransition>
                  </SwitchTransition>
                </div>
              )}
            </div>
            <CategoryBar className={$style.categoryBar} isFixedStyle={this.state.isFixedStyle} categories={categories} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotWords: makeSelectHotWords(),
  categories: makeSelectCategories(),
  cart: makeSelectCart(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchHotWords());
    dispatch(fetchCategories());
  },
  onDelFromCart: prodcut => {
    dispatch(delFromCart(prodcut));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EHeader);
