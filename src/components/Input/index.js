import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function Input({ className, prefix, hasPostfix = false, placeholder, value, type = 'text', lineHeight, onChange, onClear, error }) {
  return (
    <div className={classnames(className, $style.eInput, error ? $style.eInput_error : '')}>
      {prefix && <div className={$style.prefix}>{prefix}</div>}
      <input className={$style.input} type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ lineHeight: lineHeight }} />
      {value && hasPostfix && (
        <div className={$style.postfix} onClick={onClear}>
          <img src={require('@/assets/login/close.png')} />
        </div>
      )}
    </div>
  );
}

export default Input;
