import React from 'react';
import * as PropTypes from 'prop-types';

import { Title } from '../../components/lib';
import Toolbar from './Toolbar';

const Emitter = ({ name }) => {
	return <div className={name} />;
};

Emitter.propTypes = {
	name: PropTypes.string,
};

Emitter.defaultProps = {
	name: '',
};

export default Emitter;
