import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import $style from './index.module.scss';

import { noticeApi } from '@/api';
import Header from '@/containers/Header';
import Nav from '@/containers/Nav';
class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: null,
    };
  }

  async componentDidMount() {
    try {
      let id = _.get(this.props, 'match.params.id', null);
      if (!id) {
        return;
      }
      let res = await noticeApi.getNotice(id);
      const notice = _.get(res, 'data.notice', null);
      if (_.isEmpty(notice)) {
        return;
      }
      this.setState({
        notice,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { notice } = this.state;

    return (
      <div className={$style.notice}>
        <Nav></Nav>
        <Header></Header>
        <div className={classnames('container', $style.content)}>
          <Breadcrumb className={$style.breadcrumb} separator=">">
            <Breadcrumb.Item>
              <Link className={$style.breadcrumb__link} to="/">
                首页
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>公告管理</Breadcrumb.Item>
          </Breadcrumb>
          {notice && (
            <div>
              <div className={$style.header}>
                <div className={$style.title}>{notice.title}</div>
                <div className={$style.subtitle}>{notice.subtitle}</div>
                <div className={$style.split}></div>
              </div>
              <pre className={$style.body}>{notice.content}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Notice;
