"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ClaimType } from "@/types/claim/claim";

export default function ClaimDetailView({
	claim,
}: {
	claim: Partial<ClaimType>;
}) {
	return (
		<ScrollArea className="h-full">
			<div className="container mx-auto py-10">
				<h1 className="text-3xl font-bold mb-6">Claim Details</h1>
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Claim #{claim.claim_id}</CardTitle>
						<CardDescription>Basic claim information</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<Label>Individual Member</Label>
								<p>{claim.individual_member}</p>
							</div>
							<div>
								<Label>Provider</Label>
								<p>{claim.provider}</p>
							</div>
							<div>
								<Label>Place of Service</Label>
								<p>
									{claim.place_of_service_description} (
									{claim.place_of_service_code})
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="details" className="mb-6">
					<TabsList>
						<TabsTrigger value="details">Claim Details</TabsTrigger>
						<TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
						<TabsTrigger value="treatment">Treatment</TabsTrigger>
						<TabsTrigger value="financials">Financials</TabsTrigger>
					</TabsList>
					<TabsContent value="details">
						<Card>
							<CardHeader>
								<CardTitle>Claim Details</CardTitle>
							</CardHeader>
							<CardContent>
								<Accordion type="single" collapsible>
									<AccordionItem value="provider-info">
										<AccordionTrigger>Provider Information</AccordionTrigger>
										<AccordionContent>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<Label>Billing Provider NPI</Label>
													<p>{claim.billing_provider_npi}</p>
												</div>
												<div>
													<Label>Attending Provider</Label>
													<p>
														{claim.attending_provider_name_npi_specialty_code}
													</p>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="admission-info">
										<AccordionTrigger>Admission Information</AccordionTrigger>
										<AccordionContent>
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												<div>
													<Label>Admission Date</Label>
													<p>{claim.admission_date}</p>
												</div>
												<div>
													<Label>Admission Hour</Label>
													{/* <p>
														{claim.admission_hour.hour}{" "}
														{claim.admission_hour.period}
													</p> */}
												</div>
												<div>
													<Label>Source of Admission</Label>
													<p>{claim.source_of_admission}</p>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="diagnosis">
						<Card>
							<CardHeader>
								<CardTitle>Diagnosis Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label>Diagnosis Date</Label>
										<p>{claim.diagnosis_date}</p>
									</div>
									<div>
										<Label>Diagnosis Code</Label>
										<p>{claim.diagnosis_code}</p>
									</div>
									<div>
										<Label>Diagnosis Category</Label>
										<p>{claim.diagnosis_category}</p>
									</div>
									<div>
										<Label>Diagnosis Description</Label>
										<p>{claim.diagnosis_description}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="treatment">
						<Card>
							<CardHeader>
								<CardTitle>Treatment Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label>Treatment Details</Label>
										<p>{claim.treatment_details}</p>
									</div>
									<div>
										<Label>Treatment Authorization Codes</Label>
										<p>{claim.treatment_authorization_codes}</p>
									</div>
									<div>
										<Label>CPT Code</Label>
										<p>{claim.cpt_code}</p>
									</div>
									<div>
										<Label>CPT Description</Label>
										<p>{claim.cpt_description}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="financials">
						<Card>
							<CardHeader>
								<CardTitle>Financial Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{/* <div>
										<Label>Service Charge</Label>
										<p>${claim.service_charge.toFixed(2)}</p>
									</div>
									<div>
										<Label>Additional Charge</Label>
										<p>${claim.additional_charge.toFixed(2)}</p>
									</div> */}
									<div>
										<Label>Non-Covered Charges</Label>
										<p>${claim.non_covered_charges?.toFixed(2) || "N/A"}</p>
									</div>
									<div>
										<Label>Member Payment Amount</Label>
										<p>{claim.member_payment_amount}</p>
									</div>
									<div>
										<Label>Total Amount Paid by Insurance</Label>
										<p>{claim.total_amount_payment_by_insurance}</p>
									</div>
									<div>
										<Label>Grand Total</Label>
										<p className="font-bold">{claim.grand_total}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<Card>
					<CardHeader>
						<CardTitle>Attached Documents</CardTitle>
					</CardHeader>
					{/* <CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div>
								<Label>Release of Information Receipt</Label>
								<Badge variant="secondary">
									{claim.release_of_information_reciept.length} file(s)
								</Badge>
							</div>
							<div>
								<Label>Receipts</Label>
								<Badge variant="secondary">
									{claim.receipts.length} file(s)
								</Badge>
							</div>
							<div>
								<Label>Medication Prescription</Label>
								<Badge variant="secondary">
									{claim.medication_prescription.length} file(s)
								</Badge>
							</div>
							<div>
								<Label>Medical Imaging</Label>
								<Badge variant="secondary">
									{claim.medical_imaging?.length || 0} file(s)
								</Badge>
							</div>
						</div>
					</CardContent> */}
				</Card>
			</div>
		</ScrollArea>
	);
}
