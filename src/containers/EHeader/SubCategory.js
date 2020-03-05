import React from 'react';
import _ from 'lodash';

import $style from './SubCategory.module.scss';

function ThirdCategory({ icon, title }) {
  return (
    <a className={$style.thirdCategory}>
      <img className={$style.thirdCategory__image} src={icon} />
      <span className={$style.thirdCategory__title}>{title}</span>
    </a>
  );
}

function SubCategory({ subcategory }) {
  let image = 'https://yanxuan.nosdn.127.net/6eeaa813566307004ff88f1013bf08fe.png';

  let thirdCategoryNodes = null;
  if (subcategory && !_.isEmpty(subcategory.thirdCategories)) {
    thirdCategoryNodes = subcategory.thirdCategories.map(thirdCat => <ThirdCategory key={thirdCat.id} icon={thirdCat.image || image} title={thirdCat.title} />);
  }

  return (
    <div className={$style.subcategory}>
      <div className={$style.title}>{subcategory.title}</div>
      <div className={$style.body}>{thirdCategoryNodes}</div>
    </div>
  );
}

export default SubCategory;
