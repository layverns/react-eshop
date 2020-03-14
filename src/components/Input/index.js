import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Input({ className, placeholder, onChange, value }) {
  return <input className={classnames(className, $style.input)} onChange={onChange} placeholder={placeholder} value={value} />;
}

export default Input;
