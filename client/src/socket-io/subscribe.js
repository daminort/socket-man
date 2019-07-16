import socketActions from '../redux/socket/actions';
import { SOCKET_STATUS } from '../constants/socket';

export function subscribeOnSocketStatus(socket, store) {

	socket.on('connect', () => {
		store.dispatch(socketActions.innerSocketStatus(SOCKET_STATUS.connected));
		store.dispatch(socketActions.outcomingGetConnectedUsers());
	});

	socket.on('disconnect', () => {
		store.dispatch(socketActions.innerSocketStatus(SOCKET_STATUS.disconnected));
	});

	socket.on('reconnect', () => {
		store.dispatch(socketActions.innerSocketStatus(SOCKET_STATUS.reconnection));
	});

	socket.on('connect_error', () => {
		store.dispatch(socketActions.innerSocketStatus(SOCKET_STATUS.error));
	});
}
