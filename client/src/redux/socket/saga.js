import { all, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import MessagesUtils from '../../helpers/utils/MessagesUtils';

import { selectApp } from '../app/selectors';

import appActions from '../app/actions';
import historyActions from '../history/actions';
import actions from './actions';

// Inners -----------------------------------------------------------------------------------------
function* innerSocketStatus({ payload }) {
  const { status } = payload;
  yield put(appActions.socketParamsSet({ status }));
}

// Incoming ---------------------------------------------------------------------------------------
function* incomingPing() {
  const { pingImitateUsers } = yield select(selectApp);
  const message = MessagesUtils.createPingMessage(pingImitateUsers);
  yield put(historyActions.messageAdd(message));
}

function* incomingEmitHistory({ payload }) {
  const message = MessagesUtils.createHistoryMessage(payload);
  yield put(historyActions.messageAdd(message));
}

export default function* socketSaga() {
  yield all([
    takeLatest(actions.INNER_SOCKET_STATUS, innerSocketStatus),
    takeLatest(actions.INCOMING_PING_CLIENT, incomingPing),

    takeEvery(actions.INCOMING_EMIT_HISTORY, incomingEmitHistory),
  ]);
}
