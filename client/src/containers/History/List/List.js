import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectFilteredMessages } from '../../../redux/history/selectors';

import Message from './Message';
import { Wrapper } from './List.style';

const List = ({ messages }) => {

	const items = messages.map(({ id }) => (
		<Message id={id} key={id} />
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
		messages: selectFilteredMessages(state),
	};
};

export default connect(mapState)(List);
