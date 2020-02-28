import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Modal } from 'antd';

import EInput from '@/components/EInput';
import $style from './Login.module.scss';

function Login({ visible, onCancel }) {
  let loginRef = useRef();

  let [email, setEmail] = useState('');

  return (
    <div className={$style.login} ref={loginRef}>
      <Modal visible={visible} footer={null} width="386px" getContainer={() => loginRef.current} onCancel={onCancel}>
        <div className={$style.login__content}>
          <div className={$style.login__header}>
            <div className={$style.login__type}>手机号登陆</div>
            <div className={$style.login__split}>&nbsp;</div>
            <div className={classnames($style.login__type, $style.login__type_active)}>邮箱登陆</div>
          </div>
          <div className={$style.login__bodyEmail}>
            <form>
              <EInput className={$style.login__email} prefix={<img src={require('@/assets/login/user.png')} />} placeholder="邮箱账号" />
              <EInput className={$style.login__password} prefix={<img src={require('@/assets/login/lock.png')} />} placeholder="密码" />
              <button className={$style.login__submit}>登陆</button>
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

export default Login;
