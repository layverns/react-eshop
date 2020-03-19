/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_NOTICES } from '../constants';
import { setNotices } from '../actions';
import saga, { getNotices } from '../saga';

describe('getNotices Saga', () => {
  let getReposGenerator;

  beforeEach(() => {
    getReposGenerator = getNotices();
    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('获取通知成功后调用 setNotices action', () => {
    const notices = ['hello', 'notice'];
    const response = {
      data: {
        notices,
      },
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(setNotices(notices)));
  });
});

describe('Saga', () => {
  const navSaga = saga();

  it('saga接受 FETCH_NOTICES action', () => {
    const takeLatestDescriptor = navSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(FETCH_NOTICES, getNotices));
  });
});
