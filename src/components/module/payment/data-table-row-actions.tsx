"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ClaimType } from "@/types/claim/claim";

import { PaymentDetails } from "./Payment-details";

interface DataTableRowActionsProps<TData extends ClaimType> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends ClaimType>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const [selectedPayment, setSelectedPayment] = useState<ClaimType | null>(
		null
	);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleViewDetail = () => {
		setSelectedPayment(row.original); // Now row.original is of type ClaimType
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
