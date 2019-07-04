import { makeActionCreator } from '../utils';

const prefix = 'App/';

const TYPES = {
  APP_START: `${prefix}app-start`,
  APP_PARAMS_SET: `${prefix}app-params-set`,

  SOCKET_PARAMS_SET: `${prefix}socket-params-set`,
  SOCKET_CONNECT: `${prefix}socket-connect`,
  SOCKET_DISCONNECT: `${prefix}socket-disconnect`,
};

const actions = {
  ...TYPES,

  appStart: makeActionCreator(TYPES.APP_START),
  appParamsSet: makeActionCreator(TYPES.APP_PARAMS_SET, 'app'),

  socketParamsSet: makeActionCreator(TYPES.SOCKET_PARAMS_SET, 'socket'),
  socketConnect: makeActionCreator(TYPES.SOCKET_CONNECT),
  socketDisconnect: makeActionCreator(TYPES.SOCKET_DISCONNECT),
};

export default actions;
