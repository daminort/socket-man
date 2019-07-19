import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';

import emitterActions from '../../redux/emitter/actions';
import socketActions from '../../redux/socket/actions';
import queriesActions from '../../redux/queries/actions';
import { selectToolbar, selectEventData } from '../../redux/emitter/selectors';
import { selectModal, selectQuery } from '../../redux/queries/selectors';

import { validateEvent } from '../../helpers/validators/emitter';
import { FeedbackUtils } from '../../helpers/utils/FeedbackUtils';
import { TransformsUtils } from '../../helpers/utils/TransformsUtils';
import { validateQuery } from '../../helpers/validators/query';

import { Title, Button } from '../../components/lib';
import { TextArea } from '../../components/forms';
import Toolbar from './Toolbar';
import Hint from './Hint';

import { Wrapper } from './Emitter.style';

const Emitter = (props) => {
	const {
		eventType,
		eventData,
		queryID,
		queryName,
		eventDataSet,
		toolbarParamsSet,
		emitEvent,
		subscribeOnEvent,
		modalDataSet,
		querySave,
	} = props;

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

		if (eventData) {
			emitEvent(eventType, TransformsUtils.convertEventData(eventData));
		} else {
			subscribeOnEvent(eventType);
		}

		setTimeout(() => {
			actions.setSubmitting(false);
		}, 500);
	};

	const onClickSaveAs = () => {
		const { eventData } = formRef.current.values;
		const modal = {
			queryID : '',
			type    : eventType,
			body    : eventData,
			name    : '',
			visible : true,
		};

		modalDataSet(modal);
	};

	const onClickSave = () => {
		if (!queryID) {
			onClickSaveAs();
			return;
		}

		const { eventData } = formRef.current.values;
		const query = {
			type : eventType,
			body : eventData,
			name : queryName,
			id   : queryID,
		};

		const errors = validateQuery(query);
		if (errors) {
			FeedbackUtils.showMessageError(errors);
			return;
		}

		querySave(query);
	};


	const onClickNew = () => {
		eventDataSet('');
		toolbarParamsSet({ eventType: '' });
		modalDataSet({ queryID: '' });
	};

	return (
		<Wrapper>
			<Title level={4}>Emit events</Title>
			<Toolbar />
			<Formik
				enableReinitialize
				initialValues={{ eventData }}
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
							<Hint />
							<div className="buttons">
								<div className="left">
									{queryID && (
										<Button
											htmlType="button"
											icon="plus"
											title="Create new empty event"
											disabled={isSubmitting}
											onClick={onClickNew}
										>
											New
										</Button>
									)}
									<Button
										htmlType="button"
										icon="save"
										title="Save current event as template"
										disabled={isSubmitting}
										onClick={onClickSave}
									>
										Save
									</Button>
									{queryID && (
										<Button
											htmlType="button"
											icon="save"
											title="Save current template as new one"
											disabled={isSubmitting}
											onClick={onClickSaveAs}
										>
											Save as...
										</Button>
									)}
								</div>
								<div className="right">
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
							</div>
						</Form>
					);
				}}
			/>
		</Wrapper>
	);
};

Emitter.propTypes = {
	eventType        : PropTypes.string.isRequired,
	eventData        : PropTypes.string.isRequired,
	queryID          : PropTypes.string.isRequired,
	queryName        : PropTypes.string.isRequired,
	eventDataSet     : PropTypes.func.isRequired,
	toolbarParamsSet : PropTypes.func.isRequired,
	emitEvent        : PropTypes.func.isRequired,
	subscribeOnEvent : PropTypes.func.isRequired,
	modalDataSet     : PropTypes.func.isRequired,
	querySave        : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const { eventType } = selectToolbar(state);
	const { queryID } = selectModal(state);

	return {
		eventType,
		queryID,
		queryName: selectQuery(queryID, {}).name,
		eventData: selectEventData(state),
	};
};

const mapActions = {
	eventDataSet     : emitterActions.eventDataSet,
	toolbarParamsSet : emitterActions.toolbarParamsSet,
	emitEvent        : socketActions.outcomingEmitEvent,
	subscribeOnEvent : socketActions.outcomingSubscribeOnEvent,
	modalDataSet     : queriesActions.modalDataSet,
	querySave        : queriesActions.querySave,
};

export default connect(
	mapState,
	mapActions
)(Emitter);
