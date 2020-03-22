import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Button({ className, children, onClick, type = 'gold' }) {
  return (
    <div
      className={classnames(className, type === 'gold' && $style.button, type === 'light' && $style.button_light, type === 'gray' && $style.button_gray)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Button;
