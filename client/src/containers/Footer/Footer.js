import React from 'react';

import { Icon } from '../../components/lib';
import { Wrapper } from './Footer.style';

const Footer = () => {
	return (
		<Wrapper>
			<span>(c) 2019</span>
			<a href="https://github.com/daminort" target="_blank" rel="noopener noreferrer">Demien</a>
			<span>Project source:</span>
			<a href="https://github.com/daminort/socket-man" target="_blank" rel="noopener noreferrer">
				<Icon type="github" />
			</a>
		</Wrapper>
	);
};

export default Footer;
