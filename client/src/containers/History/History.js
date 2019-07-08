import React from 'react';

import Toolbar from './Toolbar';
import List from './List';
import { Wrapper } from './History.style';

const HistoryContainer = () => {
	return (
		<Wrapper>
			<Toolbar />
			<List />
		</Wrapper>
	);
};

export default HistoryContainer;
