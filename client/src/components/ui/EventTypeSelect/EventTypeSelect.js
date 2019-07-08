import React from 'react';
import * as PropTypes from 'prop-types';

import { Select, Option } from '../../lib';

const selectStyle = { minWidth: '160px' };

const EventTypeSelect = ({ eventTypes, value, style, onChange, ...restProps }) => {

	const resStyle = { ...selectStyle, ...style };

	const options = eventTypes.map(type => (
		<Option key={type} value={type}>{type}</Option>
	));

	return (
		<Select
			value={value}
			style={resStyle}
			onChange={onChange}
			{...restProps}
		>
			{options}
		</Select>
	);
};

EventTypeSelect.propTypes = {
	eventTypes : PropTypes.arrayOf(PropTypes.string),
	value      : PropTypes.string,
	style      : PropTypes.object,
	onChange   : PropTypes.func,
};

EventTypeSelect.defaultProps = {
	eventTypes : [],
	value      : '',
	style      : {},
	onChange   : () => {},
};

export default EventTypeSelect;
