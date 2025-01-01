"use client";

import { useEffect, useState } from "react";

import { useFetchMyMembers } from "@/actions/Query/member_Query/member_Query";
import SearchCard from "@/components/module/member/SearchCard";
import { columns } from "@/components/module/member/columns";
import { MyMembersDataTable } from "@/components/module/member/data-table";
import { DetailCards } from "@/components/shared/Cards/DetailCards";
import { memberType } from "@/types/member/memeberType";

type Props = {};
const notifications = [
	{
		title: "Step 1: Click on 'Search Member' button",
		description: "Press the Search Member button to begin the process.",
	},
	{
		title: "Step 2: Enter member information",
		description:
			"Input the member's ID, name, or other details in the search form.",
	},
	{
		title: "Step 3: Review search results",
		description:
			"Look through the list of members displayed based on your search criteria.",
	},
	{
		title: "Step 4: Select the desired member",
		description: "Click on the member's name to view detailed information.",
	},
	{
		title: "Step 5: View member details",
		description: "Review the member's details and make any necessary updates.",
	},
];

const MemberSearch = (props: Props) => {
	const { data, isLoading, error } = useFetchMyMembers();
	const [members, setMembers] = useState<memberType[]>([]);

	useEffect(() => {
		if (data) {
			setMembers(data);
		}
	}, [data]);

	if (isLoading) return <div>Loading members...</div>;
	if (error) return <div>Error fetching members: {error.message}</div>;
	return (
		<div className="w-full  relative">
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
				<MyMembersDataTable columns={columns} data={members} />
			</div>
		</div>
	);
};
export default MemberSearch;
