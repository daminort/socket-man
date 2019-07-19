import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import emitterActions from '../../../redux/emitter/actions';
import { selectEventTypesList, selectToolbar } from '../../../redux/emitter/selectors';

import { Button } from '../../../components/lib';
import { Input, Select } from '../../../components/forms';

import { Wrapper } from './Toolbar.style';

const Toolbar = ({ eventType, eventTypes, toolbarParamsSet, eventTypeAdd }) => {

	const [formVisible, setFormVisible] = useState(false);

	const onSubmit = (values, actions) => {
		const { newEventType } = values;

		eventTypeAdd(newEventType);
		setFormVisible(false);
		toolbarParamsSet({ eventType: newEventType });

		actions.setSubmitting(false);
	};

	const onChangeEventType = (event) => {
		const { target: { value } } = event;
		toolbarParamsSet({ eventType: value });
	};

	const btnClass = classnames({
		'visible': !formVisible,
		'non-visible': formVisible,
	});
	const formClass = classnames('right', {
		'visible': formVisible,
		'non-visible': !formVisible,
	});

	return (
		<Wrapper>
			<div className="left">
				<Select
					noStretch
					label="Event:"
					options={eventTypes}
					field={{
						name: 'eventType',
						value: eventType,
						onChange: onChangeEventType,
					}}
				/>
				<Button
					type="primary"
					icon="plus"
					title="Add new event"
					className={btnClass}
					onClick={() => setFormVisible(true)}
				/>
			</div>
			<div className={formClass}>
				<Formik
					initialValues={{ newEventType: '' }}
					onSubmit={onSubmit}
					render={({ isSubmitting }) => (
						<Form>
							<Field
								name="newEventType"
								render={(props) => (<Input {...props} placeholder="Enter new event" />)}
							/>
							<Button
								type="primary"
								htmlType="submit"
								icon="check"
								title="Save new event"
								disabled={isSubmitting}
							/>
						</Form>
					)}
				/>
			</div>
		</Wrapper>
	);
};

Toolbar.displayName = 'EmitterToolbar';

Toolbar.propTypes = {
	eventType        : PropTypes.string,
	eventTypes       : PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string,
		title: PropTypes.string,
	})).isRequired,

	eventTypeAdd     : PropTypes.func.isRequired,
	toolbarParamsSet : PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
	eventType: '',
};

const mapState = (state) => {
	const { eventType } = selectToolbar(state);

	return {
		eventType,
		eventTypes: selectEventTypesList(state),
	};
};

const mapActions = {
	eventTypeAdd     : emitterActions.eventTypeAdd,
	toolbarParamsSet : emitterActions.toolbarParamsSet,
};

export default connect(
	mapState,
	mapActions
)(Toolbar);
