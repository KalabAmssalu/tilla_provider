import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	claimData: {
		individual_member: 0,
		provider: 0,
		claim_number: "",
		insurance_type: "",
		billing_provider_npi: "",
		diagnosis_date: "",
		diagnosis_code: "",
		diagnosis_category: "",
		diagnosis_description: "",
		principal_diagnosis_code_poa_code: "",
		other_diagnosis_codes_poa_code: "",
		admitting_diagnosis_code: "",
		attending_provider_name_npi_specialty_code: "",
		treatment_details: "",
		service_date: "",
		additional_charge: 0,
		amount_claimed: "",
		member_payment_amount: "",
		total_amount: "",
		medical_record_number: "",
		admission_date: "",
		discharge_hour: "",
		admission_hour: "",
		revenue_center_description: "",
		other_provider_ids: "",
		treatment_authorization_codes: "",
		additional_notes: "",
		patient_discharge_status: "",
		location: "",
		source_of_admission: "",
		type_of_admission_visit: "",
		patient_control_number: "",
		patient_reason_for_visit_code: "",
		cpt_code: "",
		cpt_category: "",
		cpt_description: "",
		external_cause_of_injury_code: "",
		principal_procedure_code_date: "",
		other_procedure_code_date: "",
		operating_physician_name_npi_specialty_code: "",
		other_provider_name_npi_specialty_code: "",
		b3_taxonomy_code_qualifier: "",
		type_of_bill: "",
		payer_name: "",
		release_of_information_certification: "",
		assignment_of_benefit_certification: "",
		prior_payments: "",
		estimated_amount_due: "",
		revenue_code_tin_number: "",
		service_unit: 0,
		non_covered_charges: "",
		user: 0,
	},
};

const claimSlice = createSlice({
	name: "claim",
	initialState,
	reducers: {
		setClaimData: (state, action) => {
			state.claimData = action.payload;
		},
		clearClaimData: (state) => {
			state.claimData = initialState.claimData; // Resets to initial state
		},
	},
});

export const { setClaimData, clearClaimData } = claimSlice.actions;
export default claimSlice.reducer;
