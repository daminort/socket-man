import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appActions from '../../redux/app/actions';
import { selectApp } from '../../redux/app/selectors';

import { Layout, Row, Col } from '../../components/lib';
import { MainContent, MainLayout } from '../../components/layouts';
import { Header } from '../../containers/Header';
import { Footer } from '../../containers/Footer';
import { Sidebar } from '../../containers/Sidebar';
import { HistoryContainer } from '../../containers/History';

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
			return <MainLayout />;
		}

		return (
			<MainLayout>
				<Sidebar />
				<Layout>
					<Header />
					<MainContent>
						<Row>
							<Col span={12}></Col>
							<Col span={12}><HistoryContainer /></Col>
						</Row>
					</MainContent>
					<Footer />
				</Layout>
			</MainLayout>
		);
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
