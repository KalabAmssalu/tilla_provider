// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// export async function generatePDF(data: any): Promise<string> {
// 	const pdfDoc = await PDFDocument.create();
// 	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
// 	const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
// 	const addPage = () => {
// 		const page = pdfDoc.addPage([595.276, 841.89]); // A4 size
// 		const { width, height } = page.getSize();
// 		return { page, width, height };
// 	};
// 	let { page, width, height } = addPage();
// 	const margin = 50;
// 	const contentWidth = width - 2 * margin;
// 	// Helper function to add text with wrapping
// 	const addWrappedText = (
// 		text: string,
// 		x: number,
// 		y: number,
// 		maxWidth: number,
// 		fontSize: number,
// 		font: any,
// 		color: any
// 	) => {
// 		const words = text.split(" ");
// 		let line = "";
// 		let yOffset = y;
// 		words.forEach((word) => {
// 			const testLine = line + word + " ";
// 			const testWidth = font.widthOfTextAtSize(testLine, fontSize);
// 			if (testWidth > maxWidth) {
// 				page.drawText(line, {
// 					x,
// 					y: height - yOffset,
// 					size: fontSize,
// 					font,
// 					color,
// 				});
// 				line = word + " ";
// 				yOffset += fontSize * 1.5;
// 			} else {
// 				line = testLine;
// 			}
// 		});
// 		page.drawText(line, {
// 			x,
// 			y: height - yOffset,
// 			size: fontSize,
// 			font,
// 			color,
// 		});
// 		return yOffset + fontSize * 1.5;
// 	};
// 	// Add header
// 	page.drawRectangle({
// 		x: 0,
// 		y: height - 100,
// 		width: width,
// 		height: 100,
// 		color: rgb(0.2, 0.4, 0.6),
// 	});
// 	addWrappedText(
// 		"Insurance Claim Submission Form",
// 		margin,
// 		70,
// 		contentWidth,
// 		24,
// 		helveticaBoldFont,
// 		rgb(1, 1, 1)
// 	);
// 	// Add form fields
// 	let yOffset = 120;
// 	Object.entries(data).forEach(([key, value]) => {
// 		const formattedKey = key
// 			.split("_")
// 			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
// 			.join(" ");
// 		yOffset = addWrappedText(
// 			`${formattedKey}:`,
// 			margin,
// 			yOffset,
// 			contentWidth,
// 			12,
// 			helveticaBoldFont,
// 			rgb(0.2, 0.4, 0.6)
// 		);
// 		yOffset = addWrappedText(
// 			`${value}`,
// 			margin + 10,
// 			yOffset,
// 			contentWidth - 10,
// 			12,
// 			helveticaFont,
// 			rgb(0, 0, 0)
// 		);
// 		yOffset += 10; // Add some space between fields
// 		if (yOffset > height - margin) {
// 			const newPage = addPage();
// 			page = newPage.page;
// 			height = newPage.height;
// 			yOffset = margin;
// 		}
// 	});
// 	// Add footer
// 	page.drawLine({
// 		start: { x: margin, y: margin },
// 		end: { x: width - margin, y: margin },
// 		thickness: 1,
// 		color: rgb(0.7, 0.7, 0.7),
// 	});
// 	addWrappedText(
// 		"This is a computer-generated document. No signature is required.",
// 		margin,
// 		35,
// 		contentWidth,
// 		10,
// 		helveticaFont,
// 		rgb(0.5, 0.5, 0.5)
// 	);
// 	const pdfBytes = await pdfDoc.save();
// 	return Buffer.from(pdfBytes).toString("base64");
// }
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF(data: any): Promise<string> {
	const pdfDoc = await PDFDocument.create();
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	const addPage = () => {
		const page = pdfDoc.addPage([595.276, 841.89]); // A4 size
		const { width, height } = page.getSize();
		return { page, width, height };
	};

	let { page, width, height } = addPage();
	const margin = 40;
	const contentWidth = width - 2 * margin;
	const brandBlue = rgb(0, 0.149, 0.392);
	const lightGray = rgb(0.97, 0.97, 0.97);

	// Helper function to add text
	const addText = (
		text: string,
		x: number,
		y: number,
		fontSize: number,
		font: any,
		color: any
	) => {
		page.drawText(text || "", {
			x,
			y: height - y,
			size: fontSize,
			font,
			color,
		});
	};

	// Function to add header to each page
	const addHeader = () => {
		page.drawRectangle({
			x: 0,
			y: height - 80,
			width: width,
			height: 80,
			color: brandBlue,
		});

		addText(
			"Tilla Health Insurance",
			margin,
			50,
			24,
			helveticaBoldFont,
			rgb(1, 1, 1)
		);
		addText(
			"Medical Claim Form",
			margin,
			75,
			12,
			helveticaBoldFont,
			rgb(1, 1, 1)
		);
	};

	// Add header to the first page
	addHeader();

	let currentY = 110;
	const lineHeight = 15;
	const sectionSpacing = 10;
	const labelWidth = 150;

	// Function to add a section header
	const addSectionHeader = (title: string) => {
		if (currentY > height - 100) {
			({ page, height } = addPage());
			currentY = 110;
			addHeader();
		}

		// Add section background
		page.drawRectangle({
			x: 0,
			y: height - currentY,
			width: width,
			height: 5,
			color: brandBlue,
		});

		// Add section title
		addText(title, margin, currentY + 15, 12, helveticaBoldFont, rgb(0, 0, 0));
		currentY += 40;
	};

	// Function to add a field with alternating background
	const addField = (label: string, value: string, index: number) => {
		if (currentY > height - 100) {
			({ page, height } = addPage());
			currentY = 110;
			addHeader();
		}

		// Add subtle background for even rows
		if (index % 2 === 0) {
			page.drawRectangle({
				x: margin - 5,
				y: height - currentY - 5,
				width: contentWidth + 10,
				height: lineHeight,
				color: lightGray,
			});
		}

		// Add label
		addText(label, margin, currentY, 11, helveticaBoldFont, rgb(0, 0, 0));

		// Add value with proper wrapping
		const maxWidth = contentWidth - labelWidth;
		const words = (value || "").split(" ");
		let line = "";
		let offsetY = 0;

		words.forEach((word) => {
			const testLine = line + (line ? " " : "") + word;
			const textWidth = helveticaFont.widthOfTextAtSize(testLine, 11);

			if (textWidth > maxWidth && line !== "") {
				addText(
					line,
					margin + labelWidth,
					currentY + offsetY,
					11,
					helveticaFont,
					rgb(0, 0, 0)
				);
				line = word;
				offsetY += 15;
			} else {
				line = testLine;
			}
		});

		if (line) {
			addText(
				line,
				margin + labelWidth,
				currentY + offsetY,
				11,
				helveticaFont,
				rgb(0, 0, 0)
			);
		}

		currentY += Math.max(lineHeight, offsetY + 20);
	};

	// Provider Information
	addSectionHeader("MEMBER INFORMATION");
	[
		["Member Name:", data.patientName],
		["Member Tilla ID:", data.memberId],
		["Member TIN Number:", data.revenue_code_tin_number],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Provider Information
	addSectionHeader("PROVIDER INFORMATION");
	[
		["Billing Provider Name:", data.billing_provider_name],
		["Billing Provider NPI:", data.billing_provider_npi],
		["TIN Number:", data.revenue_code_tin_number],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Service Information
	addSectionHeader("SERVICE INFORMATION");
	[
		["Place of Service:", data.place_of_service_description],
		["Service Start Date:", data.service_start_date],
		["Service End Date:", data.service_end_date],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Diagnosis Information
	addSectionHeader("DIAGNOSIS INFORMATION");
	[
		["Diagnosis Code:", data.diagnosis_code],
		["Diagnosis Category:", data.diagnosis_category],
		["Diagnosis Description:", data.diagnosis_description],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Procedure Information
	addSectionHeader("PROCEDURE INFORMATION");
	[
		["CPT Code:", data.cpt_code],
		["CPT Category:", data.cpt_category],
		["CPT Description:", data.cpt_description],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Charges
	addSectionHeader("CHARGES");
	[
		["Service Charge:", `$${data.service_charge.toFixed(2)}`],
		["Additional Charge:", `$${data.additional_charge.toFixed(2)}`],
		["Non-covered Charges:", `$${data.non_covered_charges.toFixed(2)}`],
	].forEach((field, index) => addField(field[0], field[1], index));

	currentY += sectionSpacing;

	// Additional Information
	if (data.additional_notes) {
		addSectionHeader("ADDITIONAL INFORMATION");
		addField("Notes:", data.additional_notes, 0);
	}

	// Add footer to the last page
	// page.drawLine({
	// 	start: { x: margin, y: margin },
	// 	end: { x: width - margin, y: margin },
	// 	thickness: 1,
	// 	color: brandBlue,
	// });

	// addText(
	// 	`Generated on: ${new Date().toLocaleDateString()}`,
	// 	margin,
	// 	30,
	// 	8,
	// 	helveticaFont,
	// 	rgb(0, 0, 0)
	// );

	const pdfBytes = await pdfDoc.save();
	return Buffer.from(pdfBytes).toString("base64");
}
