
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';
import homeReducer from './containers/Home/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    home: homeReducer,
  });

  return rootReducer;
}