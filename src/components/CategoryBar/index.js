import React, { useState } from 'react';
import classnames from 'classnames';

import { Dropdown } from 'antd';
import SubCategory from './SubCategory';

import $style from './index.module.scss';

function CategoryBar({
  className,
  categories = [
    {
      id: 1,
      title: '11111',
      subcategories: [
        {
          id: 1,
          title: 's111111',
          thirdCategories: [
            {
              id: 1,
              icon:
                'https://yanxuan.nosdn.127.net/be2bb1f481165edf97d46ba6f7ea9c11.png',
              title: 't111111',
            },
          ],
        },
      ],
    },
  ],
}) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  let catNodes = categories.map((cat, i) => {
    let overlay = (
      <div>
        {cat.subcategories.map(subCat => (
          <SubCategory key={subCat.id} subcategory={subCat} />
        ))}
      </div>
    );

    return (
      <li
        key={cat.id}
        onClick={() => setCategoryIndex(i)}
        className={categoryIndex == i ? 'active' : ''}
      >
        <Dropdown
          key={cat.id}
          overlay={overlay}
          overlayClassName="categorybar__overlay"
          getPopupContainer={trigger => trigger.parentNode.parentNode}
          trigger={['click', 'hover']}
        >
          <span>{cat.title}</span>
        </Dropdown>
      </li>
    );
  });

  return (
    <div className={classnames($style.categorybar, className)}>
      <div className={classnames($style.categorybar__content)}>
        <ul>
          <li className="active">首页</li>
          {catNodes}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;
