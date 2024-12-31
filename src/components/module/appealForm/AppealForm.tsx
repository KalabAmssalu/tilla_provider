"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import {
	type AppealFormValues,
	createAppealInfoSchema,
} from "@/types/appeal/AppealValidation";
import { type memberType } from "@/types/member/memeberType";

export default function AppealForm({
	selectedMember,
}: {
	selectedMember: memberType;
}) {
	const t = useTranslations("appealForm");
	const appealInfoSchema = createAppealInfoSchema(t);
	// const dataProvider = useAppSelector((state) => state.users.currentUser);
	const form = useForm<AppealFormValues>({
		resolver: zodResolver(appealInfoSchema),
		defaultValues: {
			reason_for_appeal: "",
			additional_note: "",
			supporting_doc1: "",
			supporting_doc2: "",
		},
	});

	const handleSubmit = async (data: AppealFormValues) => {
		// Handle form submission logic here
		toast.success("Appeal submitted successfully!");
		console.log(data); // For debugging purposes
		// Add further processing as needed (e.g., API calls)
	};

	return (
		<div className="lg:col-span-3 mb-24">
			<h1 className="text-3xl mb-6 text-center font-bold">{t("title")}</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">Claim Information</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Claim Id */}
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
					</fieldset>
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Appeal Information
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Date of Service */}
							{/* <ReusableDatePickerField
								control={form.control}
								name="date_of_service"
								labelKey="fields.date_of_service.label"
								placeholderKey="fields.date_of_service.placeholder"
								descriptionKey="fields.date_of_service.description"
								local="priorAuthForm"
								required={true}
							/> */}
							{/* Reason for Appeal */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="reason_for_appeal"
								local="appealForm"
								labelKey="fields.reason_for_appeal.label"
								placeholderKey="fields.reason_for_appeal.placeholder"
								descriptionKey="fields.reason_for_appeal.description"
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
								local="appealForm"
								labelKey="fields.supporting_doc1.label"
								descriptionKey="fields.supporting_doc1.description"
							/>
							{/* Supporting Document 2 */}
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc2"
								local="appealForm"
								labelKey="fields.supporting_doc2.label"
								descriptionKey="fields.supporting_doc2.description"
							/>
						</div>
					</fieldset>
					<div className="flex justify-between">
						<Button type="reset" variant={"outline"}>
							Clean Form
						</Button>
						<Button type="submit" className="bg-green-500">
							Submit Appeal
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
