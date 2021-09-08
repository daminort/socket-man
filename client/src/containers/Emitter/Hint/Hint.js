import React from 'react';

import { Alert } from '../../../components/lib';

import { Wrapper } from './Hint.style';

const Hint = () => {
	return (
		<Wrapper>
			<Alert message="Hint: you should emit event with empty body to subscribe on that type of events" type="warning" showIcon />
		</Wrapper>
	);
};

export default Hint;
