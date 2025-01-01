import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	fetchAppointments,
	setAppointment,
} from "@/actions/appointment/action";
import useToastMutation from "@/hooks/useToastMutation";
import { Appointment } from "@/types/appointment/appointment";

export const useSetAppointment = () => {
	return useToastMutation<FormData>(
		["setAppointment"],
		setAppointment, // Use the updated function for appointments
		"Appointment creating...", // Updated loading message
		{
			onSuccess: (data, variables) => {
				console.log("Appointment creation data:", data);
				console.log("Submitted variables:", variables);

				// Optionally invalidate queries or perform other actions here
				// queryClient.invalidateQueries({ queryKey: ["Appointments"] });
			},
			onError: (error) => {
				console.error("Error creating appointment:", error);
			},
		}
	);
};

export const useFetchAppointment = () => {
	return useQuery<Array<Appointment>>({
		queryKey: ["fetchAppointments"],
		queryFn: async () => {
			try {
				const response = await fetchAppointments();
				console.log("response of all members", response);
				return response.data; // Ensure this matches the data structure returned by the API
			} catch (error: any) {
				toast.error(`Error fetching members: ${error.message}`);
				throw error;
			}
		},
		enabled: true,
		retry: false,
	});
};
