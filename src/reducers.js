import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';
import homeReducer from './containers/Home/reducer';
import navReducer from './containers/Nav/reducer';
import headerReducer from './containers/Header/reducer';
import productReducer from './containers/Product/reducer';
import listReducer from './containers/List/reducer';
import cartReducer from './containers/Cart/reducer';
import contactReducer from './containers/Confirm/Contact/reducer';
import orderReducer from './containers/Order/reducer';
import searchReducer from './containers/Search/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    home: homeReducer,
    nav: navReducer,
    header: headerReducer,
    product: productReducer,
    list: listReducer,
    cart: cartReducer,
    contact: contactReducer,
    order: orderReducer,
    search: searchReducer,
  });

  return rootReducer;
}
