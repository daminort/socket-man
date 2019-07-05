import Immutable from 'seamless-immutable';

//import CommonUtils from '../../helpers/utils/CommonUtils';
import actions from './actions';

const initState = Immutable.from({
  messages: [],
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
    default: {
      return state;
    }
  }
}
