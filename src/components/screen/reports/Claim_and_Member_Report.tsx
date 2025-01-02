"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ConfirmationModal } from "./ConfirmationModal";
import DiagnosisReport from "./DiagnosisReport";
import MemberAddressReportForm from "./MemberAddressReport";
import MemberInformationReportForm from "./MemberInformationReport";
import ProviderInformationForm from "./ProviderReport";
import { ReportSidebar } from "./ReportSideBar";

export type ProviderReportFormFieldNames =
	| "provider_first_name"
	| "provider_middle_name"
	| "provider_last_name"
	| "provider_npi"
	| "billing_provider_npi"
	| "referral_provider_name"
	| "referral_provider_npi";
//   | `ageRange.${number}`; // Add other field names here as needed

export type MemberReportFormFieldNames =
	| "member_id"
	| "member_first_name"
	| "member_middle_name"
	| "member_last_name"
	| "plan_type"
	| "ageFilterEnabled"
	| "ageRange";

export type MemberAddressReportFormFieldNames =
	| "country"
	| "street_address"
	| "mailing_address_line1"
	| "city"
	| "region"
	| "zip_code"
	| "kifle_ketema";

const claimReportSchema = z.object({
	claim_status: z.string().optional(),
	member_id: z.string().optional(),
	member_name: z.string().optional(),
	plan_type: z.string().optional(),
	service_start_date: z.string().optional(),
	service_end_date: z.string().optional(),
	from: z.string().nullable().optional(),
	to: z.string().nullable().optional(),
	amountRange: z
		.array(z.number())
		.refine((value) => value.length === 2, {
			message: "Amount range must contain exactly two numbers",
		})
		.optional(),
	diagnosis_category: z.string().optional(),
	loinc_category: z.string().optional(),
	cpt_category: z.string().optional(),
	diagnosis_source: z.string().optional(),
	procedure_code: z.string().optional(),
	cpt_code: z.string().optional(),
	provider: z.string().optional(),
	billing_provider_npi: z.string().optional(),
	provider_first_name: z.string().optional(),
	provider_middle_name: z.string().optional(),
	provider_last_name: z.string().optional(),
	member_first_name: z.string().optional(),
	member_middle_name: z.string().optional(),
	member_last_name: z.string().optional(),
	provider_npi: z.string().optional(),
	referral_provider_name: z.string().optional(),
	referral_provider_npi: z.string().optional(),
	ageRange: z
		.array(z.number())
		.refine((value) => value.length === 2, {
			message: "Age range must contain exactly two numbers",
		})
		.optional(),
	ageFilterEnabled: z.boolean().optional().default(false),
	street_address: z.string().optional(),
	country: z.string().optional(),
	mailing_address_line1: z.string().optional(),
	kifleKetema: z.string().optional(), // Changed to camelCase
	city: z.string().optional(),
	region: z.string().optional(),
	zip_code: z.string().optional(),
	encounter_type: z.string().optional(),
	kifle_ketema: z.string().optional(), // Changed to snake_case
});

export type ClaimReportFormValues = z.infer<typeof claimReportSchema>;

interface MemberReportProps {
	onSubmitReport: (values: ClaimReportFormValues, summary: string) => void;
}

export default function MemberReport({ onSubmitReport }: MemberReportProps) {
	const t = useTranslations("claimStatusForm");

	const [visibleSections, setVisibleSections] = useState({
		dateRange: true,
		claimStatus: true,
		diagnosis: true,
		provider: true,
		member: true,
		geographical: true,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [filterSummary, setFilterSummary] = useState("");

	const form = useForm<ClaimReportFormValues>({
		resolver: zodResolver(claimReportSchema),
		defaultValues: {
			from: "", // Yesterday
			to: "", // Today
			claim_status: "",
			service_start_date: "",
			service_end_date: "",
			encounter_type: "",
			diagnosis_category: "",
			loinc_category: "",
			cpt_category: "",
			diagnosis_source: "",
			member_id: "",
			member_first_name: "",
			member_middle_name: "",
			member_last_name: "",
			provider_first_name: "",
			provider_middle_name: "",
			provider_last_name: "",
			referral_provider_name: "",
			referral_provider_npi: "",
			procedure_code: "",
			cpt_code: "",
			plan_type: "",
			member_name: "",
			provider: "",
			ageRange: [18, 65],
			ageFilterEnabled: false,
			street_address: "",
			mailing_address_line1: "",
			kifle_ketema: "",
			country: "",
			city: "",
			region: "",
			zip_code: "",
		},
	});

	const handleDiagnosisValueChange = (data: {
		category: string;
		cpt_category: string;
		loinc_category: string;
		source: "WHO" | "ETHIOPIA";
	}) => {
		form.setValue("diagnosis_category", data.category);
		form.setValue("cpt_category", data.cpt_category);
		form.setValue("loinc_category", data.loinc_category);
		console.log("diagnosis_source", data.source);
	};

	const handleProviderValueChange = (
		name: ProviderReportFormFieldNames,
		value: any
	) => {
		form.setValue(name, value);
	};
	const handleMemberValueChange = (
		name: MemberReportFormFieldNames,
		value: any
	) => {
		form.setValue(name, value);
	};
	const handleMemberAddressValueChange = (
		name: MemberAddressReportFormFieldNames,
		value: any
	) => {
		form.setValue(name, value);
	};

	function onSubmit(data: ClaimReportFormValues) {
		const summary = generateFilterSummary(data);
		setFilterSummary(summary);
		setIsModalOpen(true);
	}

	function generateFilterSummary(data: ClaimReportFormValues): string {
		const parts = [];

		if (data.from && data.to) {
			parts.push(
				`Report generated for claims submitted from ${format(new Date(data.from), "MMMM d, yyyy")} to ${format(new Date(data.to), "MMMM d, yyyy")}`
			);
		}

		if (data.diagnosis_source) {
			parts.push(`Diagnosis source: ${data.diagnosis_source}`);
		}

		if (data.diagnosis_category) {
			parts.push(`Diagnosis category: ${data.diagnosis_category}`);
		}

		if (data.claim_status) {
			parts.push(`Claim status: ${data.claim_status}`);
		}

		if (data.plan_type) {
			parts.push(`Plan type: ${data.plan_type}`);
		}

		if (ageFilterEnabled && data.ageRange && data.ageRange.length === 2) {
			parts.push(`Age range: ${data.ageRange[0]} to ${data.ageRange[1]} years`);
		}

		// Add member information
		const memberInfo = [
			data.member_id,
			data.member_first_name,
			data.member_middle_name,
			data.member_last_name,
		]
			.filter(Boolean)
			.join(" ");
		if (memberInfo) {
			parts.push(`Member: ${memberInfo}`);
		}

		// Add provider information
		const providerInfo = [
			data.provider_first_name,
			data.provider_middle_name,
			data.provider_last_name,
		]
			.filter(Boolean)
			.join(" ");

		if (providerInfo) {
			parts.push(`Provider: ${providerInfo}`);
		}

		if (data.provider_npi) {
			parts.push(`Provider NPI: ${data.provider_npi}`);
		}

		if (data.billing_provider_npi) {
			parts.push(`Billing Provider NPI: ${data.billing_provider_npi}`);
		}
		const referralProviderInfo = [
			data.referral_provider_name,
			data.referral_provider_npi,
		]
			.filter(Boolean)
			.join(" ");

		if (referralProviderInfo) {
			parts.push(`Referral Provider: ${referralProviderInfo}`);
		}

		return `${parts.join(". ")}.`;
	}

	const ageFilterEnabled = form.watch("ageFilterEnabled");
	function handleConfirmSearch() {
		setIsModalOpen(false);

		// Get all form values
		const formValues = form.getValues();

		// Include ageRange only if it has been touched and the filter is enabled
		const touchedFields = form.formState.touchedFields;
		const finalValues = {
			...formValues,
			...(ageFilterEnabled && touchedFields.ageRange
				? { ageRange: formValues.ageRange }
				: { ageRange: undefined }),
		};

		onSubmitReport(finalValues, filterSummary);
	}
	const handleToggleSection = (section: string, isVisible: boolean) => {
		setVisibleSections((prev) => ({ ...prev, [section]: isVisible }));
	};

	return (
		<SidebarProvider>
			<div className="flex">
				<ReportSidebar onToggleSection={handleToggleSection} />
				<SidebarInset className="flex-grow">
					<div className="mb-20 p-4 w-[1100px]">
						<Card className="mb-4 flex-col bg-secondary/40">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-center">
									Member and Claim Report
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="px-0 space-y-6"
									>
										{visibleSections.dateRange && (
											<div>
												<span className="text-md font-bold">
													Search claim by Date Range
												</span>
												<div className="flex justify-center mb-6 gap-4 border-background border-2 p-4 rounded-lg">
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
											</div>
										)}

										{visibleSections.claimStatus && (
											<fieldset className="border rounded-md border-white p-4 my-6">
												<legend className="text-lg font-semibold">
													Report on Diagnosis Information
												</legend>
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
																label: t(
																	"fields.claim_status.options.disputing"
																),
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
																value as
																	| "pending"
																	| "disputing"
																	| "denied"
																	| "paid"
															);
														}}
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
													<FormItem className="space-y-3">
														<FormLabel>Encounter Type</FormLabel>
														<FormControl>
															<RadioGroup
																// onValueChange={}
																// defaultValue={}
																className="flex flex-col space-y-1"
															>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Inpaitent" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Inpaitent
																	</FormLabel>
																</FormItem>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="Outpaitent" />
																	</FormControl>
																	<FormLabel className="font-normal">
																		Outpaitent
																	</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
													</FormItem>
												</div>
											</fieldset>
										)}

										{visibleSections.diagnosis && (
											<DiagnosisReport
												onDataChange={handleDiagnosisValueChange}
												control={form.control}
											/>
										)}

										{visibleSections.provider && (
											<ProviderInformationForm
												onDataChange={handleProviderValueChange}
												control={form.control}
											/>
										)}
										{visibleSections.member && (
											<MemberInformationReportForm
												ageFilterEnabled={ageFilterEnabled}
												control={form.control}
												onDataChange={handleMemberValueChange}
											/>
										)}
										{visibleSections.geographical && (
											<MemberAddressReportForm
												control={form.control}
												onDataChange={handleMemberAddressValueChange}
											/>
										)}

										<div className="flex justify-end gap-4">
											<Button
												variant="outline"
												type="button"
												onClick={() => form.reset()}
											>
												Clear
											</Button>
											<Button onClick={form.handleSubmit(onSubmit)}>
												Search
											</Button>
										</div>
									</form>
								</Form>
							</CardContent>
						</Card>
					</div>
				</SidebarInset>
			</div>
			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirmSearch}
				summary={filterSummary}
			/>
		</SidebarProvider>
	);
}
