import React, { useState, Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import $style from './index.module.scss';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

class ECarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curIndex: 0,
      timer: 0,
    };
  }

  next = () => {
    let nextIndex = this.state.curIndex + 1;
    if (nextIndex >= this.props.carousels.length) {
      nextIndex = 0;
    }
    this.setState({
      curIndex: nextIndex,
    });
  };

  prev = () => {
    let nextIndex = this.state.curIndex - 1;
    if (nextIndex < 0) {
      nextIndex = this.props.carousels.length - 1;
    }
    this.setState({
      curIndex: nextIndex,
    });
  };

  startTimer = () => {
    let interval = setInterval(() => {
      this.next();
    }, 3000);
    this.setState({
      timer: interval,
    });
  };

  stopTimer = index => {
    if (this.state.timer !== 0) {
      clearInterval(this.state.timer);
      this.setState({
        curIndex: index,
      });
    }
  };

  componentWillMount() {
    this.startTimer();
  }

  render() {
    let { carousels } = this.props;

    return (
      <div className={$style.carousel}>
        
        <SwitchTransition>
          <CSSTransition key={this.state.curIndex} timeout={100} classNames="ECarousel__img">
            <a className={$style.carousel__link}>
              <img className={$style.carousel__img} src={carousels[this.state.curIndex].image} />
            </a>
          </CSSTransition>
        </SwitchTransition>

        <div className={$style.carousel__overlay}>
          <div className={classnames($style.carousel__overlayContent, 'container')}>
            <button onClick={() => this.prev()} className={$style.carousel__prev}>
              &lt;
            </button>
            <button onClick={() => this.next()} className={$style.carousel__next}>
              &gt;
            </button>
            <ul className={$style.carousel__dots}>
              {carousels.map((c, index) => (
                <li key={c.productId} className={$style.carousel__dot}>
                  <button className={this.state.curIndex == index ? $style.active : ''} onMouseOver={() => this.stopTimer(index)} onMouseLeave={() => this.startTimer()}></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ECarousel;
