import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { saveAs } from "file-saver";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useFetchProviders } from "@/actions/Query/provider-Query/provider-Query";
import { useSetReferral } from "@/actions/Query/referal_Query/request";
import { generateAndDownloadPDF } from "@/actions/claim/action";
import { SuccessAlertDialog } from "@/components/shared/Dialog/Success-alert-dialog";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import {
	default as ReusableTeaxtAreaField,
	default as ReusableTextAreaField,
} from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type memberType } from "@/types/member/memeberType";
import {
	type ReferralFormValues,
	createReferralInfoSchema,
} from "@/types/referral/ReferralValidation";

export default function ReferralForm({
	selectedMember,
}: {
	selectedMember: memberType;
}) {
	const t = useTranslations("referralForm");
	const referralInfoSchema = createReferralInfoSchema(t);
	const [supportingDoc1Files, setSupportingDoc1Files] = useState<File[]>([]);
	const [supportingDoc2Files, setSupportingDoc2Files] = useState<File[]>([]);
	const { data: providers } = useFetchProviders();
	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const providerOptions =
		providers?.map((provider) => ({
			value: provider.id.toString(),
			label:
				provider.provider_service_type === "inistiute"
					? `${provider.institute_name}`
					: provider.provider_service_type === "group"
						? `${provider.institute_name}`
						: `${provider.provider_first_name} ${provider.provider_last_name}`,
		})) || [];

	const form = useForm<ReferralFormValues>({
		resolver: zodResolver(referralInfoSchema),
		defaultValues: {
			referral_date: "",
			reason_for_referral: "",
			additional_note: "",
			referred_to: 0,
		},
	});
	const handleReferredToValueChange = (value: string) => {
		console.log("Referred To Value Changed:", Number(value));
		form.setValue("referred_to", Number(value));
	};

	const { mutate: onSubmitReferral } = useSetReferral();
	const handleSubmit = async (data: ReferralFormValues) => {
		const formData = new FormData();

		// Append JSON data as a stringified object
		// formData.append("jsonData", JSON.stringify(data));
		if (selectedMember.id) {
			formData.append("individual_member", selectedMember.id.toString());
		}
		formData.append("refferred_to", data.referred_to.toString());
		formData.append("referral_date", data.referral_date);
		formData.append("reason_for_refferal", data.reason_for_referral);
		if (data.additional_note) {
			formData.append("additional_note", data.additional_note.toString());
		}

		// Append file uploads to FormData
		if (supportingDoc1Files[0]) {
			formData.append("supporting_doc1", supportingDoc1Files[0]);
		}
		if (supportingDoc2Files[0]) {
			formData.append("supporting_doc2", supportingDoc2Files[0]);
		}

		// Log form data without iteration
		console.log("Form Data:");
		console.log("JSON Data:", data);
		console.log(
			"Supporting Doc 1:",
			supportingDoc1Files[0] ? supportingDoc1Files[0].name : "Not provided"
		);
		console.log(
			"Supporting Doc 2:",
			supportingDoc2Files[0] ? supportingDoc2Files[0].name : "Not provided"
		);
		onSubmitReferral(formData, {
			onSuccess: async () => {
				setIsAlertOpen(true);
				try {
					// const base64PDF = await generateAndDownloadPDF(data);
					// const pdfBlob = new Blob([Buffer.from(base64PDF, "base64")], {
					// 	type: "application/pdf",
					// });
					// saveAs(pdfBlob, "referral_form.pdf");
				} catch (error) {
					console.error("Error generating PDF:", error);
				}
				formData.delete("referral_date");
				formData.delete("referred_to");
				formData.delete("reason_for_referral");
				formData.delete("additional_note");
				setSupportingDoc1Files([]);
				setSupportingDoc2Files([]);
			},
		});
	};

	const handleSupportingDoc1Change = (files: File[]) => {
		console.log("Supporting Doc1 files:", files);
		setSupportingDoc1Files(files);
	};
	const handleSupportingDoc2Change = (files: File[]) => {
		console.log("Supporting Doc2 files:", files);
		setSupportingDoc2Files(files);
	};
	return (
		<div className="lg:col-span-3 mb-24">
			<SuccessAlertDialog
				isOpen={isAlertOpen}
				onClose={() => setIsAlertOpen(false)}
				title="Referral Registration Successful"
				description={`You have created a referral successfully for ${selectedMember.first_name} ${selectedMember.middle_name}!`}
			/>

			<div>
				<h1 className="text-3xl mb-6 text-center font-bold">{t("title")}</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Referral Information
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Referral Date */}
							<ReusableDatePickerField
								control={form.control}
								name="referral_date"
								labelKey="fields.referral_date.label"
								placeholderKey="fields.referral_date.placeholder"
								descriptionKey="fields.referral_date.description"
								local="referralForm"
								required={true}
							/>

							{/* Referred To */}
							<ReusableSelectField
								control={form.control}
								name="referred_to"
								local="referralForm"
								labelKey="fields.referred_to.label"
								placeholderKey="fields.referred_to.placeholder"
								descriptionKey="fields.referred_to.description"
								onValueChange={handleReferredToValueChange}
								options={providerOptions}
								required={true}
							/>

							{/* Reason for Referral */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="reason_for_referral"
								local="referralForm"
								labelKey="fields.reason_for_referral.label"
								placeholderKey="fields.reason_for_referral.placeholder"
								descriptionKey="fields.reason_for_referral.description"
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
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Supporting Documents
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Supporting Document 1 */}
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc1"
								local="referralForm"
								labelKey="fields.supporting_doc1.label"
								// placeholderKey="fields.supporting_doc1.placeholder"
								descriptionKey="fields.supporting_doc1.description"
								onFilesChange={handleSupportingDoc1Change}
								// readOnly={true}
							/>

							{/* Supporting Document 2 */}
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc2"
								local="referralForm"
								labelKey="fields.supporting_doc2.label"
								onFilesChange={handleSupportingDoc2Change}
								// placeholderKey="fields.supporting_doc2.placeholder"
								descriptionKey="fields.supporting_doc2.description"
								// readOnly={true}
							/>
						</div>
					</fieldset>
					<div className="flex justify-between">
						<Button type="reset" variant={"outline"}>
							Clean Form <Eraser className="ml-2" size={16} />
						</Button>
						<Button type="submit" className="bg-green-500">
							Submit Referral <Send className="ml-2" size={16} />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
