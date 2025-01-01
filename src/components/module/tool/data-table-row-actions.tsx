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

	const memberData: memberType = {
		member_id: "MEM001",
		first_name: "John",
		middle_name: "A.",
		last_name: "Doe",
		phone_number: "+251 (900) 123 456",
		email_address: "jd@email.com",
		gender: "Male",
		date_of_birth: "1990-01-01",
		marital_status: "Single",
		mailing_address_line1: "123 Main St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		country: "Ethiopia",
		benefit_plan: "Family Health Plan",
		member_status: "Active",
	};
	return (
		<>
			<Button
				size="sm"
				className="bg-secondary/40 hover:bg-secondary/60 text-black"
				onClick={handleViewDetail} // Open the details modal
			>
				View Detail
			</Button>
			<AppointmentDetails
				appointment={row.original}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen}
			/>
			{/* <PaymentDetails
				payment={selectedPayment}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen} // Close the details modal when the user closes it
			/> */}
		</>
	);
}
