const { makeActionCreator } = require('../helpers/actionsUtils');

const outcomingPrefix = 'Socket/Server/';
const incomingPrefix  = 'Socket/Client/';

const TYPES = {
	INCOMING_PING_ENABLED  : `${incomingPrefix}ping-enabled`,
	INCOMING_EMIT_EVENT    : `${incomingPrefix}emit-event`,

	SOCKET_STATUS : `${outcomingPrefix}socket-status`,
	PING_CLIENT   : `${outcomingPrefix}ping`,
	EMIT_HISTORY  : `${outcomingPrefix}emit-history`,
};

const actions = {
	...TYPES,

	socketStatus : makeActionCreator(TYPES.SOCKET_STATUS, 'connected'),
	ping         : makeActionCreator(TYPES.PING_CLIENT),
	emitHistory  : makeActionCreator(TYPES.EMIT_HISTORY, 'type', 'body', 'sender'),
};

module.exports = {
	actions,
};
