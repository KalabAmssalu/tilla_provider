// "use client";

// import { FormEvent, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { DateSelector } from "@/components/ui/custom/date-selector";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// // Assuming this is the correct Calendar component

// type SearchFormProps = {
// 	onSearch: (params: {
// 		startDate: Date | null;
// 		endDate: Date | null;
// 		keyword: string;
// 	}) => void;
// };

// export default function SearchForm({ onSearch }: SearchFormProps) {
// 	const [startDate, setStartDate] = useState<Date | null>(null);
// 	const [endDate, setEndDate] = useState<Date | null>(null);
// 	const [keyword, setKeyword] = useState<string>("");

// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		onSearch({ startDate, endDate, keyword });
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="space-y-4">
// 			<div className="flex space-x-4">
// 				<div className="flex-1">
// 					<Label htmlFor="startDate">Start Date</Label>
// 					<DateSelector
// 						// id="startDate"
// 						selected={startDate} // Ensure `selected` is Date or undefined
// 						onChange={setStartDate}
// 						className="w-full"
// 					/>
// 				</div>
// 				<div className="flex-1">
// 					<Label htmlFor="endDate">End Date</Label>
// 					<DateSelector
// 						// id="endDate"
// 						selected={endDate} // Ensure `selected` is Date or undefined
// 						onChange={setEndDate}
// 						className="w-full"
// 					/>
// 				</div>
// 			</div>
// 			<div>
// 				<Label htmlFor="keyword">Keyword</Label>
// 				<Input
// 					id="keyword"
// 					value={keyword}
// 					onChange={(e) => setKeyword(e.target.value)}
// 					placeholder="Enter search keyword"
// 				/>
// 			</div>
// 			<Button type="submit">Search</Button>
// 		</form>
// 	);
// }
