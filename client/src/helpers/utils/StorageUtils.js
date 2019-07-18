import { STORAGE_KEYS } from '../../constants/common';

class StorageUtils {

	// Common
	static storeValue(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static restoreValue(key, defaultValue = null) {
		const value = localStorage.getItem(key);
		try {
			const parsedValue = JSON.parse(value);
			return parsedValue || defaultValue;
		} catch (e) {
			return defaultValue;
		}
	}

	// Queries
	static storeQueries(queries) {
		StorageUtils.storeValue(STORAGE_KEYS.queries, queries);
	}

	static restoreQueries() {
		return StorageUtils.restoreValue(STORAGE_KEYS.queries, []);
	}
}

export default StorageUtils;
export { StorageUtils };
