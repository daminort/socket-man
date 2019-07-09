const chalk = require('chalk');
const format = require('date-fns/format');

const { FORMATS } = require('../constants/common');

const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];

function log(message, functionColor = null, options = {}) {
	const now = format(new Date(), FORMATS.fullDateTime);
	let resMessage = message;
	if (typeof functionColor === 'function') {
		resMessage = functionColor(message);
	} else if (colors.includes(functionColor)) {
		resMessage = chalk[functionColor](message);
	}

	if (options.trim) {
		const length = resMessage.length;
		if (length > 200) {
			resMessage = `${resMessage.slice(0, 200)}...`;
		}
	}

	console.log(`[${now}] ${resMessage}`);
}

module.exports = {
	log,
};
