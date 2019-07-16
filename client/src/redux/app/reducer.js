import Immutable from 'seamless-immutable';

import CommonUtils from '../../helpers/utils/CommonUtils';
import { SOCKET_STATUS } from '../../constants/socket';

import actions from './actions';

const initState = Immutable.from({
  app: {
    appStarted       : false,
    pingEnabled      : false,
    pingImitateUsers : false,
  },
  socket: {
    address        : '',
    options        : '',
    status         : SOCKET_STATUS.disconnected,
    connectedUsers : [],
  },
});

export default function appReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.APP_PARAMS_SET: {
      const result = CommonUtils.safeMerge(state.app, payload.app);
      return Immutable.set(state, 'app', result);
    }
    case actions.SOCKET_PARAMS_SET: {
      const result = CommonUtils.safeMerge(state.socket, payload.socket);
      return Immutable.set(state, 'socket', result);
    }
    default: {
      return state;
    }
  }
}
