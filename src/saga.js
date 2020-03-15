import { call, all, spawn } from 'redux-saga/effects';

import appSaga from '@/containers/App/saga';
import authSaga from '@/containers/Login/saga';
import homeSaga from '@/containers/Home/saga';
import navSaga from '@/containers/Nav/saga';
import eHeaderSaga from '@/containers/EHeader/saga';
import productSaga from '@/containers/Product/saga';
import listSaga from '@/containers/List/saga';
import cartSaga from '@/containers/Cart/saga';
import contactSaga from '@/containers/Confirm/Contact/saga';
import confirmSaga from '@/containers/Confirm/saga';

export default function* rootSaga() {
  const sagas = [appSaga, authSaga, homeSaga, navSaga, eHeaderSaga, productSaga, listSaga, cartSaga, contactSaga, confirmSaga];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('saga error: ', e);
          }
        }
      })
    )
  );
}
