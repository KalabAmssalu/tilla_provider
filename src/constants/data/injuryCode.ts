export const injuryCode = [
	{
		Code: "A00",
		Description: "Cholera",
	},
	{
		Code: "A01",
		Description: "Typhoid Fever",
	},
	{
		Code: "A02",
		Description: "Salmonella Infection",
	},
	{
		Code: "A03",
		Description: "Shigellosis",
	},
	{
		Code: "A04",
		Description: "Escherichia coli Infection",
	},
];

export function getAllInjuryCode(): string[] {
	return injuryCode.map((injury) => `${injury.Code} - ${injury.Description}`);
}
