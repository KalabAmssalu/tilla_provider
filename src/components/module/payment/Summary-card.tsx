import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type PaymentSummary } from "@/types/payment/payment";

interface SummaryCardsProps {
	summary: PaymentSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Received Payments
					</CardTitle>
					<CheckCircle2 className="h-4 w-4 text-green-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(summary.received)}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Denied Payments</CardTitle>
					<XCircle className="h-4 w-4 text-red-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(summary.denied)}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Disputed Payments
					</CardTitle>
					<AlertCircle className="h-4 w-4 text-yellow-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(summary.disputed)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
