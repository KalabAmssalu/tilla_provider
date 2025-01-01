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

export const ClaimHistoryColumns: ColumnDef<ClaimType>[] = [
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
		accessorKey: "diagnosis_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Recipt Date" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("diagnosis_date")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "Payer_control_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Payer Control Number" />
		),
		cell: ({ row }) => {
			const date = row.getValue("Payer_control_number") as string;

			// return format(new Date(date), "MM/dd/yyyy");
			return date;
		},
	},
	{
		accessorKey: "claim_type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Claim Type" />
		),
		cell: ({ row }) => {
			const data = row.getValue("claim_type") as string;

			return data;
		},
	},
	{
		accessorKey: "service_start_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Service Start Date" />
		),
		cell: ({ row }) => {
			const date = parseFloat(row.getValue("service_start_date"));

			return date;
		},
	},
	{
		accessorKey: "service_end_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Service End Date" />
		),
		cell: ({ row }) => {
			const date = parseFloat(row.getValue("service_end_date"));

			return date;
		},
	},

	{
		accessorKey: "activity_state",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Activity State" />
		),
		cell: ({ row }) => {
			const date = row.getValue("activity_state") as string;
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
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
