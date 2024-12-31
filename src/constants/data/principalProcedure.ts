export function getAllPrincipalProcedure(): string[] {
	const categories = principalProcedure.map((principal) => principal.Category);
	const uniqueCategories: string[] = [];

	categories.forEach((category) => {
		if (!uniqueCategories.includes(category)) {
			uniqueCategories.push(category);
		}
	});

	return uniqueCategories;
}

export function getDescriptionsAndCodesByCategory(
	categoryName: string
): { Description: string; Codes: string }[] {
	return principalProcedure
		.filter((procedure) => procedure.Category === categoryName)
		.map((procedure) => ({
			Description: procedure.Description,
			Codes: procedure.Codes,
		}));
}

export const principalProcedure = [
	{
		Category: "Cardiac Procedures",
		Description: "Coronary artery bypass",
		Codes: "02100Z8",
	},
	{
		Category: "Cardiac Procedures",
		Description: "Replacement of mitral valve",
		Codes: "02RK0JZ",
	},
	{
		Category: "Orthopedic Procedures",
		Description: "Total hip replacement",
		Codes: "0SR90JZ",
	},
	{
		Category: "Orthopedic Procedures",
		Description: "Spinal fusion",
		Codes: "0SG10ZJ",
	},
	{
		Category: "Gastrointestinal Procedures",
		Description: "Appendectomy",
		Codes: "0DTJ0ZZ",
	},
	{
		Category: "Gastrointestinal Procedures",
		Description: "Colonoscopy",
		Codes: "0DBJ8ZZ",
	},
	{
		Category: "Respiratory Procedures",
		Description: "Tracheostomy",
		Codes: "0B11XEZ",
	},
	{
		Category: "Respiratory Procedures",
		Description: "Mechanical ventilation",
		Codes: "5A1945Z",
	},
	{
		Category: "Neurological Procedures",
		Description: "Craniotomy",
		Codes: "00B00ZZ",
	},
	{
		Category: "Neurological Procedures",
		Description: "Deep brain stimulation",
		Codes: "00H03MZ",
	},
	{
		Category: "Obstetric Procedures",
		Description: "Cesarean section",
		Codes: "10D00Z0",
	},
	{
		Category: "Obstetric Procedures",
		Description: "Hysterectomy",
		Codes: "0UT90ZZ",
	},
	{
		Category: "Urological Procedures",
		Description: "Kidney transplant",
		Codes: "0TY00Z0",
	},
	{
		Category: "Urological Procedures",
		Description: "Cystoscopy",
		Codes: "0TJB8ZZ",
	},
	{
		Category: "General Surgery",
		Description: "Laparoscopic hernia repair",
		Codes: "0D160Z3",
	},
	{
		Category: "General Surgery",
		Description: "Open wound repair",
		Codes: "0WQF0ZZ",
	},
	{
		Category: "Oncological Procedures",
		Description: "Tumor excision",
		Codes: "0DB80ZZ",
	},
	{
		Category: "Oncological Procedures",
		Description: "Introduction of chemotherapy",
		Codes: "3E0U3XZ",
	},
	{
		Category: "Transplant Procedures",
		Description: "Kidney transplant",
		Codes: "0TY00Z0",
	},
	{
		Category: "Transplant Procedures",
		Description: "Liver transplant",
		Codes: "0BY00Z0",
	},
	{
		Category: "Trauma Surgery",
		Description: "Fracture repair",
		Codes: "0QS30ZZ",
	},
	{
		Category: "Trauma Surgery",
		Description: "Open wound repair",
		Codes: "0WQF0ZZ",
	},
	{
		Category: "Vascular Procedures",
		Description: "Endovascular stent placement",
		Codes: "03LK0ZZ",
	},
	{
		Category: "Vascular Procedures",
		Description: "Vascular bypass",
		Codes: "04104JZ",
	},
	{
		Category: "Endocrine Procedures",
		Description: "Thyroidectomy",
		Codes: "0GB40ZZ",
	},
	{
		Category: "Endocrine Procedures",
		Description: "Adrenal gland excision",
		Codes: "0WQ00ZZ",
	},
	{
		Category: "Ophthalmic Procedures",
		Description: "Cataract removal",
		Codes: "08B00ZX",
	},
	{
		Category: "Ophthalmic Procedures",
		Description: "Corneal transplant",
		Codes: "08H00ZZ",
	},
	{
		Category: "ENT (Ear, Nose, Throat) Procedures",
		Description: "Tonsillectomy",
		Codes: "09HD0ZZ",
	},
	{
		Category: "ENT (Ear, Nose, Throat) Procedures",
		Description: "Sinus surgery",
		Codes: "0WQG0ZZ",
	},
	{
		Category: "Reproductive System Procedures",
		Description: "Oophorectomy",
		Codes: "0UT20ZZ",
	},
	{
		Category: "Reproductive System Procedures",
		Description: "Vasectomy",
		Codes: "0VB04ZZ",
	},
	{
		Category: "Pediatric Procedures",
		Description: "Pediatric fracture repair",
		Codes: "0QS00ZZ",
	},
	{
		Category: "Pediatric Procedures",
		Description: "Congenital defect repair",
		Codes: "0X200Z0",
	},
	{
		Category: "Dermatological Procedures",
		Description: "Skin lesion excision",
		Codes: "0HB03ZZ",
	},
	{
		Category: "Dermatological Procedures",
		Description: "Debridement of skin ulcer",
		Codes: "0HBF0ZZ",
	},
	{
		Category: "Radiological Procedures",
		Description: "MRI imaging",
		Codes: "BTXHZZ",
	},
	{
		Category: "Radiological Procedures",
		Description: "CT-guided biopsy",
		Codes: "BTXLZZ",
	},
	{
		Category: "Hematological Procedures",
		Description: "Bone marrow biopsy",
		Codes: "07GP0ZZ",
	},
	{
		Category: "Hematological Procedures",
		Description: "Transfusion of blood products",
		Codes: "3E0U7GC",
	},
	{
		Category: "Infectious Disease Procedures",
		Description: "Abscess drainage",
		Codes: "0WB40ZZ",
	},
	{
		Category: "Infectious Disease Procedures",
		Description: "Foreign body removal",
		Codes: "0DBF0ZZ",
	},
	{
		Category: "Pain Management Procedures",
		Description: "Introduction of anesthesia",
		Codes: "3E0U3XZ",
	},
	{
		Category: "Pain Management Procedures",
		Description: "Chronic pain therapy",
		Codes: "5A1955Z",
	},
	{
		Category: "Rehabilitation Procedures",
		Description: "Physical therapy",
		Codes: "F070ZZZ",
	},
	{
		Category: "Rehabilitation Procedures",
		Description: "Occupational therapy",
		Codes: "F072ZZA",
	},
];
