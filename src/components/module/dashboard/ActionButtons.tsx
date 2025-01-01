// components/ActionButtons.tsx
import { useRouter } from "next/navigation";

import { Calendar, CheckCircle, Clock, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

const ActionButtons = () => {
	const route = useRouter();
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-secondary/40 p-2 rounded-md">
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
				onClick={() => route.push("/dashboard/claims" as any)}
			>
				<FileText className="h-6 w-6 mb-2" />
				Submit a Claim
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
				onClick={() => route.push("/dashboard/members/eligibility" as any)}
			>
				<CheckCircle className="h-6 w-6 mb-2" />
				Check Eligibility
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
				onClick={() => route.push("/dashboard/tools/appointment" as any)}
			>
				<Calendar className="h-6 w-6 mb-2" />
				Schedule Appointments
			</Button>
			<Button
				size="lg"
				className="h-24 flex flex-col items-center justify-center"
				variant={"ghost"}
				onClick={() => route.push("dashboard/tools/appointment" as any)}
			>
				<Clock className="h-6 w-6 mb-2" />
				Appointment
			</Button>
		</div>
	);
};

export default ActionButtons;
