"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { memberType } from "@/types/member/memeberType";

import MemberInfoDetails from "./member-details";

interface DataTableRowActionsProps<TData extends memberType> {
	// Add constraint here
	row: Row<TData>;
}

export function DataTableRowActions<TData extends memberType>({
	// Add constraint here
	row,
}: DataTableRowActionsProps<TData>) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleViewDetail = () => {
		setIsDetailsOpen(true); // Open the details modal
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

			<MemberInfoDetails
				member={row.original}
				open={isDetailsOpen}
				onOpenChange={setIsDetailsOpen}
			/>
		</>
	);
}
