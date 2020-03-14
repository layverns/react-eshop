import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';
import homeReducer from './containers/Home/reducer';
import navReducer from './containers/Nav/reducer';
import eHeaderReducer from './containers/EHeader/reducer';
import productReducer from './containers/Product/reducer';
import listReducer from './containers/List/reducer';
import cartReducer from './containers/Cart/reducer';
import contactReducer from './containers/Confirm/Contact/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    home: homeReducer,
    nav: navReducer,
    eHeader: eHeaderReducer,
    product: productReducer,
    list: listReducer,
    cart: cartReducer,
    contact: contactReducer,
  });

  return rootReducer;
}
