import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useSetPriorAuth } from "@/actions/Query/referal_Query/request";
import { SuccessAlertDialog } from "@/components/shared/Dialog/Success-alert-dialog";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import {
	default as ReusableTeaxtAreaField,
	default as ReusableTextAreaField,
} from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type PriorAuthorizationFormValues,
	createPriorAuthorizationInfoSchema,
} from "@/types/authorization/PriorAuthorizationValidation";
import { type memberType } from "@/types/member/memeberType";

import CPTSelectionForm from "../claimForm/CPTSelection";
import DiagnosisSelectionForm from "../claimForm/DiagnosisSelection";

export default function PriorAuthorizationForm({
	selectedMember,
}: {
	selectedMember: memberType;
}) {
	const t = useTranslations("priorAuthForm");
	const priorAuthorizationSchema = createPriorAuthorizationInfoSchema(t);
	// const dataProvider = useAppSelector((state) => state.users.currentUser);
	const [supporting_doc1, setSupportingDoc1] = useState<File[]>([]);
	const [supporting_doc2, setSupportingDoc2] = useState<File[]>([]);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const form = useForm<PriorAuthorizationFormValues>({
		resolver: zodResolver(priorAuthorizationSchema),
		defaultValues: {
			date_of_service: "",
			requested_service: "",
			reason_for_request: "",
			additional_note: "",
			cpt_code: "",
			cpt_category: "",
			cpt_description: "",
			diagnosis_date: "",
			diagnosis_source: "",
			diagnosis_category: "",
			diagnosis_description: "",
			diagnosis_code: "",
		},
	});

	const handleSupportingDoc1 = (files: File[]) => {
		console.log("Supporting Doc 1:", files);
		setSupportingDoc1(files);
	};

	const handleSupportingDoc2 = (files: File[]) => {
		console.log("Supporting Doc 2:", files);
		setSupportingDoc2(files);
	};

	const handleSelectedDiagnosis = (data: {
		category: string;
		description: string;
		code: string;
		date: string;
		source: string;
	}) => {
		form.setValue("diagnosis_category", data.category);
		form.setValue("diagnosis_description", data.description);
		form.setValue("diagnosis_code", data.code);
		form.setValue("diagnosis_date", data.date);
		form.setValue("diagnosis_source", data.source);
	};
	const handleCPTValueChange = (data: {
		category: string;
		description: string;
		code: string;
	}) => {
		form.setValue("cpt_category", data.category);
		form.setValue("cpt_description", data.description);
		form.setValue("cpt_code", data.code);
	};
	const { mutate: onSubmitPriorAuth } = useSetPriorAuth();
	const handleSubmit = async (data: PriorAuthorizationFormValues) => {
		// Handle form submission
		const formData = new FormData();
		try {
			const savedData = {
				...data,
				member: selectedMember.id?.toString(),
			};
			Object.entries(savedData).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, value.toString());
				}
			});

			// Append file arrays
			const appendFiles = (files: File[], fieldName: string) => {
				files.forEach((file) => {
					formData.append(fieldName, file);
				});
			};
			appendFiles(supporting_doc1, "supporting_doc1");
			appendFiles(supporting_doc2, "supporting_doc2");

			onSubmitPriorAuth(formData, {
				onSuccess: async () => {
					setIsAlertOpen(true);
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className="lg:col-span-3 mb-24">
			<SuccessAlertDialog
				isOpen={isAlertOpen}
				onClose={() => setIsAlertOpen(false)}
				title="Prior Authorization Registration Successful"
				description={`You have created a Prior Authorization Registration Successful" successfully for ${selectedMember.first_name} ${selectedMember.middle_name}!`}
			/>
			<div>
				<h1 className="text-3xl mb-6 text-center font-bold">{t("title")}</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					{/* <fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">Claim Information</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							
							<ReusableFormField
								control={form.control}
								name="claim_id"
								type="text"
								local="priorAuthForm"
								labelKey="fields.claim_id.label"
								placeholderKey="fields.claim_id.placeholder"
								descriptionKey="fields.claim_id.description"
								required={true}
							/>
						</div>
					</fieldset> */}
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Prior Authorization Request Information
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Date of Service */}
							<ReusableDatePickerField
								control={form.control}
								name="date_of_service"
								labelKey="fields.date_of_service.label"
								placeholderKey="fields.date_of_service.placeholder"
								descriptionKey="fields.date_of_service.description"
								local="priorAuthForm"
								required={true}
							/>
							{/*  Requested Service */}
							<ReusableFormField
								control={form.control}
								name="requested_service"
								// type="number"
								local="priorAuthForm"
								labelKey="fields.requested_service.label"
								placeholderKey="fields.requested_service.placeholder"
								descriptionKey="fields.requested_service.description"
								required={true}
							/>
							{/* Reason for Request */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="reason_for_request"
								local="priorAuthForm"
								labelKey="fields.reason_for_request.label"
								placeholderKey="fields.reason_for_request.placeholder"
								descriptionKey="fields.reason_for_request.description"
								required={true}
							/>
							{/* Additional Note */}
							<ReusableTextAreaField
								control={form.control}
								name="additional_note"
								local="referralForm"
								labelKey="fields.additional_note.label"
								placeholderKey="fields.additional_note.placeholder"
								descriptionKey="fields.additional_note.description"
							/>
						</div>
					</fieldset>

					<DiagnosisSelectionForm
						control={form.control}
						setValue={form.setValue}
						onDataChange={handleSelectedDiagnosis}
					/>
					<CPTSelectionForm onDataChange={handleCPTValueChange} />
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Supporting Documents
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Supporting Document 1 */}

							<ReusableFileUploadField
								name="supporting_doc1"
								local="priorAuthForm"
								labelKey="fields.supporting_doc1.label"
								descriptionKey="fields.supporting_doc1.description"
								control={form.control}
								onFilesChange={handleSupportingDoc1}
							/>
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc2"
								local="priorAuthForm"
								labelKey="fields.supporting_doc2.label"
								descriptionKey="fields.supporting_doc2.description"
								onFilesChange={handleSupportingDoc2}
							/>
						</div>
					</fieldset>
					<div className="flex justify-between">
						<Button type="reset" variant={"outline"}>
							Clean Form <Eraser className="ml-2" size={16} />
						</Button>
						<Button type="submit" className="bg-green-500">
							Submit Request <Send className="ml-2" size={16} />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
