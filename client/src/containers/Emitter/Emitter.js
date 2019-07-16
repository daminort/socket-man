import React, { useRef } from 'react';
import * as PropTypes from 'prop-types'; 
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';

import emitterActions from '../../redux/emitter/actions';
import socketActions from '../../redux/socket/actions';
import { selectToolbar } from '../../redux/emitter/selectors';

import { validateEvent } from '../../helpers/validators/emitter';
import { FeedbackUtils } from '../../helpers/utils/FeedbackUtils';
import { TransformsUtils } from '../../helpers/utils/TransformsUtils';

import { Title, Button } from '../../components/lib';
import { TextArea } from '../../components/forms';
import Toolbar from './Toolbar';

import { Wrapper } from './Emitter.style';

const Emitter = ({ eventType, eventDataSet, emitEvent }) => {

	const formRef = useRef({});

	const onSubmit = (values, actions) => {
		const { eventData } = values;
		const errors = validateEvent(eventType, eventData);
		if (errors) {
			FeedbackUtils.showMessageError(errors);
			actions.setSubmitting(false);
			return;
		}

		eventDataSet(eventData);
		emitEvent(eventType, TransformsUtils.convertEventData(eventData));
		actions.setSubmitting(false);
	};

	// TODO: saving current data as template
	const onClickSave = () => {
		const { eventData } = formRef.current.values;
		console.log('Emitter.js, onClickSave [30]', { eventType, eventData });
	};

	return (
		<Wrapper>
			<Title level={4}>Emit events</Title>
			<Toolbar />
			<Formik
				initialValues={{ eventData: '' }}
				onSubmit={onSubmit}
				render={({ isSubmitting, values }) => {
					formRef.current.values = values;

					return (
						<Form>
							<Field
								name="eventData"
								render={(fieldProps) => (
									<TextArea
										noLabel
										placeholder="Enter event data here"
										{...fieldProps}
									/>
								)}
							/>
							<div className="buttons">
								<Button
									htmlType="button"
									icon="save"
									title="Save current event as template"
									disabled={isSubmitting}
									onClick={onClickSave}
								>
									Save
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									icon="cloud-upload"
									title="Emit event to socket server"
									disabled={isSubmitting}
								>
									Send
								</Button>
							</div>
						</Form>
					);
				}}
			/>
		</Wrapper>
	);
};

Emitter.propTypes = {
	eventType    : PropTypes.string.isRequired,
	eventDataSet : PropTypes.func.isRequired,
	emitEvent    : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const { eventType } = selectToolbar(state);
	return {
		eventType,
	};
};

const mapActions = {
	eventDataSet : emitterActions.eventDataSet,
	emitEvent    : socketActions.outcomingEmitEvent,
};

export default connect(
	mapState,
	mapActions
)(Emitter);
