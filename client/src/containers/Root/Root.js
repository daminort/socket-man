import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import { selectApp } from '../../redux/app/selectors';

class Root extends PureComponent {
	static propTypes = {
		appStarted: PropTypes.bool.isRequired,
		appStart: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { appStart } = this.props;
		appStart();
	}

	render() {
		const { appStarted } = this.props;
		if (!appStarted) {
			return <div />;
		}

		return <div>Socket-Man</div>;
	}
}

const mapState = state => {
	const { appStarted } = selectApp(state);

	return {
		appStarted,
	};
};

const mapActions = {
	appStart: appActions.appStart,
};

export default connect(
	mapState,
	mapActions
)(Root);
