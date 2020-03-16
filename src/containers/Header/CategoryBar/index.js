import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

import SubCategory from '../SubCategory';
import Loading from '@/components/Loading';

import $style from './index.module.scss';

function CategoryBar({ className, categories, isFixedStyle }) {
  let categoryRef = useRef();
  let catNodes = categories.map((cat, i) => {
    let overlay = (
      <div>
        {cat.subcategories.map(subCat => (
          <SubCategory key={subCat.id} subcategory={subCat} />
        ))}
      </div>
    );

    return (
      <li key={cat.id} className={$style.categorybar__item}>
        <Link to={`/lists/${cat.id}`}>
          <Dropdown key={cat.id} overlay={overlay} overlayClassName="categorybar__overlay" getPopupContainer={() => categoryRef.current} trigger={['hover']}>
            <span>{cat.title}</span>
          </Dropdown>
        </Link>
      </li>
    );
  });

  if (_.isEmpty(categories)) {
    return <Loading />;
  }

  return (
    <div className={classnames($style.categorybar, className, isFixedStyle ? $style.categorybar_fixed : '')} ref={categoryRef}>
      <div className={classnames($style.categorybar__content)}>
        <ul className={$style.categorybar__list}>
          <li className={classnames($style.categorybar__item, $style.categorybar__item_active)}>首页</li>
          {catNodes}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;
