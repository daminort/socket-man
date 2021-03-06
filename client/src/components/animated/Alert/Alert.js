import React from 'react';
import { useTransition, animated } from 'react-spring';

import { Alert as LibAlert } from '../../lib';

const Alert = (alertProps) => {

	const transitions = useTransition(true, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	return transitions.map(({ item, key, props }) =>
		item && (
			<animated.div key={key} style={props}>
				<LibAlert {...alertProps} />
			</animated.div>
		));
};

export default Alert;
