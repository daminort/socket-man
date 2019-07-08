import { makeActionCreator } from '../utils';

const prefix = 'History/';

const TYPES = {
  MESSAGE_ADD       : `${prefix}message-add`,
  MESSAGES_CLEAR    : `${prefix}messages-clear`,

  EVENT_TYPE_ADD    : `${prefix}event-type-add`,
  EVENT_TYPES_CLEAR : `${prefix}event-types-clear`,

  FILTER_DATA_SET   :`${prefix}filter-data-set`,
  FILTER_DATA_RESET :`${prefix}filter-data-reset`,
};

const actions = {
  ...TYPES,

  messageAdd      : makeActionCreator(TYPES.MESSAGE_ADD, 'message'),
  messagesClear   : makeActionCreator(TYPES.MESSAGES_CLEAR),

  eventTypeAdd    : makeActionCreator(TYPES.EVENT_TYPE_ADD, 'eventType'),
  eventTypesClear : makeActionCreator(TYPES.EVENT_TYPES_CLEAR),

  filterDataSet   : makeActionCreator(TYPES.FILTER_DATA_SET, 'filter'),
  filterDataReset : makeActionCreator(TYPES.FILTER_DATA_RESET),
};

export default actions;
