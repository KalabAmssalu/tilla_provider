export function getAllPrincipalProcedure(): string[] {
	return principalProcedure.map((principal) => principal.Description);
}

export const principalProcedure = [
	{
		Category: "Principal Procedure",
		Code: "001",
		Description: "Appendectomy",
	},
	{
		Category: "Principal Procedure",
		Code: "002",
		Description: "Cataract Surgery",
	},
	{
		Category: "Principal Procedure",
		Code: "003",
		Description: "Hip Replacement",
	},
	{
		Category: "Principal Procedure",
		Code: "004",
		Description: "Coronary Artery Bypass",
	},
	{
		Category: "Principal Procedure",
		Code: "005",
		Description: "Gallbladder Removal",
	},
];
