import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Intro from './Intro';
import Link from './Link';

import $style from './index.module.scss';

function Footer(className) {
  return (
    <div className={classnames(className, $style.footer)}>
      <Intro />
      <Link />
    </div>
  );
}

export default Footer;
