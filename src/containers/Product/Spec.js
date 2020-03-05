import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './Spec.module.scss';

function Spec({ image, title, isSelected, className, onSelect, order, index }) {
  let innerNode = null;
  let titleNode = null;
  if (_.isEmpty(image)) {
    innerNode = (
      <div className={$style.spec__text}>
        <div className={$style.text}>{title}</div>
      </div>
    );
  } else {
    innerNode = (
      <span className={$style.spec__image}>
        <img className={$style.image} src={image} />
      </span>
    );
    titleNode = <div className={$style.title}>{title}</div>;
  }

  return (
    <a className={classnames(className, $style.spec, isSelected ? $style.spec_selected : '')} onClick={() => onSelect(order, index)}>
      {innerNode}
      {isSelected && <span className={$style.tick}></span>}
      {titleNode}
    </a>
  );
}

export default Spec;
