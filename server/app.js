require('dotenv').config();

const path = require('path');
const express = require('express');
const ip = require('ip');

const app = express();
const port = process.env.APP_PORT || 5100;
const localURL = ip.address();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(port);

console.log('Socket server has been started:');
console.log(`  -- Local:   https://localhost:${port}`);
console.log(`  -- Network: https://${localURL}:${port}`);
