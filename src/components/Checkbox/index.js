import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Checkbox({ className, isChecked, onCheck }) {
  return (
    <div className={classnames(className, $style.checkbox, isChecked ? $style.checkbox_checked : $style.checkbox_none)} type="checkbox" onClick={onCheck}></div>
  );
}

export default Checkbox;
