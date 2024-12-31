import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Define types for the data and selected fields
type DataRow = Record<string, any>; // Each row is a key-value pair
type SelectedFields = string[];

export function generateCSV(
	data: DataRow[],
	selectedFields: SelectedFields
): void {
	const csv = [
		selectedFields.join(","), // Header row
		...data.map((row) => selectedFields.map((field) => row[field]).join(",")), // Data rows
	].join("\n");

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	saveAs(blob, "report.csv");
}

export function generateExcel(
	data: DataRow[],
	selectedFields: SelectedFields
): void {
	// Create a filtered dataset containing only the selected fields
	const filteredData = data.map((row) =>
		selectedFields.reduce((acc, field) => {
			acc[field] = row[field];
			return acc;
		}, {} as DataRow)
	);

	const worksheet = XLSX.utils.json_to_sheet(filteredData);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	const blob = new Blob([excelBuffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	});
	saveAs(blob, "report.xlsx");
}

export function generatePDF(
	data: DataRow[],
	selectedFields: SelectedFields
): void {
	const doc = new jsPDF();
	doc.autoTable({
		head: [selectedFields], // Table header
		body: data.map((row) => selectedFields.map((field) => row[field])), // Table body
	});
	doc.save("report.pdf");
}
