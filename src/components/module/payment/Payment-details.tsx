import { format } from "date-fns";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { type Payment } from "@/types/payment/payment";

interface PaymentDetailsProps {
	payment: Payment | null;
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
							<p className="text-sm">{payment.claimId}</p>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Member ID
							</p>
							<p className="text-sm">{payment.memberId}</p>
						</div>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							Date of Service
						</p>
						<p className="text-sm">
							{format(new Date(payment.dateOfService), "PPP")}
						</p>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Amount Billed
							</p>
							<p className="text-sm">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(payment.amountBilled)}
							</p>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Adjustments
							</p>
							<p className="text-sm">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(payment.adjustments)}
							</p>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Amount Paid
							</p>
							<p className="text-sm">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(payment.amountPaid)}
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
