import { Message } from '../../components/lib';

class FeedbackUtils {

	static transform(messages) {
		if (!Array.isArray(messages)) {
			return messages;
		}

		return messages.join('\n');
	};

	static showMessageError(message) {
		Message.error(FeedbackUtils.transform(message), 5);
	};
}

export default FeedbackUtils;
export { FeedbackUtils };
