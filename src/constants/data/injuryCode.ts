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
	{
		Code: "V00-V99",
		Description: "Transport Accidents",
	},
	{
		Code: "W00-W19",
		Description: "Falls",
	},
	{
		Code: "X30-X39",
		Description: "Forces of Nature",
	},
	{
		Code: "X40-X49",
		Description: "Accidental Poisoning",
	},
	{
		Code: "W65-W74",
		Description: "Drowning",
	},
	{
		Code: "X00-X19",
		Description: "Fire and Burn Injuries",
	},
	{
		Code: "X60-X84, Y01-Y09",
		Description: "Intentional Injuries",
	},
	{
		Code: "Y10-Y34",
		Description: "Unspecified Cause",
	},
];

export function getAllInjuryCode(): string[] {
	return injuryCode.map((injury) => `${injury.Code} - ${injury.Description}`);
}
