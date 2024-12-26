"use client";

import * as React from "react";

import { useReactToPrint } from "react-to-print";

import { InsuranceReceipt } from "./InsuranceReceipt";

export const CustomPrint = () => {
	const receiptData = {
		policyHolderName: "John Doe",
		policyNumber: "POL12345678",
		issueDate: "2024-12-25",
		coverageAmount: "$100,000",
		premiumAmount: "$500",
		companyLogo: "https://via.placeholder.com/150",
	};

	const componentRef = React.useRef<HTMLDivElement | null>(null);

	const printFn = useReactToPrint({
		// content: () => componentRef.current,
		documentTitle: `Insurance_Receipt_${receiptData.policyNumber}`,
		// onBeforePrint: () => console.log("Preparing to print..."),
		onAfterPrint: () => console.log("Print completed."),
		print: (iframe) => {
			return new Promise<void>((resolve) => {
				console.log("Custom print logic in action...");
				setTimeout(() => {
					console.log("Printing iframe:", iframe);
					resolve();
				}, 1000); // Mock delay for printing
			});
		},
	});

	return (
		<div>
			<h3>Insurance Receipt Printing Example</h3>
			<button onClick={() => printFn()} className="btn btn-primary">
				Print Receipt
			</button>
			<InsuranceReceipt ref={componentRef} receiptData={receiptData} />
		</div>
	);
};
