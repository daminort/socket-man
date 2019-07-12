import React from 'react';
import * as PropTypes from 'prop-types';

import { TextArea as LibTextArea } from '../../lib';
import { Control } from '../Control';
import { propTypes, defaultProps } from '../prop-types';

const TextArea = (props) => {
	const {
		label,
		labelWidth,
		noLabel,
		noStretch,
		field,
		form,
		rows,
		onChangeValue,
		...restProps
	} = props;

	const onChange = (event) => {
		onChangeValue(event.target.value);
		field.onChange(event);
	};

	return (
		<Control
			label={label}
			labelWidth={labelWidth}
			noLabel={noLabel}
			noStretch={noStretch}
			component={(
				<LibTextArea
					rows={rows}
					{...field}
					{...restProps}
					onChange={onChange}
				/>
			)}
		/>
	);
};

TextArea.propTypes = {
	...propTypes,
	rows          : PropTypes.number,
	onChangeValue : PropTypes.func,
};

TextArea.defaultProps = {
	...defaultProps,
	rows          : 10,
	onChangeValue : () => {}, // function(content: String): void
};

export default TextArea;
