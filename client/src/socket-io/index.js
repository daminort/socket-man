import io from 'socket.io-client';
import { socketConnectionString } from '../config';

const socket = io(socketConnectionString);

export default socket;
export { socket };
