import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function Like({ className }) {
  return (
    <div className={classnames(className, $style.like)}>
      <header className={$style.header}>
        <div className={$style.title}>你可能还喜欢</div>
      </header>
      <div className={$style.body}></div>
    </div>
  );
}

export default Like;
