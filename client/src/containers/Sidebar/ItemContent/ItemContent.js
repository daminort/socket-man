import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import queriesActions from '../../../redux/queries/actions';

import { Icon } from '../../../components/lib';

const ItemContent = ({ id, name, type, icon, collapsed, queryRemove }) => {

	const onClickRemove = (event) => {
		event.stopPropagation();
		queryRemove(id);
	};

	return (
		<div className="menu-item">
			{icon && <Icon type={icon} />}
			{type && <div className="type" title={type}>{type}</div>}
			{!collapsed && <div className="name">{name}</div>}
			{(!collapsed && type) && <Icon type="close" className="remove" onClick={onClickRemove} />}
		</div>
	);
};

ItemContent.propTypes = {
	id           : PropTypes.string.isRequired,
	name         : PropTypes.string.isRequired,
	type         : PropTypes.string,
	icon         : PropTypes.string,
	collapsed    : PropTypes.bool.isRequired,
	queryRemove  : PropTypes.func.isRequired,
};

ItemContent.defaultProps = {
	type: '',
	icon: '',
};

const mapActions = {
	queryRemove  : queriesActions.queryRemove,
};

export default connect(
	null,
	mapActions
)(ItemContent);
