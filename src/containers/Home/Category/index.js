import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Loading from '@/components/Loading';
import ProductFlip from '@/components/ProductFlip';
import Carousel from '@/components/Carousel';

import $style from './index.module.scss';

class Category extends React.Component {
  render() {
    const { category } = this.props;

    if (_.isEmpty(category)) {
      return <Loading />;
    }

    const { id, thirdCategories, title, carousels, products } = category;

    return (
      <div className={$style.category}>
        <div className={classnames($style.content, 'container')}>
          <div className={$style.header}>
            <div className={$style.header__left}>
              <Link className={$style.title} to={`/list/${id}`}>
                {title}
              </Link>
            </div>
            <div className={$style.header__right}>
              <ul className={$style.header__list}>
                {_.isEmpty(thirdCategories)
                  ? null
                  : thirdCategories.map(tc => (
                      <li className={$style.header__item} key={tc.id}>
                        <a>{tc.title}</a>
                        <span>/</span>
                      </li>
                    ))}
              </ul>
              <Link className={$style.header__more} to={`/list/${id}`}>
                查看更多 >
              </Link>
            </div>
          </div>

          <Carousel className={$style.carousel} carousels={carousels} autoHide={true} />

          <div className={$style.products}>
            {_.isEmpty(products) ? null : products.map(p => <ProductFlip className={$style.product} product={p} key={p.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
