import SearchCard from "@/components/module/appealForm/SearchCard";
import ReferralView from "@/components/module/referral/ReferralsView";
import { DetailCards } from "@/components/shared/Cards/DetailCards";

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

const AppealScreen = (props: Props) => {
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
			<SearchCard />
			<ReferralView />
		</div>
	);
};

export default AppealScreen;
