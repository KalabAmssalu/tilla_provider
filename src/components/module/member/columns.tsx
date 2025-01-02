"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleSlash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { memberType } from "@/types/member/memeberType";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// // Example statuses based on account status
export const statuses = [
	{
		value: "active",
		label: "Active",
		icon: CircleCheck,
	},
	{
		value: "inactive",
		label: "Inactive",
		icon: CircleSlash,
	},
];
export const columns: ColumnDef<memberType>[] = [
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
		accessorKey: "member_id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("member_id")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "first_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member First Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("first_name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "last_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member Last Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("last_name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "benefit_plan",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Plan Type" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("benefit_plan")}
					</span>
				</div>
			);
		},
	},
];
export const memberInfoColumns: ColumnDef<memberType>[] = [
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
		accessorKey: "member_id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member ID" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("member_id")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "first_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member First Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("first_name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "last_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member Last Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("last_name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "benefit_plan",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Plan Type" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("benefit_plan")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "phone_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("phone_number")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "email_address",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("email_address")}
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "member_status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("member_status") as string;
			return (
				<Badge
					variant={
						status === "active"
							? "default"
							: status === "inactive"
								? "destructive"
								: "outline"
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

export const eligibilityColumns: ColumnDef<memberType>[] = [
	...columns,
	{
		accessorKey: "benefit_begin_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Plan Start Date" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("benefit_begin_date")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "member_status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Eligiblity Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("member_status") as string;
			return (
				<Badge
					variant={
						status === "active"
							? "default"
							: status === "inactive"
								? "destructive"
								: "outline"
					}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "duty_stage",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Coverage Stage" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("duty_stage")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "benefit_begin_date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last Updated" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("benefit_begin_date")}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
