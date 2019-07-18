import { all, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import MessagesUtils from '../../helpers/utils/MessagesUtils';

import { selectSocket } from '../app/selectors';
import { selectEventTypes } from '../history/selectors';

import appActions from '../app/actions';
import historyActions from '../history/actions';
import actions from './actions';

// Inners -----------------------------------------------------------------------------------------
function* innerSocketStatus({ payload }) {
  const { status } = payload;
  yield put(appActions.socketParamsSet({ status }));
}

// Incoming ---------------------------------------------------------------------------------------
function* incomingPing({ payload }) {
  const { message } = payload;
  const historyMessage = MessagesUtils.createPingMessage(message);
  yield put(historyActions.messageAdd(historyMessage));
}

function* incomingEmitHistory({ payload }) {
  const message = MessagesUtils.createHistoryMessage(payload);
  const { type } = message;

  const eventTypes = yield select(selectEventTypes);
  if (!eventTypes.includes(type)) {
    yield put(historyActions.eventTypeAdd(type));
  }

  yield put(historyActions.messageAdd(message));
}

function* incomingConnectedUsers({ payload }) {
  const { users } = payload;
  yield put(appActions.socketParamsSet({ connectedUsers: users }));
}

function* incomingUserConnected({ payload }) {
  const { id, connected, handshake } = payload;
  let { connectedUsers } = yield select(selectSocket);

  if (connected) {
    connectedUsers = connectedUsers.concat({
      id,
      connected,
      handshake,
    });
  } else {
    connectedUsers = connectedUsers.filter(user => user.id !== id);
  }

  yield put(appActions.socketParamsSet({ connectedUsers }));
}

function* incomingServerSettings({ payload }) {
  const { settings } = payload;
  const { pingEnabled, imitateUsers } = settings;
  yield put(appActions.appParamsSet({ pingEnabled, imitateUsers }));
}

export default function* socketSaga() {
  yield all([
    takeLatest(actions.INNER_SOCKET_STATUS, innerSocketStatus),
    takeLatest(actions.INCOMING_PING_CLIENT, incomingPing),
    takeLatest(actions.INCOMING_GET_SERVER_SETTINGS, incomingServerSettings),
    takeLatest(actions.INCOMING_CONNECTED_USERS, incomingConnectedUsers),

    takeEvery(actions.INCOMING_EMIT_HISTORY, incomingEmitHistory),
    takeEvery(actions.INCOMING_USER_CONNECTED, incomingUserConnected),
  ]);
}
