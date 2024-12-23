export const dischargeStatus = [
	{
		Code: "1",
		Description: "Discharged to Home",
	},
	{
		Code: "2",
		Description: "Discharged to Another Facility",
	},
	{
		Code: "3",
		Description: "Expired",
	},
	{
		Code: "4",
		Description: "Left Against Medical Advice",
	},
	{
		Code: "5",
		Description: "Transferred to Hospice",
	},
];

export function getAllDischargeStatus(): string[] {
	return dischargeStatus.map(
		(discharge) => `${discharge.Code} - ${discharge.Description}`
	);
}
