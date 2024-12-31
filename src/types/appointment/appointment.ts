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
	{
		memberId: "M001",
		appointmentDate: "2024-01-28",
		appointmentTime: "09:00",
		memberName: "John Doe",
		providerName: "Dr. Smith",
		status: "scheduled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-28",
		appointmentTime: "14:30",
		memberName: "Jane Smith",
		providerName: "Dr. Johnson",
		status: "completed",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-29",
		appointmentTime: "10:15",
		memberName: "Alice Brown",
		providerName: "Dr. Wilson",
		status: "cancelled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-29",
		appointmentTime: "11:45",
		memberName: "Bob Wilson",
		providerName: "Dr. Anderson",
		status: "scheduled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-30",
		appointmentTime: "13:00",
		memberName: "Carol Davis",
		providerName: "Dr. Martinez",
		status: "no-show",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-30",
		appointmentTime: "15:30",
		memberName: "David Miller",
		providerName: "Dr. Taylor",
		status: "completed",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-31",
		appointmentTime: "09:30",
		memberName: "Emma Wilson",
		providerName: "Dr. Brown",
		status: "scheduled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-01-31",
		appointmentTime: "16:00",
		memberName: "Frank Thomas",
		providerName: "Dr. Davis",
		status: "cancelled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-02-01",
		appointmentTime: "08:30",
		memberName: "Grace Lee",
		providerName: "Dr. Wilson",
		status: "scheduled",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-02-01",
		appointmentTime: "11:00",
		memberName: "Henry Garcia",
		providerName: "Dr. Anderson",
		status: "completed",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-02-02",
		appointmentTime: "14:15",
		memberName: "Isabel Rodriguez",
		providerName: "Dr. Martinez",
		status: "no-show",
	},
	{
		memberId: "M001",
		appointmentDate: "2024-02-02",
		appointmentTime: "16:45",
		memberName: "Jack Thompson",
		providerName: "Dr. Taylor",
		status: "scheduled",
	},
];
