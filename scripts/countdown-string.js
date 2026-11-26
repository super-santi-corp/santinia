module.exports = function countdownString({ days, hours, minutes, seconds }) {
	const parts = [];

	if (days) parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);
	if (hours) parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
	if (minutes) parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
	if (seconds)
		parts.push(`${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`);

	return parts.join(', ');
}