import React from 'react';
import * as PropTypes from 'prop-types';

import { Content } from './MainContent.style';

const MainContent = ({ children }) => {
	return (
		<Content>
			<div className="main-content">
				{children}
			</div>
		</Content>
	);
};

MainContent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

MainContent.defaultProps = {
	children: null,
};

export default MainContent;
