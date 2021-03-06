import io from 'socket.io-client';
import { socketConnectionString, adminHash } from '../config';

const options = {
	transports: ['websocket'],
	query: { adminHash },
};

const socket = io(socketConnectionString, options);

export default socket;
export { socket };
