"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
	CircleCheck,
	CircleEllipsis,
	CircleSlash,
	ShieldAlert,
} from "lucide-react";

import { type ClaimPaymentType } from "@/components/screen/claims/PaymentScreen";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// // Example statuses based on account status
export const statuses = [
	{
		value: "completed",
		label: "Completed",
		icon: CircleCheck,
	},
	{
		value: "denied",
		label: "Denied",
		icon: CircleSlash,
	},
	{
		value: "disputed",
		label: "Disputed",
		icon: ShieldAlert,
	},
	{
		value: "pending",
		label: "Pending",
		icon: CircleEllipsis,
	},
];

export const columns: ColumnDef<ClaimPaymentType>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "claimId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Claim ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("claimId")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "memberId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("memberId")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "dateOfService",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date of Service" />
		),
		cell: ({ row }) => {
			const date = row.getValue("dateOfService") as string;
			// return format(new Date(date), "MM/dd/yyyy");
			return date;
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
									: status === "pending"
										? "outline"
										: "default"
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

	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
