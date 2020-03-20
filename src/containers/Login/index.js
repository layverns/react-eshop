import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import validator from 'validator';

import { makeSelectError, makeSelectIsLogining, makeSelectIsShowLogin } from './selectors';
import { login, hideLogin } from './actions';
import Input from '@/components/Input';
import $style from './index.module.scss';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      error: '',
    };
  }

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };
  onClearEmail = e => {
    this.setState({
      email: '',
    });
  };
  onChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };
  onClearPassword = e => {
    this.setState({
      password: '',
    });
  };

  onSubmit = e => {
    e && e.preventDefault();
    if (!validator.isEmail(this.state.email)) {
      return this.setState({
        emailError: true,
        error: '请输入正确的邮箱！',
      });
    }
    if (!validator.isLength(this.state.password, { min: 6 })) {
      return this.setState({
        passwordError: true,
        error: '密码必须大于6位！',
      });
    }
    this.setState({
      emailError: false,
      passwordError: false,
      error: '',
    });

    this.props.onSubmit(this.state.email, this.state.password);
  };

  render() {
    const { isShowLogin, error, isLogining } = this.props;
    return (
      <div className={$style.login} ref={this.containerRef}>
        <Modal visible={isShowLogin} footer={null} width="386px" getContainer={() => this.containerRef.current} onCancel={this.props.onHideLogin}>
          <div className={$style.content}>
            <div className={$style.header}>
              <div className={$style.header__type}>手机号登陆</div>
              <div className={$style.header__split}>&nbsp;</div>
              <div className={classnames($style.header__type, $style.header__type_active)}>邮箱登陆</div>
            </div>
            <div className={$style.body}>
              <form onSubmit={this.onSubmit}>
                <Input
                  className={$style.email}
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  onClear={this.onClearEmail}
                  error={this.state.emailError}
                  prefix={<img src={require('@/assets/login/user.png')} />}
                  hasPostfix={true}
                  placeholder="邮箱账号"
                />
                <Input
                  className={$style.password}
                  value={this.state.password}
                  type="password"
                  onChange={this.onChangePassword}
                  onClear={this.onClearPassword}
                  error={this.state.passwordError}
                  prefix={<img src={require('@/assets/login/lock.png')} />}
                  hasPostfix={true}
                  placeholder="密码"
                />
                {(this.state.error || error) && (
                  <div className={$style.error}>
                    <img src={require('@/assets/login/error.png')} />
                    <span>{this.state.error || error}</span>
                  </div>
                )}
                <button disabled={isLogining} className={$style.submit} type="submit">
                  登陆
                </button>
              </form>
            </div>
            <div className={$style.footer}>
              <div className={$style.social}>
                <a className={classnames($style.social__icon, $style.social__weixin)}></a>
                <a className={classnames($style.social__icon, $style.social__qq)}></a>
                <a className={classnames($style.social__icon, $style.social__weibo)}></a>
                <a className={classnames($style.social__icon, $style.social__wangyi)}></a>
              </div>
              <div className={$style.help}>
                <span className={$style.register}>邮箱注册</span>
                <span className={$style.forget}>忘记密码</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  isLogining: makeSelectIsLogining(),
  isShowLogin: makeSelectIsShowLogin(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onHideLogin: () => dispatch(hideLogin()),
    onSubmit: (email, password) => dispatch(login(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
