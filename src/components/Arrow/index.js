import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Arrow({ className, order = 'asc' }) {
  return (
    <div className={classnames(className, $style.arrow)}>
      {order == 'asc' && <div className={$style.arrow__up}></div>}
      {order == 'desc' && <div className={$style.arrow__down}></div>}
    </div>
  );
}

export default Arrow;
