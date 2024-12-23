"use client";

import { CircleIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { CircleX } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { memberType } from "@/types/member/memeberType";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Example statuses based on account status
export const statuses = [
	{
		value: "active",
		label: "Active",
		icon: CircleIcon,
	},
	{
		value: "inactive",
		label: "InActive",
		icon: CircleX,
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
	// {
	// 	accessorKey: "member_id",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="Claim ID" />
	// 	),
	// 	cell: ({ row }) => {
	// 		return (
	// 			<div className="flex space-x-2">
	// 				<span className="max-w-[100px] truncate font-medium">
	// 					{row.getValue("member_id")}
	// 				</span>
	// 			</div>
	// 		);
	// 	},
	// },
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
			<DataTableColumnHeader column={column} title="First Name" />
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
		accessorKey: "middle_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Middle Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("middle_name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "last_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last Name" />
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
		accessorKey: "phone_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[120px] truncate font-medium">
						{row.getValue("phone_number")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "date_of_birth",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date of Birth" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("date_of_birth")}
					</span>
				</div>
			);
		},
	},
	// {
	// 	accessorKey: "name",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="FullName" />
	// 	),
	// 	cell: ({ row }) => {
	// 		const labelValue = row.original.member_permissions?.is_staff
	// 			? "admin"
	// 			: row.original.member_permissions.is_staff
	// 				? "recordOfficer"
	// 				: "member";

	// 		const label = labels.find((label) => label.value === labelValue);
	// 		const fullName = `${row.original.member_profile?.full_name_en}`;
	// 		const fullNameAm = `${row.original.member_profile?.full_name_am}`;

	// 		return (
	// 			<div className="flex space-x-2">
	// 				{label && <Badge>{label.label}</Badge>}
	// 				<span className="max-w-[400px] truncate font-medium flex gap-2">
	// 					{fullName}
	// 					<span className="text-muted-foreground text-sm hidden xl:flex">
	// 						{fullNameAm}
	// 					</span>
	// 				</span>
	// 			</div>
	// 		);
	// 	},
	// },
	{
		accessorKey: "member_status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const statusValue = row.getValue("member_status") || "active"; // Assuming account_status exists
			const status = statuses.find((status) => status.value === statusValue);

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[80px] items-center">
					{status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
