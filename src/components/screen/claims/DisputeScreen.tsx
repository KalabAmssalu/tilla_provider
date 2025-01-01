"use client";

import { useRouter } from "next/navigation";

import SearchCard from "@/components/module/dispute/SearchCard";
import { DisputeForm } from "@/components/module/dispute/disputeForm/dispute-form";
import DisputeView from "@/components/module/dispute/disputeView";
import ReferralView from "@/components/module/referral/ReferralsView";
import { DetailCards } from "@/components/shared/Cards/DetailCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const notifications = [
	{
		title: "Step 1: Click on 'Add Appeal' button",
		description: "Press the Add appeal button to start the process.",
	},
	{
		title: "Step 2: Search a member",
		description: "Search for the member using their information in the popup.",
	},
	{
		title: "Step 3: Select the correct member",
		description: "Choose a member from the list of search results.",
	},
	{
		title: "Step 4: Click the add an appeal button",
		description:
			"Press the add an appeal button from the user list action column.",
	},
	{
		title: "Step 5: Fill the appeal form and submit",
		description: "Complete the appeal form and submit it.",
	},
];

const DisputeScreen = (props: Props) => {
	const router = useRouter();

	const handleTabChange = (value: string) => {
		if (value === "appeals") {
			router.push("/dashboard/claims/appeals" as any);
		} else if (value === "disputes") {
			router.push("/dashboard/claims/dispute" as any);
		}
	};
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information On Adding an Appeal"
					description="You can add an appeal by following the steps below"
					data={notifications}
					className=""
				/>
			</div>
			<Tabs
				defaultValue="disputes"
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList className="w-[300px]">
					<TabsTrigger value="appeals" className="w-full">
						Appeals
					</TabsTrigger>
					<TabsTrigger value="disputes" className="w-full">
						Disputes
					</TabsTrigger>
				</TabsList>
				<TabsContent value="appeals">
					<SearchCard />
					<ReferralView />
				</TabsContent>
				<TabsContent value="disputes">
					<SearchCard />
					{/* <ReferralView /> */}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DisputeScreen;
