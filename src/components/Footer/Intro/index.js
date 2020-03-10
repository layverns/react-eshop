import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import $style from './index.module.scss';

function Intro() {
  return (
    <div className={$style.intro}>
      <div className={classnames('container', $style.content)}>
        <div className={$style.intro__col}>
          <div className={$style.intro__title}>客户服务</div>
          <div className={$style.intro__content}>
            <div className={$style.buttons}>
              <div className={$style.button}>
                <div className={$style.button__service}></div>
                <div className={$style.button__title}>在线客服</div>
              </div>
              <div className={$style.button}>
                <div className={$style.button__feedback}></div>
                <div className={$style.button__title}>用户反馈</div>
              </div>
            </div>
          </div>
        </div>
        <div className={$style.intro__col}>
          <div className={$style.intro__title}>何为严选</div>
          <div className={$style.intro__content}>
            <div className={$style.text}>
              网易原创生活类电商品牌，秉承网易一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到优质的商品
            </div>
            <div className={$style.follow}>
              <div>关注我们 :</div>
              <div className={$style.follow__qq}></div>
              <div className={$style.follow__weixin}></div>
              <div className={$style.follow__weibo}></div>
            </div>
          </div>
        </div>
        <div className={$style.intro__col}>
          <div className={$style.intro__title}>扫码下载严选APP</div>
          <div className={$style.intro__content}>
            <div className={$style.qr}>
              <img className={$style.qr__image} src={require('@/assets/home/qr.png')} />
              <div className={$style.qr__title}>下载领大额新人红包</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
