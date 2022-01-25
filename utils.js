Date.prototype.addDays = function(days) {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}
Date.prototype.subtractDays = function(days) {
	const date = new Date(this.valueOf());
	date.setDate(date.getDate() - days);
	return date;
}

module.exports = {
	Date
}