"use client";

import { useState } from "react";

import {
	useDeleteAppointment,
	useUpdateAppointment,
} from "@/actions/Query/appointment_Query/requests";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Appointment } from "@/types/appointment/appointment";

// Fixed import path

interface AppiontmentInfoDetailsProps {
	appointment: Appointment;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function AppointmentDetails({
	appointment,
	open,
	onOpenChange,
}: AppiontmentInfoDetailsProps) {
	if (!appointment) return null;

	// const { mutate: updateAppointment } = useUpdateAppointment();
	// const { mutate: deleteAppointment } = useDeleteAppointment();

	const handleUpdate = async () => {
		try {
			onOpenChange(false);
		} catch (error) {
			console.error("Error updating appointment:", error);
		}
	};

	const handleDelete = async () => {
		if (confirm("Are you sure you want to delete this appointment?")) {
			try {
				onOpenChange(false);
			} catch (error) {
				console.error("Error deleting appointment:", error);
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Selected Appointment Detail</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-full">
					<Card className="mb-6">
						<CardHeader>
							<CardTitle>Appointment Detail</CardTitle>
							<CardDescription>Details about the appointment</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<div>
									<Label className="text-primary">Member ID</Label>
									<p>{appointment.individual_member}</p>
								</div>
								<div>
									<Label className="text-primary">Member Full Name</Label>
									{/* <p>{`${appointment.first_name} ${appointment.middle_name || ''} ${appointment.last_name}`.trim()}</p> */}
								</div>
								<div>
									<Label className="text-primary">Doctors Name</Label>
									<p>{appointment.doctor_name || "N/A"}</p>
								</div>
								<div>
									<Label className="text-primary">Service Type</Label>
									<p>{appointment.service_type}</p>
								</div>
								<div>
									<Label className="text-primary">Contact Type</Label>
									<p>{appointment.contact_type || "N/A"}</p>
								</div>
								<div>
									<Label className="text-primary">
										Prefered Appointment Method
									</Label>
									<p>{appointment.appointment_location || "N/A"}</p>
								</div>
								<div>
									<Label className="text-primary">
										Prefered Appointment Date
									</Label>
									<p>{appointment.appointment_date || "N/A"}</p>
								</div>
								<div>
									<Label className="text-primary">
										Prefered Appointment Hour
									</Label>
									<p>
										{`${appointment.appointment_hour.hour} ${appointment.appointment_hour.period || ""}`.trim()}
									</p>
								</div>
								<div>
									<Label className="text-primary">Appointment Status</Label>
									<p>{appointment.status || "N/A"}</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className="mb-6 p-2 items-center justify-evenly flex">
						<Button variant="default" onClick={handleUpdate}>
							Update Status
						</Button>
						<Button variant="outline" onClick={handleDelete}>
							Delete Appointment
						</Button>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
