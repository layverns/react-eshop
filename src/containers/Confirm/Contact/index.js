import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'react-area-linkage/dist/index.css';
import { pca, pcaa } from 'area-data';
import { AreaSelect } from 'react-area-linkage';
import validator from 'validator';
import { Modal } from 'antd';

import { makeSelectContacts, makeSelectError, makeSelectContact, makeSelectIsEdit } from './selectors';

import { fetchContacts, saveContact, setError, setContact, setIsEdit } from './actions';

import Loading from '@/components/Loading';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Selection from './Selection';

import $style from './index.module.scss';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowChange: false,
      contact: {},
    };

    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    this.props.onFetchContacts();
  }

  onClickNew = () => {
    this.props.onSetIsEdit(true);
    this.setState({
      contact: {},
    });
  };

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
    this.props.onSetIsEdit(true);
    this.setState({
      contact: this.props.contact,
    });
  };

  onClickCancel = () => {
    const { contacts, onSetError } = this.props;

    if (_.isEmpty(contacts)) {
      return onSetError('还没有可用的联系地址！');
    }

    this.props.onSetIsEdit(false);
  };

  onHideChange = () => {
    this.setState({
      isShowChange: false,
    });
  };

  onClickChange = () => {
    this.setState({
      isShowChange: true,
    });
  };

  onClickSelection = id => {
    const { contacts } = this.props;
    let index = contacts.findIndex(c => c.id === id);
    if (index >= 0) {
      this.props.onSetContact(contacts[index]);
    }
  };

  render() {
    const { className, error, contacts, isEdit } = this.props;
    const { isShowChange } = this.state;

    let contact = null;
    if (isEdit) {
      contact = this.state.contact;
    } else {
      contact = this.props.contact;
    }

    if (_.isEmpty(contact) && isEdit === false) {
      return <Loading />;
    }

    const { province, city, district, address, person, phone, isDefault } = contact;

    let defaultArea = null;
    if (province && city && district) {
      defaultArea = [province, city, district];
    }

    return (
      <div className={classnames(className, $style.contact)} ref={this.bodyRef}>
        <Modal className={$style.change} visible={isShowChange} footer={null} getContainer={() => this.bodyRef.current} onCancel={this.onHideChange}>
          <div className={$style.change__header}>选择地址</div>
          <div className={$style.change__body}>
            {!_.isEmpty(contacts) &&
              contacts.map(c => (
                <Selection className={$style.change__selection} active={contact.id === c.id} key={c.id} contact={c} onClick={this.onClickSelection} />
              ))}
          </div>
          <div className={$style.change__footer}>
            <Button className={$style.change__confirm} type="gold" onClick={this.onHideChange}>
              确定
            </Button>
            <Button className={$style.change__cancel} type="gray" onClick={this.onHideChange}>
              取消
            </Button>
          </div>
        </Modal>
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
                  {isDefault ? <div className={$style.show__default}>默认地址</div> : null}
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
                <div className={$style.show__change} onClick={this.onClickChange}>
                  地址切换
                </div>
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
  contact: makeSelectContact(),
  isEdit: makeSelectIsEdit(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFetchContacts: () => dispatch(fetchContacts()),
    onSaveContact: contact => dispatch(saveContact(contact)),
    onSetError: error => dispatch(setError(error)),
    onSetContact: contact => dispatch(setContact(contact)),
    onSetIsEdit: isEdit => dispatch(setIsEdit(isEdit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
