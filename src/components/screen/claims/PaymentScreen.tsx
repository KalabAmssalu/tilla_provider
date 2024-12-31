"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, FileSearch, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGetMyPaymentSummary } from "@/actions/Query/claim-Query/request";
import { SummaryCard } from "@/components/module/payment/Summary-card";
import { columns } from "@/components/module/payment/columns";
import { ClaimPaymentDataTable } from "@/components/module/payment/data-table";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";

export interface ClaimPaymentType {
	claimId: string;
	memberId: string;
	dateOfService: string;
	amountBilled: number;
	adjustments: number;
	amountPaid: number;
	status: "completed" | "denied" | "disputed" | "pending";
	paymentMethod: "Credit Card" | "Debit Card" | "Bank Transfer" | "Cash";
}
const data: ClaimPaymentType[] = [
	{
		claimId: "CLM001",
		memberId: "MEM123",
		dateOfService: "12/25/2024",
		amountBilled: 500.0,
		adjustments: 50.0,
		amountPaid: 450.0,
		status: "completed",
		paymentMethod: "Credit Card",
	},
	{
		claimId: "CLM002",
		memberId: "MEM124",
		dateOfService: "12/20/2024",
		amountBilled: 1000.0,
		adjustments: 100.0,
		amountPaid: 900.0,
		status: "denied",
		paymentMethod: "Bank Transfer",
	},
	{
		claimId: "CLM003",
		memberId: "MEM125",
		dateOfService: "12/15/2024",
		amountBilled: 2000.0,
		adjustments: 150.0,
		amountPaid: 1850.0,
		status: "disputed",
		paymentMethod: "Cash",
	},
	{
		claimId: "CLM004",
		memberId: "MEM126",
		dateOfService: "12/10/2024",
		amountBilled: 1500.0,
		adjustments: 200.0,
		amountPaid: 1300.0,
		status: "pending",
		paymentMethod: "Debit Card",
	},
	{
		claimId: "CLM005",
		memberId: "MEM127",
		dateOfService: "12/05/2024",
		amountBilled: 750.0,
		adjustments: 50.0,
		amountPaid: 700.0,
		status: "completed",
		paymentMethod: "Cash",
	},
];

// const cardData = [
// 	{
// 		title: "Received Payments",
// 		value: 25000.0, // value for received payments
// 		icon: <CheckCircle2 />,
// 		iconColor: "text-green-500",
// 		received: 25000.0, // including received value directly in the object
// 	},
// 	{
// 		title: "Denied Payments",
// 		value: 5000.0, // value for denied payments
// 		icon: <XCircle />,
// 		iconColor: "text-red-500",
// 		denied: 5000.0, // including denied value directly in the object
// 	},
// 	{
// 		title: "Disputed Payments",
// 		value: 3000.0, // value for disputed payments
// 		icon: <AlertCircle />,
// 		iconColor: "text-yellow-500",
// 		disputed: 3000.0, // including disputed value directly in the object
// 	},
// 	{
// 		title: "Pending Payments",
// 		value: 2000.0, // value for pending payments
// 		icon: <AlertCircle />,
// 		iconColor: "text-blue-500", // assuming a different color for pending
// 		pending: 2000.0, // including pending value directly in the object
// 	},
// ];

export default function PaymentsPage() {
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

	const { data: MyclaimPaymentData, isLoading } = useGetMyPaymentSummary();
	const cardData = [
		{
			title: "Received Payments",
			value: MyclaimPaymentData?.received || 0,
			icon: <CheckCircle2 />,
			iconColor: "text-green-500",
		},
		{
			title: "Denied Payments",
			value: MyclaimPaymentData?.denied || 0,
			icon: <XCircle />,
			iconColor: "text-red-500",
		},
		{
			title: "Disputed Payments",
			value: MyclaimPaymentData?.disputed || 0,
			icon: <AlertCircle />,
			iconColor: "text-yellow-500",
		},
		{
			title: "Pending Payments",
			value: MyclaimPaymentData?.pending || 0,
			icon: <AlertCircle />,
			iconColor: "text-blue-500",
		},
	];

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

	const { data: myPaymentSummary } = useGetMyPaymentSummary();
	useEffect(() => {
		console.log("useEffect");
		console.log("myPaymentSummary", myPaymentSummary);
	}, []);
	return (
		<div className="mb-20">
			<Card className="mb-4 bg-secondary/40">
				<CardHeader>
					<CardTitle className="text-xl font-bold">Payments</CardTitle>
					<CardDescription className="text-muted-foreground">
						Manage and track payment information based on your claim
						submissions.
					</CardDescription>
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

			<div className="grid gap-4 md:grid-cols-4 mb-4">
				{cardData.map((card, index) => (
					<SummaryCard
						key={index}
						title={card.title}
						value={card.value}
						icon={card.icon}
						iconColor={card.iconColor}
					/>
				))}
			</div>

			<ClaimPaymentDataTable columns={columns} data={data} />
		</div>
	);
}
