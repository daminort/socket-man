import uuid from 'uuid/v4';

import { MESSAGE_TYPES, EVENT_TYPES } from '../../constants/socket';
import Formatter from '../Formatter';
import { random } from '../lodash';

// mock data
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

const lorem = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

const messageTypes = [
	MESSAGE_TYPES.server,
	MESSAGE_TYPES.client,
	MESSAGE_TYPES.admin,
];

const eventTypes = [
	EVENT_TYPES.get,
	EVENT_TYPES.post,
	EVENT_TYPES.ping,
];

// utils
class MessagesUtils {

	static createPingMessage(pingImitateUsers = false) {
		const messageIndex     = random(0, pingMessages.length - 1);
		const messageTypeIndex = random(0, messageTypes.length - 1);
		const eventTypeIndex   = random(0, eventTypes.length - 1);

		const text  = pingImitateUsers ? pingMessages[messageIndex]     : 'Incoming ping';
		const type  = pingImitateUsers ? messageTypes[messageTypeIndex] : MESSAGE_TYPES.server;
		const event = pingImitateUsers ? eventTypes[eventTypeIndex]     : EVENT_TYPES.ping;

		const isOdd = Math.floor((messageIndex + messageTypeIndex + eventTypeIndex) / 2) === (messageIndex + messageTypeIndex + eventTypeIndex) / 2;
		const message = pingImitateUsers && isOdd
			? `${text}\n${lorem}`
			: text;

		return {
			id      : uuid(),
			date    : Formatter.fullDateTime(),
			event,
			type,
			message,
		};
	}

	static createHistoryMessage(payload) {
		return {
			id      : uuid(),
			date    : Formatter.fullDateTime(),
			event   : payload.type || 'NULL',
			type    : payload.sender || MESSAGE_TYPES.server,
			message : JSON.stringify(payload.body),
		};
	}
}

export default MessagesUtils;
export { MessagesUtils };
