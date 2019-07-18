import { all, takeLatest, put } from 'redux-saga/effects';

import queriesActions from '../queries/actions';
import actions from './actions';

function* appStart() {
  yield put(queriesActions.queriesRestore());
  yield put(actions.appParamsSet({ appStarted: true }));
}

export default function* appSaga() {
  yield all([
    takeLatest(actions.APP_START, appStart),
  ]);
}
