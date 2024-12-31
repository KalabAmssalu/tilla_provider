// "use client";

// import { useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// import { type ReportData } from "../types/report";

// const formSchema = z.object({
// 	reportName: z.string().min(1, "Report name is required"),
// 	dateRange: z.object({
// 		startDate: z.date(),
// 		endDate: z.date(),
// 	}),
// 	selectedFacilities: z
// 		.array(z.string())
// 		.min(1, "Select at least one facility"),
// 	selectedReports: z
// 		.array(z.string())
// 		.min(1, "Select at least one report type"),
// });

// interface ReportFormProps {
// 	onSubmit: (data: ReportData) => Promise<void>;
// 	selectedReports: string[];
// 	selectedFacilities: string[];
// }

// export function ReportForm({
// 	onSubmit,
// 	selectedReports,
// 	selectedFacilities,
// }: ReportFormProps) {
// 	const [dateRange, setDateRange] = useState<{
// 		from: Date | undefined;
// 		to: Date | undefined;
// 	}>({
// 		from: undefined,
// 		to: undefined,
// 	});

// 	const form = useForm<z.infer<typeof formSchema>>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			reportName: "",
// 			selectedReports,
// 			selectedFacilities,
// 			dateRange: {
// 				startDate: new Date(),
// 				endDate: new Date(),
// 			},
// 		},
// 	});

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 				<FormField
// 					control={form.control}
// 					name="dateRange"
// 					render={({ field }) => (
// 						<FormItem className="flex flex-col">
// 							<FormLabel>Date Range</FormLabel>
// 							<Popover>
// 								<PopoverTrigger asChild>
// 									<FormControl>
// 										<Button
// 											variant="outline"
// 											className={cn(
// 												"w-[300px] justify-start text-left font-normal",
// 												!dateRange && "text-muted-foreground"
// 											)}
// 										>
// 											<CalendarIcon className="mr-2 h-4 w-4" />
// 											{dateRange?.from ? (
// 												dateRange.to ? (
// 													<>
// 														{format(dateRange.from, "LLL dd, y")} -{" "}
// 														{format(dateRange.to, "LLL dd, y")}
// 													</>
// 												) : (
// 													format(dateRange.from, "LLL dd, y")
// 												)
// 											) : (
// 												<span>Pick a date range</span>
// 											)}
// 										</Button>
// 									</FormControl>
// 								</PopoverTrigger>
// 								<PopoverContent className="w-auto p-0" align="start">
// 									<Calendar
// 										initialFocus
// 										mode="range"
// 										defaultMonth={dateRange?.from}
// 										selected={dateRange}
// 										onSelect={setDateRange}
// 										numberOfMonths={2}
// 									/>
// 								</PopoverContent>
// 							</Popover>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>

// 				<Button type="submit">Generate Reports</Button>
// 			</form>
// 		</Form>
// 	);
// }
