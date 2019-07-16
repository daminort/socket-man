const { actions } = require('../constants/actions');
const { SENDERS } = require('../constants/common');
const { log } = require('../helpers/logUtils');

const adminHash = process.env.ADMIN_HASH || '198d69b1-c9dc-46cc-93e5-1e2e78cb25bf';

class SocketService {
	constructor() {
		this.connections = {
			admin   : null,
			clients : [],
		};
		this.pingInterval = null;
		this.pingDelay    = 10000;
	}

	isAdmin() {
		const { connections } = this;
		return (connections.admin && connections.admin.id);
	}

	addClient(socket) {
		const { connections: { clients } } = this;
		const { handshake: { query } } = socket;

		// Admin
		if (query.adminHash && query.adminHash === adminHash) {
			this.connections.admin = socket;
			log(`Admin has connected (ID: ${socket.id})`, 'green');
			return;
		}

		// Other clients
		const isAlready = clients.some(clientSocket => clientSocket.id === socket.id);
		if (isAlready) {
			return;
		}

		clients.push(socket);
		log(`User has connected (ID: ${socket.id})`, 'green');
	}

	removeClient(socket) {
		const { connections } = this;
		const { id } = socket;
		const isAdmin = this.isAdmin();

		connections.clients = connections.clients.filter(clientSocket => clientSocket.id !== id);
		if (isAdmin) {
			connections.admin = null;
		}

		const user = isAdmin ? 'Admin' : 'User';
		log(`${user} has disconnected (ID: ${id})`, 'red');
	}

	emitHistoryMessage(type, body, sender) {
		const { connections: { admin } } = this;
		admin.emit('action', actions.emitHistory(type, body, sender));
	}

	// Events ---------------------------------------------------------------------------------------
	onIncomingAdminAction(action) {
		const { type, payload } = action;
		log(`Incoming action. Type: ${type}. Payload: ${JSON.stringify(payload)}`, 'cyan', { trim: true });

		if (!this.isAdmin()) {
			log('No Admin registered. Aborted', 'red');
			return;
		}

		switch(type) {
			case actions.INCOMING_PING_ENABLED: {
				this.onPingEnabled(payload);
				break;
			}
			case actions.INCOMING_EMIT_EVENT: {
				const { type, body } = payload;
				this.emitHistoryMessage(type, body, SENDERS.admin);
				break;
			}
			default: {
				log(`Unknown action type ${type} with payload: ${JSON.stringify(payload)}`, 'gray');
			}
		}
	}

	// Reactions on incoming Admin actions ----------------------------------------------------------
	onPingEnabled(payload) {
		const { connections: { admin } } = this;
		const { pingEnabled } = payload;
		clearInterval(this.pingInterval);

		if (!pingEnabled) {
			log('Ping disabled', 'blue');
			return;
		}

		admin.emit('action', actions.ping());

		this.pingInterval = setInterval(() => {
			admin.emit('action', actions.ping());
			log('Ping admin', 'yellow');
		}, this.pingDelay);

		log('Ping enabled', 'blue');
	}
};

module.exports = {
	SocketService: new SocketService(),
};
