const { pingIntervalOn, pingIntervalOff, emitHistoryMessage } = require('./admin');
const { actions } = require('../constants/actions');
const { SENDERS } = require('../constants/common');
const { log } = require('../helpers/logUtils');

function onIncomingAction(action, socket) {

	const { type, payload } = action;
	log(`Incoming action. Type: ${type}. Payload: ${JSON.stringify(payload)}`, 'cyan', { trim: true });

	switch(type) {
		case actions.INCOMING_PING_ENABLED: {
			const { pingEnabled } = payload;
			if (pingEnabled) {
				pingIntervalOn(socket);
			} else {
				pingIntervalOff();
			}
			break;
		}
		case actions.INCOMING_EMIT_EVENT: {
			const { type, body } = payload;
			emitHistoryMessage(socket, type, body, SENDERS.admin);
			break;
		}
		default: {
			log(`Unknown action type ${type} with payload: ${JSON.stringify(payload)}`, 'gray');
		}
	}
}

module.exports = {
	onIncomingAction,
};
