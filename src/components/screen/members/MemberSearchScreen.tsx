"use client";

import MemberTable from "@/components/module/member/MemberTable";
import SearchCard from "@/components/module/member/SearchCard";
import { DetailCards } from "@/components/shared/Cards/DetailCards";

type Props = {};
const notifications = [
	{
		title: "Step 1: Click on 'Add Referral' button",
		description: "Press the Add referral button",
	},
	{
		title: "Step 2: Search a member",
		description: "Search the member first by member information in the popup",
	},
	{
		title: "Step 3: Select the right member",
		description: "Select a member from the list of the search result",
	},
	{
		title: "Step 4: Click the add a referral button",
		description: "Press add a referral button from the user list action column",
	},
	{
		title: "Step 5: Fill the referral form and submit",
		description: "Add a referral by filling the form",
	},
];

const MemberSearch = (props: Props) => {
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information On Adding a Referral"
					description="You can add a referral by following the steps below"
					data={notifications}
					className=""
				/>
			</div>
			<div className="flex-col space-x-6">
				<SearchCard />
				<MemberTable />
			</div>
		</div>
	);
};
export default MemberSearch;
