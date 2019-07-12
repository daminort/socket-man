const { log } = require('../helpers/logUtils');

class SocketService {
	constructor() {
		this.connections = {
			admin   : null,
			clients : [],
		};
	}

	setAdmin(socket) {
		this.connections.admin = socket;
	};

	addClient(socket) {
		const { connections: { clients } } = this;
		const isAlready = clients.some(clientSocket => clientSocket.id === socket.id);
		if (isAlready) {
			return;
		}

		clients.push(socket);
		log(`User has connected (ID: ${socket.id})`, 'green');
	}

	removeClient(socket) {
		const { connections } = this;
		connections.clients = connections.clients.filter(clientSocket => clientSocket.id !== socket.id);
	}
};

module.exports = {
	SocketService: new SocketService(),
};
