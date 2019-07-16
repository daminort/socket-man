import { makeActionCreator } from '../utils';

const prefixOutcoming = 'Socket/Client/';
const prefixIncoming  = 'Socket/Server/';
const prefixInner = 'Socket/Inner/';

const TYPES = {
  OUTCOMING_PING_ENABLED    : `${prefixOutcoming}ping-enabled`,
  OUTCOMING_EMIT_EVENT      : `${prefixOutcoming}emit-event`,

  INNER_SOCKET_STATUS       : `${prefixInner}socket-status`,

  INCOMING_SOCKET_STATUS    : `${prefixIncoming}socket-status`,
  INCOMING_PING_CLIENT      : `${prefixIncoming}ping`,
  INCOMING_EMIT_HISTORY     : `${prefixIncoming}emit-history`,
};

const actions = {
  ...TYPES,

  outcomingPingEnabled : makeActionCreator(TYPES.OUTCOMING_PING_ENABLED, 'pingEnabled'),
  outcomingEmitEvent   : makeActionCreator(TYPES.OUTCOMING_EMIT_EVENT, 'type', 'body'),

  innerSocketStatus    : makeActionCreator(TYPES.INNER_SOCKET_STATUS, 'status'),
};

export default actions;
