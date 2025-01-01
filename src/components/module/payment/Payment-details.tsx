import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ClaimType } from "@/types/claim/claim";

interface PaymentDetailsProps {
	payment: ClaimType | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function PaymentDetails({
	payment,
	open,
	onOpenChange,
}: PaymentDetailsProps) {
	if (!payment) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Payment Details</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Claim ID
							</p>
							<p className="text-sm">{payment.claim_number}</p>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Member ID
							</p>
							<p className="text-sm">{payment.individual_member}</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Date of Service
						</p>
						<p className="text-sm">{payment.diagnosis_date || "N/A"}</p>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Amount Billed
							</p>
							{payment.grand_total &&
								(() => {
									const amount = parseFloat(payment.grand_total);
									return (
										<p className="text-sm">
											{new Intl.NumberFormat("en-ET", {
												style: "currency",
												currency: "ETB",
											}).format(amount)}
										</p>
									);
								})()}
						</div>
						{/* <div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Adjustment
							</p>
							{payment.adjustments &&
								(() => {
									const amount = parseFloat(payment.adjustments);
									return (
										<p className="text-sm">
											{new Intl.NumberFormat("en-ET", {
												style: "currency",
												currency: "ETB",
											}).format(amount)}
										</p>
									);
								})()}
						</div> */}
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Amount Paid
							</p>
							{payment.member_payment_amount &&
								(() => {
									const amount = parseFloat(payment.member_payment_amount);
									return (
										<p className="text-sm">
											{new Intl.NumberFormat("en-ET", {
												style: "currency",
												currency: "ETB",
											}).format(amount)}
										</p>
									);
								})()}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
