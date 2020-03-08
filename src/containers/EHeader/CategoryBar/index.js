import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import { Dropdown } from 'antd';
import SubCategory from '../SubCategory';
import Loading from '@/components/Loading';

import $style from './index.module.scss';

function CategoryBar({ className, categories, isFixedStyle }) {
  const [categoryIndex, setCategoryIndex] = useState(0);

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
      <li key={cat.id} onClick={() => setCategoryIndex(i)} className={classnames(categoryIndex == i ? 'active' : '', $style.categorybar__item)}>
        <Dropdown key={cat.id} overlay={overlay} overlayClassName="categorybar__overlay" getPopupContainer={() => categoryRef.current} trigger={['click', 'hover']}>
          <span>{cat.title}</span>
        </Dropdown>
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
          <li className={classnames($style.categorybar__item, 'active')}>首页</li>
          {catNodes}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;
