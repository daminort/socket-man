
class TransformsUtils {

	static createSelectOptions(valuesList = []) {
		if (!Array.isArray(valuesList)) {
			return [];
		}

		return valuesList.map(value => ({
			value,
			title: String(value),
		}));
	}

	static converEventData(eventData) {
		try {
			const draft = eval(`(${eventData})`); /* eslint-disable-line no-eval */
			return JSON.parse(JSON.stringify(draft));
		} catch (e) {
			return eventData;
		}
	}
}

export default TransformsUtils;
export { TransformsUtils };
