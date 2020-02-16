import React, { useState } from 'react';
import { Alert, Form, Input, Divider, Row, Button, Icon, Col } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import classnames from 'classnames';

import { makeSelectError, makeSelectIsLogining } from './selectors';
import { login } from './actions';

import Header from './Header';
import Footer from './Footer';
import LoginMethod from './LoginMethod';
import $style from './index.module.scss';

import qqIcon from '@/assets/login/qq.png';
import weixinIcon from '@/assets/login/weixin.png';
import weiboIcon from '@/assets/login/weibo.png';
import zhifubaoIcon from '@/assets/login/zhifubao.png';

class Login extends React.Component {
  render() {
    const { 
      error,
      submitForm,
      isLogining,
      form 
    } = this.props;

    const { getFieldDecorator, setFieldsValue, validateFields } = form;

    let errorMessage = null;
    if (error) {
      errorMessage = <Alert className={classnames('mb4')} message={error} type="error" closable />
    }

    const onSubmitForm = (evt) => {
      if (isLogining) return;

      evt && evt.preventDefault();

      validateFields((err, values) => {
        if (!err) {
          submitForm(values.email, values.password);
        }
      });
    };

    return (
      <div >
        <Header></Header>
        <div className={$style.banner}>
          <div className={classnames('container', $style.banner__content)}>
            <Row>
              <Col lg={16} md={12}><img className={$style.banner__img} src={require('@/assets/login/banner.png')} /></Col>
              <Col lg={8} md={12}>
                <div className={$style.panel}>
                  <div className={$style.panel__header}>
                    <img className={$style.logo} src={require('@/assets/logo.png')} />
                    <div className={$style.title}>欢迎登陆eshop</div>
                  </div>
                  {errorMessage}
                  <div className={$style.panel__body}>
                    <Form onSubmit={onSubmitForm}>
                      <Form.Item>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              required: true,
                              message: '请输入邮箱!',
                            },
                          ],
                        })(<Input
                          prefix={<Icon type="mail" />}
                          placeholder="邮箱"
                          allowClear
                          onChange={(evt) => setFieldsValue({ email: evt.target.value })}
                        />)}
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: '请输入密码!',
                            },
                          ],
                        })(<Input.Password
                          prefix={<Icon type="lock" />}
                          visibilityToggle
                          placeholder="密码"
                          allowClear
                          onChange={(evt) => setFieldsValue({ password: evt.target.value })}
                        />)}
                      </Form.Item>

                      <Row className={classnames('mb4')} type="flex" justify="end">
                        <Button className={$style.header__feedback} type="link">忘记密码?</Button>
                        <Button className={$style.header__feedback} type="link">注册</Button>
                      </Row>
                      <Button htmlType="submit" type="danger" loading={isLogining} block>
                        登陆
                    </Button>
                    </Form>
                    <Divider></Divider>
                    <div className={$style.others}>
                      <span className={$style.others__title}>其他登录方式:</span>
                      <LoginMethod className={$style.others__icon} title="QQ">
                        <img src={qqIcon} />
                      </LoginMethod>
                      <LoginMethod className={$style.others__icon} title="微信">
                        <img src={weixinIcon} />
                      </LoginMethod>
                      <LoginMethod className={$style.others__icon} title="微博">
                        <img src={weiboIcon} />
                      </LoginMethod>
                      <LoginMethod className={$style.others__icon} title="支付宝">
                        <img src={zhifubaoIcon} />
                      </LoginMethod>
                      <LoginMethod className={$style.others__icon} title="手机号登录">
                      </LoginMethod>
                    </div>
                  </div>
                </div></Col>
            </Row>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  isLogining: makeSelectIsLogining(),
});

export function mapDispatchToProps(dispatch) {
  return {
    submitForm: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'login' })(Login));

