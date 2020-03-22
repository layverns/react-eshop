import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Star from '@/components/Star';
import Arrow from '@/components/Arrow';
import Loading from '@/components/Loading';
import Comment from './Comment';
import $style from './index.module.scss';

class Comments extends React.Component {
  render() {
    const { className, avgStars, comments } = this.props;

    return (
      <div className={classnames(className, $style.comments)}>
        <div className={$style.header}>
          <div className={$style.score}>
            <div className={$style.score__title}>好评率</div>
            <div className={$style.score__percent}>{Math.round((avgStars * 1000) / 5) / 10}%</div>
            <Star className={$style.score__star} stars={3} />
          </div>
          <div className={$style.keyword}>
            <div className={$style.keyword__title}>大家都在说：</div>
          </div>
        </div>
        <div className={$style.filter}>
          <div className={$style.filter__title}>排序</div>
          <div className={classnames($style.filter__option, $style.filter__option_active)}>默认</div>
          <div className={$style.filter__option}>
            评价时间
            <Arrow className={$style.filter__arrow} order="asc" />
          </div>
        </div>
        <div className={$style.body}>
          {_.isEmpty(comments) ? <Loading /> : comments.map(c => <Comment className={$style.comment} comment={c} key={c.id} />)}
        </div>
      </div>
    );
  }
}

export default Comments;
