import React from 'react';

import { SocketStatus, ConnectedUsers } from '../../components/connected';
import { Wrapper } from './Header.style';

const Header = () => {
	return (
		<Wrapper>
			<div className="left">
				<span>Connected:</span>
				<ConnectedUsers />
			</div>
			<div className="right">
				<SocketStatus />
			</div>
		</Wrapper>
	);
};

export default Header;
