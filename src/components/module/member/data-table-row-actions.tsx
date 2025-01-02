"use client";

import Link from "next/link";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { memberType } from "@/types/member/memeberType";

export function DataTableRowActions<TData extends memberType>({
	row,
}: {
	row: Row<TData>;
}) {
	const memberId = row.original.member_id;

	const handleViewDetail = () => {
		localStorage.setItem("member", JSON.stringify(row.original));
	};

	return (
		<>
			<Link href={`/dashboard/members/${memberId}` as any} passHref>
				<Button
					size="sm"
					className="bg-secondary/40 hover:bg-secondary/60 text-black"
					onClick={handleViewDetail}
				>
					View Detail
				</Button>
			</Link>
		</>
	);
}
