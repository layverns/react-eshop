import React from 'react';
import _ from 'lodash';

import $style from './index.module.scss';
import ProductFlip from '@/components/ProductFlip';
import Panel from '@/components/Panel';
import Loading from '@/components/Loading';

class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevDisable: false,
      nextDisable: false,
      curIndex: 0,
      offset: 0,
    };

    this.productRef = React.createRef();
  }

  nextSlide = () => {
    this.setState((prevState, props) => {
      const { curIndex } = prevState;
      const { newProducts } = props;
      let nextIndex = curIndex + 4;
      if (nextIndex >= newProducts.length) {
        nextIndex = curIndex;
      }
      if (nextIndex > curIndex) {
        return {
          curIndex: nextIndex,
          offset: nextIndex * -(this.productRef.current.clientWidth + 10),
          prevDisable: false,
        };
      } else {
        return {
          nextDisable: true,
        };
      }
    });
  };

  prevSlide = () => {
    this.setState((prevState, props) => {
      const { curIndex } = prevState;
      let nextIndex = curIndex - 4;
      if (nextIndex <= 0) {
        nextIndex = 0;
      }
      if (nextIndex < curIndex) {
        return {
          curIndex: nextIndex,
          offset: nextIndex * -(this.productRef.current.clientWidth + 10),
          nextDisable: false,
        };
      } else {
        return {
          prevDisable: true,
        };
      }
    });
  };

  render() {
    const { newProducts } = this.props;
    const { prevDisable, nextDisable, offset } = this.state;

    if (_.isEmpty(newProducts)) {
      return <Loading />;
    }
    return (
      <Panel title="新品首发" subtitle="为你寻觅世间好物品" more="更多新品">
        <div className={$style.body}>
          <button className={$style.prev} onClick={this.prevSlide} disabled={prevDisable}>
            &lt;
          </button>
          <button className={$style.next} onClick={this.nextSlide} disabled={nextDisable}>
            &gt;
          </button>
          <div className={$style.slide}>
            <div className={$style.slideList} style={{ transform: `translateX(${offset}px)` }}>
              {newProducts.map(p => (
                <ProductFlip ref={this.productRef} key={p.id} product={p} className={$style.product}></ProductFlip>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

export default NewProduct;
