// "use client";

// import { useQuery } from "@tanstack/react-query";

// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import { fetchReportData } from "@/constants/dumy/FetchedReport";

// // Define types for props and data
// interface ReportTableProps {
// 	searchParams: Record<string, any>; // Replace `any` with the exact type if known
// 	selectedFields: string[];
// }

// interface DataRow {
// 	[key: string]: any; // Replace `any` with specific types if known
// }

// export default function ReportTable({
// 	searchParams,
// 	selectedFields,
// }: ReportTableProps) {
// 	const { data, isLoading, error } = useQuery<DataRow[]>({
// 		queryKey: ["reportData", searchParams, selectedFields],
// 		queryFn: () => fetchReportData(searchParams, selectedFields),
// 		// Optional: you can add configuration options like cache time, retry logic, etc.
// 	});

// 	if (isLoading) return <div>Loading...</div>;
// 	if (error instanceof Error) return <div>Error: {error.message}</div>;
// 	if (!data) return null;

// 	return (
// 		<Table>
// 			<TableHeader>
// 				<TableRow>
// 					{selectedFields.map((field) => (
// 						<TableHead key={field}>{field}</TableHead>
// 					))}
// 				</TableRow>
// 			</TableHeader>
// 			<TableBody>
// 				{data.map((row, index) => (
// 					<TableRow key={index}>
// 						{selectedFields.map((field) => (
// 							<TableCell key={field}>{row[field]}</TableCell>
// 						))}
// 					</TableRow>
// 				))}
// 			</TableBody>
// 		</Table>
// 	);
// }
