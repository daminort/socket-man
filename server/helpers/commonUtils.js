function random(upper, lower) {
	return lower + Math.floor(Math.random() * (upper - lower + 1));
}

module.exports = {
	random,
};
