module.exports = function convertMilliseconds(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	ms %= day;

	const hours = Math.floor(ms / hour);
	ms %= hour;

	const minutes = Math.floor(ms / minute);
	ms %= minute;

	const seconds = Math.floor(ms / second);

	const result = {};

	if (days >= 1) result.days = days;
	if (hours >= 1) result.hours = hours;
	if (minutes >= 1) result.minutes = minutes;
	if (seconds >= 1) result.seconds = seconds;

	return result;
};
