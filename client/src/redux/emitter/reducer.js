import Immutable from 'seamless-immutable';

import CommonUtils from '../../helpers/utils/CommonUtils';
import { compact } from '../../helpers/lodash';
import { EVENT_TYPES } from '../../constants/socket';
import actions from './actions';

const initState = Immutable.from({
  eventData: '',

  eventTypes: [
    EVENT_TYPES.get,
    EVENT_TYPES.post,
    EVENT_TYPES.ping,
  ],

  toolbar: {
    eventType    : '',
    newEventType : '',
  },
});

export default function emitterReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.EVENT_DATA_SET: {
      return Immutable.set(state, 'eventData', payload.eventData);
    }
    case actions.EVENT_TYPES_SET: {
      return Immutable.set(state, 'eventTypes', payload.eventTypes);
    }
    case actions.EVENT_TYPE_ADD: {
      const result = compact(state.eventTypes.concat(payload.eventType));
      return Immutable.set(state, 'eventTypes', result);
    }
    case actions.TOOLBAR_PARAMS_SET: {
      const result = CommonUtils.safeMerge(state.toolbar, payload.toolbar);
      return Immutable.set(state, 'toolbar', result);
    }
    default: {
      return state;
    }
  }
}
