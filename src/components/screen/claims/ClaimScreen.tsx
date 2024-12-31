import SearchCard from "@/components/module/claimForm/SearchCard";
import ReferralView from "@/components/module/referral/ReferralsView";
import { DetailCards } from "@/components/shared/Cards/DetailCards";

type Props = {};
const notifications = [
	{
		title: "Step 1: Click on 'Add Claim' button",
		description: "Press the Add claim button",
	},
	{
		title: "Step 2: Search a member",
		description: "Search the member first by member information in the popup",
	},
	{
		title: "Step 3: Select a right member",
		description: "Select a member from the list of the search result",
	},
	{
		title: "Step 4: Click the add a claim button",
		description: "Press add a claim button from the user list action column",
	},
	{
		title: "Step 5: Fill the claim form and submit",
		description: "Add a claim by filling the form",
	},
];

const ClaimScreen = (props: Props) => {
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information On Adding a Claim"
					description="You can add a claim by following the steps below"
					data={notifications}
					className=""
				/>
			</div>
			<SearchCard />
			<ReferralView />
		</div>
	);
};

export default ClaimScreen;
