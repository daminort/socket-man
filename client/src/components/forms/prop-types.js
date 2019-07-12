import * as PropTypes from 'prop-types';

export const propTypes = {
	label      : PropTypes.string,
	labelWidth : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noLabel    : PropTypes.bool,
	noStretch  : PropTypes.bool,

	field: PropTypes.shape({
		name     : PropTypes.string.isRequired,
		value    : PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
		onChange : PropTypes.func,
		onBlur   : PropTypes.func,
	}),

	form: PropTypes.shape({
		touched  : PropTypes.object,
		errors    : PropTypes.object,
	}),
};

export const defaultProps = {
	label      : '',
	labelWidth : 25, // in percents
	noLabel    : false,
	noStretch  : false,

	field: {
		value    : '',
	},

	form: {
		touched  : {},
		errors   : {},
	},
};
