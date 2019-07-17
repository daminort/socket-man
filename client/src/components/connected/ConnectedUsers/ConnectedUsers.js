import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSocket } from '../../../redux/app/selectors';

import { Alert } from '../../animated';

const ConnectedUsers = ({ connectedUsers }) => {
	if (!connectedUsers.length) {
		return (
			<Alert
				showIcon
				key="warning"
				type="warning"
				message="Nobody connected"
			/>
		);
	}

	return connectedUsers.map(user => {
		const { id, handshake } = user;
		const { headers: { origin } } = handshake;

		return (
			<Alert
				showIcon
				key={id}
				type="info"
				message={origin}
			/>
		);
	});
};

ConnectedUsers.propTypes = {
	connectedUsers: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		handshake: PropTypes.shape({
			headers: PropTypes.shape({
				origin: PropTypes.string,
			}),
		}),
	})),
};

ConnectedUsers.defaultProps = {
	connectedUsers: [],
};

const mapState = (state) => {
	const { connectedUsers } = selectSocket(state);

	return {
		connectedUsers,
	};
};


export default connect(mapState)(ConnectedUsers);
