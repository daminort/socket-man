import React from 'react';

import { Title } from '../../components/lib';
import Toolbar from './Toolbar';
import List from './List';
import { Wrapper } from './History.style';

const HistoryContainer = () => {
	return (
		<Wrapper>
			<Title level={4}>Events history</Title>
			<Toolbar />
			<List />
		</Wrapper>
	);
};

export default HistoryContainer;
