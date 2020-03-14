import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Textarea({ className, placeholder }) {
  return <textarea className={classnames(className, $style.textarea)} placeholder={placeholder}></textarea>;
}

export default Textarea;
