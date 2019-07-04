import { all, takeLatest, put } from 'redux-saga/effects';
import actions from './actions';

function* appStart() {
  // TODO: restore user data
  yield put(actions.appParamsSet({ appStarted: true }));
}

export default function* appSaga() {
  yield all([
    takeLatest(actions.APP_START, appStart),
  ]);
}
