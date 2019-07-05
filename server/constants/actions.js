const { makeActionCreator } = require('../helpers/actionsUtils');

const prefix = 'Socket/Server/';

const TYPES = {
	SOCKET_STATUS : `${prefix}socket-status`,
	PING_CLIENT   : `${prefix}ping`,
};

const actions = {
	socketStatus : makeActionCreator(TYPES.SOCKET_STATUS, 'connected'),
	ping         : makeActionCreator(TYPES.PING_CLIENT),
};

module.exports = {
	actions,
};
