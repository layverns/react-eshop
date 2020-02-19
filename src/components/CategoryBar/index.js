import React, { useState } from 'react';
import classnames from 'classnames';

import { Dropdown, Card } from 'antd';
import SubCategory from './SubCategory';

import $style from './index.module.scss';

function CategoryBar({
  categories
}){
  const [categoryIndex, setCategoryIndex] = useState(0);
  const onClickCategory = (index) => {
    setCategoryIndex(index);
  }

  let catNodes = categories.map((cat, i) => {

    let overlay = (
      <div>
        {
          cat.subcategories.map(subCat => <SubCategory key={subCat.id} subcategory={subCat} />)
        }
      </div>
    );

    return (
    <li key={cat.id} onClick={() => onClickCategory(i)} className={categoryIndex == i ? 'active' : ''}>
      <Dropdown
        key={cat.id}
        overlay={overlay}
        overlayClassName="categorybar__overlay" 
        getPopupContainer={trigger => trigger.parentNode.parentNode} 
        trigger={['click', 'hover']}>
          <span>{cat.title}</span>
      </Dropdown>
    </li>);
  });
  
  return (
    <div className={classnames($style.categorybar, 'p2')}>
      <div className={classnames($style.categorybar__content, 'container')}>
        <ul>
          {catNodes}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;