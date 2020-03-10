import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Loading from '@/components/Loading';
import ProductFlip from '@/components/ProductFlip';

import $style from './index.module.scss';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curIndex: 0,
    };
  }

  next = () => {
    this.setState((prevState, props) => {
      let nextIndex = prevState.curIndex + 1;
      if (nextIndex >= props.carousel.images.length) {
        nextIndex = 0;
      }
      return {
        curIndex: nextIndex,
      };
    });
  };

  prev = () => {
    this.setState((prevState, props) => {
      let nextIndex = prevState.curIndex - 1;
      if (nextIndex < 0) {
        nextIndex = props.carousel.images.length - 1;
      }
      return {
        curIndex: nextIndex,
      };
    });
  };

  render() {
    const { carousel } = this.props;

    if (_.isEmpty(carousel)) {
      return <Loading />;
    }

    const { thirdCategories, title, images, products } = carousel;

    return (
      <div className={$style.category}>
        <div className={classnames($style.content, 'container')}>
          <div className={$style.header}>
            <div className={$style.header__left}>
              <Link className={$style.title}>{title}</Link>
            </div>
            <div className={$style.header__right}>
              <ul className={$style.header__list}>
                {_.isEmpty(thirdCategories)
                  ? null
                  : thirdCategories.map(tc => (
                      <li className={$style.header__item} key={tc.id}>
                        <Link>{tc.title}</Link>
                        <span>/</span>
                      </li>
                    ))}
              </ul>
              <Link className={$style.header__more}>查看更多 ></Link>
            </div>
          </div>

          <div className={$style.carousel}>
            <SwitchTransition>
              <CSSTransition key={this.state.curIndex} timeout={100} classNames="Category__img">
                <a className={$style.link}>
                  <img className={$style.image} src={images[this.state.curIndex].image} />
                </a>
              </CSSTransition>
            </SwitchTransition>

            <div className={$style.overlay}>
              <div className={$style.overlay__content}>
                <button onClick={() => this.prev()} className={$style.overlay__prev}>
                  &lt;
                </button>
                <button onClick={() => this.next()} className={$style.overlay__next}>
                  &gt;
                </button>
                <ul className={$style.overlay__dots}>
                  {images.map((image, index) => (
                    <li key={image.id} className={$style.overlay__dot}>
                      <button className={this.state.curIndex == index ? $style.active : ''} onMouseOver={() => this.setState({ curIndex: index })}></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={$style.products}>{_.isEmpty(products) ? null : products.map(p => <ProductFlip className={$style.product} product={p} />)}</div>
        </div>
      </div>
    );
  }
}

export default Category;
