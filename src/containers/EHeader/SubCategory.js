import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import $style from './SubCategory.module.scss';

function CategoryItem({ icon, title }) {
  return (
    <a className={classnames($style.categoryItem)}>
      <img src={icon} />
      <span>{title}</span>
    </a>
  );
}

function SubCategory({ subcategory }) {
  let image = 'https://yanxuan.nosdn.127.net/6eeaa813566307004ff88f1013bf08fe.png';

  let thirdCategoryNodes = null;
  if (subcategory && !_.isEmpty(subcategory.thirdCategories)) {
    thirdCategoryNodes = subcategory.thirdCategories.map(thirdCat => <CategoryItem key={thirdCat.id} icon={thirdCat.image || image} title={thirdCat.title} />);
  }

  return (
    <div className={$style.subcategory}>
      <div className={classnames($style.subcategory__title)}>{subcategory.title}</div>
      <div className={$style.subcategory__items}>{thirdCategoryNodes}</div>
    </div>
  );
}

export default SubCategory;
