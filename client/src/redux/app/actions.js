import { makeActionCreator } from '../utils';

const prefix = 'App/';

const TYPES = {
  APP_START         : `${prefix}app-start`,
  APP_PARAMS_SET    : `${prefix}app-params-set`,
  SOCKET_PARAMS_SET : `${prefix}socket-params-set`,
};

const actions = {
  ...TYPES,

  appStart         : makeActionCreator(TYPES.APP_START),
  appParamsSet     : makeActionCreator(TYPES.APP_PARAMS_SET, 'app'),
  socketParamsSet  : makeActionCreator(TYPES.SOCKET_PARAMS_SET, 'socket'),
};

export default actions;
