import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUser } from '@/containers/Login/selectors';

import { showLogin, validateToken } from '@/containers/Login/actions';

import Login from '@/containers/Login';
import $style from './Nav.module.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curNoticeIndex: 0,
    };
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentDidMount() {
    setTimeout(() => {
      let index = this.state.curNoticeIndex + 1;
      if (index >= this.props.notices.length) {
        index = 0;
      }
      this.setState({
        curNoticeIndex: index,
      });
    }, 10000);
  }

  render() {
    const { notices, user, onShowLogin } = this.props;

    let noticeNode = null;
    if (!_.isEmpty(notices)) {
      let notice = notices[this.state.curNoticeIndex];
      noticeNode = <a>{notice.title}</a>;
    }

    return (
      <nav className={$style.nav}>
        <div className={classnames($style.content, 'container')}>
          <div className={classnames($style.notice)}>
            <img className={$style.notice__img} src={require('@/assets/home/speaker.gif')} />
            <ul className={$style.notice__list}>
              <SwitchTransition>
                <CSSTransition key={this.state.curNoticeIndex} timeout={500} classNames="Header_notice__text">
                  <li className={$style.notice__item}>{noticeNode}</li>
                </CSSTransition>
              </SwitchTransition>
            </ul>
          </div>

          <div className={$style.link}>
            <ul className={$style.link__list}>
              {user ? (
                <div>{user.email}</div>
              ) : (
                <li className={$style.link__item}>
                  <a onClick={onShowLogin}>登录/注册</a>
                </li>
              )}
              <li className={$style.link__item}>
                <a>我的订单</a>
              </li>
              <li className={$style.link__item}>
                <a>会员</a>
              </li>
              <li className={$style.link__item}>
                <a>甄选家</a>
              </li>
              <li className={$style.link__item}>
                <a>企业采购</a>
              </li>
              <li className={$style.link__item}>
                <a>客户服务</a>
              </li>
              <li className={$style.link__item}>
                <a>
                  <span className={$style.link__appIcon}></span>
                  APP
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Login />
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onLoad: () => dispatch(validateToken()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
