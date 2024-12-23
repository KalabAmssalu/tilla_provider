// components/module/memberRecords/MemberTable.tsx
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const MemberTable = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Member ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Plan Type</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Phone Number</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Email</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>MEM001</TableCell>
					<TableCell>John Doe</TableCell>
					<TableCell>Family Health Plan</TableCell>
					<TableCell>Active</TableCell>
					<TableCell>+251 (900) 123 456</TableCell>
					<TableCell>12/17/2024</TableCell>
					<TableCell>jd@email.com</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default MemberTable;
