export const SOCKET_STATUS = Object.freeze({
	connected    : 'Connected',
	disconnected : 'Disconnected',
	reconnection : 'Reconnection...',
	error        : 'Connection error',
});

export const MESSAGE_TYPES = Object.freeze({
	server : 'server',
	client : 'client',
	admin  : 'admin',
});

export const EVENT_TYPES = Object.freeze({
	ping : 'ping',
	get  : 'get',
	post : 'post',
});
