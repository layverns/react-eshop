import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { makeSelectNotices } from './selectors';
import { makeSelectUser } from '@/containers/Login/selectors';

import { fetchNotices } from './actions';
import { showLogin, logout } from '@/containers/Login/actions';

import Login from '@/containers/Login';
import $style from './index.module.scss';

export class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curNoticeIndex: 0,
    };

    this.interval = null;
    this.userMenuRef = React.createRef();
    this.companyMenuRef = React.createRef();
    this.serviceMenuRef = React.createRef();
  }

  componentDidMount() {
    this.props.onLoad();

    this.interval = setInterval(() => {
      this.setState((prevState, props) => {
        if (!_.isEmpty(props.notices)) {
          let index = prevState.curNoticeIndex + 1;
          if (index >= props.notices.length) {
            index = 0;
          }
          return {
            curNoticeIndex: index,
          };
        }
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { notices, user, onShowLogin, onLogout } = this.props;
    const { curNoticeIndex } = this.state;

    let noticeNode = null;
    if (!_.isEmpty(notices)) {
      let notice = notices[curNoticeIndex];
      noticeNode = <Link to={'/notices/' + notice.id}>{notice.title}</Link>;
    }

    let userMenu = (
      <div className={$style.menu}>
        <div className={$style.menu__item}>
          <Link to="/user" className={$style.menu__link}>
            我的积分
          </Link>
        </div>
        <div className={$style.menu__item}>
          <Link to="/user" className={$style.menu__link}>
            优惠券
          </Link>
        </div>
        <div className={$style.menu__item}>
          <Link to="/user" className={$style.menu__link}>
            礼品卡
          </Link>
        </div>
        <div className={$style.menu__item}>
          <Link to="/user" className={$style.menu__link}>
            我的收藏
          </Link>
        </div>
        <div className={$style.menu__item}>
          <div to="/user" className={$style.menu__link} onClick={() => onLogout()}>
            退出登陆
          </div>
        </div>
      </div>
    );

    let companyMenu = (
      <div className={$style.menu}>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>企业购</a>
        </div>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>礼品卡</a>
        </div>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>联系我们</a>
        </div>
      </div>
    );

    let serviceMenu = (
      <div className={$style.menu}>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>在线客服</a>
        </div>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>帮助中心</a>
        </div>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>商务合作</a>
        </div>
        <div className={$style.menu__item}>
          <a className={$style.menu__link}>开放平台</a>
        </div>
      </div>
    );

    return (
      <nav className={$style.nav}>
        <div className={classnames($style.content, 'container')}>
          <div className={classnames($style.notice)}>
            <img className={$style.notice__img} src={require('@/assets/home/speaker.gif')} />
            <ul className={$style.notice__list}>
              <SwitchTransition>
                <CSSTransition key={curNoticeIndex} timeout={500} classNames="Header_notice__text">
                  <li className={$style.notice__item}>{noticeNode}</li>
                </CSSTransition>
              </SwitchTransition>
            </ul>
          </div>

          <div className={$style.link}>
            <ul className={$style.link__list}>
              {_.isEmpty(user) ? (
                <li className={$style.link__item}>
                  <a onClick={onShowLogin}>登录/注册</a>
                </li>
              ) : (
                <li className={$style.link__item} ref={this.userMenuRef}>
                  <Dropdown overlay={userMenu} placement="bottomRight" getPopupContainer={() => this.userMenuRef.current}>
                    <Link to="/user">
                      {user.email} <DownOutlined />
                    </Link>
                  </Dropdown>
                </li>
              )}
              {!_.isEmpty(user) && (
                <li className={$style.link__item}>
                  <a>消息</a>
                </li>
              )}
              {!_.isEmpty(user) && (
                <li className={$style.link__item}>
                  <Link to="/order">我的订单</Link>
                </li>
              )}
              <li className={$style.link__item}>
                <a>会员</a>
              </li>
              <li className={$style.link__item}>
                <a>甄选家</a>
              </li>

              <li className={$style.link__item} ref={this.companyMenuRef}>
                <Dropdown overlay={companyMenu} placement="bottomRight" getPopupContainer={() => this.companyMenuRef.current}>
                  <a>
                    企业采购 <DownOutlined />
                  </a>
                </Dropdown>
              </li>

              <li className={$style.link__item} ref={this.serviceMenuRef}>
                <Dropdown overlay={serviceMenu} placement="bottomRight" getPopupContainer={() => this.serviceMenuRef.current}>
                  <a>
                    客户服务 <DownOutlined />
                  </a>
                </Dropdown>
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
  notices: makeSelectNotices(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onLoad: () => dispatch(fetchNotices()),
    onLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
