// components/ActionButtons.tsx
import { Calendar, CheckCircle, Clock, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

const ActionButtons = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-secondary/40 p-2 rounded-md">
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
			>
				<FileText className="h-6 w-6 mb-2" />
				Submit a Claim
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
			>
				<CheckCircle className="h-6 w-6 mb-2" />
				Check Eligibility
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
			>
				<Calendar className="h-6 w-6 mb-2" />
				Schedule Appointments
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
			>
				<Clock className="h-6 w-6 mb-2" />
				Appointment
			</Button>
		</div>
	);
};

export default ActionButtons;
