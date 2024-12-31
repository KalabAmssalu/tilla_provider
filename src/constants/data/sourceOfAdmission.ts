export const SourceOfAdmissionData = [
	{
		value: "Physician Referral",
		description:
			"Admission arranged by a physician's recommendation or referral.",
	},
	{
		value: "Clinic Referral",
		description:
			"Admission based on a referral from a hospital outpatient or freestanding clinic.",
	},
	{
		value: "HMO Referral",
		description:
			"Admission authorized or referred by a Health Maintenance Organization (HMO).",
	},
	{
		value: "Transfer from a Hospital",
		description: "Admission from another acute care hospital.",
	},
	{
		value: "Transfer from a Skilled Nursing Facility (SNF)",
		description:
			"Admission from a skilled nursing or intermediate care facility.",
	},
	{
		value: "Transfer from Another Healthcare Facility",
		description:
			"Admission from another type of healthcare facility (e.g., rehab, psych hospital).",
	},
	{
		value: "Emergency Department (ED)",
		description:
			"Admission from a hospital's emergency department after evaluation.",
	},
	{
		value: "Court/Law Enforcement",
		description:
			"Admission based on legal circumstances or law enforcement referral.",
	},
	{
		value: "Self-Referral",
		description:
			"Admission initiated by the patient without a referral from a healthcare professional.",
	},
	{
		value: "Newborn (Routine Delivery)",
		description: "Admission for a newborn during a routine delivery.",
	},
	{
		value: "Newborn (Transferred from Another Facility)",
		description:
			"Admission for a newborn transferred from another facility for additional care.",
	},
	{
		value: "Unknown/Other",
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

export const ClaimTypeData = [
	{
		value: "Inpatient Claim ",
		label: "Inpatient Claim ",
	},
	{
		value: "Emergency Claim ",
		label: "Emergency Claim ",
	},
	{
		value: "Planned Surgery",
		label: "Planned Surgery",
	},
	{
		value: "Outpatient Claim ",
		label: "Outpatient Claim ",
	},
	{
		value: "Cashless Claims (Direct Billing Claims)",
		label: "Cashless Claims (Direct Billing Claims)",
	},
	{
		value: "Reimbursement Claims",
		label: "Reimbursement Claims",
	},
];

type StrongSelectOptionType = {
	value: string;
	description: string;
};

export function getAllAdmission(): StrongSelectOptionType[] {
	return SourceOfAdmissionData;
}

export function getAllTypeOfAdmission(): string[] {
	return TypeOfAdmissionData.map(
		(admission) => `${admission.Code} - ${admission.Description}`
	);
}

export function getAllClaimType(): string[] {
	return ClaimTypeData.map((claim) => claim.label);
}
