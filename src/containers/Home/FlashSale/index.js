import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import $style from './index.module.scss';

import ProductTime from '@/components/ProductTime';
import Loading from '@/components/Loading';

import Panel from '../../../components/Panel';

class FlashSale extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment(),
    };
  }

  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        time: moment(prevState.time).subtract(1, 'seconds'),
      }));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { timeProducts } = this.props;
    const { time } = this.state;

    if (_.isEmpty(timeProducts)) {
      return <Loading />;
    }

    return (
      <Panel title="限时购" more="更多抢购">
        <div className={$style.body}>
          <div className={$style.left}>
            <a className={$style.link}></a>
            <div className={$style.title}>14点场</div>
            <div className={$style.line}></div>
            <div className={$style.subtitle}>距离结束还剩</div>
            <div className={$style.timer}>
              <div className={$style.timer__time}>{moment(time).hour()}</div>
              <div className={$style.timer__colon}>:</div>
              <div className={$style.timer__time}>{moment(time).minute()}</div>
              <div className={$style.timer__colon}>:</div>
              <div className={$style.timer__time}>{moment(time).second()}</div>
            </div>
            <button className={$style.all}>查看全部 ></button>
          </div>
          <div className={$style.right}>
            <div className={$style.right__row}>
              <ProductTime className={$style.product} product={timeProducts[0]}></ProductTime>
              <ProductTime className={$style.product} product={timeProducts[1]}></ProductTime>
            </div>
            <div className={$style.right__row}>
              <ProductTime className={$style.product} product={timeProducts[2]}></ProductTime>
              <ProductTime className={$style.product} product={timeProducts[3]}></ProductTime>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

export default FlashSale;
