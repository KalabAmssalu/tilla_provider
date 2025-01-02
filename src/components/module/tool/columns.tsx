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
import { Appointment } from "@/types/appointment/appointment";

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

export const columns: ColumnDef<Appointment>[] = [
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
	// {
	// 	accessorKey: "name",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Member Full Name" />
	// 	),
	// 	cell: ({ row }) => {
	// 		return (
	// 			<div className="flex space-x-2">
	// 				<span className="max-w-[100px] truncate font-medium">
	// 					{row.getValue("name")}
	// 				</span>
	// 			</div>
	// 		);
	// 	},
	// },
	{
		accessorKey: "appointment_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Appointment Date" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("appointment_date")}
					</span>
				</div>
			);
		},
	},
	// {
	// 	accessorKey: "appointment_hour",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Appointment Hour" />
	// 	),
	// 	cell: ({ row }) => {
	// 		return (
	// 			<div className="flex space-x-2">
	// 				<span className="max-w-[100px] truncate font-medium">
	// 					{row.getValue("appointment_hour")}
	// 				</span>
	// 			</div>
	// 		);
	// 	},
	// },
	{
		accessorKey: "service_type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Service Type" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("service_type")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "appointment_location",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Appointment Location" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("appointment_location")}
					</span>
				</div>
			);
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
						status === "scheduled"
							? "default"
							: status === "completed"
								? "secondary"
								: status === "cancelled"
									? "destructive"
									: status === "no-show"
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
