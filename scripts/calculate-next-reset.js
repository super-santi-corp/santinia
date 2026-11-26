module.exports =

/** @param {Date} currentDate */
function calculateNextReset(currentDate) {
	const currentYear = currentDate.getUTCFullYear();
	// Resets are every November 30th, at midnight GMT -5
	const RESET_MONTH = 11,
		RESET_DAY = 30,
		RESET_H = 0,
		RESET_M = 0,
		RESET_S = 0,
		RESET_TZ = -5;
	const currentYearResetDate = new Date(
		`${currentYear}-${RESET_MONTH}-${RESET_DAY} ${RESET_H}:${RESET_M}:${RESET_S} ${(RESET_TZ >=
		0
			? '+'
			: ''
		).concat(String(RESET_TZ).padStart(2, ''), ':00')}`
	);

	const difference = currentYearResetDate.getTime() - currentDate.getTime();

	if (difference < 0) {
		// we're beyond this year's reset
		const resetDate = new Date(currentYearResetDate);
		resetDate.setUTCFullYear(currentYear + 1);
		return resetDate;
	}
	// otherwise we're still at or behind, so we return the current year's reset date
	return currentYearResetDate;
}