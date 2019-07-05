import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectMessages } from '../../../redux/history/selectors';

import { Wrapper } from './List.style';

const List = ({ messages }) => {

	const items = messages.map(message => (
		<div className="message" key={message.id}>
			{message.message}
		</div>
	));

	return (
		<Wrapper>
			{items}
		</Wrapper>
	);
};

List.propTypes = {
	messages: PropTypes.array,
};

List.defaultProps = {
	messages: [],
};

const mapState = (state) => {

	return {
		messages: selectMessages(state),
	};
};

export default connect(mapState)(List);
