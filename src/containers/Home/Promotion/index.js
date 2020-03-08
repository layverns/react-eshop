import React from 'react';
import _ from 'lodash';

import $style from './index.module.scss';
import Loading from '@/components/Loading';
import ProductPromo from './ProductPromo';

function Promotion({ products }) {
  if (_.isEmpty(products)) {
    return <Loading />;
  }
  console.log('Promotion products: ', products);
  return (
    <div className={$style.promotion}>
      <div className="container">
        <div className={$style.body}>
          <div className={$style.title}></div>
          <div className={$style.products}>
            {products.map(product => (
              <ProductPromo className={$style.product} key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
