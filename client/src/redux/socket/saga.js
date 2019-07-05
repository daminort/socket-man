import { all, takeLatest, put } from 'redux-saga/effects';

import MessagesUtils from '../../helpers/utils/MessagesUtils';

import appActions from '../app/actions';
import historyActions from '../history/actions';
import actions from './actions';

// Inners -----------------------------------------------------------------------------------------
function* innerSocketStatus({ payload }) {
  const { status } = payload;
  yield put(appActions.socketParamsSet({ status }));
}

// Incomings --------------------------------------------------------------------------------------
function* incomingPing() {
  const message = MessagesUtils.createPingMessage();
  yield put(historyActions.messageAdd(message));
}

export default function* socketSaga() {
  yield all([
    takeLatest(actions.INNER_SOCKET_STATUS, innerSocketStatus),
    takeLatest(actions.INCOMING_PING_CLIENT, incomingPing),
  ]);
}
