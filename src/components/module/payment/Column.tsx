"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { type Payment } from "@/types/payment/payment";

import { DataTableColumnHeader } from "../table/data-table-column-header";

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "claimId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Claim ID" />
		),
	},
	{
		accessorKey: "memberId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member ID" />
		),
	},
	{
		accessorKey: "dateOfService",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date of Service" />
		),
		cell: ({ row }) => {
			const date = row.getValue("dateOfService") as string;
			return format(new Date(date), "MM/dd/yyyy");
		},
	},
	{
		accessorKey: "amountBilled",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount Billed" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amountBilled"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return formatted;
		},
	},
	{
		accessorKey: "adjustments",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Adjustments" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("adjustments"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return formatted;
		},
	},
	{
		accessorKey: "amountPaid",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount Paid" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amountPaid"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);
			return formatted;
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<Badge
					variant={
						status === "completed"
							? "default"
							: status === "denied"
								? "destructive"
								: status === "disputed"
									? "secondary"
									: "secondary"
					}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "paymentMethod",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Payment Method" />
		),
	},
];
