"use client";

import React from "react";

import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Control, FieldValues, Path } from "react-hook-form";

import { DateSelector } from "@/components/ui/custom/date-selector";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReusableDatePickerFieldProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	labelKey: string;
	placeholderKey?: string;
	descriptionKey?: string;
	local?: string;
	required?: boolean;
	control: Control<TFieldValues>;
	disabled?: boolean;
	buttonClassName?: string;
}

export function ReusableDatePickerField<TFieldValues extends FieldValues>({
	name,
	labelKey,
	placeholderKey,
	descriptionKey,
	local,
	required = false,
	control,
	disabled = false,
	buttonClassName,
}: ReusableDatePickerFieldProps<TFieldValues>) {
	const namespace = local || "";
	const t = useTranslations(namespace);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="flex gap-2 items-center">
						{descriptionKey && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<Info size={15} />
									</TooltipTrigger>
									<TooltipContent className="bg-secondary">
										<FormDescription className="text-black">
											{t(descriptionKey)}
										</FormDescription>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
						{t(labelKey)}
						{required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<DateSelector
							selectedDate={field.value ? new Date(field.value) : undefined}
							onDateChange={(date) => {
								field.onChange(date ? date.toISOString() : "");
							}}
							placeholder={placeholderKey ? t(placeholderKey) : undefined}
							buttonClassName={buttonClassName}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
