import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { push } from 'connected-react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

import { fetchCategories, fetchHotWords } from './actions';
import { setKeyword } from '@/containers/Search/actions';
import { delFromCart } from '@/containers/Cart/actions';
import { makeSelectHotWords, makeSelectCategories } from './selectors';
import { makeSelectCarts } from '@/containers/Cart/selectors';
import CategoryBar from '@/containers/Header/CategoryBar';
import Alert from '@/components/Alert';
import CartItem from './CartItem';

import $style from './index.module.scss';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curHotWordIndex: 0,
      isFixedStyle: false,
      searchInput: '',
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
    this.setState = () => {};
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

  onClickSearch = () => {
    const { searchInput } = this.state;
    if (!searchInput) {
      return Alert.info('请输入搜索内容！');
    }
    this.props.onSearch(searchInput);
  };

  render() {
    const { curHotWordIndex, searchInput } = this.state;
    const { hotWords, categories, carts } = this.props;

    let hotWordsNode = null;
    let placeholder = '搜索';
    if (!_.isEmpty(hotWords)) {
      placeholder = hotWords[0].keyword;
      let hotWordList = hotWords.slice(curHotWordIndex, Math.min(curHotWordIndex + 4, hotWords.length));
      hotWordsNode = (
        <ul className={$style.hotword__list}>
          {hotWordList.map(hw => (
            <li className={$style.hotword__item} key={hw.id}>
              <span className={$style.hotword__link}>{hw.keyword}</span>
            </li>
          ))}
        </ul>
      );
    }

    let cartQuantity = 0;
    let cartSum = 0;
    if (!_.isEmpty(carts)) {
      cartQuantity = carts.reduce((total, c) => total + c.quantity, 0);
      cartSum = carts.reduce((total, c) => total + c.price * c.quantity, 0);
    }

    let cartOverlay = (
      <div>
        <div className={$style.cart__content}>
          {!_.isEmpty(carts) &&
            carts.map(p => {
              let id = p.id + p.specs.join('');
              return <CartItem className={$style.cart__item} key={id} product={p} onClickDel={this.onClickDelCart} />;
            })}
        </div>
        <div className={$style.cart__footer}>
          <div className={$style.price}>
            <div className={$style.price__title}>商品合计：</div>
            <div className={$style.price__sum}>¥{cartSum}</div>
          </div>
          <Link className={$style.checkout} to="/cart">
            去购物车结算
          </Link>
        </div>
      </div>
    );

    return (
      <header className={classnames($style.header)} ref={this.headerRef}>
        <div className={this.state.isFixedStyle ? $style.header_fixed : ''}>
          <div className={classnames('container', $style.content)}>
            <Link className={$style.logo} to="/">
              <span className={$style.logo__img}></span>
            </Link>
            <Link className={$style.smlogo} to="/">
              <span className={$style.smlogo__img}></span>
            </Link>
            <Dropdown overlay={cartOverlay} overlayClassName={$style.cart__overlay} getPopupContainer={() => this.headerRef.current} trigger={['hover']}>
              <Link className={$style.cart} to="/cart">
                <span className={$style.cart__icon} />
                <span className={$style.cart__title}>购物车</span>
                <span className={$style.cart__num}>{cartQuantity}</span>
              </Link>
            </Dropdown>
            <Link className={$style.user} to="/user">
              <span className={$style.user__icon} />
            </Link>
            <div className={$style.search}>
              <div className={$style.search__main}>
                <div className={$style.search__wrap}>
                  <div className={$style.search__hide}>>></div>
                  <div className={$style.search__prefix}></div>
                  <input
                    type="text"
                    className={$style.search__input}
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={e => this.setState({ searchInput: e.target.value })}
                  />
                </div>
                <div className={$style.search__btn}>
                  <div className={$style.search__icon}></div>
                  <div className={$style.search__text} onClick={this.onClickSearch}>
                    搜索
                  </div>
                </div>
              </div>
              {hotWordsNode && (
                <div className={$style.hotword}>
                  <SwitchTransition>
                    <CSSTransition key={curHotWordIndex} timeout={500} classNames="Header_hotword__text">
                      {hotWordsNode}
                    </CSSTransition>
                  </SwitchTransition>
                </div>
              )}
            </div>
            <CategoryBar className={$style.category} isFixedStyle={this.state.isFixedStyle} categories={categories} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotWords: makeSelectHotWords(),
  categories: makeSelectCategories(),
  carts: makeSelectCarts(),
});

export const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchHotWords());
    dispatch(fetchCategories());
  },
  onDelFromCart: prodcut => {
    dispatch(delFromCart(prodcut));
  },
  onSearch: keyword => {
    dispatch(setKeyword(keyword));
    dispatch(push(`/search`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
