export type PaymentStatus = "pending" | "completed" | "denied" | "disputed";
export type PaymentMethod = "ach" | "check" | "wire" | "card";

export interface Payment {
	claimId: string;
	memberId: string;
	dateOfService: string;
	amountBilled: number;
	adjustments: number;
	amountPaid: number;
	resolutionDate: string | null;
	paymentDate: string | null;
	status: PaymentStatus;
	paymentMethod: PaymentMethod;
}

export interface PaymentSummary {
	received: number;
	denied: number;
	disputed: number;
}
