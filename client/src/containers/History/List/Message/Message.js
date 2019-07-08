import React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTransition, animated } from 'react-spring';
import { connect } from 'react-redux';

import { selectMessage } from '../../../../redux/history/selectors';
import { MESSAGE_TYPES } from '../../../../constants/socket';
import { POSITION } from '../../../../constants/common';

import { Tag} from '../../../../components/lib';
import { Avatar } from '../../../../components/ui';
import { Wrapper } from './Message.style';

const Message = ({ id, type, message, date, event }) => {

	const position = (type === MESSAGE_TYPES.admin) ? POSITION.right : POSITION.left;

	const blockClass = classnames('message-block', {
		left  : (position === POSITION.left),
		right : (position === POSITION.right),
	});
	const contentClass = classnames('content', {
		left  : (position === POSITION.left),
		right : (position === POSITION.right),
	});

	const transitions = useTransition(true, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	return transitions.map(({ item, key, props }) =>
		item && (
			<animated.div key={key} style={props}>
				<Wrapper className={blockClass} key={id}>
					<Avatar
						type={type}
						position={position}
					/>
					<div className={contentClass}>
						<div className="message">
							{message}
						</div>
						<div className="tags">
							<Tag>{date}</Tag>
							<Tag color="geekblue">{event}</Tag>
						</div>
					</div>
				</Wrapper>
			</animated.div>
		));
};

Message.propTypes = {
	id      : PropTypes.string.isRequired,
	type    : PropTypes.string.isRequired,
	message : PropTypes.string.isRequired,
	date    : PropTypes.string.isRequired,
	event   : PropTypes.string.isRequired,
};

const mapState = (state, props) => {

	const message = selectMessage(props.id)(state);

	return {
		type    : message.type,
		message : message.message,
		date    : message.date,
		event   : message.event,
	};
};

export default connect(mapState)(Message);
