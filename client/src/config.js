const {
	REACT_APP_SOCKET_SERVER_PROTOCOL,
	REACT_APP_SOCKET_SERVER_ADDRESS,
	REACT_APP_SOCKET_SERVER_PORT,
	REACT_APP_ADMIN_HASH,
} = process.env;

const socket = {
	protocol : REACT_APP_SOCKET_SERVER_PROTOCOL || 'http',
	address  : REACT_APP_SOCKET_SERVER_ADDRESS || 'localhost',
	port     : REACT_APP_SOCKET_SERVER_PORT || '5100',
};
const socketConnectionString = `${socket.protocol}://${socket.address}:${socket.port}`;
const adminHash = REACT_APP_ADMIN_HASH || '198d69b1-c9dc-46cc-93e5-1e2e78cb25bf';

export {
	socketConnectionString,
	adminHash,
};
