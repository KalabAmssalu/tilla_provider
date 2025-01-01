export type Appointment = {
	// individual_member: number;
	provider: number;
	// doctor_name: string;
	appointment_date: string;
	appointment_hour: {
		hour: string;
		period?: "AM" | "PM";
	};
	// status: "scheduled"| "completed" | "cancelled"| "no-show";
	appointment_location: "in_person" | "tele_health";
	// contact_type: "phone" | "email" | "text_message" | "other";
	service_type:
		| "consultation"
		| "general_checkup"
		| "follow_up"
		| "specialist_appointment"
		| "tele_health";
	// additional_note?: string;
};

export const appointments: Appointment[] = [
	{
		// individual_member: 1,
		provider: 12,
		// doctor_name: "Dr. Sarah Wilson",
		appointment_date: "2024-02-09",
		appointment_hour: {
			hour: "09:00",
			period: "AM",
		},
		// status: "scheduled",
		appointment_location: "in_person",
		// contact_type: "phone",
		service_type: "consultation",
		// additional_note: "string",
	},
];
