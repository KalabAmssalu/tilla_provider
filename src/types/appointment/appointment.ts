export type AppointmentStatus =
	| "scheduled"
	| "completed"
	| "cancelled"
	| "no-show";

export type Appointment = {
	memberId: string;
	memberName: string;
	appointmentDate: string;
	appointmentTime: string;
	providerName: string;
	status: AppointmentStatus;
};

export const appointments: Appointment[] = [
	{
		memberId: "M001",
		memberName: "John Smith",
		appointmentDate: "2024-02-09",
		appointmentTime: "09:00",
		providerName: "Dr. Sarah Wilson",
		status: "scheduled",
	},
	{
		memberId: "M006",
		memberName: "Lisa Anderson",
		appointmentDate: "2024-02-23",
		appointmentTime: "13:30",
		providerName: "Dr. Emily Davis",
		status: "no-show",
	},
];
