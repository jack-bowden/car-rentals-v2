export function parseDate(date: Date) {
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
		.format(date)
		.replace(/\//g, '-');
}

export function useFormatDate(dateInput: string | number | Date) {
	if (!dateInput) return 'N/A';

	let date;
	if (typeof dateInput === 'string') {
		date = new Date(dateInput);
	} else if (typeof dateInput === 'number') {
		date = new Date(dateInput);
	} else {
		return 'Invalid Date';
	}

	if (isNaN(date.getTime())) {
		return 'Invalid Date';
	}

	return parseDate(date);
}
