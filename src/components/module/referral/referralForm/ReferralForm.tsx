import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	fetchProviders,
	providersQueryKey,
} from "@/actions/Query/provider-Query/provider-Query";
import { generateAndDownloadPDF } from "@/actions/claim/action";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import {
	default as ReusableTeaxtAreaField,
	default as ReusableTextAreaField,
} from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import { Provider } from "@/lib/store/redux/providerSlice";
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

	// const dataProvider = useAppSelector((state) => state.users.currentUser);
	const { data: providers } = useQuery<Provider[], Error>({
		queryKey: providersQueryKey,
		queryFn: fetchProviders,
	});

	const providerOptions =
		providers?.map(
			(provider) =>
				`${provider.id.toString()} - ${provider.provider_first_name} ${provider.provider_last_name}`
		) || [];

	const form = useForm<ReferralFormValues>({
		resolver: zodResolver(referralInfoSchema),
		defaultValues: {
			referral_date: "",
			referral_number: "",
			referral_status: "pending",
			reason_for_referral: "",
			additional_note: "",
			supporting_doc1: "",
			supporting_doc2: "",
			referred_to: "",
		},
	});
	const handleReferredToValueChange = (value: string) => {
		form.setValue("referred_to", value);
	};
	const handleSubmit = async (data: ReferralFormValues) => {
		console.log("====================================");
		console.log(data);
		console.log("====================================");
		toast.success("Referral Submitted Successfully");
		try {
			const base64PDF = await generateAndDownloadPDF(data);
			const pdfBlob = new Blob([Buffer.from(base64PDF, "base64")], {
				type: "application/pdf",
			});
			saveAs(pdfBlob, "referral_form.pdf");
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};
	return (
		<div className="lg:col-span-3 mb-24">
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
							{/* Referral Number */}
							<ReusableFormField
								control={form.control}
								name="referral_number"
								type="text"
								local="referralForm"
								labelKey="fields.referral_number.label"
								placeholderKey="fields.referral_number.placeholder"
								descriptionKey="fields.referral_number.description"
								required={true}
							/>
							{/* Referred To */}
							<ReusableSelectField
								control={form.control}
								name="referred_to"
								// type="number"
								local="referralForm"
								labelKey="fields.referred_to.label"
								placeholderKey="fields.referred_to.placeholder"
								descriptionKey="fields.referred_to.description"
								onValueChange={handleReferredToValueChange}
								options={providerOptions}
								required={true}
							/>
							{/* Referral Status */}
							<ReusableSelectField
								control={form.control}
								name="referral_status"
								labelKey="fields.referral_status.label"
								local="referralForm"
								placeholderKey="fields.referral_status.placeholder"
								descriptionKey="fields.referral_status.description"
								options={[
									{
										label: t("fields.referral_status.options.approved"),
										value: "approved",
									},
									{
										label: t("fields.referral_status.options.pending"),
										value: "pending",
									},
									{
										label: t("fields.referral_status.options.rejected"),
										value: "rejected",
									},
								]}
								onValueChange={(value) => {
									form.setValue(
										"referral_status",
										value as "approved" | "pending" | "rejected"
									);
								}}
								required
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
								// readOnly={true}
							/>
							{/* Supporting Document 2 */}
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc2"
								local="referralForm"
								labelKey="fields.supporting_doc2.label"
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
