import React from "react";

import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface HealthInsuranceProgressBarProps {
	deductible: number;
	maxOutOfPocket: number;
	currentSpending: number;
	totalCoverage: number;
}

export function DeductableProgressBar({
	deductible,
	maxOutOfPocket,
	currentSpending,
	totalCoverage,
}: HealthInsuranceProgressBarProps) {
	const deductiblePercentage = (deductible / totalCoverage) * 100;
	const maxOutOfPocketPercentage = (maxOutOfPocket / totalCoverage) * 100;
	const currentSpendingPercentage = (currentSpending / totalCoverage) * 100;

	const getPhase = () => {
		if (currentSpending <= deductible) return "Deductible";
		if (currentSpending <= maxOutOfPocket) return "Insurance Coverage";
		return "Full Coverage";
	};

	const getProgressColor = () => {
		if (currentSpending <= deductible) return "bg-red-500";
		if (currentSpending <= maxOutOfPocket) return "bg-yellow-500";
		return "bg-green-500";
	};

	return (
		<div className="flex flex-col space-y-2 w-full max-w-2xl">
			<Label
				htmlFor="insuranceProgress"
				className="text-sm font-medium text-muted-foreground"
			>
				Health Insurance Progress: {getPhase()}
			</Label>
			<div className="relative pt-6">
				<Progress
					id="insuranceProgress"
					value={currentSpendingPercentage}
					className={cn("h-4", getProgressColor())}
				/>
				<div
					className="absolute top-0 bottom-0 w-px bg-black"
					style={{ left: `${deductiblePercentage}%` }}
				/>
				<div
					className="absolute top-0 bottom-0 w-px bg-black"
					style={{ left: `${maxOutOfPocketPercentage}%` }}
				/>
				<div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
					<span>$0</span>
					<span
						style={{ left: `${deductiblePercentage}%`, marginLeft: "-20px" }}
					>
						${deductible}
					</span>
					<span
						style={{
							left: `${maxOutOfPocketPercentage}%`,
							marginLeft: "-20px",
						}}
					>
						${maxOutOfPocket}
					</span>
					<span>${totalCoverage}</span>
				</div>
			</div>
			<div className="flex justify-between text-sm text-muted-foreground mt-2">
				<span>Deductible Phase</span>
				<span>Insurance Coverage</span>
				<span>Full Coverage</span>
			</div>
			<div className="text-sm font-medium mt-2">
				Current Spending: ${currentSpending} (
				{currentSpendingPercentage.toFixed(1)}%)
			</div>
		</div>
	);
}
