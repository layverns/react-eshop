import { call, all, spawn } from 'redux-saga/effects';

import appSaga from '@/containers/App/saga';
import authSaga from '@/containers/Login/saga';

export default function* rootSaga () {
  const sagas = [
    appSaga,
    authSaga,
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.error('saga error: ', e);
        }
      }
    }))
  );
}