import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Textarea({ className, placeholder, value, onChange }) {
  return <textarea className={classnames(className, $style.textarea)} placeholder={placeholder} value={value} onChange={onChange}></textarea>;
}

export default Textarea;
