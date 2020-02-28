import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function EInput({ className, prefix, placeholder, value, onChange, onClear, error }) {
  return (
    <div className={classnames(className, $style.eInput, error ? $style.eInput_error : '')}>
      <div className={$style.prefix}>{prefix}</div>
      <input className={$style.input} placeholder={placeholder} value={value} onChange={onChange} />
      {value && (
        <div className={$style.postfix} onClick={onClear}>
          <img src={require('@/assets/login/close.png')} />
        </div>
      )}
    </div>
  );
}

export default EInput;
