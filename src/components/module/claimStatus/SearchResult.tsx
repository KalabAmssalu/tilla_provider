"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export type Payment = {
	id: string;
	claim_id: string;
	recipt_date: string;
	payer_claim_control_number: string;
	claim_type: string;
	service_begin_date: string;
	service_end_date: string;
	activity_state: string;
	claim_status: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "claim_id",
		header: "Claim ID",
		cell: ({ row }) => <div>{row.getValue("claim_id")}</div>,
	},
	{
		accessorKey: "recipt_date",
		header: "Receipt Date",
		cell: ({ row }) => <div>{row.getValue("recipt_date")}</div>,
	},
	{
		accessorKey: "payer_claim_control_number",
		header: "Payer Claim Control Number",
		cell: ({ row }) => <div>{row.getValue("payer_claim_control_number")}</div>,
	},
	{
		accessorKey: "claim_type",
		header: "Claim Type",
		cell: ({ row }) => <div>{row.getValue("claim_type")}</div>,
	},
	{
		accessorKey: "service_begin_date",
		header: "Service Begin Date",
		cell: ({ row }) => <div>{row.getValue("service_begin_date")}</div>,
	},
	{
		accessorKey: "service_end_date",
		header: "Service End Date",
		cell: ({ row }) => <div>{row.getValue("service_end_date")}</div>,
	},
	{
		accessorKey: "activity_state",
		header: "Activity State",
		cell: ({ row }) => <div>{row.getValue("activity_state")}</div>,
	},
	{
		accessorKey: "claim_status",
		header: "Claim Status",
		cell: ({ row }) => <div>{row.getValue("claim_status")}</div>,
	},
];

const data: Payment[] = [
	{
		id: "m5gr84i9",
		claim_id: "C12345",
		recipt_date: "2023-01-01",
		payer_claim_control_number: "PCCN12345",
		claim_type: "Type A",
		service_begin_date: "2023-01-01",
		service_end_date: "2023-01-10",
		activity_state: "Active",
		claim_status: "Approved",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		claim_id: "C12346",
		recipt_date: "2023-01-02",
		payer_claim_control_number: "PCCN12346",
		claim_type: "Type B",
		service_begin_date: "2023-01-02",
		service_end_date: "2023-01-11",
		activity_state: "Inactive",
		claim_status: "Pending",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		claim_id: "C12347",
		recipt_date: "2023-01-03",
		payer_claim_control_number: "PCCN12347",
		claim_type: "Type C",
		service_begin_date: "2023-01-03",
		service_end_date: "2023-01-12",
		activity_state: "Active",
		claim_status: "Processing",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		claim_id: "C12348",
		recipt_date: "2023-01-04",
		payer_claim_control_number: "PCCN12348",
		claim_type: "Type D",
		service_begin_date: "2023-01-04",
		service_end_date: "2023-01-13",
		activity_state: "Inactive",
		claim_status: "Approved",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		claim_id: "C12349",
		recipt_date: "2023-01-05",
		payer_claim_control_number: "PCCN12349",
		claim_type: "Type E",
		service_begin_date: "2023-01-05",
		service_end_date: "2023-01-14",
		activity_state: "Active",
		claim_status: "Failed",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
];

export function ClaimStatusSearchResult() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	const router = useRouter();
	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("email")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() =>
										router.push(
											`/dashboard/claims/status/${row.original.id}` as `/${string}`
										)
									}
									className="cursor-pointer"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
