import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import queriesActions from '../../redux/queries/actions';
import emitterActions from '../../redux/emitter/actions';
import { selectQueries, selectModal } from '../../redux/queries/selectors';

import { Sider, Menu, MenuItem } from '../../components/lib';
import { Logo } from '../../components/ui';

import { find } from '../../helpers/lodash';
import { ItemContent } from './ItemContent';

import { Wrapper } from './Sidebar.style';
import { queryProps } from './propTypes';

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
		if (key === '0') {
			return;
		}
		const query = find(queries, { id: key });

		toolbarParamsSet({ eventType: query.type });
		eventDataSet(query.body);
		modalDataSet({ queryID: key });
	};

	const noItems = !queries.length && (
		<MenuItem key="0">
			<ItemContent
				id="0"
				name="No saved queries"
				icon="info-circle"
				collapsed={collapsed}
			/>
		</MenuItem>
	);

	const menuItems = queries.map(item => (
		<MenuItem key={item.id}>
			<ItemContent
				id={item.id}
				name={item.name}
				type={item.type}
				collapsed={collapsed}
			/>
		</MenuItem>
	));

	return (
		<Sider
			collapsible
			width={300}
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
		>
			<Wrapper>
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
			</Wrapper>
		</Sider>
	);
};

Sidebar.propTypes = {
	queryID: PropTypes.string.isRequired,
	queries: PropTypes.arrayOf(queryProps).isRequired,

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
