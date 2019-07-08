import Immutable from 'seamless-immutable';

import CommonUtils from '../../helpers/utils/CommonUtils';
import { EVENT_TYPES } from '../../constants/socket';
import actions from './actions';

const initState = Immutable.from({
  messages: [],

  eventTypes: [
    EVENT_TYPES.get,
    EVENT_TYPES.post,
    EVENT_TYPES.ping,
  ],

  filter: {
    eventType : '',
    text      : '',
  }
});

export default function historyReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.MESSAGE_ADD: {
      const result = state.messages.concat(payload.message);
      return Immutable.set(state, 'messages', result);
    }
    case actions.MESSAGES_CLEAR: {
      return Immutable.set(state, 'messages', []);
    }
    case actions.EVENT_TYPE_ADD: {
      const result = state.eventTypes.concat(payload.eventType);
      return Immutable.set(state, 'eventTypes', result);
    }
    case actions.EVENT_TYPES_CLEAR: {
      return Immutable.set(state, 'messages', initState.eventTypes);
    }
    case actions.FILTER_DATA_SET: {
      const result = CommonUtils.safeMerge(state.filter, payload.filter);
      return Immutable.set(state, 'filter', result);
    }
    case actions.FILTER_DATA_RESET: {
      return Immutable.set(state, 'filter', initState.filter);
    }
    default: {
      return state;
    }
  }
}
