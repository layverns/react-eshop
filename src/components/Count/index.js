import React from 'react';
import classnames from 'classnames';
import $style from './index.module.scss';

function Count({ className, value, onChange, btnWidth = '36px', inputWidth = '60px', height = '30px' }) {
  const onValueChange = e => {
    let val = e.target.value;
    if (isNaN(val)) return;

    if (val < 1) val = 1;
    if (val > 99) val = 99;

    onChange(val);
  };

  const onMinus = () => {
    let newVal = value - 1;
    if (newVal < 1) newVal = 1;
    onChange(newVal);
  };

  const onPlus = () => {
    let newVal = value + 1;
    if (newVal > 99) newVal = 99;
    onChange(newVal);
  };

  return (
    <div className={classnames(className, $style.count)}>
      <span className={$style.minus} onClick={onMinus} style={{ width: btnWidth, height: height }}>
        -
      </span>
      <input className={$style.input} type="text" value={value} onChange={onValueChange} style={{ width: inputWidth, height: height }} />
      <span className={$style.plus} onClick={onPlus} style={{ width: btnWidth, height: height }}>
        +
      </span>
    </div>
  );
}

export default Count;
