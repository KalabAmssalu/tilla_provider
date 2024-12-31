export const SourceOfAdmissionData = [
	{
		Code: "1",
		Description: "Physician Referral",
	},
	{
		Code: "2",
		Description: "Clinic Referral",
	},
	{
		Code: "3",
		Description: "HMO Referral",
	},
	{
		Code: "4",
		Description: "Self-Referral",
	},
	{
		Code: "5",
		Description: "Transfer from Another Facility",
	},
];

export const TypeOfAdmissionData = [
	{
		Category: "Type of Admission",
		Code: "1",
		Description: "Emergency",
	},
	{
		Category: "Type of Admission",
		Code: "2",
		Description: "Urgent",
	},
	{
		Category: "Type of Admission",
		Code: "3",
		Description: "Elective",
	},
	{
		Category: "Type of Admission",
		Code: "4",
		Description: "Newborn",
	},
];

export function getAllAdmission(): string[] {
	return SourceOfAdmissionData.map(
		(admission) => `${admission.Code} - ${admission.Description}`
	);
}

export function getAllTypeOfAdmission(): string[] {
	return TypeOfAdmissionData.map(
		(admission) => `${admission.Code} - ${admission.Description}`
	);
}
