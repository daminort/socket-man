require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const ip = require('ip');

const { log } = require('./helpers/logUtils');

const app = express();
const port = process.env.APP_PORT || 9710;
const localURL = ip.address();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	transports: ['websocket'],
});

const { SocketService } = require('./services/SocketService');

app.use(cors());
//app.use('/static', path.resolve(__dirname, 'public/static'));
app.use(express.static('public'));
app.use('/static', express.static('public/static'));

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

// app.listen(port, () => {
// 	log('Socket server has been started:', 'green', { noDate: true });
// 	log(`  -- Local:   https://localhost:${port}`, 'cyan', { noDate: true });
// 	log(`  -- Network: https://${localURL}:${port}`, 'cyan', { noDate: true });
// 	log();
// });
