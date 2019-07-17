import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import socketActions from '../../redux/socket/actions';
import { selectApp } from '../../redux/app/selectors';

import { Title, Checkbox } from '../../components/lib';

import { Wrapper } from './Settings.style';

const Settings = (props) => {
	const {
		pingEnabled,
		pingImitateUsers,
		appParamsSet,
		outcomingPingEnabled,
		outcomingImitateUsers,
	} = props;

	const onChangePingEnabled = () => {
		appParamsSet({ pingEnabled: !pingEnabled });
		outcomingPingEnabled(!pingEnabled);
	};

	const onChangePingImitate = () => {
		appParamsSet({ pingImitateUsers: !pingImitateUsers });
		outcomingImitateUsers(!pingImitateUsers);
	};

	return (
		<Wrapper>
			<Title level={4}>Settings</Title>
			<Checkbox
				checked={pingEnabled}
				onChange={onChangePingEnabled}
			>
				Enable ping from socket server
			</Checkbox>
			<Checkbox
				checked={pingImitateUsers}
				disabled={!pingEnabled}
				onChange={onChangePingImitate}
			>
				Imitate users when ping from server
			</Checkbox>
		</Wrapper>
	);
};

Settings.propTypes = {
	pingEnabled           : PropTypes.bool.isRequired,
	pingImitateUsers      : PropTypes.bool.isRequired,
	appParamsSet          : PropTypes.func.isRequired,
	outcomingPingEnabled  : PropTypes.func.isRequired,
	outcomingImitateUsers : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const { pingEnabled, pingImitateUsers } = selectApp(state);

	return {
		pingEnabled,
		pingImitateUsers,
	};
};

const mapActions = {
	appParamsSet          : appActions.appParamsSet,
	outcomingPingEnabled  : socketActions.outcomingPingEnabled,
	outcomingImitateUsers : socketActions.outcomingImitateUsers,
};

export default connect(
	mapState,
	mapActions
)(Settings);
