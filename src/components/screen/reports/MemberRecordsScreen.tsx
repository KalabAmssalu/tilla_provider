"use client";

import { DetailCards } from "@/components/shared/Cards/DetailCards";

type Props = {};

const notifications = [
	{
		title: "Step 1: Click on 'Search Members' button",
		description: "Press the Search Members button to start.",
	},
	{
		title: "Step 2: Enter member information",
		description: "Provide the member's details in the search fields.",
	},
	{
		title: "Step 3: Review search results",
		description: "Check the list of members returned from the search.",
	},
	{
		title: "Step 4: Select a member",
		description: "Choose the member you want to view or download reports for.",
	},
	{
		title: "Step 5: Download reports",
		description: "Click on the download button to get the member's report.",
	},
];

const MemberRecordsScreen = (props: Props) => {
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information On Member Records"
					description="You can search for members and download their reports by following the steps below"
					data={notifications}
					className=""
				/>
			</div>
		</div>
	);
};

export default MemberRecordsScreen;
