"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { saveAs } from "file-saver";
import { Eraser, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateAndDownloadPDF } from "@/actions/claim/action";
import { SuccessAlertDialog } from "@/components/shared/Dialog/Success-alert-dialog";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import { ReusableHourPickerField } from "@/components/shared/Form/ReusableHourField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import ReusableTeaxtAreaField from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import {
	AppointmentFormValues,
	createAppointmentSchema,
} from "@/types/appointment/AppointmentValidation";
import { type memberType } from "@/types/member/memeberType";

import { useSetAppointment } from "../../../actions/Query/appointment_Query/requests";

export default function AppointmentForm({
	selectedMember,
}: {
	selectedMember: memberType;
}) {
	const t = useTranslations("appointmentForm");
	const appointmetSchema = createAppointmentSchema(t);
	const dataProvider = useAppSelector((state) => state.users.currentUser);

	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const form = useForm<AppointmentFormValues>({
		resolver: zodResolver(appointmetSchema),
		defaultValues: {
			appointment_date: "",
			// doctor_name: "",
			// contact_type: "phone",
			appointment_location: "in_person",
			// status: "scheduled",
			service_type: "general_checkup",
			appointment_hour: {
				hour: "",
				period: "AM",
			},
			// additional_note: "",
		},
	});
	const { mutate: onSubmitAppointment } = useSetAppointment();
	const handleSubmit = async (data: AppointmentFormValues) => {
		const formData = new FormData();

		const { appointment_hour } = data;
		const appointmenth = JSON.stringify(appointment_hour);
		const savedData = {
			...data,
			appointment_hour: appointmenth,
			provider: dataProvider.user.provider.id,
			// individual_member: selectedMember.id,
		};

		Object.entries(savedData).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				formData.append(key, value.toString());
			}
		});
		console.log("JSON Data:", data);

		onSubmitAppointment(formData, {
			onSuccess: async () => {
				setIsAlertOpen(true);
				try {
					const base64PDF = await generateAndDownloadPDF(data);
					const pdfBlob = new Blob([Buffer.from(base64PDF, "base64")], {
						type: "application/pdf",
					});
					saveAs(pdfBlob, "appointment_form.pdf");
				} catch (error) {
					console.error("Error generating PDF:", error);
				}
			},
		});
		console.log("formData", formData);
	};
	return (
		<div className="lg:col-span-3 mb-24">
			<SuccessAlertDialog
				isOpen={isAlertOpen}
				onClose={() => setIsAlertOpen(false)}
				title="Appointment Schedule Successful"
				description={`You have schedule an appointment successfully with ${selectedMember.first_name} ${selectedMember.middle_name} !`}
			/>
			<div>
				<h1 className="text-3xl mb-6 text-center font-bold">
					Appointment Booking Form
				</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					{/* <fieldset className="border p-4 rounded-md bg-muted pb-6">
						<legend className="text-lg font-semibold">
							Member Information
						</legend>
					</fieldset> */}
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
							{/* <ReusableSelectField
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
							/> */}

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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
							<ReusableDatePickerField
								control={form.control}
								name="appointment_date"
								labelKey="fields.appointment_date.label"
								placeholderKey="fields.appointment_date.placeholder"
								descriptionKey="fields.appointment_date.description"
								required
								buttonClassName="custom-button-class"
								local="appointmentForm"
							/>
							<ReusableHourPickerField
								control={form.control}
								name="appointment_hour"
								labelKey="fields.appointment_hour.label"
								descriptionKey="fields.appointment_hour.description"
								required
								local="appointmentForm"
							/>
							{/* Appointment Date */}
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
