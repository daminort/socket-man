import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSocket } from '../../../redux/app/selectors';
import { SOCKET_STATUS } from '../../../constants/socket';

import { Alert } from '../../animated';

const alertTypes = {
	[SOCKET_STATUS.connected]    : 'success',
	[SOCKET_STATUS.disconnected] : 'warning',
	[SOCKET_STATUS.reconnection] : 'info',
	[SOCKET_STATUS.error]        : 'error',
};

const alertMessages = {
	[SOCKET_STATUS.connected]    : 'Socket server is connected',
	[SOCKET_STATUS.disconnected] : 'Socket server is disconnected',
	[SOCKET_STATUS.reconnection] : 'Socket server is doing reconnection...',
	[SOCKET_STATUS.error]        : 'Socket server connection error',
};

const SocketStatus = ({ status }) => {

	const type    = alertTypes[status];
	const message = alertMessages[status];

	return (
		<Alert
			showIcon
			key={type}
			type={type}
			message={message}
		/>
	);
};

SocketStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

const mapState = (state) => {
	const { status } = selectSocket(state);

	return {
		status,
	};
};

export default connect(mapState)(SocketStatus);
