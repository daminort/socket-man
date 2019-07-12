import { createSelector } from 'reselect';
import { find } from '../../helpers/lodash';
import { TransformsUtils } from '../../helpers/utils/TransformsUtils';

const messages   = (state) => state.History.messages;
const eventTypes = (state) => state.History.eventTypes;
const filter     = (state) => state.History.filter;

export const selectMessages = createSelector(
  [messages],
	messages => messages,
);

export const selectMessage = (id) => {
	return createSelector(
		[selectMessages],
		(messages) => find(messages, { id }),
	);
};

export const selectEventTypes = createSelector(
	[eventTypes],
	eventTypes => eventTypes,
);

export const selectEventTypesList = createSelector(
	[selectEventTypes],
	eventTypes => TransformsUtils.createSelectOptions(eventTypes),
);

export const selectFilter = createSelector(
	[filter],
	filter => filter,
);

export const selectFilteredMessages = createSelector(
	[selectMessages, selectFilter],
	(messages, filter) => {
		const { eventType, text } = filter;
		const event   = eventType && String(eventType).trim();
		const message = text && String(text).trim();

		return messages.filter(item => {
			return (
				(eventType ? item.event === event : true)
				&& (text ? item.message.includes(message) : true)
			);
		});
	},
);
