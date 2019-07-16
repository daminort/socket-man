require('dotenv').config();

const path = require('path');
const express = require('express');
const ip = require('ip');

const { log } = require('./helpers/logUtils');

const app = express();
const port = process.env.APP_PORT || 5100;
const localURL = ip.address();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { SocketService } = require('./socket-io/SocketService');

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

io.on('connect', (socket) => {
	SocketService.addClient(socket);

	socket.on('disconnect', () => {
		SocketService.removeClient(socket);
	});

	// incoming actions from Admin-client
	socket.on('action', (action) => {
		SocketService.onIncomingAdminAction(action);
	});
});

http.listen(port);

log('Socket server has been started:', 'green', { noDate: true });
log(`  -- Local:   https://localhost:${port}`, 'cyan', { noDate: true });
log(`  -- Network: https://${localURL}:${port}`, 'cyan', { noDate: true });
log();
