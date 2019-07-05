import React from 'react';

import { SocketStatus } from '../../components/connected';
import { Wrapper } from './Header.style';

const Header = () => {
	return (
		<Wrapper>
			<SocketStatus />
		</Wrapper>
	);
};

export default Header;
