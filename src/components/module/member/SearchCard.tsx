// components/module/memberRecords/SearchCard.tsx
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SearchCard = () => {
	return (
		<Card className="mb-4 bg-secondary/40">
			<CardHeader>
				<CardTitle>Member Search & Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex space-x-3">
					<Input placeholder="Member ID" className="bg-card " />
					<Input placeholder="Name" className="bg-card " />
					<Input placeholder="Phone Number" className="bg-card " />
					<Button className="px-8 w-fit text-white flex font-bold text-md items-center justify-between">
						<SearchIcon className="text-white mr-2" size={20} />
						Search
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default SearchCard;
