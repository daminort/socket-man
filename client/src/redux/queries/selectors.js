import { createSelector } from 'reselect';
import { find } from '../../helpers/lodash';

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

export const selectQuery = (id, defaultValue = null) => {
	return createSelector(
		[selectQueries],
		(queries) => {
			const query = find(queries, { id });
			return query || defaultValue;
		}
	);
};
