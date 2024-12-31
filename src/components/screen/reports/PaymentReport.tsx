"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchClaim } from "@/actions/Query/claim-Query/request";
import { ClaimStatusSearchResult } from "@/components/module/claimStatus/SearchResult";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import CustomGrid from "@/components/shared/dataTable/CustomTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const claimStatusSchema = z.object({
	claim_status: z.string().optional(),
	claim_type: z.string().optional(),
	member_id: z.string().optional(),
	member_name: z.string().optional(),
	plan_type: z.string().optional(),
	service_start_date: z.string().optional(),
	service_end_date: z.string().optional(),
	from: z.string().nullable(),
	to: z.string().nullable(),
	amountRange: z.string().optional(),
	diagnosis_code: z.string().optional(),
	procedure_code: z.string().optional(),
	cpt_code: z.string().optional(),
	provider: z.string().optional(),
	billing_provider_npi: z.string().optional(),
	ageRange: z.array(z.number()).refine((value) => value.length === 2, {
		message: "Age range must have two values",
	}),
});

export type ClaimStatusFormValues = z.infer<typeof claimStatusSchema>;

export default function MemberReport() {
	const t = useTranslations("claimStatusForm");
	const [amountRange, setAmountRange] = useState([0, 1000]);
	const [visible, setVisible] = useState(false);

	const form = useForm<ClaimStatusFormValues>({
		resolver: zodResolver(claimStatusSchema),
		defaultValues: {
			from: "", // Yesterday
			to: "", // Today
			claim_type: "",
			claim_status: "",
			service_start_date: "",
			service_end_date: "",
			diagnosis_code: "",
			procedure_code: "",
			amountRange: "",
			cpt_code: "",
			member_id: "",
			plan_type: "",
			member_name: "",
			provider: "",
			ageRange: [18, 65],
		},
	});
	const [formData, setFormData] = useState<Partial<ClaimStatusFormValues>>({
		from: "", // Yesterday
		to: "", // Today
		claim_type: "",
		claim_status: "",
		service_start_date: "",
		service_end_date: "",
		diagnosis_code: "",
		procedure_code: "",
		amountRange: "",
		cpt_code: "",
		member_id: "",
		plan_type: "",
		member_name: "",
		provider: "",
		ageRange: [0, 100],
	});

	const { data: claimSearchData, isLoading } = useSearchClaim(formData);
	function onSubmit(data: ClaimStatusFormValues) {
		console.log("Submitted Data:", data);
		setFormData(data);
	}

	return (
		<div className="mb-20">
			<Card className="mb-4 flex-col bg-secondary/40">
				<CardHeader>
					<CardTitle className="text-xl font-bold text-center">
						Member and Claim Report
					</CardTitle>
				</CardHeader>
				<CardContent>
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
							<fieldset className="border rounded-md my-6">
								<legend className="text-lg font-semibold">
									Payment Information
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mb-4">
									<div className="space-y-4">
										<Label>Amount Range</Label>
										<div className="flex items-center space-x-4">
											<DollarSign className="text-gray-500" />
											<Slider
												value={amountRange}
												onValueChange={setAmountRange}
												max={10000}
												step={100}
												className="flex-grow"
											/>
										</div>
										<div className="flex justify-between text-sm text-gray-500">
											<span>${amountRange[0]}</span>
											<span>${amountRange[1]}</span>
										</div>
									</div>
								</div>
							</fieldset>
							<fieldset className="border rounded-md my-6">
								<legend className="text-lg font-semibold">
									Provider Information
								</legend>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mb-4">
									<ReusableFormField
										control={form.control}
										name="provider_first_name"
										type="text"
										local="claimStatusForm"
										labelKey="fields.provider_first_name.label"
										placeholderKey="fields.provider_first_name.placeholder"
										descriptionKey="fields.provider_first_name.description"
									/>
									<ReusableFormField
										control={form.control}
										name="provider_middle_name"
										type="text"
										local="claimStatusForm"
										labelKey="fields.provider_middle_name.label"
										placeholderKey="fields.provider_middle_name.placeholder"
										descriptionKey="fields.provider_middle_name.description"
									/>
									<ReusableFormField
										control={form.control}
										name="provider_last_name"
										type="text"
										local="claimStatusForm"
										labelKey="fields.provider_last_name.label"
										placeholderKey="fields.provider_last_name.placeholder"
										descriptionKey="fields.provider_last_name.description"
									/>
								</div>
								<Separator />
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mb-4">
									<ReusableFormField
										control={form.control}
										name="provider_npi"
										type="text"
										local="claimStatusForm"
										labelKey="fields.provider_npi.label"
										placeholderKey="fields.provider_npi.placeholder"
										descriptionKey="fields.provider_npi.description"
									/>
									<ReusableFormField
										control={form.control}
										name="billing_provider_npi"
										type="text"
										local="claimStatusForm"
										labelKey="fields.billingProvider_id.label"
										placeholderKey="fields.billingProvider_id.placeholder"
										descriptionKey="fields.billingProvider_id.description"
									/>
								</div>
								<Separator />
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mb-4">
									<ReusableFormField
										control={form.control}
										name="referral_provider_name"
										type="text"
										local="claimStatusForm"
										labelKey="fields.referral_provider_name.label"
										placeholderKey="fields.referral_provider_name.placeholder"
										descriptionKey="fields.referral_provider_name.description"
									/>
									<ReusableFormField
										control={form.control}
										name="referral_provider_npi"
										type="text"
										local="claimStatusForm"
										labelKey="fields.referral_provider_npi.label"
										placeholderKey="fields.referral_provider_npi.placeholder"
										descriptionKey="fields.referral_provider_npi.description"
									/>
								</div>
							</fieldset>

							<div className="flex justify-end gap-4">
								<Button variant="outline" className="mt-4">
									Clear
								</Button>
								<Button onClick={() => setVisible(true)} className="mt-4">
									Search
								</Button>
							</div>
						</form>
					</Form>
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
			{visible && <CustomGrid />}

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
