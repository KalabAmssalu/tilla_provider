"use client";

import * as React from "react";

import { CalendarIcon, TableIcon } from "lucide-react";

import { useFetchAppointment } from "@/actions/Query/appointment_Query/requests";
import { Button } from "@/components/ui/button";
import { Appointment, appointments } from "@/types/appointment/appointment";

import { CalendarView } from "./AppointmentCalander";
import { columns } from "./columns";
import { AppointmentDataTable } from "./data-table";

export default function AppointmentView() {
	const [date, setDate] = React.useState<Date>(new Date());

	const [view, setView] = React.useState<"table" | "calendar">("calendar"); // Set default to calendar view

	const { data, isLoading, error } = useFetchAppointment();
	const [members, setMembers] = React.useState<Appointment[]>([]);

	React.useEffect(() => {
		if (data) {
			setMembers(data);
		}
	}, [data]);

	if (isLoading) return <div>Loading Appointments...</div>;
	if (error) return <div>Error fetching Appointments: {error.message}</div>;

	// const events = appointments.map((apt) => ({
	// 	date: new Date(apt.appointmentDate),
	// 	title: apt.memberName,
	// 	provider: apt.providerName,
	// 	status: apt.status,
	// 	time: apt.appointmentTime,
	// }));
	return (
		// <div></div>
		<div className="container max-w-screen pt-10">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Appointments</h1>
				<Button
					variant="outline"
					onClick={() => setView(view === "table" ? "calendar" : "table")}
				>
					{view === "table" ? (
						<>
							<CalendarIcon className="mr-2 h-4 w-4" />
							Calendar View
						</>
					) : (
						<>
							<TableIcon className="mr-2 h-4 w-4" />
							Table View
						</>
					)}
				</Button>
			</div>

			{view === "table" ? (
				// <AppointmentTable appointments={appointments} />
				<AppointmentDataTable columns={columns} data={members} />
			) : (
				// <ClaimPaymentDataTable columns={columns} data={data} />
				<div className="border rounded-lg p-6 bg-white justify-center items-center ">
					<div className="mb-4 flex items-center gap-4 text-sm">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-blue-500" />
							<span>Scheduled</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-green-500" />
							<span>Completed</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<span>Cancelled</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<span>No Show</span>
						</div>
					</div>
					{/* <CalendarView events={events} /> */}
				</div>
			)}
		</div>
	);
}
