import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './Count.module.scss';

function Count({ value, onChange }) {
  const onValueChange = e => {
    let val = e.target.value;
    if (isNaN(val)) return;

    if (val < 0) val = 0;
    if (val > 99) val = 99;

    onChange(val);
  };

  const onMinus = () => {
    let newVal = value - 1;
    if (newVal < 0) newVal = 0;
    onChange(newVal);
  };

  const onPlus = () => {
    let newVal = value + 1;
    if (newVal > 99) newVal = 99;
    onChange(newVal);
  };

  return (
    <div className={$style.count}>
      <span className={$style.minus} onClick={onMinus}>
        -
      </span>
      <input className={$style.input} type="text" value={value} onChange={onValueChange} />
      <span className={$style.plus} onClick={onPlus}>
        +
      </span>
    </div>
  );
}

export default Count;
