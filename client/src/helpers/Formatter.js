import { FORMATS } from '../constants/formats';
import { parse, format } from './date-fns';

class Formatter {
	static parseDate(date = null, defaultValue = null) {
		if (!date) {
			return defaultValue || new Date();
		}
		if (date instanceof Date) {
			return date;
		}
		try {
			return parse(date);
		} catch (e) {
			if (defaultValue) {
				return defaultValue;
			}

			throw e;
		}
	}

	static fullDateTime(date = null) {
		const resDate = Formatter.parseDate(date, new Date());
		return format(resDate, FORMATS.fullDateTime);
	}
}

export default Formatter;
export { Formatter };
