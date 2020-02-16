
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import appReducer from './containers/App/reducer';
import authReducer from './containers/Login/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
  });

  return rootReducer;
}