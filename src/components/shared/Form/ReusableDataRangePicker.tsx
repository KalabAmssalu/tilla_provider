"use client";

import * as React from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/custom/date-range-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Validation schema for date range
const DateRangeschema = z.object({
	dateRange: z
		.object({
			from: z.date().nullable(),
			to: z.date().nullable(),
		})
		.nullable(),
});

interface DatePickerWithRangeProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	defaultValue?: DateRange;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	numberOfMonths?: number;
	className?: string;
}

export function ReusableDateRangePickerField<TFieldValues extends FieldValues>({
	name,
	control,
	defaultValue,
	label,
	placeholder = "Pick a date",
	disabled = false,
	numberOfMonths = 2,
	className,
}: DatePickerWithRangeProps<TFieldValues>) {
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
		defaultValue
	);

	return (
		<div className={cn("grid gap-2", className)}>
			{label && <label htmlFor={name}>{label}</label>}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id={name}
								variant={"outline"}
								className={cn(
									"w-[300px] justify-start text-left font-normal",
									!field.value && "text-muted-foreground"
								)}
								disabled={disabled}
							>
								<CalendarIcon size={15} className="mr-2" />
								{field.value?.from ? (
									field.value.to ? (
										<>
											{format(field.value.from, "LLL dd, y")} -{" "}
											{format(field.value.to, "LLL dd, y")}
										</>
									) : (
										format(field.value.from, "LLL dd, y")
									)
								) : (
									<span>{placeholder}</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<DateRangePicker
								selected={field.value}
								onSelect={(range: DateRange | undefined) => {
									if (!disabled) {
										// Update the local state and form field value
										setDateRange(range);

										// Set the field value for react-hook-form
										field.onChange(range);

										// Ensure that `from` and `to` are valid Date objects
										if (range?.from && range?.to) {
											console.log("Selected range:", range);
										}
									}
								}}
								numberOfMonths={numberOfMonths}
								disabled={disabled}
							/>
						</PopoverContent>
					</Popover>
				)}
			/>
		</div>
	);
}
