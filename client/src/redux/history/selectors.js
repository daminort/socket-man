import { createSelector } from 'reselect';

const messages = (state) => state.History.messages;

export const selectMessages = createSelector(
  [messages],
	messages => messages,
);
