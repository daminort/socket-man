const { SENDERS } = require('../constants/common');
const { random } = require('../helpers/commonUtils');

// mock data
const messages = [
	'Writing a chat application with popular web applications stacks like LAMP (PHP) has traditionally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be.',
	'The first goal is to setup a simple HTML webpage that serves out a form and a list of messages. We’re going to use the Node.JS web framework express to this end. Make sure Node.JS is installed.',
	'First let’s create a package.json manifest file that describes our project. I recommend you place it in a dedicated empty directory (I’ll call mine chat-example).',
	'So far in index.js we’re calling res.send and pass it a HTML string. Our code would look very confusing if we just placed our entire application’s HTML there. Instead, we’re going to create a index.html file and serve it.',
	'During development, socket.io serves the client automatically for us, as we’ll see, so for now we only have to install one module.',
	'Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. Then I listen on the connection event for incoming sockets, and I log it to the console.',
	'If you would like to use the local version of the client-side JS file, you can find it at node_modules/socket.io-client/dist/socket.io.js.',
	'Notice that I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.',
	'If you now reload the server and the website you should see the console print “a user connected”.',
	'The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.',
	'The next goal is for us to emit the event from the server to the rest of the users.',
	'A new Socket instance is returned for the namespace specified by the pathname in the URL, defaulting to /. For example, if the url is http://localhost/users, a transport connection will be established to http://localhost and a Socket.IO connection will be established to /users.',
	'Query parameters can also be provided, either with the query option or directly in the url (example: http://localhost/users?token=abc).',
	'By default, a single connection is used when connecting to different namespaces (to minimize resources).',
	'By default, a long-polling connection is established first, then upgraded to “better” transports (like WebSocket). If you like to live dangerously, this part can be skipped.',
	'The default parser promotes compatibility (support for Blob, File, binary check) at the expense of performance. A custom parser can be provided to match the needs of your application.',
	'If the manager was initiated with autoConnect to false, launch a new connection attempt.',
	'An unique identifier for the socket session. Set after the connect event is triggered, and updated after the reconnect event.',
	'The ack argument is optional and will be called with the server answer.',
];

const senders = [SENDERS.server, SENDERS.client, SENDERS.admin];
const types   = ['get', 'post', 'ping'];

class MessagesService {

	constructor() {
		this.messagesGen = this.createGenerator(messages);
		this.sendersGen  = this.createGenerator(senders);
		this.typesGen    = this.createGenerator(types);
	}

	createGenerator(collection) {
		function* gen() {
			let index = 0;
			let maxIndex = collection.length - 1;
			while (true) {
				if (index > maxIndex) {
					index = 0;
				}
				yield collection[index];
				index++;
			}
		}

		return gen();
	}

	createPingMessage(imitateUsers = false) {
		const body   = imitateUsers ? this.messagesGen.next().value : 'Ping';
		const sender = imitateUsers ? this.sendersGen.next().value  : SENDERS.server;
		const type   = imitateUsers ? this.typesGen.next().value    : 'ping';

		return {
			type,
			sender,
			body,
		};
	}
}

module.exports = {
	MessagesService: new MessagesService(),
}
