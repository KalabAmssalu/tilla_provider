"use client";

import { useRouter } from "next/navigation";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { type ClaimType } from "@/types/claim/claim";

interface DataTableRowActionsProps<TData extends ClaimType> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends ClaimType>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter();

	const handleViewDetail = () => {
		router.push(`status/${row.original.id}` as `/${string}`);
	};

	return (
		<>
			<Button
				size="sm"
				className="bg-secondary/40 hover:bg-secondary/60 text-black"
				onClick={handleViewDetail} // Open the details modal
			>
				View Detail
			</Button>
		</>
	);
}
