"use client";

import { cn } from "@/lib/utils";

interface InsuranceProgressProps {
	currentSpending: number;
	deductible: number;
	maxOutOfPocket: number;
}

export function InsuranceProgress({
	currentSpending,
	deductible = 1500,
	maxOutOfPocket = 10000,
}: InsuranceProgressProps) {
	// Calculate percentages for progress bar segments
	const totalWidth = maxOutOfPocket;
	const deductiblePercent = (deductible / totalWidth) * 100;
	const currentPercent = Math.min((currentSpending / totalWidth) * 100, 100);

	// Determine the color based on spending amount and thresholds
	const getProgressColor = () => {
		if (currentSpending <= deductible) return "bg-red-500";
		if (currentSpending <= maxOutOfPocket) return "bg-yellow-500";
		return "bg-green-500";
	};

	return (
		<div className="w-full max-w-3xl mx-auto h-500px ">
			{/* Phase Labels */}
			<div className="grid grid-cols-3 gap-0.5 mb-16 text-sm relative">
				<div className="border-2 rounded-lg p-4 text-center">
					member responsibility
				</div>
				<div className="border-2 bg-yellow-400 rounded-lg p-4 text-center">
					coInsurance 35%
				</div>
				<div className="border-2 bg-green-400 rounded-lg p-4 text-center">
					Insurance responsibility
				</div>
			</div>

			{/* Threshold Labels */}
			<div className="absolute w-full flex items-center">
				{/* Deductible Label and Value */}
				<div
					className="absolute flex flex-col items-center"
					style={{
						left: "22%",
						transform: "translateX(-80%)",
						top: "-48px", // Increased spacing above
					}}
				>
					<div className="text-sm font-medium whitespace-nowrap mb-2">
						deductable ${deductible}
					</div>
					<div className="h-24 w-px bg-gray-400" />{" "}
					{/* Longer connecting line */}
				</div>

				{/* Max Out of Pocket Label and Value */}
				<div
					className="absolute flex flex-col items-center"
					style={{
						left: "37%",
						transform: "translateX(-20%)",
						top: "-48px", // Increased spacing above
					}}
				>
					<div className="text-sm font-medium whitespace-nowrap mb-2">
						Max out of pocket ${maxOutOfPocket}
					</div>
					<div className="h-24 w-px bg-gray-400" />{" "}
					{/* Longer connecting line */}
				</div>
			</div>

			{/* Progress Bar */}
			<div className="relative mt-20 mb-12">
				<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
					<div
						className={cn(
							"h-full transition-all duration-500",
							getProgressColor()
						)}
						style={{ width: `${currentPercent}%` }}
					/>
				</div>
			</div>

			{/* Current Spending */}
			<div className="text-lg font-bold mt-8 text-center">
				Current Spending: ${currentSpending.toLocaleString()}
			</div>
		</div>
	);
}
