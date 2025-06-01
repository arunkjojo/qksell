function dateToStingFormat(inputDate: string): string {
    const date = new Date(inputDate);

    // Check for invalid date
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format. Expected format: M/D/YYYY");
    }

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    const formatted = date.toLocaleDateString('en-US', options).replace(',', '');
    const [month, day, year] = formatted.split(' ');

    return `${day} ${month}, ${year}`;
}

export { dateToStingFormat };