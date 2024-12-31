// "use client";

// import { Button } from "@/components/ui/button";
// import { fetchReportData } from "@/constants/dumy/FetchedReport";
// import {
// 	generateCSV,
// 	generateExcel,
// 	generatePDF,
// } from "@/lib/utils/generateReport";

// // Define types for props
// interface DownloadOptionsProps {
// 	searchParams: Record<string, any>; // Adjust type based on the structure of searchParams
// 	selectedFields: string[];
// }

// export default function DownloadOptions({
// 	searchParams,
// 	selectedFields,
// }: DownloadOptionsProps) {
// 	const handleDownload = async (
// 		format: "csv" | "excel" | "pdf"
// 	): Promise<void> => {
// 		const data = await fetchReportData(searchParams, selectedFields);
// 		switch (format) {
// 			case "csv":
// 				generateCSV(data, selectedFields);
// 				break;
// 			case "excel":
// 				generateExcel(data, selectedFields);
// 				break;
// 			case "pdf":
// 				generatePDF(data, selectedFields);
// 				break;
// 		}
// 	};

// 	return (
// 		<div className="space-x-2">
// 			<Button onClick={() => handleDownload("csv")}>Download CSV</Button>
// 			<Button onClick={() => handleDownload("excel")}>Download Excel</Button>
// 			<Button onClick={() => handleDownload("pdf")}>Download PDF</Button>
// 		</div>
// 	);
// }
