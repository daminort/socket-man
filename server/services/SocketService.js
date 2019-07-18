const { actions } = require('../constants/actions');
const { SENDERS } = require('../constants/common');
const { log } = require('../helpers/logUtils');
const { MessagesService } = require('../services/MessagesService');

const adminHash = process.env.ADMIN_HASH || '198d69b1-c9dc-46cc-93e5-1e2e78cb25bf';

class SocketService {

	constructor() {
		this.connections = {
			admin   : null,
			clients : [],
		};
		this.subscribeTypes = [];
		this.pingInterval = null;
		this.pingDelay    = 10000;
		this.imitateUsers = false;
	}

	getAdmin() {
		return (this.connections.admin);
	}

	isAdmin(socket) {
		const admin = this.getAdmin();
		if (!admin) {
			return false;
		}

		return (socket.id === admin.id);
	}

	addClient(socket) {
		const { connections: { clients, admin } } = this;
		const { id, handshake } = socket;
		const { query } = handshake;

		// Admin
		if (query.adminHash && query.adminHash === adminHash) {
			this.connections.admin = socket;
			log(`Admin has connected (ID: ${id})`, 'green');
			return;
		}

		// Other clients
		const isAlready = clients.some(clientSocket => clientSocket.id === id);
		if (isAlready) {
			return;
		}

		clients.push(socket);
		log(`User has connected (ID: ${id})`, 'green');

		// notify Admin about new user's connection
		if (admin) {
			admin.emit('action', actions.outcomingUserConnected(id, true, handshake));
		}

		this.subscribeOnClientsEvents();
	}

	removeClient(socket) {
		const { connections } = this;
		const { admin } = connections;
		const { id } = socket;
		const isAdmin = this.isAdmin(socket);

		connections.clients = connections.clients.filter(clientSocket => clientSocket.id !== id);
		if (isAdmin) {
			connections.admin = null;
		}

		const user = isAdmin ? 'Admin' : 'User';
		log(`${user} has disconnected (ID: ${id})`, 'red');

		// notify Admin about user's disconnection
		if (!isAdmin && admin) {
			admin.emit('action', actions.outcomingUserConnected(id, false, null));
		}
	}

	emitHistoryMessage(type, body, sender) {
		const { connections: { admin } } = this;
		admin.emit('action', actions.outcomingEmitHistory(type, body, sender));
	}

	emitMessages(type, body) {
		const { connections: { clients } } = this;
		clients.forEach(socket => socket.emit(type, body));
	}

	subscribeOnClientsEvents() {
		const { connections: { clients } } = this;
		this.subscribeTypes.forEach(type => {
			clients.forEach(socket => {
				socket.on(type, (body) => {
					log(`Client event. Type: ${type}. Body: ${JSON.stringify(body)}`, 'cyan', { trim: true });
					this.emitHistoryMessage(type, body, SENDERS.client);
				});
			})
		});
	}

	// Events ---------------------------------------------------------------------------------------
	onIncomingAdminAction(action) {
		const { type, payload } = action;
		log(`Incoming action. Type: ${type}. Payload: ${JSON.stringify(payload)}`, 'cyan', { trim: true });

		if (!this.getAdmin()) {
			log('No Admin registered. Aborted', 'red');
			return;
		}

		switch(type) {
			case actions.INCOMING_PING_ENABLED: {
				this.onPingEnabled(payload);
				break;
			}
			case actions.INCOMING_IMITATE_USERS: {
				this.onImitateUsers(payload);
				break;
			}
			case actions.INCOMING_EMIT_EVENT: {
				const { type, body } = payload;
				this.emitHistoryMessage(type, body, SENDERS.admin);
				this.emitMessages(type, body);
				break;
			}
			case actions.INCOMING_GET_CONNECTED_USERS: {
				this.onGetConnectedUsers();
				break;
			}
			case actions.INCOMING_GET_SERVER_SETTINGS: {
				this.onGetServerSettings();
				break;
			}
			case actions.INCOMING_SUBSCRIBE_ON_EVENT: {
				this.onSubscribeEvent(payload);
				break;
			}
			default: {
				log(`Unknown action type ${type} with payload: ${JSON.stringify(payload)}`, 'gray');
			}
		}
	}

	// Reactions on incoming Admin actions ----------------------------------------------------------
	onPingEnabled(payload) {
		const { pingEnabled } = payload;

		clearInterval(this.pingInterval);
		this.pingInterval = null;

		if (!pingEnabled) {
			log('Ping disabled', 'blue');
			return;
		}

		const admin = this.getAdmin();
		const message = MessagesService.createPingMessage(this.imitateUsers);
		admin.emit('action', actions.outcomingPing(message));

		this.pingInterval = setInterval(() => {
			const message = MessagesService.createPingMessage(this.imitateUsers);

			const admin = this.getAdmin();
			admin.emit('action', actions.outcomingPing(message));
			this.emitMessages('ping', message);

			log(`Ping: ${JSON.stringify(message)}`, 'yellow', { trim: true });
		}, this.pingDelay);

		log('Ping enabled', 'blue');
		log(`Ping: ${JSON.stringify(message)}`, 'yellow', { trim: true });
	}

	onImitateUsers(payload) {
		const { imitateUsers } = payload;
		this.imitateUsers = imitateUsers;

		if (imitateUsers) {
			log('Imitating users enabled', 'blue');
		} else {
			log('Imitating users disabled', 'blue');
		}
	}

	onGetConnectedUsers() {
		const { connections: { admin, clients } } = this;
		if (!admin) {
			log('No Admin registered. Aborted', 'red');
			return;
		}

		const users = clients.map(socket => {
			const { id, handshake } = socket;
			return {
				id,
				handshake,
				connected: true,
			};
		});

		admin.emit('action', actions.outcomingGetConnectedUsers(users));
	}

	onGetServerSettings() {
		const admin = this.getAdmin();
		const settings = {
			pingEnabled    : Boolean(this.pingInterval),
			imitateUsers   : this.imitateUsers,
			subscribeTypes : this.subscribeTypes,
		};

		admin.emit('action', actions.outcomingGetServerSettings(settings));
	}

	onSubscribeEvent(payload) {
		const { type } = payload;

		if (!this.subscribeTypes.includes(type)) {
			this.subscribeTypes.push(type);
			this.subscribeOnClientsEvents();
		}
	}
};

module.exports = {
	SocketService: new SocketService(),
};
