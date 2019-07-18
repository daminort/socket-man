import { object, string } from 'yup';

const schema = object().shape({
	name: string().required('You have to specify name of the query'),
	type: string().required('You have to select correct event type'),
	body: string().required('You cannot save template without body'),
});

export function validateQuery(query) {

	try {
		schema.validateSync(query);
	} catch (e) {
		return e.errors;
	}

	return null;
}
