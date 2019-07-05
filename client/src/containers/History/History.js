import React from 'react';

import Settings from './Settings';
import List from './List';
import { Wrapper } from './History.style';

const HistoryContainer = () => {
	return (
		<Wrapper>
			<Settings />
			<List />
		</Wrapper>
	);
};

export default HistoryContainer;
