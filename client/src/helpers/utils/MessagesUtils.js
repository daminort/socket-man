import uuid from 'uuid/v4';

import { MESSAGE_TYPES } from '../../constants/socket';
import Formatter from '../Formatter';

class MessagesUtils {

	static createPingMessage(message) {
		return {
			...message,
			id      : uuid(),
			date    : Formatter.fullDateTime(),
		};
	}

	static createHistoryMessage(payload) {
		return {
			id     : uuid(),
			date   : Formatter.fullDateTime(),
			type   : payload.type || 'NULL',
			sender : payload.sender || MESSAGE_TYPES.server,
			body   : JSON.stringify(payload.body),
		};
	}
}

export default MessagesUtils;
export { MessagesUtils };
