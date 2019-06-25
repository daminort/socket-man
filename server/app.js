const path = require('path');
const express = require('express');

const app = express();
const port = 5100;

var http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

app.listen(port, () => console.log(`Socket server listening on port ${port}!`));
