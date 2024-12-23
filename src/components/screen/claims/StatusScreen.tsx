"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileSearch, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ClaimStatusSearchResult } from "@/components/module/claimStatus/SearchResult";
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
import { DatePickerWithRange } from "@/components/ui/custom/date-range-picker";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

export default function StatusScreen() {
	const claimStatusSchema = z.object({
		claim_id: z.string().optional(),
		claim_status: z.string().optional(),
		claim_type: z.string().optional(),
		member_id: z.string().optional(),
		billingProvider_id: z.string().optional(),
		service_start_date: z.string().optional(),
		service_end_date: z.string().optional(),
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
		},
	});

	function onSubmit(data: ClaimStatusFormValues) {
		console.log("submitted data 1", data);
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
					<div className="flex flex-col gap-2">
						<Label>Filter claim Status with date range</Label>
						<DatePickerWithRange />
					</div>
					<Accordion type="single" collapsible className="w-full mt-4 m-0">
						<AccordionItem value="item-1">
							<AccordionTrigger className="hover:no-underline rounded-lg bg-muted/40 px-4">
								<span className="text-xl px-4 py-2 rounded-lg font-bold flex items-center">
									Search claim <FileSearch className="ml-2" size={20} />
								</span>
							</AccordionTrigger>
							<AccordionContent className="pt-8">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="px-0">
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<ReusableFormField
												control={form.control}
												name="claim_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_id.label"
												placeholderKey="fields.claim_id.placeholder"
												descriptionKey="fields.claim_id.description"
												required
												isRequired={true}
											/>
											<ReusableFormField
												control={form.control}
												name="claim_status"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_status.label"
												placeholderKey="fields.claim_status.placeholder"
												descriptionKey="fields.claim_status.description"
												required
												isRequired={true}
											/>
											<ReusableFormField
												control={form.control}
												name="claim_type"
												type="text"
												local="claimStatusForm"
												labelKey="fields.claim_type.label"
												placeholderKey="fields.claim_type.placeholder"
												descriptionKey="fields.claim_type.description"
												required
												isRequired={true}
											/>

											<ReusableFormField
												control={form.control}
												name="member_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.member_id.label"
												placeholderKey="fields.member_id.placeholder"
												descriptionKey="fields.member_id.description"
												required
												isRequired={true}
											/>
											<ReusableFormField
												control={form.control}
												name="billingProvider_id"
												type="text"
												local="claimStatusForm"
												labelKey="fields.billingProvider_id.label"
												placeholderKey="fields.billingProvider_id.placeholder"
												descriptionKey="fields.billingProvider_id.description"
												required
												isRequired={true}
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
			<ClaimStatusSearchResult />
			<div className="flex flex-1 flex-col gap-4 p-4">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="aspect-video rounded-xl bg-muted/50" />
					<div className="aspect-video rounded-xl bg-muted/50" />
					<div className="aspect-video rounded-xl bg-muted/50" />
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</div>
	);
}
