import React from 'react';
import * as PropTypes from 'prop-types';

import { Select as LibSelect, Option } from '../../lib';
import { Control } from '../Control';
import { propTypes, defaultProps } from '../prop-types';

const selectStyle = { minWidth: '160px' };

const Select = (props) => {
	const {
		label,
		labelWidth,
		noLabel,
		noStretch,
		field,
		form,
		options,
		style,
		...restProps
	} = props;

	const resStyle = { ...selectStyle, ...style };

	const optionItems = options.map(({ value, title }) => (
		<Option key={value} value={value}>{title}</Option>
	));

	const onChangeValue = (value) => {
		// because Formik expects normal Event with normal target, not single value
		const event = {
			target: {
				name: field.name,
				value,
			},
		};
		field.onChange(event);
	};

	return (
		<Control
			label={label}
			labelWidth={labelWidth}
			noLabel={noLabel}
			noStretch={noStretch}
			component={(
				<LibSelect
					{...field}
					{...restProps}
					style={resStyle}
					onChange={onChangeValue}
				>
					{optionItems}
				</LibSelect>
			)}
		/>
	);
};

Select.propTypes = {
	...propTypes,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	})),
	style: PropTypes.object,
};

Select.defaultProps = {
	...defaultProps,
	options : [],
	style   : {},
};

export default Select;
