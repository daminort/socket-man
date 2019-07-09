const { pingIntervalOn, pingIntervalOff } = require('./admin');
const { actions } = require('../constants/actions');
const { log } = require('../helpers/logUtils');

function onIncomingAction(action, socket) {

	const { type, payload } = action;
	log(`Incoming action. Type: ${type}. Payload: ${JSON.stringify(payload)}`, 'cyan', { trim: true });

	switch(type) {
		case actions.PING_ENABLED: {
			const { pingEnabled } = payload;
			if (pingEnabled) {
				pingIntervalOn(socket);
			} else {
				pingIntervalOff();
			}
			break;
		}
		default: {
			log(`Unknown action type ${type} with payload: ${payload}`, 'gray');
		}
	}
}

module.exports = {
	onIncomingAction,
};
