// import React, { useState } from "react";

// import { useSetClaims } from "@/actions/Query/claim-Query/request";
// import axiosInstance from "@/actions/axiosInstance";

// type FormData = {
// 	[key: string]: string | number | null;
// };

// const dummyData: FormData = {
// 	billing_provider_npi: 123,
// 	revenue_code_tin_number: 932,
// 	attending_provider_name: "Hu Griffith",
// 	attending_provider_npi: "Et facere sit explic",
// 	attending_provider_tin_number: 231,
// 	referral_provider_name: "Alea Sawyer",
// 	referral_provider_npi: "Unde molestiae sit",
// 	referral_provider_tin_number: 325,
// 	place_of_service_description: "Telehealth Provided in Patient's Home",
// 	place_of_service_code: 10,
// 	service_start_date: "2024-12-04",
// 	service_end_date: "2024-12-03",
// 	admission_date: "2024-12-13",
// 	admission_hour: JSON.stringify({ hour: "3", period: "PM" }),
// 	source_of_admission: "Newborn (Transferred from Another Facility)",
// 	type_of_admission_visit: "4 - Newborn",
// 	admitting_diagnosis: "Quas laudantium rep",
// 	patient_reason_for_visit: "Minim enim neque sit",
// 	diagnosis_date: "2024-12-05",
// 	diagnosis_source: "WHO",
// 	diagnosis_category: "Acute Respiratory Failure",
// 	diagnosis_description: "Acute respiratory failure with hypercapnia-J96.02",
// 	diagnosis_code: "J96.02",
// 	other_diagnosis_codes_poc: "Velit non facere ill",
// 	external_cause_of_injury_code: null,
// 	principal_procedure_code: "04104JZ",
// 	principal_procedure_category: "Vascular Procedures",
// 	principal_procedure_description: "Vascular bypass",
// 	cpt_code: 10121,
// 	cpt_category: "FFS Primary Care (421110)",
// 	cpt_description: "REMOVE FOREIGN BODY -10121",
// 	lonic_category: "Coagulation",
// 	lonic_code: "17861-6",
// 	lonic_description: "Prothrombin Time (PT)-17861-6",
// 	discharge_date: "2024-12-04",
// 	discharge_hour: JSON.stringify({ hour: "1", period: "AM" }),
// 	patient_discharge_status: "4 - Left Against Medical Advice",
// 	additional_notes: "Obcaecati ea volupta",
// 	service_charge: 2,
// 	additional_charge: 50,
// 	non_covered_charges: 32,
// 	type_of_bill: "MEDICAL",
// 	payer_name: "Tilla Health Insurance",
// 	treatment_authorization_codes: null,
// 	individual_member: 1,
// 	provider: 3,
// };

// const FormSubmissionButton: React.FC = () => {
// 	const [files1, setFiles1] = useState<File[]>([]);
// 	const [files2, setFiles2] = useState<File[]>([]);
// 	const [files3, setFiles3] = useState<File[]>([]);

// 	const handleFileChange = (
// 		e: React.ChangeEvent<HTMLInputElement>,
// 		fileIndex: number
// 	) => {
// 		const files = e.target.files;
// 		if (files) {
// 			const fileArray = Array.from(files);
// 			if (fileIndex === 0) {
// 				setFiles1(fileArray);
// 			} else if (fileIndex === 1) {
// 				setFiles2(fileArray);
// 			} else if (fileIndex === 2) {
// 				setFiles3(fileArray);
// 			}
// 		}
// 	};
// 	const { mutate: onSubmitClaim } = useSetClaims();

// 	const submitForm = async () => {
// 		const apiUrl = "https://api.tillahealthinsurance.com/claims/create-claim"; // Update with the correct API endpoint
// 		const sessionId = "764096084b7cb85f905b646ee3f9df40c28e4a87"; // Replace with your session ID

// 		try {
// 			const formData = new FormData();

// 			// Append the form data fields
// 			Object.entries(dummyData).forEach(([key, value]) => {
// 				if (value !== null) {
// 					formData.append(key, value.toString());
// 				}
// 			});

// 			// Append file arrays
// 			const appendFiles = (files: File[], fieldName: string) => {
// 				files.forEach((file) => {
// 					formData.append(fieldName, file);
// 				});
// 			};

// 			appendFiles(files1, "release_of_information_reciept");
// 			appendFiles(files2, "receipts");
// 			appendFiles(files3, "medication_prescription");

// 			// Send the request
// 			// const response = await fetch(apiUrl, {
// 			// 	method: "POST",
// 			// 	body: formData,
// 			// 	headers: {
// 			// 		Authorization: `Token ${sessionId}`,
// 			// 	},
// 			// });
// 			onSubmitClaim(formData);

// 			// if (response.ok) {
// 			// 	console.log("Form submitted successfully:", response);
// 			// 	alert("Form submitted successfully!");
// 			// } else {
// 			// 	throw new Error("Form submission failed.");
// 			// }
// 		} catch (error) {
// 			console.error("Form submission failed:", error);
// 			alert("Form submission failed. Check the console for details.");
// 		}
// 	};

// 	return (
// 		<div>
// 			<input
// 				type="file"
// 				name="file1"
// 				onChange={(e) => handleFileChange(e, 0)}
// 				className="mb-2"
// 			/>
// 			<input
// 				type="file"
// 				name="file2"
// 				onChange={(e) => handleFileChange(e, 1)}
// 				className="mb-2"
// 			/>
// 			<input
// 				type="file"
// 				name="file3"
// 				onChange={(e) => handleFileChange(e, 2)}
// 				className="mb-2"
// 			/>

// 			<button
// 				onClick={submitForm}
// 				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// 			>
// 				Submit Form
// 			</button>
// 		</div>
// 	);
// };

// export default FormSubmissionButton;
