import { createSelector } from 'reselect';
import { SOCKET_STATUS } from '../../constants/socket';

const app = state => state.App.app;
const socket = state => state.App.socket;

export const selectApp = createSelector(
  [app],
  app => app,
);

export const selectSocket = createSelector(
  [socket],
  socket => socket,
);

export const selectIsSocketConnected = createSelector(
	[selectSocket],
	(socket) => socket.status === SOCKET_STATUS.connected,
);
