import React from 'react';
import _ from 'lodash';

import $style from './index.module.scss';

function ThirdCategory({ icon, title }) {
  return (
    <span className={$style.thirdCategory}>
      <img className={$style.thirdCategory__image} src={icon} alt="icon" />
      <span className={$style.thirdCategory__title}>{title}</span>
    </span>
  );
}

function SubCategory({ subcategory }) {
  let image = 'https://yanxuan.nosdn.127.net/6eeaa813566307004ff88f1013bf08fe.png';

  return (
    <div className={$style.subcategory}>
      <div className={$style.title}>{subcategory.title}</div>
      <div className={$style.body}>
        {!_.isEmpty(subcategory) &&
          subcategory.thirdCategories.map(thirdCat => <ThirdCategory key={thirdCat.id} icon={thirdCat.image || image} title={thirdCat.title} />)}
      </div>
    </div>
  );
}

export default SubCategory;
