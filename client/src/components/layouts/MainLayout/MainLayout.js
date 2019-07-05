import React from 'react';
import * as PropTypes from 'prop-types';

import {Layout} from './MainLayout.style';

const MainLayout = ({ children }) => {
	return (
		<Layout>
			{children}
		</Layout>
	);
};

MainLayout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

MainLayout.defaultProps = {
	children: null,
};

export default MainLayout;
