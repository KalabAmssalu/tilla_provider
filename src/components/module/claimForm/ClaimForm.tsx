import { useCallback, useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash/debounce";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useSetClaim } from "@/actions/Query/claim-Query/request";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import { ReusableHourPickerField } from "@/components/shared/Form/ReusableHourField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import ReusableTeaxtAreaField from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { getAllDischargeStatus } from "@/constants/data/dischargeStatus";
import { getAllInjuryCode } from "@/constants/data/injuryCode";
import { getAllPos, getPosCode } from "@/constants/data/pos";
import { getAllPrincipalProcedure } from "@/constants/data/principalProcedure";
import {
	getAllAdmission,
	getAllTypeOfAdmission,
} from "@/constants/data/sourceOfAdmission";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type ClaimFormValues,
	createClaimInfoSchema,
} from "@/types/claim/ClaimValidation";
import { type memberType } from "@/types/member/memeberType";

import BillingCard from "./BillingCard";
import CPTSelectionForm from "./CPTSelection";
import DiagnosisSelectionForm from "./DiagnosisSelection";
import LonicSelectionForm from "./LONICSelection";
import PrincipalProcedureSelection from "./PrincipalProcedureSelection";

export default function ClaimForm({
	selectedMember,
}: {
	selectedMember: memberType;
}) {
	const t = useTranslations("claimForm");
	const claimInfoSchema = createClaimInfoSchema(t);
	const dataProvider = useAppSelector((state) => state.users.currentUser);
	const [showPriorAuth, setShowPriorAuth] = useState(false);
	const form = useForm<ClaimFormValues>({
		resolver: zodResolver(claimInfoSchema),
		defaultValues: {
			// Provider Information
			billing_provider_name: `${dataProvider.user.provider.provider_first_name || ""} ${dataProvider.user.provider.provider_middle_initial || ""} ${dataProvider.user.provider.provider_last_name || ""}`,
			billing_provider_npi: `${dataProvider.user.provider.provider_id || ""}`,
			revenue_code_tin_number: `${dataProvider.user.provider.tin_number}`,

			attending_provider_name: "",
			attending_provider_npi: "",
			attending_provider_tin_number: "",
			// !done

			place_of_service_description: "",
			place_of_service_code: "",
			service_start_date: "",
			service_end_date: "",

			admission_date: "",
			admission_hour: {
				hour: "",
				period: "AM",
			},
			source_of_admission: "",
			type_of_admission_visit: "",
			other_provider_ids: "", //dfs
			admitting_diagnosis: "",
			patient_reason_for_visit: "",

			// * WHO
			diagnosis_date: "",
			diagnosis_source: "",
			diagnosis_category: "",
			diagnosis_description: "",
			diagnosis_code: "",
			// !done

			// * OTHER Diagnosis
			other_diagnosis_codes_poc: "",
			external_cause_of_injury_code: "",

			principal_procedure_code: "",
			principal_procedure_category: "",
			principal_procedure_description: "",
			// !done

			cpt_code: "",
			cpt_category: "",
			cpt_description: "",
			// !done

			//

			// * LONIC
			lonic_category: "",
			lonic_code: "",
			lonic_description: "",
			// !done

			// other_provider_name_npi_specialty: "", //dfd
			// principal_procedure_code: "",
			// treatment_details: "",
			// operating_physician_name_npi_specialty_code: "",
			// other_procedure_code_description: "",
			// additional_notes: "",
			// patient_discharge_status: "",

			discharge_date: "",
			discharge_hour: {
				hour: "",
				period: "AM",
			},

			service_charge: 0,
			additional_charge: 0,
			non_covered_charges: 0,
			type_of_bill: "MEDICAL",
			payer_name: "Tilla Health Insurane",
			treatment_authorization_codes: "",
		},
	});
	const [selectedPos, setSelectedPos] = useState<string>("");
	const [posCode, setPosCode] = useState<string>("");

	const PosOptions = useMemo(() => {
		return getAllPos();
	}, []);

	const AdmissionOptions = useMemo(() => {
		return getAllAdmission();
	}, []);

	const TypeAdmissionOptions = useMemo(() => {
		return getAllTypeOfAdmission();
	}, []);

	const InjuryCodeOptions = useMemo(() => {
		return getAllInjuryCode();
	}, []);

	const DischageStatusOptions = useMemo(() => {
		return getAllDischargeStatus();
	}, []);
	const PrincipalProcedureOptions = useMemo(() => {
		return getAllPrincipalProcedure();
	}, []);

	const handlePOSValueChange = (value: string) => {
		setSelectedPos(value);

		// Assuming `getPosCode` is a function that returns the code for the selected option
		const code = getPosCode(value) || "";
		setPosCode(code);

		// Set values in the form (can be done by form.setValue, for example)
		form.setValue("place_of_service_description", value);
		form.setValue("place_of_service_code", code);
	};

	const handleAdmissionValueChange = (value: string) => {
		form.setValue("source_of_admission", value);
	};

	const handleTypeOfAdmissionValueChange = (value: string) => {
		form.setValue("type_of_admission_visit", value);
	};
	const handleExternalCauseOfInjuryCodeChange = (value: string) => {
		form.setValue("external_cause_of_injury_code", value);
	};
	const handleDischargeStatusValueChange = (value: string) => {
		form.setValue("external_cause_of_injury_code", value);
	};
	// const handlePrincipalProcedureValueChange = (value: string) => {
	// 	form.setValue("principal_procedure_code", value);

	// };
	const handleSelectedDiagnosis = (data: {
		category: string;
		source: "WHO" | "ETHIOPIA";
		description: string;
		code: string;
		date: string;
	}) => {
		form.setValue("diagnosis_category", data.category);
		form.setValue("diagnosis_source", data.source);
		form.setValue("diagnosis_description", data.description);
		form.setValue("diagnosis_code", data.code);
		form.setValue("diagnosis_date", data.date);
		console.log("data", data);
	};

	const handleSelectedLonic = (data: {
		category: string;
		description: string;
		code: string;
	}) => {
		form.setValue("lonic_category", data.category);
		form.setValue("lonic_description", data.description);
		form.setValue("lonic_code", data.code);
		console.log("data", data);
	};

	const handleCPTValueChange = (data: {
		category: string;
		description: string;
		code: string;
	}) => {
		form.setValue("cpt_category", data.category);
		form.setValue("cpt_description", data.description);
		form.setValue("cpt_code", data.code);
		console.log("CPT", data);
	};

	const handlePrincipalProcedureValueChange = (data: {
		category: string;
		description: string;
		code: string;
	}) => {
		form.setValue("principal_procedure_category", data.category);
		form.setValue("principal_procedure_description", data.description);
		form.setValue("principal_procedure_code", data.code);
		console.log("Principal Procedure", data);
	};

	const { watch } = form;

	const serviceCharge = Number(watch("service_charge")) || 0;
	const additionalCharge = Number(watch("additional_charge")) || 0;

	const [paymentDuty, setPaymentDuty] = useState(0);
	const [tillaDuty, setTillaDuty] = useState(0);
	const [providerDiscount, setProviderDiscount] = useState(0); // change this to provider_discount_agreement
	const [providerDiscountAgreement, setProviderDiscountAgreement] = useState(0); // change this to provider_discount_agreement
	const [totalReduce, setTotalReduce] = useState(0);
	const [tillaPaymentDuty, setTillaPaymentDuty] = useState(0);
	const [amountToBeClaimed, setAmountToBeClaimed] = useState(0);

	useEffect(() => {
		const memberDuty = selectedMember?.member_payment_duty || 0; // member_payment_duty
		const tillaDuty = 100 - memberDuty; // tilla_duty
		const discountAgreement =
			dataProvider.user?.provider.provider_discount_agreement || 0; // provider_discount_agreement
		const Charge = serviceCharge + additionalCharge; // payment_charge with out discount
		const providerDiscountAmount = (Charge * discountAgreement) / 100; // after the provider discount the amount to pay

		const total_reduce = Charge - providerDiscountAmount; // total payment before the insurance coverage

		const newTillaPaymentDuty = (total_reduce * tillaDuty) / 100;
		const total_have_to_pay = total_reduce - newTillaPaymentDuty;

		// Update the values
		setPaymentDuty(memberDuty); // member duty
		setTillaDuty(tillaDuty); // tilla duty
		setProviderDiscount(providerDiscountAmount); //provider duty

		setProviderDiscountAgreement(discountAgreement);
		setTotalReduce(total_reduce);

		// setPaymentWithDiscount(newPaymentWithDiscount);
		setTillaPaymentDuty(newTillaPaymentDuty);
		setAmountToBeClaimed(total_have_to_pay);
	}, [serviceCharge, additionalCharge]);

	const isDeductable =
		selectedMember?.deductible_type === "with_deductible"
			? true
			: false || true;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [releaseOfInformationFiles, setReleaseOfInformationFiles] = useState<
		File[]
	>([]);
	const [medicationPrescriptionFiles, setMedicationPrescriptionFiles] =
		useState<File[]>([]);
	const [medicalImagingFiles, setMedicalImagingFiles] = useState<File[]>([]);
	const [examAndLabFiles, setExamAndLabFiles] = useState<File[]>([]);
	const [receiptsFile, setReciptsFile] = useState<File[]>([]);

	// Optimize file handlers by debouncing
	const debouncedFileHandler = useCallback(
		debounce((files: File[], setter: (files: File[]) => void) => {
			setter(files);
		}, 300),
		[]
	);

	const handleReleaseOfInformationFilesChange = (files: File[]) => {
		debouncedFileHandler(files, setReleaseOfInformationFiles);
	};

	const handleMedicationPrescriptionFilesChange = (files: File[]) => {
		debouncedFileHandler(files, setMedicationPrescriptionFiles);
	};

	const handleMedicalImagingFilesChange = (files: File[]) => {
		console.log("Medical Imaging Files:", files);
		setMedicalImagingFiles(files);
		// Update state or perform any other actions with the files
	};

	const handleExamAndLabFilesChange = (files: File[]) => {
		console.log("Exam and Lab Files:", files);
		setExamAndLabFiles(files);
		// Update state or perform any other actions with the files
	};

	const handleReciptChange = (files: File[]) => {
		console.log("recipte", files);
		setReciptsFile(files);
	};

	const { mutate: setClaim } = useSetClaim();

	async function onSubmit(data: ClaimFormValues) {
		try {
			setIsSubmitting(true);

			// Format admission_hour and discharge_hour
			const formatHour = (
				hourData: "" | { hour: string; period?: "AM" | "PM" }
			) => {
				if (hourData === "") {
					return { hour: "00", period: "AM" }; // or any default values you prefer
				}

				const { hour, period = "AM" } = hourData; // default to "AM" if period is not provided
				return { hour, period };
			};

			const formattedData = {
				...data,
				individual_member: Number(selectedMember.id),
				provider: dataProvider.user.provider.id,
				discharge_hour: formatHour(data.discharge_hour),
				admission_hour: formatHour(data.admission_hour),
			};

			const submitData = new FormData();

			// Append files if they exist
			if (releaseOfInformationFiles && releaseOfInformationFiles.length > 0) {
				releaseOfInformationFiles.forEach((file) => {
					submitData.append("release_of_information_reciept", file);
				});
			}
			if (
				medicationPrescriptionFiles &&
				medicationPrescriptionFiles.length > 0
			) {
				medicationPrescriptionFiles.forEach((file) => {
					submitData.append("medication_prescription", file);
				});
			}
			if (medicalImagingFiles && medicalImagingFiles.length > 0) {
				medicalImagingFiles.forEach((file) => {
					submitData.append("medical_imaging", file);
				});
			}
			if (examAndLabFiles && examAndLabFiles.length > 0) {
				examAndLabFiles.forEach((file) => {
					submitData.append("exam_and_lab", file);
				});
			}
			if (receiptsFile && receiptsFile.length > 0) {
				receiptsFile.forEach((file) => {
					submitData.append("receipts", file);
				});
			}

			// Append non-file data (formattedData) to FormData

			submitData.append(
				"discharge_hour",
				JSON.stringify(formattedData.discharge_hour || "")
			);
			submitData.append(
				"admission_hour",
				JSON.stringify(formattedData.admission_hour || "")
			);

			submitData.append(
				"individual_member",
				formattedData.individual_member.toString()
			);
			submitData.append("provider", formattedData.provider.toString());

			// Append other form fields
			submitData.append(
				"place_of_service_description",
				formattedData.place_of_service_description || ""
			);
			submitData.append(
				"place_of_service_code",
				formattedData.place_of_service_code || ""
			);
			submitData.append(
				"billing_provider_npi",
				formattedData.billing_provider_npi || ""
			);
			submitData.append(
				"attending_provider_name_npi_specialty_code",
				formattedData.attending_provider_name_npi_specialty_code || ""
			);

			submitData.append(
				"other_provider_ids",
				formattedData.other_provider_ids || ""
			);
			submitData.append("admission_date", formattedData.admission_date || "");
			submitData.append(
				"source_of_admission",
				formattedData.source_of_admission || ""
			);
			submitData.append(
				"type_of_admission_visit",
				formattedData.type_of_admission_visit || ""
			);
			submitData.append(
				"admitting_diagnosis",
				formattedData.admitting_diagnosis || ""
			);
			submitData.append(
				"patient_reason_for_visit",
				formattedData.patient_reason_for_visit || ""
			);
			submitData.append("diagnosis_date", formattedData.diagnosis_date || "");
			submitData.append(
				"diagnosis_source",
				formattedData.diagnosis_source || ""
			);
			submitData.append(
				"diagnosis_category",
				formattedData.diagnosis_category || ""
			);
			submitData.append(
				"diagnosis_description",
				formattedData.diagnosis_description || ""
			);
			submitData.append("diagnosis_code", formattedData.diagnosis_code || "");
			submitData.append(
				"external_cause_of_injury_code",
				formattedData.external_cause_of_injury_code || ""
			);

			submitData.append(
				"treatment_authorization_codes",
				formattedData.treatment_authorization_codes || ""
			);
			submitData.append("lonic_category", formattedData.lonic_category || "");
			submitData.append("lonic_code", formattedData.lonic_code || "");
			submitData.append(
				"lonic_description",
				formattedData.lonic_description || ""
			);
			submitData.append("cpt_code", formattedData.cpt_code || "");
			submitData.append("cpt_category", formattedData.cpt_category || "");
			submitData.append("cpt_description", formattedData.cpt_description || "");

			submitData.append(
				"service_start_date",
				formattedData.service_start_date || ""
			);
			submitData.append(
				"service_end_date",
				formattedData.service_end_date || ""
			);

			submitData.append(
				"service_charge",
				formattedData.service_charge.toString()
			);
			submitData.append(
				"additional_charge",
				formattedData.additional_charge.toString()
			);
			submitData.append(
				"non_covered_charges",
				formattedData.non_covered_charges.toString()
			);
			submitData.append("type_of_bill", formattedData.type_of_bill || "");
			submitData.append("payer_name", formattedData.payer_name || "");
			submitData.append(
				"revenue_code_tin_number",
				formattedData.revenue_code_tin_number || ""
			);

			// Log the FormData contents
			console.log("FormData contents:");
			submitData.forEach((value, key) => {
				console.log(key, value);
			});

			// Log the final submitData as JSON
			console.log(
				"Form submission successful:",
				JSON.stringify(submitData, null, 2)
			);

			// Simulate submission logic, e.g., using axios to send the data to an API
			// const result = await axios.post("/api/claim", submitData);

			console.log("Form submission successful:", submitData);
			// setClaim(result); // Set the response data after submission
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="grid gap-4 lg:grid-cols-4">
			<div className="lg:col-span-3 mb-24">
				<div>
					<h1 className="text-3xl mb-6 text-center font-bold">
						Claim Submission Form
					</h1>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								Provider Information
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mb-4">
								<ReusableFormField
									control={form.control}
									name="billing_provider_name"
									type="text"
									local="claimForm"
									labelKey="fields.billing_provider_name.label"
									placeholderKey="fields.billing_provider_name.placeholder"
									descriptionKey="fields.billing_provider_name.description"
									disabled={true}
								/>
								<ReusableFormField
									control={form.control}
									name="billing_provider_npi"
									type="text"
									local="claimForm"
									labelKey="fields.billing_provider_npi.label"
									placeholderKey="fields.billing_provider_npi.placeholder"
									descriptionKey="fields.billing_provider_npi.description"
									disabled={true}
								/>
								<ReusableFormField
									control={form.control}
									name="revenue_code_tin_number"
									type="text"
									local="claimForm"
									labelKey="fields.revenue_code_tin_number.label"
									placeholderKey="fields.revenue_code_tin_number.placeholder"
									descriptionKey="fields.revenue_code_tin_number.description"
									disabled={true}
								/>
							</div>
							<Separator />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<ReusableFormField
									control={form.control}
									name="attending_provider_name"
									type="text"
									local="claimForm"
									labelKey="fields.attending_provider_name.label"
									placeholderKey="fields.attending_provider_name.placeholder"
									descriptionKey="fields.attending_provider_name.description"
								/>
								<ReusableFormField
									control={form.control}
									name="attending_provider_npi"
									type="text"
									local="claimForm"
									labelKey="fields.attending_provider_npi.label"
									placeholderKey="fields.attending_provider_npi.placeholder"
									descriptionKey="fields.attending_provider_npi.description"
								/>
								<ReusableFormField
									control={form.control}
									name="attending_provider_tin_number"
									type="text"
									local="claimForm"
									labelKey="fields.attending_provider_tin_number.label"
									placeholderKey="fields.attending_provider_tin_number.placeholder"
									descriptionKey="fields.attending_provider_tin_number.description"
								/>
							</div>
						</fieldset>
						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								Place of Service and Date of Service
							</legend>
							{/* POS Code */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<ReusableSelectField
									control={form.control}
									name="place_of_service_description"
									labelKey="fields.place_of_service_description.label"
									placeholderKey="fields.place_of_service_description.placeholder"
									descriptionKey="fields.place_of_service_description.description"
									options={PosOptions}
									onValueChange={handlePOSValueChange}
									local="claimForm"
									required={true}
								/>

								<ReusableFormField
									control={form.control}
									name="place_of_service_code"
									type="text"
									local="claimForm"
									labelKey="fields.place_of_service_code.label"
									placeholderKey="fields.place_of_service_code.placeholder"
									descriptionKey="fields.place_of_service_code.description"
									disabled={true}
									value={posCode} // Optionally pass a value to pre-fill the input
								/>
							</div>
							<Separator />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<ReusableDatePickerField
									control={form.control}
									name="service_start_date"
									labelKey="fields.service_start_date.label"
									placeholderKey="fields.service_start_date.placeholder"
									descriptionKey="fields.service_start_date.description"
									required
									buttonClassName="custom-button-class"
									local="claimForm"
								/>
								<ReusableDatePickerField
									control={form.control}
									name="service_end_date"
									labelKey="fields.service_end_date.label"
									placeholderKey="fields.service_end_date.placeholder"
									descriptionKey="fields.service_end_date.description"
									required
									buttonClassName="custom-button-class"
									local="claimForm"
								/>
							</div>
						</fieldset>

						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								Admission Information
							</legend>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4 space-y-2">
								<ReusableDatePickerField
									control={form.control}
									name="admission_date"
									labelKey="fields.admission_date.label"
									placeholderKey="fields.admission_date.placeholder"
									descriptionKey="fields.admission_date.description"
									required
									buttonClassName="custom-button-class"
									local="claimForm"
								/>
								<ReusableHourPickerField
									control={form.control}
									name="admission_hour"
									labelKey="fields.admission_hour.label"
									descriptionKey="fields.admission_hour.description"
									required
									local="claimForm"
								/>
							</div>
							<Separator />
							<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4 space-y-2">
								<ReusableSelectField
									control={form.control}
									name="source_of_admission"
									labelKey="fields.source_of_admission.label"
									placeholderKey="fields.source_of_admission.placeholder"
									descriptionKey="fields.source_of_admission.description"
									options={AdmissionOptions}
									onValueChange={handleAdmissionValueChange}
									local="claimForm"
									required={true}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 space-y-2">
								<ReusableSelectField
									control={form.control}
									name="type_of_admission_visit"
									labelKey="fields.type_of_admission_visit.label"
									placeholderKey="fields.type_of_admission_visit.placeholder"
									descriptionKey="fields.type_of_admission_visit.description"
									options={TypeAdmissionOptions}
									onValueChange={handleTypeOfAdmissionValueChange}
									local="claimForm"
									required={true}
								/>
								<ReusableTeaxtAreaField
									control={form.control}
									name="admitting_diagnosis"
									type="text"
									local="claimForm"
									labelKey="fields.admitting_diagnosis.label"
									placeholderKey="fields.admitting_diagnosis.placeholder"
									descriptionKey="fields.admitting_diagnosis.description"
								/>
								<ReusableTeaxtAreaField
									control={form.control}
									name="patient_reason_for_visit"
									type="text"
									labelKey="fields.patient_reason_for_visit.label"
									placeholderKey="fields.patient_reason_for_visit.placeholder"
									descriptionKey="fields.patient_reason_for_visit.description"
									local="claimForm"
									required={true}
								/>
							</div>
							<div className="mt-4">
								<ReusableTeaxtAreaField
									control={form.control}
									name="admitting_diagnosis"
									type="text"
									local="claimForm"
									labelKey="fields.admitting_diagnosis.label"
									placeholderKey="fields.admitting_diagnosis.placeholder"
									descriptionKey="fields.admitting_diagnosis.description"
								/>
							</div>
						</fieldset>
						{/* Diagnosis Selection Form */}

						<DiagnosisSelectionForm
							onDataChange={handleSelectedDiagnosis}
							control={form.control}
							setValue={form.setValue}
						/>
						{/* Other Diagnosis Form */}

						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								Other Diagnosis Information
							</legend>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4 space-y-2">
								<ReusableTeaxtAreaField
									control={form.control}
									name="other_diagnosis_codes_poc"
									type="text"
									labelKey="fields.other_diagnosis_codes_poc.label"
									placeholderKey="fields.other_diagnosis_codes_poc.placeholder"
									descriptionKey="fields.other_diagnosis_codes_poc.description"
									local="claimForm"
									required={true}
								/>
								<ReusableSelectField
									control={form.control}
									name="external_cause_of_injury_code"
									labelKey="fields.external_cause_of_injury_code.label"
									placeholderKey="fields.external_cause_of_injury_code.placeholder"
									descriptionKey="fields.external_cause_of_injury_code.description"
									options={InjuryCodeOptions}
									onValueChange={handleExternalCauseOfInjuryCodeChange}
									local="claimForm"
									required={true}
								/>
							</div>
						</fieldset>
						<PrincipalProcedureSelection
							onDataChange={handlePrincipalProcedureValueChange}
						/>
						{/* CPT Code Form */}
						<CPTSelectionForm onDataChange={handleCPTValueChange} />
						{/* LONIC Code Form */}
						<LonicSelectionForm onDataChange={handleSelectedLonic} />

						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								Discharge Information
							</legend>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<ReusableDatePickerField
									control={form.control}
									name="discharge_date"
									labelKey="fields.discharge_date.label"
									placeholderKey="fields.discharge_date.placeholder"
									descriptionKey="fields.discharge_date.description"
									required
									buttonClassName="custom-button-class"
									local="claimForm"
								/>
								<ReusableHourPickerField
									control={form.control}
									name="discharge_hour"
									labelKey="fields.discharge_hour.label"
									descriptionKey="fields.discharge_hour.description"
									required
									local="claimForm"
								/>
							</div>
							{/* <Separator />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 space-y-2">
								<ReusableSelectField
									control={form.control}
									name="patient_discharge_status"
									labelKey="fields.patient_discharge_status.label"
									placeholderKey="fields.patient_discharge_status.placeholder"
									descriptionKey="fields.patient_discharge_status.description"
									options={DischageStatusOptions}
									onValueChange={handleDischargeStatusValueChange}
									local="claimForm"
									required={true}
								/>
								<ReusableTeaxtAreaField
									control={form.control}
									name="additional_notes"
									type="text"
									labelKey="fields.additional_notes.label"
									placeholderKey="fields.additional_notes.placeholder"
									descriptionKey="fields.additional_notes.description"
									local="claimForm"
									required={true}
								/>
							</div> */}
						</fieldset>
						<fieldset className="border p-4 rounded-md bg-muted pb-6">
							<legend className="text-lg font-semibold">
								File Attachments
							</legend>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<ReusableFileUploadField
									name="release_of_information_certification"
									labelKey="fields.release_of_information_certification.label"
									descriptionKey="fields.release_of_information_certification.description"
									local="claimForm"
									control={form.control}
									onFilesChange={handleReleaseOfInformationFilesChange}
								/>
								<ReusableFileUploadField
									name="medication_prescription"
									labelKey="fields.medication_prescription.label"
									descriptionKey="fields.medication_prescription.description"
									local="claimForm"
									required
									control={form.control}
									onFilesChange={handleMedicationPrescriptionFilesChange}
								/>
								<ReusableFileUploadField
									name="medical_imaging"
									labelKey="fields.medical_imaging.label"
									descriptionKey="fields.medical_imaging.description"
									local="claimForm"
									required
									control={form.control}
									onFilesChange={handleMedicalImagingFilesChange}
								/>
								<ReusableFileUploadField
									name="exam_and_lab"
									labelKey="fields.exam_and_lab.label"
									descriptionKey="fields.exam_and_lab.description"
									local="claimForm"
									required
									control={form.control}
									onFilesChange={handleExamAndLabFilesChange}
								/>
							</div>
						</fieldset>
						<fieldset className="border p-4 rounded-md bg-secondary/30 pb-6">
							<legend className="text-lg font-semibold">
								Billing Information
							</legend>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
								<div className="flex flex-col gap-4">
									<ReusableFormField
										control={form.control}
										name="type_of_bill"
										type="text"
										local="claimForm"
										labelKey="fields.type_of_bill.label"
										placeholderKey="fields.type_of_bill.placeholder"
										descriptionKey="fields.type_of_bill.description"
										disabled={true}
									/>
									<ReusableFormField
										control={form.control}
										name="payer_name"
										type="text"
										local="claimForm"
										labelKey="fields.payer_name.label"
										placeholderKey="fields.payer_name.placeholder"
										descriptionKey="fields.payer_name.description"
										disabled={true}
									/>
									<ReusableFormField
										control={form.control}
										name="revenue_code_tin_number"
										type="text"
										local="claimForm"
										labelKey="fields.revenue_code_tin_number.label"
										placeholderKey="fields.revenue_code_tin_number.placeholder"
										descriptionKey="fields.revenue_code_tin_number.description"
										disabled={true}
									/>
								</div>
								<div className="flex flex-col gap-4">
									<ReusableFormField
										name="service_charge"
										type="number"
										local="claimForm"
										labelKey="fields.service_charge.label"
										placeholderKey="fields.service_charge.placeholder"
										descriptionKey="fields.service_charge.description"
										control={form.control}
										isRequired={true}
										required
									/>
									<ReusableFormField
										control={form.control}
										name="additional_charge"
										type="number"
										local="claimForm"
										labelKey="fields.additional_charge.label"
										placeholderKey="fields.additional_charge.placeholder"
										descriptionKey="fields.additional_charge.description"
									/>
									<ReusableFormField
										control={form.control}
										name="non_covered_charges"
										type="number"
										local="claimForm"
										labelKey="fields.non_covered_charges.label"
										placeholderKey="fields.non_covered_charges.placeholder"
										descriptionKey="fields.non_covered_charges.description"
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4 mb-4">
								<Separator className="my-4 bg-white h-1" />

								<ReusableFileUploadField
									name="receipts"
									labelKey="fields.receipts.label"
									descriptionKey="fields.receipts.description"
									local="claimForm"
									required
									control={form.control}
									onFilesChange={handleReciptChange}
								/>
							</div>
						</fieldset>
						<div className="space-y-6 bg-muted p-4 rounded-md">
							<div className="flex space-x-16 items-center justify-center w-full">
								<h3 className="text-lg font-semibold mb-2">
									Prior Authorization Code?
								</h3>
								<RadioGroup
									className="flex gap-2"
									onValueChange={(value) => setShowPriorAuth(value === "yes")}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="yes" id="yes" />
										<Label htmlFor="yes">Yes</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="no" id="no" />
										<Label htmlFor="no">No</Label>
									</div>
								</RadioGroup>
							</div>

							{showPriorAuth && (
								<fieldset className="border p-4 rounded-md bg-secondary/30 pb-6">
									<legend className="text-lg font-semibold">
										Prior Authorization Codes
									</legend>
									<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4 mb-4">
										<ReusableFormField
											control={form.control}
											name="treatment_authorization_codes"
											type="text"
											local="claimForm"
											labelKey="fields.treatment_authorization_codes.label"
											placeholderKey="fields.treatment_authorization_codes.placeholder"
											descriptionKey="fields.treatment_authorization_codes.description"
										/>
									</div>
								</fieldset>
							)}
						</div>

						<div className="flex justify-between">
							<Button type="reset" variant={"outline"}>
								Clean Form <Eraser className="ml-2" size={16} />
							</Button>
							<Button
								type="submit"
								// onClick={() => form.handleSubmit(onSubmit)}
								className="bg-green-500"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									"Submitting..."
								) : (
									<>
										Submit Claim <Send className="ml-2" size={16} />
									</>
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<div className="lg:col-span-1  ">
				<BillingCard
					memberDuty={paymentDuty}
					tillaDuty={tillaDuty}
					providerDuty={providerDiscount}
					discountAgree={providerDiscountAgreement}
					serviceCharge={serviceCharge}
					AdditionalCharge={additionalCharge}
					totalCharge={totalReduce}
					tillaPaymentDuty={tillaPaymentDuty}
					amountToBeClaimed={amountToBeClaimed}
					isDeductable={
						selectedMember?.deductible_type === "with_deductible" ? true : false
					}
				/>
			</div>
		</div>
	);
}
