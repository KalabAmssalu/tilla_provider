import AppointmentView from "@/components/module/tool/AppointmentView";
import SearchCard from "@/components/module/tool/SearchCard";
import { DetailCards } from "@/components/shared/Cards/DetailCards";

type Props = {};

const notifications = [
	{
		title: "Step 1: Click on 'Schedule Appointment' button",
		description: "Press the Schedule Appointment button to begin.",
	},
	{
		title: "Step 2: Search for a member",
		description: "Enter the member's information in the search field.",
	},
	{
		title: "Step 3: Select the member",
		description: "Choose the correct member from the search results.",
	},
	{
		title: "Step 4: Choose a date and time",
		description: "Select a suitable date and time for the appointment.",
	},
	{
		title: "Step 5: Fill in the appointment details and submit",
		description: "Complete the form and submit to schedule the appointment.",
	},
];

const AppointmentsScreen = (props: Props) => {
	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0 z-10">
				<DetailCards
					title="Information On Scheduling an Appointment"
					description="You can schedule an appointment by following the steps below"
					data={notifications}
					className=""
				/>
			</div>

			<div className="flex-col">
				<SearchCard />
				<AppointmentView />
			</div>
		</div>
	);
};

export default AppointmentsScreen;
