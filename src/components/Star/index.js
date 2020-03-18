import React from 'react';
import classnames from 'classnames';

import $style from './index.module.scss';

function Star({ className, stars }) {
  let starNodes = [];
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starNodes.push(<div className={$style.star__active}></div>);
    } else {
      starNodes.push(<div className={$style.star__empty}></div>);
    }
  }

  return <div className={classnames(className, $style.star)}>{starNodes}</div>;
}

export default Star;
