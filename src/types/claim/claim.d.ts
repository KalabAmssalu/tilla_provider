// Define the ClaimType
export type ClaimType = {
	// id?: number;
	claim_id?: number;
	individual_member: number;
	provider: number;

	place_of_service_description: string;
	place_of_service_code: string;
	billing_provider_npi: string;
	attending_provider_name_npi_specialty_code: string;

	other_provider_name_npi_specialty: string;
	other_provider_ids: string;
	admission_date: string;
	admission_hour: {
		hour: string;
		period?: "AM" | "PM";
	};
	source_of_admission: string;
	type_of_admission_visit: string;
	admitting_diagnosis: string;
	patient_reason_for_visit: string;

	diagnosis_date?: string;
	diagnosis_code?: string;
	diagnosis_category: string;
	diagnosis_source: string;
	diagnosis_description: string;

	other_diagnosis_codes_poc_code: string;
	external_cause_of_injury_code: string;
	treatment_details: string;
	treatment_authorization_codes: string;

	lonic_category: string;
	lonic_code: string;
	lonic_description: string;

	cpt_code: string;
	cpt_category: string;
	cpt_description: string;

	principal_procedure_code: string;
	other_procedure_code_description: string;
	operating_physician_name_npi_specialty_code: string;

	service_start_date: string;
	service_end_date: string;
	discharge_hour: {
		hour: string;
		period?: "AM" | "PM";
	};
	patient_discharge_status: string;
	additional_notes?: string;

	type_of_bill: string;
	payer_name: string;
	revenue_code_tin_number: string;

	service_charge: number;
	additional_charge: number;
	non_covered_charges?: number;

	release_of_information_reciept: File[];
	receipts: File[];
	medication_prescription: File[];
	medical_imaging?: File[];
	exam_and_lab?: File[];

	// for details
	patient_control_number?: string;
	claim_number?: string;
	member_payment_amount?: string;
	total_amount_payment_by_insurance?: string;
	grand_total?: string;
	total_payment_for_provider_after_discount?: string;
};
