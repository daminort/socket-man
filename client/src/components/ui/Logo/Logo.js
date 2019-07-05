import React from 'react';
import * as PropTypes from 'prop-types';

import { Wrapper } from './Logo.style';

const Logo = ({ collapsed }) => {

	return (
		<Wrapper>{collapsed ? 'SM' : 'Socket-Man'}</Wrapper>
	);
};

Logo.propTypes = {
	collapsed: PropTypes.bool.isRequired,
};

export default Logo;
