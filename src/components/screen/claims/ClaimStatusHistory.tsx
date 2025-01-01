"use client";

import { useGetClaims } from "@/actions/Query/claim-Query/request";
import { ClaimHistoryColumns } from "@/components/module/claimStatus/table/columns";
import { ClaimHistoryDataTable } from "@/components/module/claimStatus/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClaimStatusHistory = () => {
	const { data: claimsData, isLoading } = useGetClaims();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!claimsData || claimsData.length === 0) {
		return <div>No Claims Found</div>;
	}

	return (
		<div className="w-full">
			<Card className="max-w-[78rem]">
				<CardHeader>
					<CardTitle>Claim Status History</CardTitle>
				</CardHeader>
				<CardContent>
					<ClaimHistoryDataTable
						columns={ClaimHistoryColumns}
						data={claimsData}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default ClaimStatusHistory;
