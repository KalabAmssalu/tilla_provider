"use client";

import * as React from "react";

import {
	addDays,
	addWeeks,
	format,
	isSameDay,
	startOfWeek,
	subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CalendarEvent {
	date: Date;
	// title: string;
	provider: string;
	status: string;
	time: string;
}

interface CalendarViewProps {
	events: CalendarEvent[];
}

export function CalendarView({ events }: CalendarViewProps) {
	// Set initial date to match our dummy data
	const [currentDate, setCurrentDate] = React.useState(new Date("2024-01-28"));
	const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

	const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

	const getStatusColor = (status: string) => {
		switch (status) {
			case "scheduled":
				return "bg-blue-500";
			case "completed":
				return "bg-green-500";
			case "cancelled":
				return "bg-red-500";
			case "no-show":
				return "bg-yellow-500";
			default:
				return "bg-gray-500";
		}
	};

	const getDayEvents = (date: Date) => {
		return events.filter((event) => isSameDay(event.date, date));
	};

	const getEventPosition = (time: string) => {
		const [hours, minutes] = time.split(":").map(Number);
		const totalMinutes = hours * 60 + minutes;
		const startOfDay = 8 * 60; // 8 AM
		return ((totalMinutes - startOfDay) / (12 * 60)) * 100; // 12 hours total
	};

	return (
		<div className="border rounded-lg bg-white">
			<div className="flex items-center justify-between p-4 border-b">
				<div className="flex items-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onClick={() => setCurrentDate((date) => subWeeks(date, 1))}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setCurrentDate((date) => addWeeks(date, 1))}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<h2 className="text-lg font-semibold">
						{format(currentDate, "MMMM yyyy")}
					</h2>
				</div>
			</div>
			<div className="grid grid-cols-[auto,repeat(7,1fr)] divide-x">
				<div className="w-16" /> {/* Empty corner cell */}
				{weekDays.map((day, i) => (
					<div key={i} className="p-2 text-center border-b">
						<div className="font-medium">{format(day, "EEE")}</div>
						<div className="text-sm text-muted-foreground">
							{format(day, "d")}
						</div>
					</div>
				))}
				{timeSlots.map((hour) => (
					<React.Fragment key={hour}>
						<div className="p-2 text-sm text-muted-foreground border-r">
							{format(new Date().setHours(hour), "ha")}
						</div>
						{weekDays.map((day, dayIndex) => {
							const dayEvents = getDayEvents(day);
							const hourEvents = dayEvents.filter((event) => {
								const [eventHour] = event.time.split(":").map(Number);
								return eventHour === hour;
							});

							return (
								<div
									key={`${hour}-${dayIndex}`}
									className="p-1 min-h-[4rem] border-b relative"
								>
									{hourEvents.map((event, eventIndex) => (
										<div
											key={eventIndex}
											className={`absolute inset-x-1 rounded p-1 text-xs ${getStatusColor(
												event.status
											)} text-white`}
											style={{
												top: `${getEventPosition(event.time)}%`,
												height: "3rem",
											}}
										>
											{/* <div className="font-medium truncate">{event.title}</div> */}
											<div className="truncate">{event.provider}</div>
										</div>
									))}
								</div>
							);
						})}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
