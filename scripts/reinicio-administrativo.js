const calculateNextReset = require('./calculate-next-reset');
const convertMilliseconds = require('./convert-milliseconds');
const countdownString = require('./countdown-string');

module.exports = function handler(_, res) {
	const currentDate = new Date();
	const nextReset = calculateNextReset(currentDate);
	const difference = nextReset.getTime() - currentDate.getTime();
	const noJsCountdown = countdownString(convertMilliseconds(difference));

	res.render('reinicio-administrativo', { difference, noJsCountdown });
};
