import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import historyActions from '../../../redux/history/actions';
import { selectEventTypesList, selectFilter } from '../../../redux/history/selectors';

import { Button } from '../../../components/lib';
import { Input, Select } from '../../../components/forms';

import { Wrapper } from './Toolbar.style';

const initialValues = {
	eventType : '',
	text      : '',
};

const Toolbar = ({ eventTypes, messagesClear, filterDataSet, filterDataReset }) => {

	const formRef = useRef({});

	const onSubmit = (values, actions) => {
		filterDataSet(values);
		actions.setSubmitting(false);
	};

	const onReset = () => {
		if (formRef.current.resetForm) {
			formRef.current.resetForm();
		}
		filterDataReset();
	};

	const onClear = () => {
		messagesClear();
		onReset();
	};

	return (
		<Wrapper>
			<div className="left">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					render={({ isSubmitting, resetForm }) => {
						formRef.current.resetForm = resetForm;

						return (
							<Form>
								<Field
									name="eventType"
									render={(fieldProps) => (
										<Select
											noStretch
											label="Event:"
											options={eventTypes}
											{...fieldProps}
										/>
									)}
								/>
								<Field
									name="text"
									render={(fieldProps) => (
										<Input
											noLabel
											noStretch
											placeholder="Enter search string"
											{...fieldProps}
										/>
									)}
								/>
								<Button
									type="primary"
									htmlType="submit"
									icon="search"
									title="Search"
									disabled={isSubmitting}
								/>
								<Button
									htmlType="button"
									icon="close"
									title="Reset form"
									disabled={isSubmitting}
									onClick={onReset}
								/>
							</Form>
						);
					}}
				/>
			</div>
			<div className="right">
				<Button
					icon="delete"
					title="Clear history"
					onClick={onClear}
				>
					Clear
				</Button>
			</div>
		</Wrapper>
	);
};

Toolbar.displayName = 'HistoryToolbar';

Toolbar.propTypes = {
	eventTypes       : PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string,
		title: PropTypes.string,
	})).isRequired,

	filter: PropTypes.shape({
		eventType : PropTypes.string,
		text      : PropTypes.string,
	}).isRequired,

	messagesClear   : PropTypes.func.isRequired,
	filterDataSet   : PropTypes.func.isRequired,
	filterDataReset : PropTypes.func.isRequired,
};

const mapState = (state) => {
	return {
		eventTypes : selectEventTypesList(state),
		filter     : selectFilter(state),
	};
};

const mapActions = {
	messagesClear   : historyActions.messagesClear,
	filterDataSet   : historyActions.filterDataSet,
	filterDataReset : historyActions.filterDataReset,
};

export default connect(
	mapState,
	mapActions
)(Toolbar);
