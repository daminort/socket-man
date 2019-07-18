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
		imitateUsers,
		appParamsSet,
		outcomingPingEnabled,
		outcomingImitateUsers,
	} = props;

	const onChangePingEnabled = () => {
		appParamsSet({ pingEnabled: !pingEnabled });
		outcomingPingEnabled(!pingEnabled);
	};

	const onChangeImitateUsers = () => {
		appParamsSet({ imitateUsers: !imitateUsers });
		outcomingImitateUsers(!imitateUsers);
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
				checked={imitateUsers}
				disabled={!pingEnabled}
				onChange={onChangeImitateUsers}
			>
				Imitate users when ping from server
			</Checkbox>
		</Wrapper>
	);
};

Settings.propTypes = {
	pingEnabled           : PropTypes.bool.isRequired,
	imitateUsers          : PropTypes.bool.isRequired,
	appParamsSet          : PropTypes.func.isRequired,
	outcomingPingEnabled  : PropTypes.func.isRequired,
	outcomingImitateUsers : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const { pingEnabled, imitateUsers } = selectApp(state);

	return {
		pingEnabled,
		imitateUsers,
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
