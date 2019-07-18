const { makeActionCreator } = require('../helpers/actionsUtils');

const outcomingPrefix = 'Socket/Server/';
const incomingPrefix  = 'Socket/Client/';

const TYPES = {
	INCOMING_PING_ENABLED         : `${incomingPrefix}ping-enabled`,
	INCOMING_IMITATE_USERS        : `${incomingPrefix}imitate-users`,
	INCOMING_EMIT_EVENT           : `${incomingPrefix}emit-event`,
	INCOMING_SUBSCRIBE_ON_EVENT   : `${incomingPrefix}subscribe-on-event`,
	INCOMING_GET_SERVER_SETTINGS  : `${incomingPrefix}get-server-settings`,
	INCOMING_GET_CONNECTED_USERS  : `${incomingPrefix}get-connected-users`,

	OUTCOMING_PING_CLIENT         : `${outcomingPrefix}ping`,
	OUTCOMING_EMIT_HISTORY        : `${outcomingPrefix}emit-history`,
	OUTCOMING_USER_CONNECTED      : `${outcomingPrefix}user-connected`,
	OUTCOMING_GET_SERVER_SETTINGS : `${outcomingPrefix}get-server-settings`,
	OUTCOMING_GET_CONNECTED_USERS : `${outcomingPrefix}connected-users`,
};

const actions = {
	...TYPES,

	outcomingPing              : makeActionCreator(TYPES.OUTCOMING_PING_CLIENT, 'message'),
	outcomingEmitHistory       : makeActionCreator(TYPES.OUTCOMING_EMIT_HISTORY, 'type', 'body', 'sender'),
	outcomingUserConnected     : makeActionCreator(TYPES.OUTCOMING_USER_CONNECTED, 'id', 'connected', 'handshake'),
	outcomingGetServerSettings : makeActionCreator(TYPES.OUTCOMING_GET_SERVER_SETTINGS, 'settings'),
	outcomingGetConnectedUsers : makeActionCreator(TYPES.OUTCOMING_GET_CONNECTED_USERS, 'users'),
};

module.exports = {
	actions,
};
