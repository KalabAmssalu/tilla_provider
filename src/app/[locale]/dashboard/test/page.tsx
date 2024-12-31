// "use client";

// import { useState } from "react";

// import { format } from "date-fns";
// import { Calendar, ChevronDown, DollarSign, Search } from "lucide-react";
// import { DateRange, DayPicker } from "react-day-picker";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";

// export default function page() {
// 	const [dateRange, setDateRange] = useState<DateRange | undefined>();
// 	const [amountRange, setAmountRange] = useState([0, 1000]);

// 	return (
// 		<form className="space-y-8 p-6 bg-white rounded-lg shadow-lg">
// 			<h2 className="text-2xl font-bold text-gray-900 mb-6">
// 				Member and Claims Report Filters
// 			</h2>

// 			{/* Date Range Picker */}
// 			<div className="space-y-2">
// 				<Label htmlFor="date-range">Date Range</Label>
// 				<Popover>
// 					<PopoverTrigger asChild>
// 						<Button
// 							id="date-range"
// 							variant="outline"
// 							className="w-full justify-start text-left font-normal"
// 						>
// 							<Calendar className="mr-2 h-4 w-4" />
// 							{dateRange?.from ? (
// 								dateRange.to ? (
// 									<>
// 										{format(dateRange.from, "LLL dd, y")} -{" "}
// 										{format(dateRange.to, "LLL dd, y")}
// 									</>
// 								) : (
// 									format(dateRange.from, "LLL dd, y")
// 								)
// 							) : (
// 								<span>Pick a date range</span>
// 							)}
// 						</Button>
// 					</PopoverTrigger>
// 					<PopoverContent className="w-auto p-0" align="start">
// 						<DayPicker
// 							mode="range"
// 							selected={dateRange}
// 							onSelect={setDateRange}
// 							numberOfMonths={2}
// 						/>
// 					</PopoverContent>
// 				</Popover>
// 			</div>

// 			{/* Claim Status */}
// 			<div className="space-y-2">
// 				<Label htmlFor="claim-status">Claim Status</Label>
// 				<Select>
// 					<SelectTrigger id="claim-status">
// 						<SelectValue placeholder="Select status" />
// 					</SelectTrigger>
// 					<SelectContent>
// 						<SelectItem value="approved">Approved</SelectItem>
// 						<SelectItem value="denied">Denied</SelectItem>
// 						<SelectItem value="pending">Pending</SelectItem>
// 					</SelectContent>
// 				</Select>
// 			</div>

// 			{/* Member Information */}
// 			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 				<div className="space-y-2">
// 					<Label htmlFor="member-id">Member ID</Label>
// 					<Input id="member-id" placeholder="Enter Member ID" />
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="member-name">Member Name</Label>
// 					<Input id="member-name" placeholder="Enter Member Name" />
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="plan-type">Plan Type</Label>
// 					<Select>
// 						<SelectTrigger id="plan-type">
// 							<SelectValue placeholder="Select plan type" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="family">Family</SelectItem>
// 							<SelectItem value="individual">Individual</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="provider-name">Provider Name</Label>
// 					<Input id="provider-name" placeholder="Enter Provider Name" />
// 				</div>
// 			</div>

// 			{/* Service Date */}
// 			<div className="space-y-2">
// 				<Label htmlFor="service-date">Service Date</Label>
// 				<Input id="service-date" type="date" />
// 			</div>

// 			{/* Diagnosis Code / Procedure Code */}
// 			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 				<div className="space-y-2">
// 					<Label htmlFor="diagnosis-code">Diagnosis Code</Label>
// 					<Input id="diagnosis-code" placeholder="Enter Diagnosis Code" />
// 				</div>
// 				<div className="space-y-2">
// 					<Label htmlFor="procedure-code">Procedure Code</Label>
// 					<Input id="procedure-code" placeholder="Enter Procedure Code" />
// 				</div>
// 			</div>

// 			{/* Amount Range */}
// 			<div className="space-y-4">
// 				<Label>Amount Range</Label>
// 				<div className="flex items-center space-x-4">
// 					<DollarSign className="text-gray-500" />
// 					<Slider
// 						value={amountRange}
// 						onValueChange={setAmountRange}
// 						max={10000}
// 						step={100}
// 						className="flex-grow"
// 					/>
// 				</div>
// 				<div className="flex justify-between text-sm text-gray-500">
// 					<span>${amountRange[0]}</span>
// 					<span>${amountRange[1]}</span>
// 				</div>
// 			</div>

// 			{/* Submit Button */}
// 			<Button type="submit" className="w-full">
// 				<Search className="mr-2 h-4 w-4" /> Search Reports
// 			</Button>
// 		</form>
// 	);
// }

type Props = {};

const page = (props: Props) => {
	return <div>page</div>;
};

export default page;
