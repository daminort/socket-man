import { makeActionCreator } from '../utils';

const prefix = 'History/';

const TYPES = {
  MESSAGE_ADD    : `${prefix}message-add`,
  MESSAGES_CLEAR : `${prefix}messages-clear`,
};

const actions = {
  ...TYPES,

  messageAdd    : makeActionCreator(TYPES.MESSAGE_ADD, 'message'),
  messagesClear : makeActionCreator(TYPES.MESSAGES_CLEAR),
};

export default actions;
