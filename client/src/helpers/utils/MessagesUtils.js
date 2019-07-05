import uuid from 'uuid/v4';
import Formatter from '../Formatter';
import { random } from '../lodash';

const pingMessages = [
	'Hi! How are you? :)',
	'Hello, my name is Socket-Man',
	'Is anybody here?',
	'Where are my friends?',
	'Hey guys, I have some interesting',
	'We need to keep calm',
	'Winter is coming :(',
	'What the beautiful day today!',
	'It seems the rain is starting...',
	'Have anybody seen my cat?',
];

class MessagesUtils {

	static createPingMessage() {
		const index = random(0, pingMessages.length - 1);
		const message = pingMessages[index]
			? `[Ping]: ${pingMessages[index]}`
			: `[Ping]: Oops... No random message for index ${index} ¯\\_(ツ)_/¯`;

		return {
			id      : uuid(),
			date    : Formatter.fullDateTime(),
			event   : 'ping',
			message,
		};
	}
}

export default MessagesUtils;
export { MessagesUtils };
