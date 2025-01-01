import { CountryData } from "../countryData";

// Function to get all country names
export function getAllCountries(): string[] {
	return CountryData.map((country) => country.name);
}

// Function to get all states for a given country by name
export function getStatesForCountry(countryName: string): string[] | undefined {
	const country = CountryData.find((country) => country.name === countryName);
	return country?.states.map((state) => state.name);
}
