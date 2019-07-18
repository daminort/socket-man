import { makeActionCreator } from '../utils';

const prefix = 'Emitter/';

const TYPES = {
  EVENT_DATA_SET     : `${prefix}event-data-set`,
  EVENT_TYPES_SET    : `${prefix}event-types-set`,
  EVENT_TYPE_ADD     : `${prefix}event-type-add`,
  TOOLBAR_PARAMS_SET : `${prefix}toolbar-params-set`,
};

const actions = {
  ...TYPES,

  eventDataSet     : makeActionCreator(TYPES.EVENT_DATA_SET, 'eventData'),
  eventTypesSet    : makeActionCreator(TYPES.EVENT_TYPES_SET, 'eventTypes'),
  eventTypeAdd     : makeActionCreator(TYPES.EVENT_TYPE_ADD, 'eventType'),
  toolbarParamsSet : makeActionCreator(TYPES.TOOLBAR_PARAMS_SET, 'toolbar'),
};

export default actions;
