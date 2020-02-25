import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Carousel } from 'antd';
import $style from './index.module.scss';

function ECarousel({}) {
  let carousels = [
    {
      item_id: 1,
      image:
        'https://yanxuan.nosdn.127.net/619dae0493f6cd078a0d7180edc5acef.jpg',
    },
    {
      item_id: 2,
      image:
        'https://yanxuan.nosdn.127.net/9ff3f2e986220f4eaef23a846e02bac0.png',
    },
    {
      item_id: 3,
      image:
        'https://yanxuan.nosdn.127.net/ec0eb292a835db49ddf433e83b23e5eb.jpg',
    },
  ];

  let carouselNodes = null;
  if (!_.isEmpty(carousels)) {
    carouselNodes = carousels.map(c => (
      <a className={$style.carousel__link}>
        <img className={$style.carousel__img} key={c.item_id} src={c.image} />
      </a>
    ));
  }

  return (
    <div className={$style.carousel}>
      <Carousel autoplay>{carouselNodes}</Carousel>
    </div>
  );
}

export default ECarousel;
