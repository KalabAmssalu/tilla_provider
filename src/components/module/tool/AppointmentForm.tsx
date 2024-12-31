"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { saveAs } from "file-saver";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateAndDownloadPDF } from "@/actions/claim/action";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import { ReusableHourPickerField } from "@/components/shared/Form/ReusableHourField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import ReusableTeaxtAreaField from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/storehooks";
import {
	AppointmentFormValues,
	createAppointmentSchema,
} from "@/types/appointment/AppointmentValidation";

export default function AppointmentForm() {
	const [date, setDate] = useState<Date>();
	const t = useTranslations("appointmentForm");
	const appointmetSchema = createAppointmentSchema(t);
	const dataProvider = useAppSelector((state) => state.users.currentUser);
	const form = useForm<AppointmentFormValues>({
		resolver: zodResolver(appointmetSchema),
		defaultValues: {
			appointment_date: "",
			appointment_hour: "",
			doctor_name: "",
			contact_type: "phone",
			appointment_location: "in_person",
			status: "scheduled",
			service_type: "general_checkup",
		},
	});
	// const handleReferralStatusValueChange = (value: string) => {
	// 	form.setValue("reason_for_request", value);
	// };
	const handleSubmit = async (data: AppointmentFormValues) => {
		// Handle form submission
		toast.success("Appointment Scheduled Successfully");
		try {
			const base64PDF = await generateAndDownloadPDF(data);
			const pdfBlob = new Blob([Buffer.from(base64PDF, "base64")], {
				type: "application/pdf",
			});
			saveAs(pdfBlob, "prior_authorization_request_form.pdf");
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};
	return (
		<div className="lg:col-span-3 mb-24">
			<div>
				<h1 className="text-3xl mb-6 text-center font-bold">
					Appointment Booking Form
				</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Member Information
						</legend>
					</fieldset>
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Appointment Information
						</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							{/* Choose Provider Selection */}
							<ReusableFormField
								control={form.control}
								name="doctor_name"
								// type="number"
								local="appointmentForm"
								labelKey="fields.doctor_name.label"
								placeholderKey="fields.doctor_name.placeholder"
								descriptionKey="fields.doctor_name.description"
								required={true}
							/>

							{/* Service Type */}
							<ReusableSelectField
								control={form.control}
								name="service_type"
								labelKey="fields.service_type.label"
								local="appointmentForm"
								placeholderKey="fields.service_type.placeholder"
								descriptionKey="fields.service_type.description"
								options={[
									{
										label: t("fields.service_type.options.consultation"),
										value: "consultation",
									},
									{
										label: t("fields.service_type.options.general_checkup"),
										value: "general_checkup",
									},
									{
										label: t("fields.service_type.options.follow_up"),
										value: "follow_up",
									},
									{
										label: t(
											"fields.service_type.options.specialist_appointment"
										),
										value: "specialist_appointment",
									},
									{
										label: t("fields.service_type.options.tele_health"),
										value: "tele_health",
									},
								]}
								onValueChange={(value) => {
									form.setValue(
										"service_type",
										value as
											| "consultation"
											| "general_checkup"
											| "follow_up"
											| "specialist_appointment"
											| "tele_health"
									);
								}}
								required
							/>
							{/* Appointment Location */}
							<ReusableSelectField
								control={form.control}
								name="appointment_location"
								labelKey="fields.appointment_location.label"
								local="appointmentForm"
								placeholderKey="fields.appointment_location.placeholder"
								descriptionKey="fields.appointment_location.description"
								options={[
									{
										label: t("fields.appointment_location.options.in_person"),
										value: "in_person",
									},
									{
										label: t("fields.appointment_location.options.tele_health"),
										value: "tele_health",
									},
								]}
								onValueChange={(value) => {
									form.setValue(
										"appointment_location",
										value as "in_person" | "tele_health"
									);
								}}
								required
							/>
							{/* Reason for Appointment */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="reason_for_appointmnet"
								local="appointmentForm"
								labelKey="fields.reason_for_appointmnet.label"
								placeholderKey="fields.reason_for_appointmnet.placeholder"
								descriptionKey="fields.reason_for_appointmnet.description"
								required={true}
							/>
							{/* Preferred Contact Method */}
							<ReusableSelectField
								control={form.control}
								name="contact_type"
								labelKey="fields.contact_type.label"
								local="appointmentForm"
								placeholderKey="fields.contact_type.placeholder"
								descriptionKey="fields.contact_type.description"
								options={[
									{
										label: t("fields.contact_type.options.phone"),
										value: "phone",
									},
									{
										label: t("fields.contact_type.options.email"),
										value: "email",
									},
									{
										label: t("fields.contact_type.options.text_message"),
										value: "text_message",
									},
									{
										label: t("fields.contact_type.options.other"),
										value: "other",
									},
								]}
								onValueChange={(value) => {
									form.setValue(
										"contact_type",
										value as "phone" | "email" | "text_message" | "other"
									);
								}}
								required
							/>

							{/* Additional Note */}
							<ReusableTeaxtAreaField
								control={form.control}
								name="additional_note"
								local="referralForm"
								labelKey="fields.additional_note.label"
								placeholderKey="fields.additional_note.placeholder"
								descriptionKey="fields.additional_note.description"
							/>
						</div>
					</fieldset>
					<fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">Calander</legend>
						<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4 mb-4">
							{/* Appointment Date */}
							<div className="space-y-4 bg-white p-4 rounded-md">
								<Label>Preferred Appointment Date</Label>
								<div className="flex flex-col md:flex-row gap-4">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										className="rounded-md border"
										// name="appointment_date"
									/>
									<ReusableHourPickerField
										control={form.control}
										name="appointment_hour"
										labelKey="fields.discharge_hour.label"
										descriptionKey="fields.discharge_hour.description"
										required
										local="claimForm"
									/>
								</div>
							</div>
						</div>
					</fieldset>
					<div className="flex justify-between">
						<Button type="reset" variant={"outline"}>
							Clean Form <Eraser className="ml-2" size={16} />
						</Button>
						<Button type="submit" className="bg-green-500">
							Schedule Appointment <Send className="ml-2" size={16} />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
