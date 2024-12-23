// Define the ClaimType
export type ClaimType = {
	id?: number;
	claim_id?: string;
	member_id: string;
	diagnosis_date?: string;
	diagnosis_code?: string;
	diagnosis_category: string;
	diagnosis_source: string;
	diagnosis_description: string;
	lonic_code: string;
	lonic_description: string;
	principal_diagnosis_code_poa_code: string;
	other_diagnosis_codes_poa_code: string;
	admitting_diagnosis_code: string;
	attending_provider_name_npi_specialty_code: string;
	treatment_details: string;
	service_start_date: string;
	service_end_date: string;
	service_charge: number; // Consider using number for currency values
	admission_date: string;
	discharge_hour: {
		hour: string;
		period?: "AM" | "PM";
	};
	admission_hour: {
		hour: string;
		period?: "AM" | "PM";
	};
	revenue_center_description: string;
	other_provider_ids: string;
	treatment_authorization_codes: string;
	additional_notes?: string;
	patient_discharge_status: string;
	source_of_admission: string;
	type_of_admission_visit: string;
	patient_control_number: string;
	patient_reason_for_visit_code: string;
	cpt_code: string;
	cpt_category: string;
	cpt_description: string;
	external_cause_of_injury_code: string;
	principal_procedure_code: string;
	other_procedure_code: string;
	other_procedure_code_description: string;
	operating_physician_name_npi_specialty_code: string;
	other_provider_name_npi_specialty_code: string;
	type_of_bill: string;
	place_of_service_code: string;
	place_of_service_description: string;
	billing_provider_npi: string;
	payer_name: string;
	release_of_information_certification?: File[];
	receipts: File[];
	medication_prescription: File[];
	additional_charge: number; // Consider using number for currency values
	revenue_code_tin_number: string;
	non_covered_charges?: number;
	// principal_diagnosis_code_poc_code?: string;
	// principal_diagnosis_code_poc_description?: string;
	// principal_diagnosis_code_poc_category?: string;
	// lonic_category?: string;
	medical_imaging?: File[];
	exam_and_lab?: File[];
	individual_member: number;
	provider: number;
};
