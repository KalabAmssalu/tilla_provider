"use client";

import * as React from "react";

import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
	selected: DateRange | undefined;
	onSelect: (range: DateRange | undefined) => void;
	numberOfMonths?: number;
	disabled?: boolean;
	className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	selected,
	onSelect,
	numberOfMonths = 2,
	disabled = false,
	className,
}) => {
	return (
		<div className={cn("date-range-picker", className)}>
			<Calendar
				mode="range"
				selected={selected}
				onSelect={onSelect}
				numberOfMonths={numberOfMonths}
				disabled={disabled}
			/>
		</div>
	);
};
