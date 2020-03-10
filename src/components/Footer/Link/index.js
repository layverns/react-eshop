import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';

function Link() {
  return (
    <div className={$style.link}>
      <div className={classnames('container', $style.content)}>
        <div className={$style.ensure}>
          <div className={$style.ensure__item}>
            <div className={$style.ensure__yi}></div>
            <div className={$style.ensure__title}>网易自营电商</div>
          </div>
          <div className={$style.ensure__item}>
            <div className={$style.ensure__tui}></div>
            <div className={$style.ensure__title}>30天无忧退换货</div>
          </div>
          <div className={$style.ensure__item}>
            <div className={$style.ensure__bao}></div>
            <div className={$style.ensure__title}>满88元免邮费</div>
          </div>
          <div className={$style.ensure__item}>
            <div className={$style.ensure__ping}></div>
            <div className={$style.ensure__title}>品质保证</div>
          </div>
        </div>
        <ul className={$style.list}>
          <li className={$style.list__item}>关于我们</li>
          <li className={$style.list__item}>帮助中心</li>
          <li className={$style.list__item}>售后服务</li>
          <li className={$style.list__item}>配送与验收</li>
          <li className={$style.list__item}>商务合作</li>
          <li className={$style.list__item}>企业采购</li>
          <li className={$style.list__item}>开放平台</li>
          <li className={$style.list__item}>搜索推荐</li>
          <li className={$style.list__item}>友情链接</li>
          <li className={$style.list__item}>廉正举报</li>
        </ul>
        <ul className={$style.certs}>
          <li className={$style.certs__item}>食品经营许可证：JY13301080111719</li>
          <li className={$style.certs__item}>出版物经营许可证：新出发滨字第0132号</li>
          <li className={$style.certs__item}>妙得ICP证号：ICP 证浙B2-20160106</li>
          <li className={$style.certs__item}>浙杭食药监械经营备20171029号</li>
          <li className={$style.certs__item}>营业执照</li>
          <li className={$style.certs__item}>网易公司版权所有 © 1997-2020</li>
        </ul>
        <ul className={$style.certs}>
          <li className={$style.certs__item}>无线电发射设备销售备案：42201919712647</li>
          <li className={$style.certs__item}>(浙杭）网械企备字[2019]第00119号</li>
          <li className={$style.certs__item}>（粤）网械平台备字（2019）第00004号</li>
          <li className={$style.certs__item}>单用途商业预付卡备案证：330100AAC0024</li>
        </ul>
      </div>
    </div>
  );
}

export default Link;
