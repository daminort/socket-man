import React from 'react';

import { Input as LibInput } from '../../lib';
import { Control } from '../Control';
import { propTypes, defaultProps } from '../prop-types';

const Input = (props) => {
	const {
		label,
		labelWidth,
		noLabel,
		noStretch,
		field,
		form,
		...restProps
	} = props;

	return (
		<Control
			label={label}
			labelWidth={labelWidth}
			noLabel={noLabel}
			noStretch={noStretch}
			component={(
				<LibInput
					{...field}
					{...restProps}
				/>
			)}
		/>
	);
};

Input.propTypes = {
	...propTypes,
};

Input.defaultProps = {
	...defaultProps,
};

export default Input;
