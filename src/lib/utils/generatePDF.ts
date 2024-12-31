import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF(data: any): Promise<string> {
	const pdfDoc = await PDFDocument.create();
	const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

	const addPage = () => {
		const page = pdfDoc.addPage();
		const { width, height } = page.getSize();
		return { page, width, height };
	};

	let { page, height } = addPage();
	const fontSize = 12;

	// Helper function to add text
	const addText = (text: string, x: number, y: number) => {
		page.drawText(text, {
			x,
			y: height - y,
			size: fontSize,
			font: timesRomanFont,
			color: rgb(0, 0, 0),
		});
	};

	// Add header
	page.drawText("Insurance Claim Submission Form", {
		x: 50,
		y: height - 50,
		size: 20,
		font: timesRomanFont,
		color: rgb(0, 0, 0),
	});

	// Add form fields
	let yOffset = 100;
	Object.entries(data).forEach(([key, value]) => {
		const formattedKey = key
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
		const text = `${formattedKey}: ${value}`;

		if (yOffset > height - 50) {
			const newPage = addPage();
			page = newPage.page;
			height = newPage.height;
			yOffset = 50;
		}

		addText(text, 50, yOffset);
		yOffset += 20;
	});

	const pdfBytes = await pdfDoc.save();
	return Buffer.from(pdfBytes).toString("base64");
}
