import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

function* getCarousels() {
  try {
  } catch (err) {
    console.error('fetch carousels fail: ', err.response);
  }
}

export default function* saga() {}
