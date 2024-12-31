import * as z from "zod";

// Define the claim field schema
export const claimFieldSchema = z.object({
	diagnosis_date: z.string().optional(),
	diagnosis_code: z.string().optional(),
	diagnosis_category: z
		.string()
		.nonempty({ message: "Diagnosis Category is required" }),
	diagnosis_source: z
		.string()
		.nonempty({ message: "Diagnosis Source is required" }),
	diagnosis_description: z
		.string()
		.nonempty({ message: "Diagnosis Description is required" }),
	lonic_code: z.string().nonempty({ message: "Lonic Code is required" }),
	lonic_description: z
		.string()
		.nonempty({ message: "Lonic Description is required" }),
	principal_diagnosis_code_poa_code: z
		.string()
		.nonempty({ message: "Principal Diagnosis Code (POC Code) is required" }),
	other_diagnosis_codes_poa_code: z
		.string()
		.nonempty({ message: "Other Diagnosis Codes (POC Code) is required" }),
	admitting_diagnosis_code: z
		.string()
		.nonempty({ message: "Admitting Diagnosis Code is required" }),
	attending_provider_name_npi_specialty_code: z.string().nonempty({
		message: "Attending Provider Name/NPI/Specialty Code is required",
	}),
	treatment_details: z
		.string()
		.nonempty({ message: "Treatment Details are required" }),

	service_start_date: z
		.string()
		.nonempty({ message: "Service Date is required" }),
	service_end_date: z
		.string()
		.nonempty({ message: "Service Date is required" }),

	service_charge: z
		.string()
		.nonempty({ message: "Amount Claimed is required" })
		.refine((value) => !isNaN(Number(value)), {
			message: "Amount Claimed must be a number",
		}),
	admission_date: z
		.string()
		.nonempty({ message: "Admission Date is required" }),
	discharge_hour: z.string().optional(),

	// .regex(timeFormat, {
	// 	message: "Discharge Hour must be in the format hh:mm[:ss[.uuuuuu]]",
	// }),
	admission_hour: z.string().optional(),

	// .regex(timeFormat, {
	// 	message: "Admission Hour must be in the format hh:mm[:ss[.uuuuuu]]",
	// }),
	revenue_center_description: z
		.string()
		.nonempty({ message: "Revenue Center Description is required" }),
	other_provider_ids: z
		.string()
		.nonempty({ message: "Other Provider IDs are required" }),
	treatment_authorization_codes: z
		.string()
		.nonempty({ message: "Treatment Authorization Codes are required" }),
	additional_notes: z
		.string()
		.nonempty({ message: "Additional Notes are required" }),
	patient_discharge_status: z
		.string()
		.nonempty({ message: "Patient Discharge Status is required" }),
	source_of_admission: z
		.string()
		.nonempty({ message: "Source of Admission is required" }),
	type_of_admission_visit: z
		.string()
		.nonempty({ message: "Type of Admission/Visit is required" }),
	patient_control_number: z
		.string()
		.nonempty({ message: "Patient Control Number is required" }),
	patient_reason_for_visit_code: z
		.string()
		.nonempty({ message: "Patient Reason for Visit Code is required" }),
	cpt_code: z.string().nonempty({ message: "CPT Code is required" }),
	cpt_category: z.string().nonempty({ message: "CPT Category is required" }),
	cpt_description: z
		.string()
		.nonempty({ message: "CPT Description is required" }),
	external_cause_of_injury_code: z
		.string()
		.nonempty({ message: "External Cause of Injury Code is required" }),
	principal_procedure_code: z
		.string()
		.nonempty({ message: "Principal Procedure Code  is required" }),
	other_procedure_code: z
		.string()
		.nonempty({ message: "Other Procedure Code  is required" }),
	other_procedure_code_description: z
		.string()
		.nonempty({ message: "Other Procedure Code Description is required" }),
	operating_physician_name_npi_specialty_code: z.string().nonempty({
		message: "Operating Physician Name/NPI/Specialty Code is required",
	}),
	other_provider_name_npi_specialty_code: z.string().nonempty({
		message: "Other Provider Name/NPI/Specialty Code is required",
	}),

	type_of_bill: z.string().nonempty({ message: "Type of Bill is required" }),
	place_of_service_code: z
		.string()
		.nonempty({ message: "POS code is required" }),
	place_of_service_description: z
		.string()
		.nonempty({ message: "POS Description is required" }),
	billing_provider_npi: z
		.string()
		.nonempty({ message: "Billing Provider NPI is required" })
		.max(15, {
			message: "Billing Provider NPI must have no more than 15 characters.",
		}),
	payer_name: z.string().nonempty({ message: "Payer Name is required" }),
	release_of_information_certification: z.string().optional(),
	receipts: z.string(),
	medication_prescription: z.string(),
	additional_charge: z
		.string()
		.nonempty({ message: "Estimated Amount Due is required" }),
	revenue_code_tin_number: z
		.string()
		.nonempty({ message: "Revenue Code TIN Number is required" }),
	non_covered_charges: z.string().optional(),
	principal_diagnosis_code_poc_code: z.string().optional(),
	principal_diagnosis_code_poc_description: z.string().optional(),
	principal_diagnosis_code_poc_category: z.string().optional(),
	lonic_category: z.string().optional(),
	medical_imaging: z.string().optional(),
	exam_and_lab: z.string().optional(),
});

export type ClaimFormValues = z.infer<typeof claimFieldSchema>;
