import Immutable from 'seamless-immutable';

import CommonUtils from '../../helpers/utils/CommonUtils';
import actions from './actions';

const initState = Immutable.from({
  queries: [],

  modal: {
    visible : false,
    queryID : '',
    type    : '',
    body    : '',
    name    : '',
  },
});

export default function queriesReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.QUERIES_SET: {
      return Immutable.set(state, 'queries', payload.queries);
    }
    case actions.MODAL_DATA_SET: {
      const result = CommonUtils.safeMerge(state.modal, payload.modal);
      return Immutable.set(state, 'modal', result);
    }
    case actions.MODAL_DATA_RESET: {
      const { queryID } = state.modal;
      const result = {
        ...initState.modal,
        queryID,
      };
      return Immutable.set(state, 'modal', result);
    }
    default: {
      return state;
    }
  }
}
