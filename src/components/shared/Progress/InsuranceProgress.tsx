"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface InsuranceProgressProps {
	currentSpending: number;
	deductible: number;
	maxOutOfPocket: number;
	className?: string;
}

export function InsuranceProgress({
	currentSpending,
	deductible = 1500,
	maxOutOfPocket = 10000,
	className,
}: InsuranceProgressProps) {
	// Calculate percentages for progress bar segments
	const totalWidth = maxOutOfPocket;
	const deductiblePercent = (deductible / totalWidth) * 100;
	const currentPercent = Math.min((currentSpending / totalWidth) * 100, 100);

	// Calculate the width for each segment based on current spending
	const getSegmentWidths = () => {
		if (currentSpending <= deductible) {
			// Only member responsibility segment is filled
			return {
				memberWidth: `${(currentSpending / totalWidth) * 100}%`,
				coInsuranceWidth: "0%",
				insuranceWidth: "0%",
			};
		} else if (currentSpending <= maxOutOfPocket) {
			// Member responsibility is full, coInsurance is partially filled
			return {
				memberWidth: `${(deductible / totalWidth) * 100}%`,
				coInsuranceWidth: `${((currentSpending - deductible) / totalWidth) * 100}%`,
				insuranceWidth: "0%",
			};
		} else {
			// All segments are filled appropriately
			return {
				memberWidth: `${(deductible / totalWidth) * 100}%`,
				coInsuranceWidth: `${((maxOutOfPocket - deductible) / totalWidth) * 100}%`,
				insuranceWidth: `${((currentSpending - maxOutOfPocket) / totalWidth) * 100}%`,
			};
		}
	};

	const segmentWidths = getSegmentWidths();

	return (
		<div className={cn("w-full max-w-3xl mx-auto p-6", className)}>
			{/* Phase Labels */}
			<div className="grid grid-cols-3 gap-0.5 mb-16 text-sm relative">
				<div className="border-2 rounded-lg p-4 text-center">
					member responsibility
				</div>
				<div className="border-2 rounded-lg p-4 text-center">coInsurance</div>
				<div className="border-2 rounded-lg p-4 text-center">
					Insurance responsibility
				</div>

				{/* Threshold Labels */}
				<div className="absolute w-full">
					{/* Deductible Label */}
					<div
						className="absolute flex flex-col items-center"
						style={{
							left: `${deductiblePercent}%`,
							transform: "translateX(-50%)",
							top: "-48px",
						}}
					>
						<div className="text-sm font-medium whitespace-nowrap mb-2">
							deductable
						</div>
						<div className="h-24 w-px bg-gray-400" />
					</div>

					{/* Max Out of Pocket Label */}
					<div
						className="absolute flex flex-col items-center"
						style={{
							left: "100%",
							transform: "translateX(-50%)",
							top: "-48px",
						}}
					>
						<div className="text-sm font-medium whitespace-nowrap mb-2">
							Max out of pocket
						</div>
						<div className="h-24 w-px bg-gray-400" />
					</div>
				</div>
			</div>

			{/* Progress Bar */}
			<div className="relative mt-20 mb-12">
				<div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
					{/* Member Responsibility Segment */}
					<div
						className="h-full bg-red-500 transition-all duration-500"
						style={{ width: segmentWidths.memberWidth }}
					/>
					{/* CoInsurance Segment */}
					<div
						className="h-full bg-yellow-500 transition-all duration-500"
						style={{ width: segmentWidths.coInsuranceWidth }}
					/>
					{/* Insurance Responsibility Segment */}
					<div
						className="h-full bg-blue-500 transition-all duration-500"
						style={{ width: segmentWidths.insuranceWidth }}
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
