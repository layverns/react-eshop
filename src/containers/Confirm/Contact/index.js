import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import 'react-area-linkage/dist/index.css';
import { pca, pcaa } from 'area-data';
import { AreaSelect } from 'react-area-linkage';

import { makeSelectContacts } from './selectors';

import { fetchContacts } from './actions';

import Loading from '@/components/Loading';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';

import $style from './index.module.scss';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
    };
  }

  componentDidMount() {
    this.props.onFetchContacts();
  }

  render() {
    const { className, contacts } = this.props;

    return (
      <div className={classnames(className, $style.contact)}>
        <div className={$style.header}>
          <div className={$style.title}>收货信息</div>
        </div>
        <div className={$style.body}>
          {/* <div className={$style.show}>
            <div className={$style.show__left}>
              <div className={$style.show__row}>
                <div className={$style.show__icon}></div>
                <div className={$style.show__edit}>修改</div>
              </div>
              <div className={$style.show__row}>
                <div className={$style.show__title}>收 货 人：</div>
                <div className={$style.show__text}>陈先生</div>
              </div>
              <div className={$style.show__row}>
                <div className={$style.show__title}>联系方式：</div>
                <div className={$style.show__text}>13510668681</div>
              </div>
              <div className={$style.show__row}>
                <div className={$style.show__title}>收货地址：</div>
                <div className={$style.show__text}>天津市天津市河东区中山门街道搜索</div>
              </div>
            </div>
            <div className={$style.show__right}>
              <div className={$style.show__change}>地址切换</div>
              <div className={$style.show__new}>新建地址</div>
            </div>
          </div> */}
          <div className={$style.edit}>
            <div className={$style.edit__left}>
              <div className={$style.edit__row}>
                <div className={$style.edit__title}>所在地区:</div>
                <AreaSelect className={$style.edit__select} level={2} data={pcaa}></AreaSelect>
              </div>
              <div className={$style.edit__row}>
                <div className={$style.edit__title}>详细地址:</div>
                <Textarea className={$style.edit__address} placeholder="详细地址，街道、门牌号等" />
              </div>
              <div className={$style.edit__row}>
                <div className={$style.edit__person}>
                  <div className={$style.edit__title}>收货人:</div>
                  <Input className={$style.edit__input} />
                </div>
                <div className={$style.edit__phone}>
                  <div className={$style.edit__title}>手机号码:</div>
                  <Input className={$style.edit__input} />
                </div>
              </div>
            </div>
            <div className={$style.edit__right}>
              <div className={$style.edit__default}>
                <Checkbox />
                <span className={$style.edit__defaultTitle}>设为默认</span>
              </div>
              <div className={$style.edit__btns}>
                <Button className={$style.edit__save}>保存地址</Button>
                <Button className={$style.edit__cancel} type="light">
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContacts(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchContacts: () => dispatch(fetchContacts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
