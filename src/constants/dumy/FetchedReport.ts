// import { ReportConfig } from "../types/report";

// interface ReportData {
// 	id: number;
// 	name: string;
// 	date: string;
// 	amount: number;
// 	status: string;
// }

// interface SearchParams {
// 	startDate?: string | null;
// 	endDate?: string | null;
// 	keyword?: string | null;
// }

// export async function fetchReportData(
// 	searchParams: SearchParams,
// 	selectedFields: string[]
// ): Promise<Record<string, string | number>[]> {
// 	// In a real application, you would make an API call here
// 	// For this example, we'll return mock data
// 	const mockData: ReportData[] = [
// 		{
// 			id: 1,
// 			name: "John Doe",
// 			date: "2023-01-01",
// 			amount: 1000,
// 			status: "Completed",
// 		},
// 		{
// 			id: 2,
// 			name: "Jane Smith",
// 			date: "2023-01-02",
// 			amount: 1500,
// 			status: "Pending",
// 		},
// 		{
// 			id: 3,
// 			name: "Bob Johnson",
// 			date: "2023-01-03",
// 			amount: 2000,
// 			status: "Completed",
// 		},
// 	];

// 	// Filter data based on searchParams and selectedFields
// 	return mockData.map((item) => {
// 		const filteredItem: Record<string, string | number> = {};
// 		selectedFields.forEach((field) => {
// 			filteredItem[field] = item[field];
// 		});
// 		return filteredItem;
// 	});
// }

// export const reportConfigs: ReportConfig[] = [
// 	{
// 		id: "member",
// 		title: "Member Report",
// 		type: "clinical",
// 		category: "Clinical Reports",
// 		fields: [
// 			{ id: "memberId", label: "Member ID", type: "string", required: true },
// 			{ id: "name", label: "Member Name", type: "string", required: true },
// 			{ id: "dob", label: "Date of Birth", type: "date", required: true },
// 			{
// 				id: "enrollmentDate",
// 				label: "Enrollment Date",
// 				type: "date",
// 				required: true,
// 			},
// 			{ id: "status", label: "Status", type: "string", required: true },
// 		],
// 	},
// 	{
// 		id: "claim",
// 		title: "Claim Report",
// 		type: "financial",
// 		category: "Financial Reports",
// 		fields: [
// 			{ id: "claimId", label: "Claim ID", type: "string", required: true },
// 			{
// 				id: "dateOfService",
// 				label: "Date of Service",
// 				type: "date",
// 				required: true,
// 			},
// 			{ id: "amount", label: "Amount", type: "number", required: true },
// 			{ id: "status", label: "Status", type: "string", required: true },
// 		],
// 	},
// 	{
// 		id: "diagnosis",
// 		title: "Diagnosis Code Report",
// 		type: "technical",
// 		category: "Technical Reports",
// 		fields: [
// 			{ id: "icdCode", label: "ICD Code", type: "string", required: true },
// 			{
// 				id: "description",
// 				label: "Description",
// 				type: "string",
// 				required: true,
// 			},
// 			{ id: "frequency", label: "Frequency", type: "number", required: true },
// 		],
// 	},
// ];
