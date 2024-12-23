"use client";

import { type ColumnDef, type Row } from "@tanstack/react-table";

import { DataTable as BaseDataTable } from "@/components/module/table/data-table";

interface PaymentDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	onRowClick,
}: PaymentDataTableProps<TData, TValue>) {
	return (
		<BaseDataTable
			columns={columns}
			data={data}
			render={(row) => ({
				onClick: () => onRowClick?.(row),
				className: "cursor-pointer",
			})}
		/>
	);
}
