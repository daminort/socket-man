import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import queriesActions from '../../redux/queries/actions';
import emitterActions from '../../redux/emitter/actions';
import { selectQueries, selectModal } from '../../redux/queries/selectors';

import { Sider, Menu, MenuItem, Icon } from '../../components/lib';
import { Logo } from '../../components/ui';

import { find } from '../../helpers/lodash';

const Sidebar = (props) => {
	const {
		queryID,
		queries,
		modalDataSet,
		toolbarParamsSet,
		eventDataSet,
	} = props;

	const [collapsed, setCollapsed] = useState(false);

	const onSelect = ({ key }) => {
		const query = find(queries, { id: key });

		toolbarParamsSet({ eventType: query.type });
		eventDataSet(query.body);
		modalDataSet({ queryID: key });
	};

	const noItems = !queries.length && (
		<MenuItem key="0">
			<Icon type="info-circle" />
			<span>No saved queries</span>
		</MenuItem>
	);

	const menuItems = queries.map(item => (
		<MenuItem key={item.id}>
			<Icon type="file" />
			<span>{item.name}</span>
		</MenuItem>
	));

	return (
		<Sider
			collapsible
			width={300}
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
		>
			<Logo collapsed={collapsed} />
			<Menu
				theme="dark"
				mode="inline"
				selectedKeys={[queryID]}
				onSelect={onSelect}
			>
				{noItems}
				{menuItems}
			</Menu>
		</Sider>
	);
};

Sidebar.propTypes = {
	queryID: PropTypes.string.isRequired,
	queries: PropTypes.arrayOf(PropTypes.shape({
		id   : PropTypes.string.isRequired,
		name : PropTypes.string.isRequired,
		type : PropTypes.string.isRequired,
		body : PropTypes.string.isRequired,
	})).isRequired,

	modalDataSet     : PropTypes.func.isRequired,
	toolbarParamsSet : PropTypes.func.isRequired,
	eventDataSet     : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const { queryID } = selectModal(state);
	return {
		queryID,
		queries: selectQueries(state),
	};
};

const mapActions = {
	modalDataSet     : queriesActions.modalDataSet,
	toolbarParamsSet : emitterActions.toolbarParamsSet,
	eventDataSet     : emitterActions.eventDataSet,
};

export default connect(
	mapState,
	mapActions
)(Sidebar);
