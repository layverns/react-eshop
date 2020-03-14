import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Input({ className, placeholder, onClick }) {
  return <input className={classnames(className, $style.input)} onClick={onClick} />;
}

export default Input;
