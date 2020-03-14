import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Button({ className, children, onClick, type = 'gold' }) {
  return (
    <div className={classnames(className, type == 'gold' ? $style.button : $style.button_light)} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
