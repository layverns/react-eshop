import React from 'react';
import $style from './LoginMethod.module.scss';
import classnames from 'classnames';

function LoginMethod({
  title,
  children,
  className
}) {
  return (
    <a className={classnames(className, $style.wrapper)}>
    <span className={$style.icon}>
      {children}
    </span>
    <span className={$style.title}>{title}</span>
    </a>
  );
}

export default LoginMethod;
