"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
	CircleCheck,
	CircleEllipsis,
	CircleSlash,
	ShieldAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type ClaimType } from "@/types/claim/claim";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

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

export const ClaimPaymentColumns: ColumnDef<ClaimType>[] = [
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
		accessorKey: "claim_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Claim ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("claim_number")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "individual_member",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("individual_member")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "diagnosis_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date of Service" />
		),
		cell: ({ row }) => {
			const date = row.getValue("diagnosis_date") as string;
			// return format(new Date(date), "MM/dd/yyyy");
			return date;
		},
	},
	{
		accessorKey: "grand_total",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount Billed" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("grand_total"));
			const formatted = new Intl.NumberFormat("en-ET", {
				style: "currency",
				currency: "ETB",
			}).format(amount);
			// new Intl.NumberFormat("en-US", {
			// 	style: "currency",
			// 	currency: "USD",
			// }).format(amount);
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
		accessorKey: "member_payment_amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount Paid" />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("member_payment_amount"));
			const formatted = new Intl.NumberFormat("en-ET", {
				style: "currency",
				currency: "ETB",
			}).format(amount);
			return formatted;
		},
	},
	{
		accessorKey: "payment_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Payment Date" />
		),
		cell: ({ row }) => {
			const date = row.getValue("payment_date") as string;
			// return format(new Date(date), "MM/dd/yyyy");
			return date;
		},
	},
	{
		accessorKey: "resolution_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Resolution Date" />
		),
		cell: ({ row }) => {
			const date = row.getValue("resolution_date") as string;
			// return format(new Date(date), "MM/dd/yyyy");
			return date;
		},
	},
	{
		accessorKey: "claim_status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("claim_status") as string;
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
