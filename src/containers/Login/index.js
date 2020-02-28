import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import validator from 'validator';

import { makeSelectError, makeSelectIsLogining, makeSelectIsShowLogin } from './selectors';
import { login, hideLogin } from './actions';
import EInput from '@/components/EInput';
import $style from './index.module.scss';

class Login extends React.Component {
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
      email: '',
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
          <div className={$style.login__content}>
            <div className={$style.login__header}>
              <div className={$style.login__type}>手机号登陆</div>
              <div className={$style.login__split}>&nbsp;</div>
              <div className={classnames($style.login__type, $style.login__type_active)}>邮箱登陆</div>
            </div>
            <div className={$style.login__bodyEmail}>
              <form onSubmit={this.onSubmit}>
                <EInput
                  className={$style.login__email}
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  onClear={this.onClearEmail}
                  error={this.state.emailError}
                  prefix={<img src={require('@/assets/login/user.png')} />}
                  placeholder="邮箱账号"
                />
                <EInput
                  className={$style.login__password}
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  onClear={this.onClearPassword}
                  error={this.state.passwordError}
                  prefix={<img src={require('@/assets/login/lock.png')} />}
                  placeholder="密码"
                />
                {(this.state.error || error) && (
                  <div className={$style.login__error}>
                    <img src={require('@/assets/login/error.png')} />
                    <span>{this.state.error || error}</span>
                  </div>
                )}
                <button disabled={isLogining} className={$style.login__submit} type="submit">
                  登陆
                </button>
              </form>
            </div>
            <div className={$style.login__footer}>
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
