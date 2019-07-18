import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';

import queriesActions from '../../redux/queries/actions';
import { selectModal } from '../../redux/queries/selectors';

import { Modal } from '../../components/lib';
import { Input, TextArea } from '../../components/forms';

import { validateQuery } from '../../helpers/validators/query';
import { FeedbackUtils } from '../../helpers/utils/FeedbackUtils';

import { Wrapper } from './Query.style';

const Query = (props) => {
	const {
		visible,
		queryID,
		type,
		body,
		name,
		querySave,
		modalDataReset,
	} = props;

	const formRef = useRef({});
	const initValues = {
		queryID,
		type,
		body,
		name,
	};

	const onSubmit = (values, actions) => {
		const query = {
			type,
			body,
			name : values.name,
			id   : queryID,
		};

		const errors = validateQuery(query);
		if (errors) {
			FeedbackUtils.showMessageError(errors);
			return;
		}

		querySave(query);

		actions.setSubmitting(false);
		modalDataReset();
		formRef.current.resetForm(initValues);
	};

	const onSave = () => {
		formRef.current.submitForm();
	};

	const onCancel = () => {
		formRef.current.resetForm(initValues);
		modalDataReset();
	};

	return (
		<Modal
			title="Save event as template"
			visible={visible}
			width="40%"
			okText="Save"
			onOk={onSave}
			onCancel={onCancel}
		>
			<Wrapper>
				<Formik
					enableReinitialize
					initialValues={initValues}
					onSubmit={onSubmit}
					render={({ resetForm, submitForm }) => {
						formRef.current.resetForm = resetForm;
						formRef.current.submitForm = submitForm;

						return (
							<Form>
								<Field
									name="name"
									render={(fieldProps) => (
										<Input
											label="Name:"
											placeholder="Enter template name here"
											{...fieldProps}
										/>
									)}
								/>
								<Field
									name="type"
									render={(fieldProps) => (
										<Input
											label="Type:"
											disabled
											{...fieldProps}
										/>
									)}
								/>
								<Field
									name="queryID"
									render={(fieldProps) => (
										<Input
											label="ID:"
											disabled
											{...fieldProps}
										/>
									)}
								/>
								<Field
									name="body"
									render={(fieldProps) => (
										<TextArea
											noLabel
											disabled
											rows={3}
											{...fieldProps}
										/>
									)}
								/>
							</Form>
						);
					}}
				/>
			</Wrapper>
		</Modal>
	);
};

Query.propTypes = {
	visible        : PropTypes.bool.isRequired,
	queryID        : PropTypes.string.isRequired,
	type           : PropTypes.string.isRequired,
	body           : PropTypes.string.isRequired,
	name           : PropTypes.string.isRequired,
	querySave      : PropTypes.func.isRequired,
	modalDataReset : PropTypes.func.isRequired,
};

const mapState = (state) => {
	const modal = selectModal(state);
	return {
		...modal,
	};
};

const mapActions = {
	querySave      : queriesActions.querySave,
	modalDataReset : queriesActions.modalDataReset,
};

export default connect(
	mapState,
	mapActions
)(Query);
