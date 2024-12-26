import ClaimDetailView from "@/components/module/claimStatus/ClaimStatusDetail";
import { type ClaimType } from "@/types/claim/claim";

async function getClaimData(id: string): Promise<Partial<ClaimType>> {
	return {
		claim_id: 101,
		individual_member: 4567,
		provider: 7890,

		place_of_service_description: "Outpatient Hospital",
		place_of_service_code: "22",
		billing_provider_npi: "1234567890",
		attending_provider_name_npi_specialty_code:
			"Dr. John Doe | NPI: 0987654321 | Cardiology",
		other_provider_ids: "56789, 67890",
		admission_date: "2024-12-20",
		admission_hour: {
			hour: "08:30",
			period: "AM",
		},
		source_of_admission: "Referral",
		type_of_admission_visit: "Elective",
		admitting_diagnosis: "Chest Pain",
		patient_reason_for_visit: "Shortness of breath and discomfort",

		diagnosis_date: "2024-12-21",
		diagnosis_code: "I20.9",
		diagnosis_category: "Cardiovascular",
		diagnosis_source: "ICD-10",
		diagnosis_description: "Unspecified Angina Pectoris",

		other_diagnosis_codes_poc_code: "I10, E11.9",
		external_cause_of_injury_code: "W19",
		treatment_authorization_codes: "AUTH12345",

		lonic_category: "Lab Tests",
		lonic_code: "12345-6",
		lonic_description: "Lipid Panel",

		cpt_code: "92928",
		cpt_category: "Surgical Procedures",
		cpt_description: "Percutaneous Coronary Intervention",

		principal_procedure_code: "36.06",
		service_start_date: "2024-12-21",
		service_end_date: "2024-12-23",
		discharge_hour: {
			hour: "02:00",
			period: "PM",
		},
		type_of_bill: "0111",
		payer_name: "Blue Cross Insurance",
		revenue_code_tin_number: "TIN123456789",

		service_charge: 15000.0,
		additional_charge: 500.0,
		non_covered_charges: 300.0,

		// release_of_information_reciept: [
		// 	{ name: "roi_receipt.pdf", type: "application/pdf" },
		// ],
		// receipts: [
		// 	{ name: "receipt_01.pdf", type: "application/pdf" },
		// 	{ name: "receipt_02.pdf", type: "application/pdf" },
		// ],
		// medication_prescription: [
		// 	{ name: "med_prescription.pdf", type: "application/pdf" },
		// ],
		// medical_imaging: [{ name: "xray_image.png", type: "image/png" }],
		// exam_and_lab: [{ name: "blood_test_results.pdf", type: "application/pdf" }],

		patient_control_number: "PCN456123",
		claim_number: "CLM789654",
		member_payment_amount: "200.00",
		total_amount_payment_by_insurance: "14700.00",
		grand_total: "15000.00",
		total_payment_for_provider_after_discount: "14700.00",
	};
}

export default async function ClaimDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const claimData = await getClaimData("1");
	return <ClaimDetailView claim={claimData} />;
}
