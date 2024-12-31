import SearchCard from "@/components/module/priorAuthorizationForm/SearchCard";
import ReferralView from "@/components/module/referral/ReferralsView";
import { DetailCards } from "@/components/shared/Cards/DetailCards";

type Props = {};

const notifications = [
	{
		title: "Step 1: Click on 'Add Prior Authorization' button",
		description: "Press the Add Prior Authorization button to begin.",
	},
	{
		title: "Step 2: Search for a member",
		description: "Enter the member's information in the search popup.",
	},
	{
		title: "Step 3: Select the correct member",
		description: "Choose the appropriate member from the search results.",
	},
	{
		title: "Step 4: Click the add a prior authorization button",
		description:
			"Press the add a prior authorization button in the user list action column.",
	},
	{
		title: "Step 5: Fill out the prior authorization form and submit",
		description:
			"Complete the prior authorization form and submit it for review.",
	},
];

const PriorAuthorizationScreen = (props: Props) => {
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information On Adding a Prior Authorization Request"
					description="You can add a Prior Authorization Request by following the steps below"
					data={notifications}
					className=""
				/>
			</div>
			<SearchCard />
			<ReferralView />
		</div>
	);
};

export default PriorAuthorizationScreen;
