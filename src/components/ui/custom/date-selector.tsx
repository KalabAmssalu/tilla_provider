"use client";

import * as React from "react";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";

import { Calendar } from "./calender";

type DateSelectorProps = {
	selectedDate?: Date;
	onDateChange: (date: Date | undefined) => void;
	placeholder?: string;
	buttonClassName?: string;
};

export const DateSelector: React.FC<DateSelectorProps> = ({
	selectedDate,
	onDateChange,
	placeholder = "Pick a date",
	buttonClassName,
}) => {
	const [year, setYear] = React.useState<number | undefined>(
		selectedDate?.getFullYear()
	);

	React.useEffect(() => {
		setYear(selectedDate?.getFullYear());
	}, [selectedDate]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left bg-background font-normal",
						!selectedDate && "text-muted-foreground",
						buttonClassName
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selectedDate ? (
						formatToMMDDYYYY(selectedDate)
					) : (
						<span>{placeholder}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
				<div className="p-2">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={onDateChange}
						initialFocus
						captionLayout="dropdown-buttons"
						fromYear={1699}
						toYear={2030}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
};
