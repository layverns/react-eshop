import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

import $style from './index.module.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      message: '',
    };
  }

  info(message) {
    this.setState({
      isShow: true,
      message,
    });

    setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 3000);
  }

  render() {
    const { isShow, message } = this.state;

    return (
      <Modal className={$style.alert} visible={isShow} footer={null} mask={false} centered={true} closable={false}>
        <div>{message}</div>
      </Modal>
    );
  }
}

let div = document.createElement('div');
document.body.appendChild(div);

export default ReactDOM.render(React.createElement(Alert), div);
