"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type Row,
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
import { type ClaimType } from "@/types/claim/claim";

export const columns: ColumnDef<ClaimType>[] = [
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
		accessorKey: "claim_number",
		header: "Claim ID",
		cell: ({ row }) => {
			const claimNumber = row.getValue("claim_number");
			return <div>{(claimNumber as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "recipt_date",
		header: "Receipt Date",
		cell: ({ row }) => {
			const receiptDate = row.getValue("recipt_date");
			return <div>{(receiptDate as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "payer_claim_control_number",
		header: "Payer Claim Control Number",
		cell: ({ row }) => {
			const payerClaimControlNumber = row.getValue(
				"payer_claim_control_number"
			);
			return <div>{(payerClaimControlNumber as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "claim_type",
		header: "Claim Type",
		cell: ({ row }) => {
			const claimType = row.getValue("claim_type");
			return <div>{(claimType as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "service_start_date",
		header: "Service Begin Date",
		cell: ({ row }) => {
			const serviceStartDate = row.getValue("service_start_date");
			return <div>{(serviceStartDate as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "service_end_date",
		header: "Service End Date",
		cell: ({ row }) => {
			const serviceEndDate = row.getValue("service_end_date");
			return <div>{(serviceEndDate as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "activity_state",
		header: "Activity State",
		cell: ({ row }) => {
			const activityState = row.getValue("activity_state");
			return <div>{(activityState as string) || "N/A"}</div>;
		},
	},
	{
		accessorKey: "claim_status",
		header: "Claim Status",
		cell: ({ row }) => {
			const claimStatus = row.getValue("claim_status");
			return <div>{(claimStatus as string) || "N/A"}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];

interface DataTableRowActionsProps<TData extends ClaimType> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends ClaimType>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter();
	return (
		<>
			<Button
				size="sm"
				className="bg-secondary/40 hover:bg-secondary/60 text-black"
				onClick={() =>
					router.push(
						`/dashboard/claims/status/${row.original.claim_number}` as `/${string}`
					)
				} // Open the details modal
			>
				View Detail
			</Button>
		</>
	);
}

export function ClaimStatusSearchResult({ data }: { data: ClaimType[] }) {
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
