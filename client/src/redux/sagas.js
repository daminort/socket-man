import { all, fork } from 'redux-saga/effects';

import appSaga from './app/saga';
import socketSaga from './socket/saga';

export default function* rootSaga() {
	yield all([
		fork(appSaga),
		fork(socketSaga),
	]);
}
