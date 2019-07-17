import { makeActionCreator } from '../utils';

const prefixOutcoming = 'Socket/Client/';
const prefixIncoming  = 'Socket/Server/';
const prefixInner = 'Socket/Inner/';

const TYPES = {
  OUTCOMING_PING_ENABLED        : `${prefixOutcoming}ping-enabled`,
  OUTCOMING_IMITATE_USERS       : `${prefixOutcoming}imitate-users`,
  OUTCOMING_EMIT_EVENT          : `${prefixOutcoming}emit-event`,
  OUTCOMING_GET_CONNECTED_USERS : `${prefixOutcoming}get-connected-users`,

  INCOMING_SOCKET_STATUS        : `${prefixIncoming}socket-status`,
  INCOMING_PING_CLIENT          : `${prefixIncoming}ping`,
  INCOMING_EMIT_HISTORY         : `${prefixIncoming}emit-history`,
  INCOMING_CONNECTED_USERS      : `${prefixIncoming}connected-users`,
  INCOMING_USER_CONNECTED       : `${prefixIncoming}user-connected`,

  INNER_SOCKET_STATUS           : `${prefixInner}socket-status`,
};

const actions = {
  ...TYPES,

  outcomingPingEnabled       : makeActionCreator(TYPES.OUTCOMING_PING_ENABLED, 'pingEnabled'),
  outcomingImitateUsers      : makeActionCreator(TYPES.OUTCOMING_IMITATE_USERS, 'imitateUsers'),
  outcomingEmitEvent         : makeActionCreator(TYPES.OUTCOMING_EMIT_EVENT, 'type', 'body'),
  outcomingGetConnectedUsers : makeActionCreator(TYPES.OUTCOMING_GET_CONNECTED_USERS),

  innerSocketStatus          : makeActionCreator(TYPES.INNER_SOCKET_STATUS, 'status'),
};

export default actions;
