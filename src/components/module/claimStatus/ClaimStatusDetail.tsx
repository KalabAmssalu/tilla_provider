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
import { ClaimdetailType } from "@/types/claim/claim";

export default function ClaimDetailView({
	claim,
}: {
	claim: Partial<ClaimdetailType>;
}) {
	return (
		<ScrollArea className="h-full">
			<div className="container mx-auto pb-10">
				<h1 className="text-2xl font-bold mb-6">
					Claim Details for {claim.individual_member?.first_name}
				</h1>
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Claim #{claim.claim_number}</CardTitle>
						<CardDescription>Basic claim information</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<Label>Individual Member</Label>
								<p>
									{claim.individual_member?.first_name}{" "}
									{claim.individual_member?.middle_name}{" "}
									{claim.individual_member?.last_name}
								</p>
							</div>
							<div>
								<Label>Provider</Label>
								{claim.provider?.provider_service_type === "group" ||
								claim.provider?.provider_service_type === "institute" ? (
									<p>{claim.provider?.institute_name}</p>
								) : (
									<p>
										{claim.provider?.provider_title}
										{claim.provider?.provider_first_name}{" "}
										{claim.provider?.provider_middle_initial}{" "}
										{claim.provider?.provider_last_name}
									</p>
								)}
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
						<TabsTrigger value="diagnosis">ICD Diagnosis</TabsTrigger>
						<TabsTrigger value="loinc">LOINC Diagnosis</TabsTrigger>
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
													<p>{claim.billing_provider_npi || "N/A"}</p>
												</div>
												<div>
													<Label>Attending Provider</Label>
													<p>{claim.provider?.provider_npi_id || "N/A"}</p>
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
													<p>{claim.admission_date || "N/A"}</p>
												</div>
												<div>
													<Label>Admission Hour</Label>
													<p>
														{claim.admission_hour?.hour} :{" "}
														{claim.admission_hour?.period}
													</p>
												</div>
												<div>
													<Label>Source of Admission</Label>
													<p>{claim.source_of_admission || "N/A"}</p>
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
										<p>{claim.diagnosis_date || "N/A"}</p>
									</div>
									<div>
										<Label>Diagnosis Code</Label>
										<p>{claim.diagnosis_code || "N/A"}</p>
									</div>
									<div>
										<Label>Diagnosis Category</Label>
										<p>{claim.diagnosis_category || "N/A"}</p>
									</div>
									<div>
										<Label>Diagnosis Description</Label>
										<p>{claim.diagnosis_description || "N/A"}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="loinc">
						<Card>
							<CardHeader>
								<CardTitle>LOINC Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label>LOINC Code</Label>
										<p>{claim.lonic_code || "N/A"}</p>
									</div>
									{/* <div>
										<Label>LOINC Category</Label>
										<p>{claim.lonic_category || "N/A"}</p>
									</div> */}
									<div>
										<Label>LOINC Description</Label>
										<p>{claim.lonic_description || "N/A"}</p>
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
										<Label>Treatment Authorization Codes</Label>
										<p>{claim.treatment_authorization_codes || "N/A"}</p>
									</div>
									<div>
										<Label>CPT Code</Label>
										<p>{claim.cpt_code || "N/A"}</p>
									</div>
									<div>
										<Label>CPT Category</Label>
										<p>{claim.cpt_category || "N/A"}</p>
									</div>
									<div>
										<Label>CPT Description</Label>
										<p>{claim.cpt_description || "N/A"}</p>
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
									<div>
										<Label>Service Charge</Label>
										<p>{claim.service_charge || "N/A"}</p>
									</div>
									<div>
										<Label>Additional Charge</Label>
										<p>{claim.additional_charge || "N/A"}</p>
									</div>
									<div>
										<Label>Non-Covered Charges</Label>
										<p>{claim.non_covered_charge || "N/A"}</p>
									</div>
									<div>
										<Label>Member Payment Amount</Label>
										<p>{claim.member_payment_amount || "N/A"}</p>
									</div>
									<div>
										<Label>Total Amount Paid by Insurance</Label>
										<p>{claim.total_amount_payment_by_insurance || "N/A"}</p>
									</div>
									<div>
										<Label>Grand Total</Label>
										<p className="font-bold">{claim.grand_total || "N/A"}</p>
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
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{claim.release_of_information_receipt && (
								<div className="flex items-center gap-4">
									<Label>Release of Information Receipt:</Label>
									<a
										href={claim.release_of_information_receipt}
										download
										target="_blank"
										className="badge secondary"
									>
										<Badge variant="secondary">open file(s)</Badge>
									</a>
								</div>
							)}
							{claim.receipts && (
								<div className="flex items-center gap-4">
									<Label>Receipts</Label>
									<a
										href={claim.receipts}
										target="_blank"
										download
										className="badge secondary"
									>
										<Badge variant="secondary">open file(s)</Badge>
									</a>
								</div>
							)}
							{claim.medication_prescription && (
								<div className="flex items-center gap-4">
									<Label>Medication Prescription:</Label>
									<a
										href={claim.medication_prescription}
										download
										target="_blank"
										className="badge secondary"
									>
										<Badge variant="secondary">open file(s)</Badge>
									</a>
								</div>
							)}
							{claim.medical_imaging && (
								<div className="flex items-center gap-4">
									<Label>Medical Imaging:</Label>
									<a
										href={claim.medical_imaging}
										download
										target="_blank"
										className="badge secondary"
									>
										<Badge variant="secondary">open file(s)</Badge>
									</a>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</ScrollArea>
	);
}
