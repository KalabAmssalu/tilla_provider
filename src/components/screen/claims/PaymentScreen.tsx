"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { columns } from "@/components/module/payment/Column";
import { PaymentDetails } from "@/components/module/payment/Payment-details";
import { SummaryCards } from "@/components/module/payment/Summary-card";
import { DataTable } from "@/components/module/payment/data-table";
import { Input } from "@/components/ui/input";
import { type Payment } from "@/types/payment/payment";

// This would normally come from an API
const mockData: Payment[] = [
	{
		claimId: "CLM-001",
		memberId: "MEM-001",
		dateOfService: "2023-12-01",
		amountBilled: 1500.0,
		adjustments: 300.0,
		amountPaid: 1200.0,
		resolutionDate: "2023-12-15",
		paymentDate: "2023-12-16",
		status: "completed",
		paymentMethod: "ach",
	},
	// Add more mock data as needed
];

const summary = {
	received: 25000.0,
	denied: 5000.0,
	disputed: 3000.0,
};

export default function PaymentsPage() {
	const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	return (
		<div className="container mx-auto py-4  space-y-8">
			<div className="space-y-4 relative bg-secondary/40 p-4 rounded-md">
				<h2 className="text-3xl font-bold tracking-tight">Payments</h2>
				<p className="text-muted-foreground">
					Manage and track payment information based on your claim submissions.
				</p>
				<div className="absolute w-1/4 right-2 top-0">
					Search Payment
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search payments..."
							className="pl-8 bg-background max-w-sm"
						/>
					</div>
				</div>
			</div>

			<SummaryCards summary={summary} />

			<DataTable
				columns={columns}
				data={mockData}
				onRowClick={(row: Row<Payment>) => {
					setSelectedPayment(row.original);
					setIsDetailsOpen(true);
				}}
			/>

			<PaymentDetails
				payment={selectedPayment}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen}
			/>
		</div>
	);
}
