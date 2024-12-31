"use client";

import * as React from "react";

interface InsuranceReceiptProps {
	receiptData: {
		policyHolderName: string;
		policyNumber: string;
		issueDate: string;
		coverageAmount: string;
		premiumAmount: string;
		companyLogo: string;
	};
}

// eslint-disable-next-line react/display-name
export const InsuranceReceipt = React.forwardRef<
	HTMLDivElement,
	InsuranceReceiptProps
>(({ receiptData }, ref) => {
	const {
		policyHolderName,
		policyNumber,
		issueDate,
		coverageAmount,
		premiumAmount,
		companyLogo,
	} = receiptData;

	return (
		<div ref={ref} className="insurance-receipt">
			<style type="text/css" media="print">
				{"@page { size: A4; margin: 20mm; }"}
			</style>
			<div className="receipt-header">
				<img src={companyLogo} alt="Company Logo" width="150" />
				<h1>Insurance Receipt</h1>
			</div>
			<div className="receipt-details">
				<p>
					<strong>Policy Holder Name:</strong> {policyHolderName}
				</p>
				<p>
					<strong>Policy Number:</strong> {policyNumber}
				</p>
				<p>
					<strong>Issue Date:</strong> {issueDate}
				</p>
				<p>
					<strong>Coverage Amount:</strong> {coverageAmount}
				</p>
				<p>
					<strong>Premium Amount:</strong> {premiumAmount}
				</p>
			</div>
		</div>
	);
});
