import { createSelector } from 'reselect';

const queries = state => state.Queries.queries;
const modal   = state => state.Queries.modal;

export const selectQueries = createSelector(
  [queries],
	queries => queries,
);

export const selectModal = createSelector(
	[modal],
	modal => modal,
);
