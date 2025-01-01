"use client";

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

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Appointment Detail</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
