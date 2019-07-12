import React from 'react';
import { useTransition, animated } from 'react-spring';

const Animate = (Component, visible = true) => {

	const transitionOptions = {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	};

	const transitions = useTransition(visible, null, transitionOptions);

	const animatedComponent = transitions.map(({ item, key, props }) =>
		item && (
			<animated.div key={key} style={props}>
				<Component />
			</animated.div>
		));

	return (
		<>
			{animatedComponent}
		</>
	);
};

export default Animate;
export {
	Animate,
};
