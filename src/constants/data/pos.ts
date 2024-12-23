// Function to get all descriptions from PosData
export function getAllPos(): string[] {
	return PosData.map((pos) => pos.Description);
}

// Function to get the Code for a given Description
export function getPosCode(Description: string): string | undefined {
	const SelectedDes = PosData.find((pos) => pos.Description === Description);
	return SelectedDes?.Code; // Return the Code if found, otherwise undefined
}

export const PosData = [
	{
		Code: "1",
		Description: "Pharmacy",
	},
	{
		Code: "2",
		Description: "Telehealth Provided Other than in Patient's Home",
	},
	{
		Code: "3",
		Description: "School",
	},
	{
		Code: "4",
		Description: "Homeless Shelter",
	},
	{
		Code: "5",
		Description: "Indian Health Service Free-standing Facility",
	},
	{
		Code: "6",
		Description: "Indian Health Service Provider-based Facility",
	},
	{
		Code: "7",
		Description: "Tribal 638 Free-standing Facility",
	},
	{
		Code: "8",
		Description: "Tribal 638 Provider-based Facility",
	},
	{
		Code: "9",
		Description: "Prison/Correctional Facility",
	},
	{
		Code: "10",
		Description: "Telehealth Provided in Patient's Home",
	},
	{
		Code: "11",
		Description: "Office",
	},
	{
		Code: "12",
		Description: "Home",
	},
	{
		Code: "13",
		Description: "Assisted Living Facility",
	},
	{
		Code: "14",
		Description: "Group Home",
	},
	{
		Code: "15",
		Description: "Mobile Unit",
	},
	{
		Code: "16",
		Description: "Temporary Lodging",
	},
	{
		Code: "17",
		Description: "Walk-in Retail Health Clinic",
	},
	{
		Code: "18",
		Description: "Place of Employment-Worksite",
	},
	{
		Code: "19",
		Description: "Off-campus Outpatient Hospital",
	},
	{
		Code: "20",
		Description: "Urgent Care Facility",
	},
	{
		Code: "21",
		Description: "Inpatient Hospital",
	},
	{
		Code: "22",
		Description: "On-campus Outpatient Hospital",
	},
	{
		Code: "23",
		Description: "Emergency Room - Hospital",
	},
	{
		Code: "24",
		Description: "Ambulatory Surgical Center",
	},
	{
		Code: "25",
		Description: "Birthing Center",
	},
	{
		Code: "26",
		Description: "Military Treatment Facility",
	},
	{
		Code: "27",
		Description: "Nursing Facility",
	},
	{
		Code: "28",
		Description: "Skilled Nursing Facility",
	},
	{
		Code: "29",
		Description: "Custodial Care Facility",
	},
	{
		Code: "30",
		Description: "Hospice",
	},
	{
		Code: "31",
		Description: "Comprehensive Inpatient Rehabilitation Facility",
	},
	{
		Code: "32",
		Description: "Nursing Facility for Mentally Retarded",
	},
	{
		Code: "33",
		Description: "Custodial Care Facility for Psychiatric Conditions",
	},
	{
		Code: "34",
		Description: "Adult Living Facility",
	},
	{
		Code: "41",
		Description: "Ambulance - Land",
	},
	{
		Code: "42",
		Description: "Ambulance - Air or Water",
	},
	{
		Code: "49",
		Description: "Independent Clinic",
	},
	{
		Code: "50",
		Description: "Federally Qualified Health Center",
	},
	{
		Code: "51",
		Description: "Inpatient Psychiatric Facility",
	},
	{
		Code: "52",
		Description: "Psychiatric Facility - Partial Hospitalization",
	},
	{
		Code: "53",
		Description: "Community Mental Health Center",
	},
	{
		Code: "54",
		Description:
			"Intermediate Care Facility/Individuals with Intellectual Disabilities",
	},
	{
		Code: "55",
		Description: "Residential Substance Abuse Treatment Facility",
	},
	{
		Code: "56",
		Description: "Psychiatric Residential Treatment Facility",
	},
	{
		Code: "57",
		Description: "Non-residential Substance Abuse Treatment Facility",
	},
	{
		Code: "58",
		Description: "Non-residential Psychiatric Treatment Facility",
	},
	{
		Code: "60",
		Description: "Mass Immunization Center",
	},
	{
		Code: "61",
		Description: "Comprehensive Outpatient Rehabilitation Facility",
	},
	{
		Code: "62",
		Description: "Comprehensive Mental Health Facility",
	},
	{
		Code: "65",
		Description: "End-Stage Renal Disease Treatment Facility",
	},
	{
		Code: "71",
		Description: "Public Health Clinic",
	},
	{
		Code: "72",
		Description: "Rural Health Clinic",
	},
	{
		Code: "81",
		Description: "Independent Laboratory",
	},
	{
		Code: "99",
		Description: "Other POS",
	},
];
