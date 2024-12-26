// components/SummaryCard.tsx
import { type ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
	title: string;
	value: number;
	icon: ReactNode;
	iconColor: string;
}

export function SummaryCard({
	title,
	value,
	icon,
	iconColor,
}: SummaryCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<div className={`h-4 w-4 ${iconColor}`}>{icon}</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(value)}
				</div>
			</CardContent>
		</Card>
	);
}
