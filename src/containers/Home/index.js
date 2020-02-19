
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { Carousel } from 'antd';
import classnames from 'classnames';

import { fetchCategories, fetchCarousels } from './actions';
import { makeSelectCategories, makeSelectCarousels } from './selectors';
import $style from './index.module.scss';

import EHeader from '@/components/EHeader';
import ToolBar from '@/components/ToolBar';
import CategoryBar from '@/components/CategoryBar';
import Item from '@/components/Item';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselIndex: 0
    }
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getCarousels();
  }

  afterChangeCarousel = (current) => {
    this.setState({
      carouselIndex: current,
    });
  }

  render() {
    const { categories } = this.props;
    const { carousels } = this.props;

    let styles = {
      'background-color': 'white'
    }
    let carouselNodes = null;
    if (!_.isEmpty(carousels)) {
      carouselNodes = carousels.map(c => (<img key={c.item_id} src={c.carousel} />));

      styles['background-color'] = carousels[this.state.carouselIndex].color;
    }

    
    return (
      <div >
        <EHeader></EHeader>
        <ToolBar></ToolBar>
        <CategoryBar categories={categories}></CategoryBar>
        <div className={$style.carousel}  style={styles}>
          <div className="container">
            <Carousel autoplay afterChange={this.afterChangeCarousel}>
              {carouselNodes}
            </Carousel>
          </div>
        </div>


        <div className={classnames($style.panel, 'py60')}>
          <div className={classnames($style.panel__content, 'container')}>
            <div className={$style.panel__header}>
              <h2 className={$style.panel__title}>人气推荐</h2>
            </div>

            <Carousel >
              <Item>item1</Item>
            </Carousel>
          </div>
        </div>
        <div>
          <h1>新品首发</h1>
        </div>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  carousels: makeSelectCarousels()
});

export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
    getCarousels: () => dispatch(fetchCarousels()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
