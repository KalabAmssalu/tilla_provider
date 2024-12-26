export const SourceOfAdmissionData = [
	{
		type: "Physician Referral",
		description:
			"Admission arranged by a physician's recommendation or referral.",
	},
	{
		type: "Clinic Referral",
		description:
			"Admission based on a referral from a hospital outpatient or freestanding clinic.",
	},
	{
		type: "HMO Referral",
		description:
			"Admission authorized or referred by a Health Maintenance Organization (HMO).",
	},
	{
		type: "Transfer from a Hospital",
		description: "Admission from another acute care hospital.",
	},
	{
		type: "Transfer from a Skilled Nursing Facility (SNF)",
		description:
			"Admission from a skilled nursing or intermediate care facility.",
	},
	{
		type: "Transfer from Another Healthcare Facility",
		description:
			"Admission from another type of healthcare facility (e.g., rehab, psych hospital).",
	},
	{
		type: "Emergency Department (ED)",
		description:
			"Admission from a hospital's emergency department after evaluation.",
	},
	{
		type: "Court/Law Enforcement",
		description:
			"Admission based on legal circumstances or law enforcement referral.",
	},
	{
		type: "Self-Referral",
		description:
			"Admission initiated by the patient without a referral from a healthcare professional.",
	},
	{
		type: "Newborn (Routine Delivery)",
		description: "Admission for a newborn during a routine delivery.",
	},
	{
		type: "Newborn (Transferred from Another Facility)",
		description:
			"Admission for a newborn transferred from another facility for additional care.",
	},
	{
		type: "Unknown/Other",
		description:
			"When the source of admission does not fit into standard categories or is not specified.",
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
		(admission) => `${admission.type} - ${admission.description}`
	);
}

export function getAllTypeOfAdmission(): string[] {
	return TypeOfAdmissionData.map(
		(admission) => `${admission.Code} - ${admission.Description}`
	);
}
