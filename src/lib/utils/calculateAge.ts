/**
 * Converts a date of birth to age in years.
 * @param dob - The date of birth as a string (e.g., "1990-01-01") or Date object.
 * @returns The calculated age in years as a number.
 */
export function calculateAge(dob: string | Date): number {
	const birthDate = new Date(dob);
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	// Adjust age if the current date is before the birth date in the current year
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
}
