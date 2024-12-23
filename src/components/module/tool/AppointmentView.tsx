"use client";

import * as React from "react";

import { format } from "date-fns";
import { CalendarIcon, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { appointments } from "@/types/appointment/appointment";

import { AppointmentTable } from "./AppointmentTable";

export default function AppointmentView() {
	const [view, setView] = React.useState<"table" | "calendar">("table");
	const [date, setDate] = React.useState<Date>(new Date());

	// Convert appointments to calendar events
	const events = appointments.map((apt) => ({
		date: new Date(apt.appointmentDate),
		title: apt.memberName,
		provider: apt.providerName,
		status: apt.status,
		time: apt.appointmentTime,
	}));

	// Get status for a specific date
	const getDateStatus = (date: Date) => {
		const dayEvents = events.filter(
			(event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
		);
		if (dayEvents.length === 0) return null;

		// If any appointment is scheduled, show as scheduled
		if (dayEvents.some((e) => e.status === "scheduled")) return "scheduled";
		// If all completed, show as completed
		if (dayEvents.every((e) => e.status === "completed")) return "completed";
		// If any cancelled, show as cancelled
		if (dayEvents.some((e) => e.status === "cancelled")) return "cancelled";
		// Otherwise show as no-show
		return "no-show";
	};

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
				<AppointmentTable appointments={appointments} />
			) : (
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
				</div>
			)}
		</div>
	);
}
