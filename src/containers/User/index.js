import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUser } from '@/containers/Login/selectors';
import UserLayout from '@/components/UserLayout';
import Loading from '@/components/Loading';
import $style from './index.module.scss';

export class User extends React.Component {
  render() {
    const { user } = this.props;

    if (_.isEmpty(user)) {
      return <Loading />;
    }

    return (
      <UserLayout selected="gerenzhongxin">
        <div className={$style.user}>
          <div className={$style.header}>
            <div className={$style.header__left}>
              <div className={$style.info}>
                <img className={$style.info__img} src={(user && user.image) || require('@/assets/user/avatar.png')} />
                <div className={$style.info__name}>{user && user.username}</div>
              </div>
            </div>
            <div className={$style.header__right}></div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
