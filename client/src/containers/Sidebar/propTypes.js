import * as PropTypes from 'prop-types';

export const queryProps = PropTypes.shape({
	id   : PropTypes.string.isRequired,
	name : PropTypes.string.isRequired,
	type : PropTypes.string.isRequired,
	body : PropTypes.string.isRequired,
});
