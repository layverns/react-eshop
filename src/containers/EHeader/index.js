import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { fetchCategories, fetchHotWords } from './actions';
import { makeSelectHotWords, makeSelectCategories } from './selectors';
import $style from './index.module.scss';

import CategoryBar from './CategoryBar';

class EHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curHotWordIndex: 0,
      isFixedStyle: false,
    };
  }

  interval = null;

  componentDidMount() {
    this.props.onLoad();

    this.interval = setInterval(() => {
      if (_.isEmpty(this.props.hotWords)) {
        return;
      }

      let index = this.state.curHotWordIndex + 4;
      if (index >= this.props.hotWords.length) {
        index = 0;
      }
      this.setState({
        curHotWordIndex: index,
      });
    }, 5000);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleScroll = evt => {
    let scrollTop = window.pageYOffset;
    console.log('scrollTop:', scrollTop);
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

  render() {
    const { curHotWordIndex } = this.state;
    const { hotWords, categories } = this.props;

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

    return (
      <header className={classnames($style.header)}>
        <div className={this.state.isFixedStyle ? $style.header_fixed : ''}>
          <div className={classnames('container', $style.header__content)}>
            <Link className={$style.header__logo} to="/">
              <span className={$style.header__logoImg}></span>
            </Link>
            <Link className={$style.header__smlogo} to="/">
              <span className={$style.header__smlogoImg}></span>
            </Link>
            <a className={classnames($style.cart)}>
              <ShoppingCartOutlined className={classnames($style.cart__icon)} />
              <span className={classnames($style.cart__title)}>购物车</span>
              <span className={$style.cart__num}>0</span>
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
//   hotWords = [
//     {
//       id: 1,
//       keyword: '抑菌免洗洗手液',
//     },
//     {
//       id: 2,
//       keyword: '酒精消毒液',
//     },
//     {
//       id: 3,
//       keyword: '日式拉面',
//     },
//     {
//       id: 4,
//       keyword: 'PVC食品级手套',
//     },
//     {
//       id: 5,
//       keyword: '5555555555',
//     },
//     {
//       id: 6,
//       keyword: '6666666666',
//     },
//     {
//       id: 7,
//       keyword: '7777777',
//     },
//   ],
// }) {
//   let [curHotWordIndex, setCurHotWordIndex] = useState(0);

//   setTimeout(() => {
//     let index = curHotWordIndex + 4;
//     if (index >= hotWords.length) {
//       index = 0;
//     }
//     setCurHotWordIndex(index);
//   }, 5000);

// }

const mapStateToProps = createStructuredSelector({
  hotWords: makeSelectHotWords(),
  categories: makeSelectCategories(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchHotWords());
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EHeader);
