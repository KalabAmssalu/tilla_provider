"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";

import { type ClaimPaymentType } from "@/components/screen/claims/PaymentScreen";
import { Button } from "@/components/ui/button";

import { PaymentDetails } from "./Payment-details";

interface DataTableRowActionsProps<TData extends ClaimPaymentType> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends ClaimPaymentType>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const [selectedPayment, setSelectedPayment] =
		useState<ClaimPaymentType | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleViewDetail = () => {
		setSelectedPayment(row.original); // Now row.original is of type ClaimPaymentType
		setIsDetailsOpen(true); // Open the details modal
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

			<PaymentDetails
				payment={selectedPayment}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen} // Close the details modal when the user closes it
			/>
		</>
	);
}
