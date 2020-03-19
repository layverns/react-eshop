import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function Detail({ className, details }) {
  let detailNodes = [];
  if (!_.isEmpty(details)) {
    let i = 0;
    while (!_.isEmpty(details[i])) {
      if (details[i].detail.length > 16) {
        detailNodes.push(
          <div className={$style.header__row} key={details[i].title}>
            <div className={$style.header__title}>{details[i].title}</div>
            <div className={$style.header__text}>{details[i].detail}</div>
          </div>
        );
        i++;
      } else {
        detailNodes.push(
          <div className={$style.header__row} key={details[i].title}>
            <div className={$style.header__col}>
              <div className={$style.header__title}>{details[i].title}</div>
              <div className={$style.header__text}>{details[i].detail}</div>
            </div>
            {details[i + 1] && (
              <div className={$style.header__col}>
                <div className={$style.header__title}>{details[i + 1].title}</div>
                <div className={$style.header__text}>{details[i + 1].detail}</div>
              </div>
            )}
          </div>
        );
        i += 2;
      }
    }
  }
  return (
    <div className={classnames(className, $style.detail)}>
      <div className={$style.header}>{detailNodes}</div>
    </div>
  );
}

export default Detail;
