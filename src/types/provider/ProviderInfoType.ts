import * as z from "zod";

import { CountryData } from "@/constants/data/countryData";

export const createProviderInfoSchema = (t: (key: string) => string) =>
	z.object({
		tin_number: z.string().min(2, {
			message: t("fields.tin_number.error"),
		}),
		institute_name: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.institute_name.error") }),
		]),
		provider_id: z.string().min(2, {
			message: t("fields.provider_id.error"),
		}),
		provider_first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_first_name.error"),
			}),
		]),
		provider_middle_initial: z.union([
			z.literal(""),
			z
				.string()
				.min(2, {
					message: t("fields.provider_middle_initial.error"),
				})
				.regex(/^[^\d]*$/, {
					message: t("fields.provider_middle_initial.error"),
				}),
		]),
		provider_last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_last_name.error"),
			}),
		]),
		provider_first_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_first_name_amharic.error"),
			}),
		]),
		provider_middle_initial_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_middle_initial_amharic.error"),
			}),
		]),
		provider_last_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_last_name_amharic.error"),
			}),
		]),
		provider_title: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_title.error") }),
		]),
		provider_gender: z.union([
			z.literal(""),
			z.enum(["male", "female", "not_prefer_to_say"], {
				invalid_type_error: t("fields.provider_gender.error"),
			}),
		]),
		provider_date_of_birth: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.provider_date_of_birth.error"),
			}),
		]),
		provider_service_type: z.enum(["group", "professional", "institute"], {
			invalid_type_error: t("fields.provider_service_type.error"),
		}),
		provider_health_tier: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_health_tier.error") }),
		]),
		provider_health_sub_tier: z.union([
			z.literal(""),
			z
				.string()
				.min(2, { message: t("fields.provider_health_sub_tier.error") }),
		]),
		provider_contact_person: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_contact_person.error"),
			}),
		]),
		provider_contact_email: z.union([
			z.literal(""),
			z.string().email({ message: t("fields.provider_contact_email.error") }),
		]),
		provider_contact_phone_number: z.union([
			z.literal(""),
			z
				.string()
				.min(10, { message: t("fields.provider_contact_phone_number.error") })
				.max(15, { message: t("fields.provider_contact_phone_number.error") }),
		]),
		provider_phone_number: z
			.string()
			.min(10, { message: t("fields.provider_phone_number.error") })
			.max(15, { message: t("fields.provider_phone_number.error") }),
		provider_email: z
			.string()
			.email({ message: t("fields.provider_email.error") }),
	});

export type ProviderInfoFormValues = z.infer<
	ReturnType<typeof createProviderInfoSchema>
>;

export const createProviderAddressSchema = (t: (key: string) => string) =>
	z.object({
		provider_address: z.string().min(2, {
			message: t("fields.provider_address.error"),
		}),
		provider_address_line2: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_address_line2.error") }),
		]),
		provider_city: z.string().min(2, {
			message: t("fields.provider_city.error"),
		}),
		provider_country: z.string().min(2, {
			message: t("fields.provider_country.error"),
		}),
		provider_region: z.string().min(2, {
			message: t("fields.provider_region.error"),
		}),
		provider_kifle_ketema: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_kifle_ketema.error") }),
		]),
		provider_zip_code: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_zip_code.error") }),
		]),

		provider_fax: z.union([
			z.literal(""),
			z
				.string()
				.regex(/^\d{10,}$/, { message: t("fields.provider_fax.error") }),
		]),
	});

export type ProviderAddressFormValues = z.infer<
	ReturnType<typeof createProviderAddressSchema>
>;

export const createProviderGroupSchema = (t: (key: string) => string) =>
	z.object({
		provider_type: z.string().min(2, {
			message: t("fields.provider_type.error"),
		}),

		provider_primary_specialty: z.string().min(2, {
			message: t("fields.provider_primary_specialty.error"),
		}),

		provider_sub_specialty: z.string().min(2, {
			message: t("fields.provider_sub_specialty.error"),
		}),
		provider_discount_agreement: z
			.number()
			.nonnegative({
				message: t("fields.provider_discount_agreement.error"),
			})
			.optional(),
		provider_group_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_group_name.error"),
			}),
		]),
		provider_group_contact_person: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.provider_group_contact_person.error"),
			}),
		]),
		provider_group_phone_number: z.union([
			z.literal(""),
			z
				.string()
				.min(10, { message: t("fields.provider_group_phone_number.error") })
				.max(15, { message: t("fields.provider_group_phone_number.error") }),
		]),
		provider_group_contact_email: z.union([
			z.literal(""),
			z
				.string()
				.email({ message: t("fields.provider_group_contact_email.error") }),
		]),
		provider_group_address: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_group_address.error") }),
		]),
	});

export type ProviderGroupFormValues = z.infer<
	ReturnType<typeof createProviderGroupSchema>
>;

export const createProviderTitleOptions = (t: (key: string) => string) => [
	{ value: "Dr", label: t("fields.provider_title.options.Dr") },
	{ value: "MD", label: t("fields.provider_title.options.MD") },
	{ value: "DO", label: t("fields.provider_title.options.DO") },
	{ value: "DPM", label: t("fields.provider_title.options.DPM") },
	{ value: "PA", label: t("fields.provider_title.options.PA") },
	{ value: "NP", label: t("fields.provider_title.options.NP") },
	{ value: "PhD", label: t("fields.provider_title.options.PhD") },
	{ value: "RN", label: t("fields.provider_title.options.RN") },
	{ value: "BSN", label: t("fields.provider_title.options.BSN") },
	{ value: "MSN", label: t("fields.provider_title.options.MSN") },
	{ value: "Path", label: t("fields.provider_title.options.Path") },
	{ value: "Orthopedic", label: t("fields.provider_title.options.Orthopedic") },
	{ value: "PharmD", label: t("fields.provider_title.options.PharmD") },
	{ value: "Prof", label: t("fields.provider_title.options.Prof") },
	{ value: "Mr", label: t("fields.provider_title.options.Mr") },
	{ value: "Mrs", label: t("fields.provider_title.options.Mrs") },
	{ value: "Ms", label: t("fields.provider_title.options.Ms") },
];

export const healthTierOptions: Record<string, string[]> = {
	"Primary Level Health Care": [
		"Health Post (3-5,000 people)",
		"Health Center (25-40,000 people)",
		"Primary Hospital (1-1.5 million people)",
	],
	"Secondary Level Health Care": ["General Hospital (1-1.5 million people)"],
	"Tertiary Level Health Care": ["Special Hospital (3.5-5.0 million people)"],
};

// Function to list all the main tiers
export function getAllTiers(): string[] {
	return Object.keys(healthTierOptions);
}

// Function to list sub-tiers for a given main tier
export function getSubTiersForTier(tier: string): string[] | undefined {
	return healthTierOptions[tier];
}

// Function to get all country names
export function getAllCountries(): string[] {
	return CountryData.map((country) => country.name);
}

// Function to get all states for a given country by name
export function getStatesForCountry(countryName: string): string[] | undefined {
	const country = CountryData.find((country) => country.name === countryName);
	return country?.states.map((state) => state.name);
}

export const specialtyMapping: Record<
	string,
	{ Specialty: string[]; SubSpecialty: string[] }
> = {
	Dentist: {
		Specialty: ["General Dentistry", "Orthodontics", "Oral Surgery"],
		SubSpecialty: [
			"Pediatric Dentistry",
			"Cosmetic Dentistry",
			"Dental Implants",
		],
	},
	Physician: {
		Specialty: [
			"Internal Medicine",
			"Cardiology",
			"Endocrinology",
			"Dermatology",
			"Pulmonology",
		],
		SubSpecialty: [
			"Geriatrics",
			"Interventional Cardiology",
			"Diabetes Management",
			"Cosmetic Dermatology",
			"Respiratory Care",
		],
	},
	Nurse: {
		Specialty: ["Family Medicine", "Pediatrics"],
		SubSpecialty: ["Adult Care", "Neonatology"],
	},
	Surgeon: {
		Specialty: ["General Surgery", "Orthopedic Surgery", "Plastic Surgery"],
		SubSpecialty: [
			"Vascular Surgery",
			"Sports Medicine",
			"Reconstructive Surgery",
		],
	},
	Therapist: {
		Specialty: ["Physical Therapy", "Occupational Therapy"],
		SubSpecialty: ["Sports Therapy", "Hand Therapy"],
	},
	Chiropractor: {
		Specialty: ["Chiropractic Care"],
		SubSpecialty: ["Spinal Adjustments"],
	},
	Psychologist: {
		Specialty: ["Clinical Psychology", "Behavioral Therapy"],
		SubSpecialty: ["Counseling", "Addiction Treatment"],
	},
	Midwife: {
		Specialty: ["Obstetrics", "Gynecology"],
		SubSpecialty: ["Prenatal Care", "Women's Health"],
	},
	Podiatrist: {
		Specialty: ["Podiatric Medicine", "Foot Surgery"],
		SubSpecialty: ["Diabetic Foot Care", "Wound Care"],
	},
	Optometrist: {
		Specialty: ["Vision Care", "Ocular Disease"],
		SubSpecialty: ["Contact Lenses", "Low Vision Therapy"],
	},
	Radiologist: {
		Specialty: ["Diagnostic Radiology", "Interventional Radiology"],
		SubSpecialty: ["Body Imaging", "Vascular Imaging"],
	},
	Anesthesiologist: {
		Specialty: ["Anesthesiology", "Critical Care Anesthesia"],
		SubSpecialty: ["Pain Management", "Pediatric Anesthesia"],
	},
};

// export const specialtyMapping: Record<string, string[]> = {
// 	"Dental ": [
// 		"General Dentist",
// 		"Orthodontist",
// 		"Oral Surgeon",
// 		"Periodontist",
// 		"Endodontist",
// 		"Prosthodontist",
// 		"Pediatric Dentist",
// 	],
// 	"Medical ": [
// 		"General Practitioner",
// 		"Family Medicine Physician",
// 		"Internist",
// 		"Pediatrician",
// 		"OB/GYN",
// 		"Psychiatrist",
// 		"Cardiologist",
// 		"Neurologist",
// 		"Dermatologist",
// 		"Gastroenterologist",
// 		"Pulmonologist",
// 		"Rheumatologist",
// 		"Nephrologist",
// 		"Oncologist",
// 		"Endocrinologist",
// 	],
// 	"Surgical ": [
// 		"General Surgeon",
// 		"Orthopedic Surgeon",
// 		"Neurosurgeon",
// 		"Cardiothoracic Surgeon",
// 		"Vascular Surgeon",
// 		"Plastic and Reconstructive Surgeon",
// 		"Trauma Surgeon",
// 	],
// 	"Mental Health ": [
// 		"Psychologist",
// 		"Licensed Clinical Social Worker (LCSW)",
// 		"Marriage and Family Therapist (MFT)",
// 		"Psychiatric Nurse Practitioner",
// 		"Mental Health Counselor",
// 	],
// 	"Allied Health ": [
// 		"Physical Therapist",
// 		"Occupational Therapist",
// 		"Speech-Language Pathologist",
// 		"Respiratory Therapist",
// 		"Audiologist",
// 		"Dietitian/Nutritionist",
// 	],
// 	"Specialized ": [
// 		"Chiropractor",
// 		"Podiatrist",
// 		"Optometrist",
// 		"Ophthalmologist",
// 		"Urologist",
// 		"Otolaryngologist (ENT Specialist)",
// 		"Anesthesiologist",
// 		"Pain Management Specialist",
// 	],
// 	"Hospital-Based ": [
// 		"Hospitalist",
// 		"Emergency Medicine Physician",
// 		"Radiologist",
// 		"Pathologist",
// 		"Intensivist (Critical Care Specialist)",
// 	],
// 	"Nursing ": [
// 		"Registered Nurse (RN)",
// 		"Nurse Practitioner (NP)",
// 		"Certified Nurse Midwife (CNM)",
// 		"Licensed Practical Nurse (LPN)",
// 		"Clinical Nurse Specialist (CNS)",
// 	],
// 	"Pharmacy ": ["Pharmacist", "Clinical Pharmacist", "Pharmacy Technician"],
// 	"Rehabilitation ": [
// 		"Physical Medicine and Rehabilitation Specialist (PM&R)",
// 		"Rehabilitation Counselor",
// 		"Recreational Therapist",
// 	],
// 	"Laboratory ": [
// 		"Medical Technologist",
// 		"Phlebotomist",
// 		"Pathology Laboratory Specialist",
// 	],
// 	"Public Health ": [
// 		"Community Health Worker",
// 		"Public Health Nurse",
// 		"Health Educator",
// 	],
// 	"Durable Medical Equipment (DME) ": [
// 		"Durable Medical Equipment Supplier",
// 		"Orthotist",
// 		"Prosthetist",
// 	],
// 	"Alternative Medicine ": [
// 		"Acupuncturist",
// 		"Naturopathic Doctor (ND)",
// 		"Homeopath",
// 	],
// 	"Other ": [
// 		"Hospice Provider",
// 		"Home Health Provider",
// 		"EMT",
// 		"Paramedic",
// 		"Transport Provider (Ambulance Services)",
// 	],
// };
// Function to get all categories
export function getAllSpecialityCategories(): string[] {
	return Object.keys(specialtyMapping);
}

// Function to get all specialties for a given category
export function getSpecialtiesForCategory(
	category: string
): string[] | undefined {
	const categoryData = specialtyMapping[category];
	if (categoryData) {
		return categoryData.Specialty;
	}
	return undefined;
}

// Function to get all subspecialties for a given category
export function getSubSpecialtiesForCategory(
	category: string
): string[] | undefined {
	const categoryData = specialtyMapping[category];
	if (categoryData) {
		return categoryData.SubSpecialty;
	}
	return undefined;
}

//  	   "Dr": "Doctor",
//         "MD": "Medical Doctor",
//         "DO": "Doctor of Osteopathic Medicine",
//         "DPM": "Doctor of Podiatric Medicine",
//         "PA": "Physician Assistant",
//         "NP": "Nurse Practitioner",
//         "PhD": "Doctor of Philosophy",
//         "RN": "Registered Nurse",
//         "BSN": "Bachelor of Science in Nursing",
//         "MSN": "Master of Science in Nursing",
//         "Path": "Pathologist",
//         "Orthopedic": "Orthopedic Specialist",
//         "PharmD": "Doctor of Pharmacy",
//         "Prof": "Professor",
//         "Mr": "Mister",
//         "Mrs": "Missus",
//         "Ms": "Miss"
