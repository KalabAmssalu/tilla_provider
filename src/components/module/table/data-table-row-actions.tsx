"use client";

import { usePathname, useRouter } from "next/navigation";

import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { SearchSchemas } from "@/constants/data/schema/memberSearch";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const member = SearchSchemas.parse(row.original);
	const router = useRouter();
	const pathname = usePathname();

	// Infer base route from current path
	const baseRoute = pathname.includes("referrals/management")
		? "dashboard/referrals/management"
		: pathname.includes("submission")
			? "dashboard/claims/submission"
			: pathname.includes("claims/appeals")
				? "dashboard/claims/appeals"
				: pathname.includes("referrals/authorization")
					? "dashboard/referrals/authorization"
					: pathname.includes("tools/appointment")
						? "dashboard/tools/appointment"
						: "";

	return (
		<Button
			onClick={() => router.push(`/${baseRoute}/${member.member_id}` as any)}
		>
			{/* {baseRoute === "dashboard/referrals/management" ? "Refer Member" : "Add Claim"} */}
			{baseRoute === "dashboard/referrals/management"
				? "Refer Member"
				: baseRoute === "dashboard/claims/submission"
					? "Add Claim"
					: baseRoute === "dashboard/claims/appeals"
						? "Add Appeal"
						: baseRoute === "dashboard/referrals/authorization"
							? "Request Authorization"
							: baseRoute === "dashboard/tools/appointment"
								? "Schedule"
								: "Unknown Action"}
		</Button>
	);
}
