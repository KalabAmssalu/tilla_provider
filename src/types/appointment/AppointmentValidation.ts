import * as z from "zod";

// Define the appointment field schema
export const createAppointmentSchema = (t: (key: string) => string) =>
	z.object({
		memberId: z.string().nonempty({
			message: t("fields.memberId.error"),
		}),
		memberName: z.string().nonempty({
			message: t("fields.memberName.error"),
		}),
		appointment_date: z.string().refine(
			(date) => {
				const parsedDate = new Date(date);
				return !isNaN(parsedDate.getTime()); // Check if it's a valid date
			},
			{
				message: t("fields.appointment_date.error"),
			}
		),
		appointment_hour: z.string().nonempty({
			message: t("fields.appointment_hour.error"),
		}),
		doctor_name: z.string().nonempty({
			message: t("fields.doctor_name.error"),
		}),
		contact_type: z.enum(["phone", "email", "text_message", "other"], {
			invalid_type_error: t("fields.contact_type.error"),
		}),
		appointment_location: z.enum(["in_person", "tele_health"], {
			invalid_type_error: t("fields.appointment_location.error"),
		}),
		status: z.enum(["scheduled", "completed", "cancelled", "no-show"], {
			message: t("fields.status.error"),
		}),
		service_type: z.enum(
			[
				"consultation",
				"general_checkup",
				"follow_up",
				"specialist_appointment",
				"tele_health",
			],
			{
				message: t("fields.service_type.error"),
			}
		),
	});

// Type inference for appointment form values
export type AppointmentFormValues = z.infer<
	ReturnType<typeof createAppointmentSchema>
>;
