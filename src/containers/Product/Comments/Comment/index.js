import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

import Star from '@/components/Star';
import $style from './index.module.scss';

class Comments extends React.Component {
  render() {
    const { className, comment } = this.props;
    const { user, stars, specs, text, images, createdAt } = comment;

    return (
      <div className={classnames(className, $style.comment)}>
        <div className={$style.user}>
          <img className={$style.user__img} src={user.image} alt="user" />
          <div className={$style.user__name}>{user.username}</div>
        </div>
        <div className={$style.detail}>
          <Star className={$style.star} stars={stars} />
          <div className={$style.specs}>{specs}</div>
          <div className={$style.text}>{text}</div>
          {_.isEmpty(images) ? (
            ''
          ) : (
            <div className={$style.images}>
              {images.map(i => (
                <img className={$style.image} key={i} src={i} alt="detail" />
              ))}
            </div>
          )}
          <div className={$style.date}>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</div>
        </div>
      </div>
    );
  }
}

export default Comments;
