import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Loading from '@/components/Loading';

import $style from './index.module.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curIndex: 0,
    };
  }

  timer = null;

  next = () => {
    this.setState((prevState, props) => {
      let nextIndex = prevState.curIndex + 1;
      if (nextIndex >= props.carousels.length) {
        nextIndex = 0;
      }
      return {
        curIndex: nextIndex,
      };
    });
  };

  prev = () => {
    this.setState((prevState, props) => {
      let nextIndex = prevState.curIndex - 1;
      if (nextIndex < 0) {
        nextIndex = props.carousels.length - 1;
      }
      return {
        curIndex: nextIndex,
      };
    });
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      this.next();
    }, 4000);
  };

  stopTimer = index => {
    if (!_.isNull(this.timer)) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({
        curIndex: index,
      });
    }
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    let { carousels } = this.props;

    if (_.isEmpty(carousels)) {
      return <Loading />;
    }
    return (
      <div className={$style.carousel}>
        <SwitchTransition>
          <CSSTransition key={this.state.curIndex} timeout={100} classNames="Home_Carousel__img">
            <span className={$style.link}>
              <img className={$style.image} src={carousels[this.state.curIndex].image} alt="carousel" />
            </span>
          </CSSTransition>
        </SwitchTransition>

        <div className={$style.overlay}>
          <div className={classnames($style.overlay__content, 'container')}>
            <button onClick={() => this.prev()} className={$style.overlay__prev}>
              &lt;
            </button>
            <button onClick={() => this.next()} className={$style.overlay__next}>
              &gt;
            </button>
            <ul className={$style.overlay__dots}>
              {carousels.map((c, index) => (
                <li key={c.id} className={$style.overlay__dot}>
                  <button
                    className={this.state.curIndex === index ? $style.active : ''}
                    onMouseOver={() => this.stopTimer(index)}
                    onMouseLeave={() => this.startTimer()}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
