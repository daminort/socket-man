const { makeActionCreator } = require('../helpers/actionsUtils');

const outcomingPrefix = 'Socket/Server/';
const incomingPrefix  = 'Socket/Client/';

const TYPES = {
	PING_ENABLED  : `${incomingPrefix}ping-enabled`,

	SOCKET_STATUS : `${outcomingPrefix}socket-status`,
	PING_CLIENT   : `${outcomingPrefix}ping`,
};

const actions = {
	...TYPES,

	socketStatus : makeActionCreator(TYPES.SOCKET_STATUS, 'connected'),
	ping         : makeActionCreator(TYPES.PING_CLIENT),
};

module.exports = {
	actions,
};
