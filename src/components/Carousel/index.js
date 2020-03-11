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
    }, 3000);
  };

  stopTimer = index => {
    if (!this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({
        curIndex: index,
      });
    }
  };

  componentDidMount() {
    const { autoSlide } = this.props;
    if (autoSlide) this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer(0);
  }

  render() {
    let { carousels, autoHide } = this.props;

    if (_.isEmpty(carousels)) {
      return <Loading />;
    }

    return (
      <div className={$style.carousel}>
        <SwitchTransition>
          <CSSTransition key={this.state.curIndex} timeout={100} classNames="Category__img">
            <a className={$style.link}>
              <img className={$style.image} src={carousels[this.state.curIndex].image} />
            </a>
          </CSSTransition>
        </SwitchTransition>

        <div className={$style.overlay}>
          <div className={$style.overlay__content}>
            <button onClick={() => this.prev()} className={classnames($style.overlay__prev, autoHide ? $style.overlay__autohide : '')}>
              &lt;
            </button>
            <button onClick={() => this.next()} className={classnames($style.overlay__next, autoHide ? $style.overlay__autohide : '')}>
              &gt;
            </button>
            <ul className={$style.overlay__dots}>
              {carousels.map((carousel, index) => (
                <li key={carousel.id} className={$style.overlay__dot}>
                  <button className={this.state.curIndex == index ? $style.active : ''} onMouseOver={() => this.setState({ curIndex: index })}></button>
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
