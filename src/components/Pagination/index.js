import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Pagination({ className }) {
  return (
    <div className={classnames(className, $style.pagination)}>
      <div className={prev}></div>

      <div className={next}></div>
    </div>
  );
}

export default Pagination;
