import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

import { providersQueryKey } from "@/actions/Query/provider-Query/provider-Query";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/storehooks";
import { Provider, setProviders } from "@/lib/store/redux/providerSlice";

const SearchCard: React.FC = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState("name");

	const handleSearch = () => {
		const allProviders =
			queryClient.getQueryData<Provider[]>(providersQueryKey) || [];
		let filteredProviders = allProviders;

		if (searchTerm) {
			filteredProviders = allProviders.filter((provider) => {
				switch (searchType) {
					case "name":
						return `${provider.provider_first_name} ${provider.provider_last_name}`
							.toLowerCase()
							.includes(searchTerm.toLowerCase());
					case "specialty":
						return provider.provider_primary_specialty
							.toLowerCase()
							.includes(searchTerm.toLowerCase());
					case "location":
						return provider.provider_city
							.toLowerCase()
							.includes(searchTerm.toLowerCase());
					default:
						return true;
				}
			});
		}

		dispatch(setProviders(filteredProviders));
	};

	return (
		<Card className="bg-secondary/40  shadow-md rounded-lg p-6 mb-8">
			<CardHeader>
				<CardTitle className="text-xl font-bold">
					Connect With a Provider
				</CardTitle>
				<CardDescription className="text-black">
					Search in-network providers for referrals
				</CardDescription>
			</CardHeader>
			<CardContent className="flex space-x-4">
				<Input
					type="text"
					placeholder="Search providers..."
					className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card "
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select
					// className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
					value={searchType}
					onValueChange={setSearchType}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select search type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="specialty">Specialty</SelectItem>
						<SelectItem value="location">Location</SelectItem>
					</SelectContent>
				</Select>
				<Button
					className="px-8 w-fit text-white flex font-bold text-md items-center justify-between"
					onClick={handleSearch}
				>
					<>
						<SearchIcon className="text-white mr-5" size={20} />
						Search
					</>
				</Button>
			</CardContent>
		</Card>
	);
};

export default SearchCard;
