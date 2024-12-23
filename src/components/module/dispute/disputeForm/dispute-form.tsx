"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
		<Card className="max-w-5xl mx-auto">
			<CardHeader>
				<CardTitle className="text-center text-lg">
					Submit Dispute Form
				</CardTitle>
				<CardDescription>
					Thank you for contacting Tilla Health Insurance. If you have a dispute
					regarding a claim, coverage, or service, please complete this form in
					its entirety. Our team will review the information and respond
					promptly.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* Member Information */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">1. Member Information</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="memberName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Member Name</FormLabel>
											<FormControl>
												<Input placeholder="Full name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="memberId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Member ID Number</FormLabel>
											<FormControl>
												<Input placeholder="ID number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="dateOfBirth"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date of Birth</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="Phone number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="emailAddress"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input type="email" placeholder="Email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Representative Information */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">
								2. Representative Information (if applicable)
							</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="representativeName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Representative Name</FormLabel>
											<FormControl>
												<Input placeholder="Full name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="relationshipToMember"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Relationship to Member</FormLabel>
											<FormControl>
												<Input placeholder="Relationship" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="representativePhone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="Phone number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="representativeEmail"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input type="email" placeholder="Email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Dispute Details */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">3. Dispute Details</h2>
							<FormField
								control={form.control}
								name="disputeType"
								render={({ field }) => (
									<FormItem>
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
							<div className="grid gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="claimNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Claim Number (if applicable)</FormLabel>
											<FormControl>
												<Input placeholder="Claim number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="dateOfService"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date of Service</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="providerName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Provider Name</FormLabel>
											<FormControl>
												<Input placeholder="Provider name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="disputeDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Please provide a detailed description of your dispute
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter dispute details"
												className="min-h-[100px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Supporting Documents */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">4. Supporting Documents</h2>
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
							<Input type="file" multiple className="cursor-pointer" />
						</div>

						{/* Resolution Sought */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">5. Resolution Sought</h2>
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

						{/* Authorization and Signature */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">
								6. Authorization and Signature
							</h2>
							<p className="text-sm text-muted-foreground">
								By signing below, I confirm that the information provided is
								accurate and complete to the best of my knowledge. I authorize
								Tilla Health Insurance to investigate the dispute and contact me
								for additional information if necessary.
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

						<Button type="submit" className="w-full">
							Submit Dispute Form
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
