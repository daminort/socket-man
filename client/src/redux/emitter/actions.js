import { makeActionCreator } from '../utils';

const prefix = 'Emitter/';

const TYPES = {
  EVENT_DATA_SET     : `${prefix}event-data-set`,
  EVENT_TYPE_ADD     : `${prefix}event-type-add`,
  TOOLBAR_PARAMS_SET : `${prefix}toolbar-params-set`,
};

const actions = {
  ...TYPES,

  eventDataSet     : makeActionCreator(TYPES.EVENT_DATA_SET, 'eventData'),
  eventTypeAdd     : makeActionCreator(TYPES.EVENT_TYPE_ADD, 'eventType'),
  toolbarParamsSet : makeActionCreator(TYPES.TOOLBAR_PARAMS_SET, 'toolbar'),
};

export default actions;
