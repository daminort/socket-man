const {
	REACT_APP_SOCKET_SERVER_PROTOCOL,
	REACT_APP_SOCKET_SERVER_ADDRESS,
	REACT_APP_SOCKET_SERVER_PORT,
} = process.env;

const socket = {
	protocol: REACT_APP_SOCKET_SERVER_PROTOCOL || 'http',
	address: REACT_APP_SOCKET_SERVER_ADDRESS || 'localhost',
	port: REACT_APP_SOCKET_SERVER_PORT || '5100',
};
const socketConnectionString = `${socket.protocol}://${socket.address}:${socket.port}`;

export { socketConnectionString };
