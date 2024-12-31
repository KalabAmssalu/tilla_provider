import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface InsuranceProgressBarProps {
	totalAmount: number;
	usedAmount: number;
}

function getColorClass(percentageLeft: number): string {
	if (percentageLeft <= 20) return "bg-red-500";
	if (percentageLeft <= 50) return "bg-yellow-500";
	return "bg-green-500";
}

export function InsuranceProgressBar({
	totalAmount,
	usedAmount,
}: InsuranceProgressBarProps) {
	const percentageUsed = Math.min(
		100,
		Math.round((usedAmount / totalAmount) * 100)
	);
	const percentageLeft = 100 - percentageUsed;
	const remainingAmount = Math.max(0, totalAmount - usedAmount);
	const colorClass = getColorClass(percentageLeft);

	return (
		<div className="flex flex-col flex-1 min-w-[150px] space-y-2">
			<Label
				htmlFor="insuranceProgress"
				className="text-sm font-medium text-muted-foreground"
			>
				Insurance Amount Left in Percentage:
			</Label>
			<Progress
				id="insuranceProgress"
				value={percentageUsed}
				// className={cn("h-4 text-secondary", colorClass)}
				className={cn(
					"h-4 [&>div]:bg-muted",
					colorClass,
					"[&>div]:transition-all [&>div]:duration-300 [&>div]:ease-in-out"
				)}
			/>
			{/* <Progress
				id="insuranceProgress"
				value={100 - percentageUsed}
				className={cn(
					"h-4 [&>div]:bg-muted",
					colorClass,
					"[&>div]:transition-all [&>div]:duration-300 [&>div]:ease-in-out"
				)}
			/> */}
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>Used: ${usedAmount.toFixed(2)}</span>
				<span>{percentageLeft}% left</span>
				<span>Remaining: ${remainingAmount.toFixed(2)}</span>
			</div>
		</div>
	);
}

// import React from "react";

// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";

// interface InsuranceProgressBarProps {
// 	totalAmount: number;
// 	usedAmount: number;
// }

// export function InsuranceProgressBar({
// 	totalAmount,
// 	usedAmount,
// }: InsuranceProgressBarProps) {
// 	const percentageUsed = Math.min(
// 		100,
// 		Math.round((usedAmount / totalAmount) * 100)
// 	);
// 	const remainingAmount = Math.max(0, totalAmount - usedAmount);

// 	return (
// 		<div className="flex flex-col flex-1 min-w-[150px] space-y-2">
// 			<Label
// 				htmlFor="insuranceProgress"
// 				className="text-sm font-medium text-muted-foreground"
// 			>
// 				Insurance Amount Left in Percentage:
// 			</Label>
// 			<Progress id="insuranceProgress" value={percentageUsed} className="h-4" />
// 			<div className="flex justify-between text-xs text-muted-foreground">
// 				<span>Used: ${usedAmount.toFixed(2)}</span>
// 				<span>{100 - percentageUsed}% left</span>
// 				<span>Remaining: ${remainingAmount.toFixed(2)}</span>
// 			</div>
// 		</div>
// 	);
// }
