require('dotenv').config();

const path = require('path');
const express = require('express');
const ip = require('ip');

const { actions } = require('./constants/actions');
const { log } = require('./helpers/logUtils');

const app = express();
const port = process.env.APP_PORT || 5100;
const localURL = ip.address();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

io.on('connection', (socket) => {
	log('User has connected', 'green');

	socket.emit('action', actions.socketStatus(true));

	socket.on('disconnect', () => {
		log('User has disconnected', 'red');
	});

	setInterval(() => {
		socket.emit('action', actions.ping());
		log('Ping client', 'yellow');
	}, 10000);
});

http.listen(port);

console.log('Socket server has been started:');
console.log(`  -- Local:   https://localhost:${port}`);
console.log(`  -- Network: https://${localURL}:${port}`);
