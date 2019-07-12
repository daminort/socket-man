import React from 'react';
import * as PropTypes from 'prop-types';

import { propTypes, defaultProps } from '../prop-types';
import { Wrapper } from './Control.style';

const Control = ({ label, labelWidth, noLabel, noStretch, component }) => {

	const lw = (typeof labelWidth === 'number') ? `${labelWidth}%` : labelWidth;
	const lStyle = {
		width: lw,
		marginRight: (noStretch) ? 8 : 0,
	};
	const wStyle = { width: (noStretch) ? 'auto' : '100%' };

	return (
		<Wrapper style={wStyle} className="form-field">
			{!noLabel && (
				<span className="label" style={lStyle}>{label}</span>
			)}
			{component}
		</Wrapper>
	);
};

Control.propTypes = {
	component  : PropTypes.element.isRequired,
	label      : propTypes.label,
	labelWidth : propTypes.labelWidth,
	noLabel    : propTypes.noLabel,
	noStretch  : propTypes.noStretch,
};

Control.defaultProps = {
	label      : defaultProps.label,
	labelWidth : defaultProps.labelWidth,
	noLabel    : defaultProps.noLabel,
	noStretch  : defaultProps.noStretch,
};

export default Control;
