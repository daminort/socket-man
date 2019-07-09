import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import historyActions from '../../../redux/history/actions';
import { selectEventTypes, selectFilter } from '../../../redux/history/selectors';

import { Form, FormItem, Input, Button } from '../../../components/lib';
import { EventTypeSelect } from '../../../components/ui';

import { Wrapper } from './Toolbar.style';

const Toolbar = ({ eventTypes, form, messagesClear, filterDataSet, filterDataReset }) => {

	const { getFieldDecorator, getFieldsValue, resetFields } = form;

	const onSubmit = (event) => {
		event.preventDefault();
		const values = getFieldsValue();

		filterDataSet(values);
	};

	const onReset = () => {
		filterDataReset();
		resetFields();
	};

	const onClear = () => {
		messagesClear();
		filterDataReset();
		resetFields();
	};

	return (
		<Wrapper>
			<div className="left">
				<Form layout="inline" onSubmit={onSubmit}>
					<FormItem label="Event">
						{getFieldDecorator('eventType')(
							<EventTypeSelect
								eventTypes={eventTypes}
								placeholder="Select event type"
							/>,
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('text')(
							<Input placeholder="Search text" />,
						)}
					</FormItem>
					<FormItem>
						<Button
							type="primary"
							htmlType="submit"
							icon="search"
							title="Search"
						/>
					</FormItem>
					<FormItem>
						<Button
							icon="close"
							title="Reset form"
							onClick={onReset}
						/>
					</FormItem>
				</Form>
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
	eventTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	filter: PropTypes.shape({
		eventType : PropTypes.string,
		text      : PropTypes.string,
	}).isRequired,

	messagesClear: PropTypes.func.isRequired,
	filterDataSet: PropTypes.func.isRequired,
	filterDataReset: PropTypes.func.isRequired,

	form: PropTypes.object.isRequired,
};

const mapState = (state) => {

	return {
		eventTypes: selectEventTypes(state),
		filter: selectFilter(state),
	};
};

const mapActions = {
	messagesClear   : historyActions.messagesClear,
	filterDataSet   : historyActions.filterDataSet,
	filterDataReset : historyActions.filterDataReset,
};

const withForm = Form.create({ name: 'historyFilter' })(Toolbar);

export default connect(
	mapState,
	mapActions
)(withForm);
