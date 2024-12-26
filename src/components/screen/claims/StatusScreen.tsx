"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	type ClaimDisplayType,
	ClaimStatusSearchResult,
} from "@/components/module/claimStatus/SearchResult";
import { ReusableDateRangePickerField } from "@/components/shared/Form/ReusableDataRangePicker";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";

const data: ClaimDisplayType[] = [
	{
		id: "m5gr84i9",
		claim_id: "C12345",
		recipt_date: "2023-01-01",
		payer_claim_control_number: "PCCN12345",
		claim_type: "Type A",
		service_begin_date: "2023-01-01",
		service_end_date: "2023-01-10",
		activity_state: "Active",
		claim_status: "Approved",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		claim_id: "C12346",
		recipt_date: "2023-01-02",
		payer_claim_control_number: "PCCN12346",
		claim_type: "Type B",
		service_begin_date: "2023-01-02",
		service_end_date: "2023-01-11",
		activity_state: "Inactive",
		claim_status: "Pending",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		claim_id: "C12347",
		recipt_date: "2023-01-03",
		payer_claim_control_number: "PCCN12347",
		claim_type: "Type C",
		service_begin_date: "2023-01-03",
		service_end_date: "2023-01-12",
		activity_state: "Active",
		claim_status: "Processing",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		claim_id: "C12348",
		recipt_date: "2023-01-04",
		payer_claim_control_number: "PCCN12348",
		claim_type: "Type D",
		service_begin_date: "2023-01-04",
		service_end_date: "2023-01-13",
		activity_state: "Inactive",
		claim_status: "Approved",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		claim_id: "C12349",
		recipt_date: "2023-01-05",
		payer_claim_control_number: "PCCN12349",
		claim_type: "Type E",
		service_begin_date: "2023-01-05",
		service_end_date: "2023-01-14",
		activity_state: "Active",
		claim_status: "Failed",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
];
export default function StatusScreen() {
	const claimStatusSchema = z.object({
		claim_id: z.string().optional(),
		claim_status: z.string().optional(),
		claim_type: z.string().optional(),
		member_id: z.string().optional(),
		billingProvider_id: z.string().optional(),
		service_start_date: z.string().optional(),
		service_end_date: z.string().optional(),
		dateRange: z
			.object({
				from: z.date().nullable(),
				to: z.date().nullable(),
			})
			.nullable(),
	});

	type ClaimStatusFormValues = z.infer<typeof claimStatusSchema>;

	const form = useForm<ClaimStatusFormValues>({
		resolver: zodResolver(claimStatusSchema),
		defaultValues: {
			claim_id: "",
			claim_status: "",
			claim_type: "",
			member_id: "",
			billingProvider_id: "",
			service_start_date: "",
			service_end_date: "",
			dateRange: {
				from: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
				to: new Date(), // Today
			},
		},
	});

	function onSubmit(data: ClaimStatusFormValues) {
		const date = data.dateRange;

		// Format the from and to dates using formatToMMDDYYYY function
		const newDateRange = `${date?.from ? formatToMMDDYYYY(date.from) : ""} - ${
			date?.to ? formatToMMDDYYYY(date.to) : ""
		}`;

		const savedData = {
			...data,
			dateRange: newDateRange,
		};

		console.log("Submitted Date Range:", newDateRange);
		console.log("Submitted Data:", savedData);
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
						className="w-full mt-4 m-0"
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="hover:no-underline rounded-lg bg-muted/40 px-4">
								<span className="text-xl px-4 py-2 rounded-lg font-bold flex items-center">
									Search claim <FileSearch className="ml-2" size={20} />
								</span>
							</AccordionTrigger>
							<AccordionContent className="pt-8">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="px-0">
										<div className="flex flex-col gap-2 mb-10">
											<ReusableDateRangePickerField
												control={form.control}
												name="dateRange"
												label="Filter claim Status with date range"
												placeholder="Select a date range"
												defaultValue={{
													from: new Date("2024-12-24"),
													to: new Date("2024-12-30"),
												}}
												numberOfMonths={2}
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<ReusableFormField
												control={form.control}
												name="claim_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_id.label"
												placeholderKey="fields.claim_id.placeholder"
												descriptionKey="fields.claim_id.description"
											/>
											<ReusableFormField
												control={form.control}
												name="claim_status"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_status.label"
												placeholderKey="fields.claim_status.placeholder"
												descriptionKey="fields.claim_status.description"
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
												name="billingProvider_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.billingProvider_id.label"
												placeholderKey="fields.billingProvider_id.placeholder"
												descriptionKey="fields.billingProvider_id.description"
											/>
											<ReusableDatePickerField
												control={form.control}
												name="service_start_date"
												labelKey="fields.service_start_date.label"
												placeholderKey="fields.service_start_date.placeholder"
												descriptionKey="fields.service_start_date.description"
												required
												buttonClassName="custom-button-class"
												local="claimStatusForm"
											/>
											<ReusableDatePickerField
												control={form.control}
												name="service_end_date"
												labelKey="fields.service_end_date.label"
												placeholderKey="fields.service_end_date.placeholder"
												descriptionKey="fields.service_end_date.description"
												required
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
			<ClaimStatusSearchResult data={data} />
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
