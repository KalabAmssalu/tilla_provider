"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appointment/appointment";
import { memberType } from "@/types/member/memeberType";

import { appointments } from "../../../types/appointment/appointment";
import MemberInfoDetails from "./appointment-details";
import AppointmentDetails from "./appointment-details";

interface DataTableRowActionsProps<TData extends Appointment> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends Appointment>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const [selectedPayment, setSelectedPayment] = useState<Appointment | null>(
		null
	);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleViewDetail = () => {
		setSelectedPayment(row.original);
		setIsDetailsOpen(true); // Open the details modal
	};

	return (
		<>
			<Button
				size="sm"
				className="bg-secondary/40 hover:bg-secondary/60 text-black"
				onClick={handleViewDetail} // Open the details modal
			>
				Update Status
			</Button>
			<AppointmentDetails
				appointment={row.original}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen}
			/>
		</>
	);
}
