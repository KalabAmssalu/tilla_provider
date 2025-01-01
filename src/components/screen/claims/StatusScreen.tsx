"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileSearch, UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchClaim } from "@/actions/Query/claim-Query/request";
import { ClaimStatusSearchResult } from "@/components/module/claimStatus/SearchResult";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

const claimStatusSchema = z.object({
	claim_number: z.string().optional(),
	claim_status: z.string().optional(),
	claim_type: z.string().optional(),
	member_id: z.string().optional(),
	billing_provider_npi: z.string().optional(),
	service_start_date: z.string().optional(),
	service_end_date: z.string().optional(),
	from: z.string().nullable(),
	to: z.string().nullable(),
});

export type ClaimStatusFormValues = z.infer<typeof claimStatusSchema>;

export default function StatusScreen() {
	const t = useTranslations("claimStatusForm");
	const form = useForm<ClaimStatusFormValues>({
		resolver: zodResolver(claimStatusSchema),
		defaultValues: {
			claim_number: "",
			claim_status: "",
			claim_type: "",
			member_id: "",
			billing_provider_npi: "",
			service_start_date: "",
			service_end_date: "",
			from: "", // Yesterday
			to: "", // Today
		},
	});
	const [formData, setFormData] = useState<Partial<ClaimStatusFormValues>>({
		claim_number: "",
		claim_status: "",
		claim_type: "",
		member_id: "",
		billing_provider_npi: "",
		service_start_date: "",
		service_end_date: "",
		from: "", // Yesterday
		to: "", // Today
	});

	const { data: claimSearchData, isLoading } = useSearchClaim(formData);
	function onSubmit(data: ClaimStatusFormValues) {
		console.log("Submitted Data:", data);
		setFormData(data);
	}

	return (
		<div>
			<Card className="mb-4 bg-secondary/40">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Claim Status and claim history
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-end">
					<Accordion
						type="single"
						collapsible
						defaultValue="item-1"
						className="w-full m-0"
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="hover:no-underline rounded-lg bg-muted/40 px-4">
								<span className="text-xl px-4 py-2 rounded-lg font-bold flex items-center">
									Search claim <FileSearch className="ml-2" size={20} />
								</span>
							</AccordionTrigger>
							<AccordionContent className="pt-4">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="px-0">
										<span className="text-md font-bold">
											Search claim by Date Range
										</span>
										<div className="flex justify-center mb-6  gap-4 border-background border-2 p-4 rounded-lg">
											<ReusableDatePickerField
												control={form.control}
												name="from"
												labelKey="fields.from.label"
												placeholderKey="fields.from.placeholder"
												descriptionKey="fields.from.description"
												buttonClassName="custom-button-class"
												local="claimStatusForm"
											/>
											<span className="text-xl font-bold flex items-center pt-4">
												-
											</span>
											<ReusableDatePickerField
												control={form.control}
												name="to"
												labelKey="fields.to.label"
												placeholderKey="fields.to.placeholder"
												descriptionKey="fields.to.description"
												buttonClassName="custom-button-class"
												local="claimStatusForm"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<ReusableFormField
												control={form.control}
												name="claim_number"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_id.label"
												placeholderKey="fields.claim_id.placeholder"
												descriptionKey="fields.claim_id.description"
											/>

											<ReusableSelectField
												control={form.control}
												name="claim_status"
												local="claimStatusForm"
												labelKey="fields.claim_status.label"
												placeholderKey="fields.claim_status.placeholder"
												descriptionKey="fields.claim_status.description"
												options={[
													{
														label: t("fields.claim_status.options.pending"),
														value: "pending",
													},
													{
														label: t("fields.claim_status.options.disputing"),
														value: "disputing",
													},
													{
														label: t("fields.claim_status.options.denied"),
														value: "denied",
													},
													{
														label: t("fields.claim_status.options.paid"),
														value: "paid",
													},
												]}
												onValueChange={(value) => {
													form.setValue(
														"claim_status",
														value as "pending" | "disputing" | "denied" | "paid"
													);
												}}
											/>
											<ReusableFormField
												control={form.control}
												name="claim_type"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_type.label"
												placeholderKey="fields.claim_type.placeholder"
												descriptionKey="fields.claim_type.description"
											/>

											<ReusableFormField
												control={form.control}
												name="member_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.member_id.label"
												placeholderKey="fields.member_id.placeholder"
												descriptionKey="fields.member_id.description"
											/>
											<ReusableFormField
												control={form.control}
												name="billing_provider_npi"
												type="text"
												local="claimStatusForm"
												labelKey="fields.billingprovider_npi_id.label"
												placeholderKey="fields.billingprovider_npi_id.placeholder"
												descriptionKey="fields.billingprovider_npi_id.description"
											/>
											<ReusableDatePickerField
												control={form.control}
												name="service_start_date"
												labelKey="fields.service_start_date.label"
												placeholderKey="fields.service_start_date.placeholder"
												descriptionKey="fields.service_start_date.description"
												buttonClassName="custom-button-class"
												local="claimStatusForm"
											/>
											<ReusableDatePickerField
												control={form.control}
												name="service_end_date"
												labelKey="fields.service_end_date.label"
												placeholderKey="fields.service_end_date.placeholder"
												descriptionKey="fields.service_end_date.description"
												buttonClassName="custom-button-class"
												local="claimStatusForm"
											/>
										</div>
										<div className="flex justify-end gap-4">
											<Button variant="outline" className="mt-4">
												Clear
											</Button>
											<Button type="submit" className="mt-4">
												Search
											</Button>
										</div>
									</form>
								</Form>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>
			{isLoading && (
				<div className="flex justify-center items-center"> Loading... </div>
			)}
			{!isLoading && claimSearchData?.length === 0 && (
				<div className="flex flex-col gap-6 text-xl mt-10 justify-center items-center">
					<div className="bg-muted rounded-full w-80 h-80 p-16">
						<UserX size={200} className="text-background " />
					</div>
					No Claim Found
				</div>
			)}
			{claimSearchData && claimSearchData?.length > 0 && (
				<ClaimStatusSearchResult data={claimSearchData} />
			)}

			{/* <ClaimStatusSearchResult data={claimSearchData} /> */}
			{/* <div className="flex flex-1 flex-col gap-4 p-4">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="aspect-video rounded-xl bg-muted/50" />
					<div className="aspect-video rounded-xl bg-muted/50" />
					<div className="aspect-video rounded-xl bg-muted/50" />
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div> */}
		</div>
	);
}
