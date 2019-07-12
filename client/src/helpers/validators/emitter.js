import { object, string } from 'yup';

const schema = object().shape({
	eventType: string().required('You have to select Event'),
	eventData: string().default(() => ''),
});

export function validateEvent(eventType, eventData) {

	try {
		schema.validateSync({ eventType, eventData });
	} catch (e) {
		return e.errors;
	}

	return null;
}
