import { makeActionCreator } from '../utils';

//const prefixOutcoming = 'Socket/Client/';
const prefixIncoming  = 'Socket/Server/';
const prefixInner = 'Socket/Inner/';

const TYPES = {

  INNER_SOCKET_STATUS: `${prefixInner}socket-status`,

  INCOMING_SOCKET_STATUS : `${prefixIncoming}socket-status`,
  INCOMING_PING_CLIENT   : `${prefixIncoming}ping`,
};

const actions = {
  ...TYPES,

  innerSocketStatus: makeActionCreator(TYPES.INNER_SOCKET_STATUS, 'status'),
};

export default actions;
