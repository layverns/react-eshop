import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import 'react-area-linkage/dist/index.css';
import { pca, pcaa } from 'area-data';
import { AreaSelect } from 'react-area-linkage';
import validator from 'validator';

import { makeSelectContacts, makeSelectError } from './selectors';

import { fetchContacts, saveContact, setError } from './actions';

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
      contact: null,
      contacts: null,
    };
  }

  componentDidMount() {
    this.props.onFetchContacts();
  }

  onClickNew = () => {
    this.setState({
      isEdit: true,
      contact: {},
    });
  };

  setDefaultAddress = () => {};

  onClickSave = () => {
    const { province, city, district, address, person, phone } = this.state.contact;
    if (!validator.isNumeric(province + '')) {
      return this.props.onSetError('请选择省份！');
    }
    if (!validator.isNumeric(city + '')) {
      return this.props.onSetError('请选择市！');
    }
    if (!validator.isNumeric(district + '')) {
      return this.props.onSetError('请选择区！');
    }
    if (_.isEmpty(address)) {
      return this.props.onSetError('请填写地址信息！');
    }
    if (_.isEmpty(person)) {
      return this.props.onSetError('请填写收货人！');
    }
    if (!validator.isMobilePhone(phone, 'zh-CN')) {
      return this.props.onSetError('请填写正确的手机号码！');
    }
    this.props.onSetError(null);
    this.props.onSaveContact(this.state.contact);
  };

  onChangeArea = address => {
    const [province, city, district] = address;
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        province,
        city,
        district,
      },
    }));
  };

  onChangeAddress = e => {
    let address = e.target.value;
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        address,
      },
    }));
  };

  onChangePerson = e => {
    let person = e.target.value;
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        person,
      },
    }));
  };

  onChangePhone = e => {
    let phone = e.target.value;
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        phone,
      },
    }));
  };

  onCheckDefault = e => {
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        isDefault: !prev.contact.isDefault,
      },
    }));
  };

  onClickEdit = () => {
    this.setState({
      isEdit: true,
    });
  };

  onClickCancel = () => {
    const { contacts, onSetError } = this.props;

    if (_.isEmpty(contacts)) {
      return onSetError('还没有可用的联系地址！');
    }

    let index = _.findIndex(contacts, c => c.isDefault == 1);
    if (index >= 0) {
      return this.setState({
        contact: contacts[index],
        isEdit: false,
      });
    } else {
      if (!_.isEmpty(contacts[0])) {
        return this.setState({
          contact: contacts[0],
          isEdit: false,
        });
      }
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contacts !== prevState.contacts) {
      if (_.isEmpty(nextProps.contacts)) {
        return {
          isEdit: true,
          contact: {},
          contacts: nextProps.contacts,
        };
      } else {
        let index = _.findIndex(nextProps.contacts, c => c.isDefault == 1);
        if (index >= 0) {
          return {
            isEdit: false,
            contact: nextProps.contacts[index],
            contacts: nextProps.contacts,
          };
        } else {
          if (!_.isEmpty(nextProps.contacts[0])) {
            return {
              isEdit: false,
              contact: nextProps.contacts[0],
              contacts: nextProps.contacts,
            };
          }
          return {
            isEdit: true,
            contact: {},
            contacts: nextProps.contacts,
          };
        }
      }
    }
  }

  render() {
    const { className, error } = this.props;
    const { contact, isEdit } = this.state;

    if (_.isNull(contact) && isEdit == false) {
      return <Loading />;
    }

    const { province, city, district, address, person, phone, isDefault } = contact;

    let defaultArea = null;
    if (province && city && district) {
      defaultArea = [province, city, district];
    }

    return (
      <div className={classnames(className, $style.contact)}>
        <div className={$style.header}>
          <div className={$style.title}>收货信息</div>
        </div>
        <div className={$style.body}>
          {error && (
            <div className={$style.error}>
              <div className={$style.error__icon}></div>
              <div className={$style.error__text}>{error}</div>
            </div>
          )}
          {isEdit ? (
            <div className={$style.edit}>
              <div className={$style.edit__left}>
                <div className={$style.edit__row}>
                  <div className={$style.edit__title}>所在地区:</div>
                  <AreaSelect className={$style.edit__select} defaultArea={defaultArea} level={2} data={pcaa} onChange={this.onChangeArea}></AreaSelect>
                </div>
                <div className={$style.edit__row}>
                  <div className={$style.edit__title}>详细地址:</div>
                  <Textarea className={$style.edit__address} placeholder="详细地址，街道、门牌号等" value={address || ''} onChange={this.onChangeAddress} />
                </div>
                <div className={$style.edit__row}>
                  <div className={$style.edit__person}>
                    <div className={$style.edit__title}>收货人:</div>
                    <Input className={$style.edit__input} value={person || ''} onChange={this.onChangePerson} />
                  </div>
                  <div className={$style.edit__phone}>
                    <div className={$style.edit__title}>手机号码:</div>
                    <Input className={$style.edit__input} value={phone || ''} onChange={this.onChangePhone} />
                  </div>
                </div>
              </div>
              <div className={$style.edit__right}>
                <div className={$style.edit__default}>
                  <Checkbox isChecked={isDefault || false} onCheck={this.onCheckDefault} />
                  <span className={$style.edit__defaultTitle}>设为默认</span>
                </div>
                <div className={$style.edit__btns}>
                  <Button className={$style.edit__save} onClick={this.onClickSave}>
                    保存地址
                  </Button>
                  <Button className={$style.edit__cancel} type="light" onClick={this.onClickCancel}>
                    取消
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={$style.show}>
              <div className={$style.show__left}>
                <div className={$style.show__row}>
                  <div className={$style.show__icon}></div>
                  <div className={$style.show__edit} onClick={this.onClickEdit}>
                    修改
                  </div>
                </div>
                <div className={$style.show__row}>
                  <div className={$style.show__title}>收 货 人：</div>
                  <div className={$style.show__text}>{person}</div>
                </div>
                <div className={$style.show__row}>
                  <div className={$style.show__title}>联系方式：</div>
                  <div className={$style.show__text}>{phone}</div>
                </div>
                <div className={$style.show__row}>
                  <div className={$style.show__title}>收货地址：</div>
                  <div className={$style.show__text}>{pca[86][province] + pcaa[province][city] + pcaa[city][district] + address}</div>
                </div>
              </div>
              <div className={$style.show__right}>
                <div className={$style.show__change}>地址切换</div>
                <div className={$style.show__new} onClick={this.onClickNew}>
                  新建地址
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContacts(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchContacts: () => dispatch(fetchContacts()),
    onSaveContact: contact => dispatch(saveContact(contact)),
    onSetError: error => dispatch(setError(error)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
