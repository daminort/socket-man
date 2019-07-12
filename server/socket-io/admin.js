const { actions } = require('../constants/actions');
const { log } = require('../helpers/logUtils');

let pingInterval = null;

function pingIntervalOn(socket) {
	if (pingInterval) {
		clearInterval(pingInterval);
	}

	socket.emit('action', actions.ping());

	pingInterval = setInterval(() => {
		socket.emit('action', actions.ping());
		log('Ping client', 'yellow');
	}, 10000);

	log('Ping enabled', 'blue');
}

function pingIntervalOff() {
	clearInterval(pingInterval);
	log('Ping disabled', 'blue');
}

function emitHistoryMessage(socket, type, body, sender) {
	socket.emit('action', actions.emitHistory(type, body, sender));
}

module.exports = {
	pingIntervalOn,
	pingIntervalOff,
	emitHistoryMessage,
};
