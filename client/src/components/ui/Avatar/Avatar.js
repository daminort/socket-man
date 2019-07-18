import React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';

import { POSITION } from '../../../constants/common';
import { MESSAGE_TYPES } from '../../../constants/socket';
import { capitalize } from '../../../helpers/lodash';

import { StyledWrapper } from './Avatar.style';

const icons = {
	[MESSAGE_TYPES.server]: 'hdd',
	[MESSAGE_TYPES.client]: 'laptop',
	[MESSAGE_TYPES.admin]: 'user',
};

const Avatar = ({ type, position }) => {
	const className = classnames({
		left  : (position === POSITION.left),
		right : (position === POSITION.right),
	});

	return (
		<StyledWrapper
			size={40}
			icon={icons[type]}
			className={className}
			title={capitalize(type)}
		/>
	);
};

Avatar.propTypes = {
	type: PropTypes.oneOf([
		MESSAGE_TYPES.server,
		MESSAGE_TYPES.client,
		MESSAGE_TYPES.admin,
	]).isRequired,
	position: PropTypes.oneOf([
		POSITION.left,
		POSITION.right,
	]).isRequired,
};

export default Avatar;
