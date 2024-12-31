// components/ClaimsTable.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const ClaimsTable = () => {
	const claimsData = [
		{
			id: "CLAIM001",
			memberName: "John Doe",
			submissionDate: "12/01/2023",
			amountPaid: "$650,000",
			status: "Accepted",
		},
		{
			id: "CLAIM002",
			memberName: "Jane Smith",
			submissionDate: "11/15/2023",
			amountPaid: "$450,000",
			status: "Pending",
		},
		{
			id: "CLAIM003",
			memberName: "Alice Johnson",
			submissionDate: "10/30/2023",
			amountPaid: "$300,000",
			status: "Rejected",
		},
	];

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Claims Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<th className="text-left">Claim ID</th>
							<th className="text-left">Member Name</th>
							<th className="text-left">Submission Date</th>
							<th className="text-left">Amount Paid</th>
							<th className="text-left">Status</th>
						</TableRow>
					</TableHeader>
					<TableBody>
						{claimsData.map((claim) => (
							<TableRow key={claim.id}>
								<TableCell>{claim.id}</TableCell>
								<TableCell>{claim.memberName}</TableCell>
								<TableCell>{claim.submissionDate}</TableCell>
								<TableCell>{claim.amountPaid}</TableCell>
								<TableCell>{claim.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default ClaimsTable;
