import { createSelector } from 'reselect';
import { TransformsUtils } from '../../helpers/utils/TransformsUtils';

const eventData  = (state) => state.Emitter.eventData;
const eventTypes = (state) => state.Emitter.eventTypes;
const toolbar    = (state) => state.Emitter.toolbar;

export const selectEventData = createSelector(
  [eventData],
	eventData => eventData,
);

export const selectEventTypes = createSelector(
	[eventTypes],
	eventTypes => eventTypes,
);

export const selectEventTypesList = createSelector(
	[selectEventTypes],
	eventTypes => TransformsUtils.createSelectOptions(eventTypes),
);

export const selectToolbar = createSelector(
	[toolbar],
	toolbar => toolbar,
);
