import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCarousels } from './actions';
import { makeSelectCarousels } from './selectors';

import $style from './index.module.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curIndex: 0,
      timer: 0,
    };
  }

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
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    let { carousels } = this.props;

    if (_.isEmpty(carousels)) {
      return null;
    }
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

const mapStateToProps = createStructuredSelector({
  carousels: makeSelectCarousels(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchCarousels());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
