const { SENDERS } = require('../constants/common');
const { random } = require('../helpers/commonUtils');

// mock data
const messages = [
	'Hi! How are you? :)',
	'Hello, my name is Socket-Man.',
	'Is anybody here?',
	'Where are my friends?',
	'Hey guys, I have some interesting...',
	'We need to keep calm.',
	'Winter is coming :(',
	'What the beautiful day today!',
	'It seems the rain is starting...',
	'Have anybody seen my cat?',
];

const lorem   = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const senders = [SENDERS.server, SENDERS.client, SENDERS.admin];
const types   = ['get', 'post', 'ping'];

class MessagesService {

	createPingMessage(imitateUsers = false) {
		const messageIndex = random(0, messages.length - 1);
		const senderIndex  = random(0, senders.length - 1);
		const typeIndex    = random(0, types.length - 1);
		const oddIndex     = random(0, 99);

		const text   = imitateUsers ? messages[messageIndex] : 'Ping';
		const sender = imitateUsers ? senders[senderIndex]   : SENDERS.server;
		const type   = imitateUsers ? types[typeIndex]       : 'ping';

		const isOdd = Math.floor((oddIndex) / 2) === (oddIndex) / 2;
		const body  = imitateUsers && isOdd
			? `${text} ${lorem}`
			: text;

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
