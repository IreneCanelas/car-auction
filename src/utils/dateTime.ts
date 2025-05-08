export function formatDuration(seconds: number): string {
	let calc = seconds;
	const days = Math.floor(calc / (24 * 3600));
	calc %= 24 * 3600;
	const hours = Math.floor(calc / 3600);
	calc %= 3600;
	const minutes = Math.floor(calc / 60);
	calc %= 60;
	const pad = (n: number) => n.toString().padStart(2, "0");

	return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(calc)}s`;
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
