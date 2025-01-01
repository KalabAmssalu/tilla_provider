"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableTeaxtAreaField from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const disputeTypes = [
	{ id: "claim-denial", label: "Claim Denial" },
	{ id: "coverage-issue", label: "Coverage Issue" },
	{ id: "billing-error", label: "Billing Error" },
	{ id: "service-complaint", label: "Service Complaint" },
	{ id: "other", label: "Other" },
] as const;

const formSchema = z.object({
	// Member Information
	memberName: z.string().min(2, "Name is required"),
	memberId: z.string().min(1, "Member ID is required"),
	dateOfBirth: z.string().min(1, "Date of birth is required"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	emailAddress: z.string().email("Invalid email address"),

	// Representative Information (optional)
	representativeName: z.string().optional(),
	relationshipToMember: z.string().optional(),
	representativePhone: z.string().optional(),
	representativeEmail: z.string().email("Invalid email address").optional(),

	// Dispute Details
	disputeType: z.string().min(1, "Please select a dispute type"),
	claimNumber: z.string().optional(),
	dateOfService: z.string().optional(),
	providerName: z.string().optional(),
	disputeDescription: z.string().min(1, "Please provide dispute details"),

	// Resolution
	resolutionSought: z.string().min(1, "Please explain desired outcome"),

	// Authorization
	signature: z.string().min(1, "Signature is required"),
	date: z.string().min(1, "Date is required"),
});

export function DisputeForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			memberName: "",
			memberId: "",
			dateOfBirth: "",
			phoneNumber: "",
			emailAddress: "",
			representativeName: "",
			relationshipToMember: "",
			representativePhone: "",
			representativeEmail: "",
			disputeType: "",
			claimNumber: "",
			dateOfService: "",
			providerName: "",
			disputeDescription: "",
			resolutionSought: "",
			signature: "",
			date: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// Here you would typically send the form data to your server
			console.log(values);
			toast({
				title: "Form submitted",
				description:
					"We have received your dispute form and will review it promptly.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description:
					"There was a problem submitting your form. Please try again.",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="lg:col-span-3 mb-24">
			<h1 className="text-3xl mb-6 text-center font-bold">
				Submit Dispute Form
			</h1>
			<p className="mb-6">
				Thank you for contacting Tilla Health Insurance. If you have a dispute
				regarding a claim, coverage, or service, please complete this form in
				its entirety. Our team will review the information and respond promptly.
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Member Information
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Claim Id */}
							<ReusableFormField
								control={form.control}
								name="member_id"
								type="text"
								local="disputeForm"
								labelKey="fields.member_id.label"
								placeholderKey="fields.member_id.placeholder"
								descriptionKey="fields.member_id.description"
								required={true}
							/>
							<ReusableFormField
								control={form.control}
								name="memberName"
								type="text"
								local="disputeForm"
								labelKey="fields.memberName.label"
								placeholderKey="fields.memberName.placeholder"
								descriptionKey="fields.memberName.description"
								required={true}
							/>
							<ReusableDatePickerField
								control={form.control}
								name="dateOfBirth"
								labelKey="fields.date_of_birth.label"
								placeholderKey="fields.date_of_birth.placeholder"
								descriptionKey="fields.date_of_birth.description"
								local="disputeForm"
								required={true}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="Phone number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<ReusableFormField
								control={form.control}
								name="email_address"
								type="email"
								local="disputeForm"
								labelKey="fields.email_address.label"
								placeholderKey="fields.email_address.placeholder"
								descriptionKey="fields.email_address.description"
								required
							/>
						</div>
					</fieldset>
					{/* Representative Information */}
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Representative Information (if applicable)
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							<ReusableFormField
								control={form.control}
								name="representativeName"
								type="text"
								local="disputeForm"
								labelKey="fields.representative_full_name.label"
								placeholderKey="fields.representative_full_name.placeholder"
								descriptionKey="fields.representative_full_name.description"
								required={true}
							/>
							<ReusableFormField
								control={form.control}
								name="relationshipToMember"
								type="text"
								local="disputeForm"
								labelKey="fields.relationship_to_member.label"
								placeholderKey="fields.relationship_to_member.placeholder"
								descriptionKey="fields.relationship_to_member.description"
								required={true}
							/>
							<ReusableDatePickerField
								control={form.control}
								name="dateOfBirth"
								labelKey="fields.date_of_birth.label"
								placeholderKey="fields.date_of_birth.placeholder"
								descriptionKey="fields.date_of_birth.description"
								local="disputeForm"
								required={true}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="Phone number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<ReusableFormField
								control={form.control}
								name="email_address"
								type="email"
								local="disputeForm"
								labelKey="fields.email_address.label"
								placeholderKey="fields.email_address.placeholder"
								descriptionKey="fields.email_address.description"
								required
							/>
						</div>
					</fieldset>
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">Dispute Details</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							<ReusableFormField
								control={form.control}
								name="claimNumber"
								type="text"
								local="priorAuthForm"
								labelKey="fields.claim_id.label"
								placeholderKey="fields.claim_id.placeholder"
								descriptionKey="fields.claim_id.description"
							/>
							<FormField
								control={form.control}
								name="disputeType"
								render={({ field }) => (
									<FormItem className="mb-4">
										<FormLabel>Type of Dispute</FormLabel>
										<div className="grid gap-2">
											{disputeTypes.map((type) => (
												<div
													key={type.id}
													className="flex items-center space-x-2"
												>
													<Checkbox
														id={type.id}
														checked={field.value === type.id}
														onCheckedChange={() => field.onChange(type.id)}
													/>
													<label
														htmlFor={type.id}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														{type.label}
													</label>
												</div>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Date of Service */}
							<ReusableDatePickerField
								control={form.control}
								name="dateOfService"
								labelKey="fields.date_of_service.label"
								placeholderKey="fields.date_of_service.placeholder"
								descriptionKey="fields.date_of_service.description"
								local="priorAuthForm"
								required={true}
							/>
							<ReusableFormField
								control={form.control}
								name="providerName"
								type="text"
								local="appointmentForm"
								labelKey="fields.doctor_name.label"
								placeholderKey="fields.doctor_name.placeholder"
								descriptionKey="fields.doctor_name.description"
								required={true}
							/>
							{/* Reason for Appeal */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="disputeDescription"
								local="disputeForm"
								labelKey="fields.appeal_description.label"
								placeholderKey="fields.appeal_description.placeholder"
								descriptionKey="fields.appeal_description.description"
								required={true}
							/>
						</div>
					</fieldset>
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Supporting Documents
						</legend>
						<div className="text-sm text-muted-foreground">
							<p>
								Please attach any relevant documents to support your dispute,
								such as:
							</p>
							<ul className="list-disc list-inside mt-2">
								<li>Explanation of Benefits (EOB)</li>
								<li>Provider bills or invoices</li>
								<li>Correspondence related to the dispute</li>
								<li>Any other supporting evidence</li>
							</ul>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Supporting Document 1 */}
							<ReusableFileUploadField
								control={form.control}
								name="supporting_doc1"
								local="appealForm"
								labelKey="fields.supporting_doc1.label"
								descriptionKey="fields.supporting_doc1.description"
							/>
						</div>
					</fieldset>

					{/* Resolution Sought */}
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">Resolution Sought</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							<FormField
								control={form.control}
								name="resolutionSought"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Please explain the outcome you are seeking
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe desired resolution"
												className="min-h-[100px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</fieldset>
					{/* Authorization and Signature */}
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Authorization and Signature
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground">
									By signing below, I confirm that the information provided is
									accurate and complete to the best of my knowledge. I authorize
									Tilla Health Insurance to investigate the dispute and contact
									me for additional information if necessary.
								</p>
								<div className="grid gap-4 sm:grid-cols-2">
									<FormField
										control={form.control}
										name="signature"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Signature</FormLabel>
												<FormControl>
													<Input placeholder="Type full name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="date"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date</FormLabel>
												<FormControl>
													<Input type="date" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</fieldset>
					<Button type="submit" className="w-full">
						Submit Dispute Form
					</Button>
				</form>
			</Form>
		</div>
	);
}
