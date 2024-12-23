"use client";

import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

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
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";

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
	min?: number;
	max?: number;
	defaultValue?: string;
}

export function ReusableDatePickerField<TFieldValues extends FieldValues>({
	name,
	labelKey,
	placeholderKey,
	descriptionKey,
	local = "",
	required = false,
	control,
	disabled = false,
	buttonClassName = "",
	min = 1900,
	max = new Date().getFullYear(),
	defaultValue,
}: ReusableDatePickerFieldProps<TFieldValues>) {
	const t = useTranslations(local);

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
									<TooltipTrigger aria-label={t(descriptionKey)}>
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
						<Controller
							control={control}
							name={name}
							rules={{ required: required ? t("fieldRequired") : false }}
							render={({ field }) => (
								<DateSelector
									selectedDate={
										field.value
											? new Date(field.value)
											: defaultValue
												? new Date(defaultValue)
												: undefined
									}
									onDateChange={(date) => {
										if (!disabled) {
											field.onChange(date ? formatToMMDDYYYY(date) : "");
										}
									}}
									yearValidation={{ min, max }}
									placeholder={
										placeholderKey
											? t(placeholderKey)
											: t("default.placeholder")
									}
									buttonClassName={buttonClassName}
									// disabled={disabled}
								/>
							)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
