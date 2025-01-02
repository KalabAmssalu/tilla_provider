import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	deleteAppointment,
	fetchAppointments,
	setAppointment,
	updateAppointment,
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
// Custom hook for updating an appointment
export const useUpdateAppointment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			appointmentId,
			formData,
		}: {
			appointmentId: string;
			formData: FormData;
		}) => {
			return await updateAppointment(appointmentId, formData);
		},
		onSuccess: (data) => {
			console.log("Appointment updated:", data);
			// Invalidate the appointments query to refresh the data
			queryClient.invalidateQueries(["fetchAppointments"] as any);
			toast.success("Appointment updated successfully!");
		},
		onError: (error) => {
			console.error("Error updating appointment:", error);
			toast.error(`Error updating appointment: ${error.message}`);
		},
	});
};

// Custom hook for deleting an appointment
export const useDeleteAppointment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (appointmentId: string) => {
			return await deleteAppointment(appointmentId);
		},
		onSuccess: (data) => {
			console.log("Appointment deleted:", data);
			// Invalidate the appointments query to refresh the data
			queryClient.invalidateQueries(["fetchAppointments"] as any);
			toast.success("Appointment deleted successfully!");
		},
		onError: (error) => {
			console.error("Error deleting appointment:", error);
			toast.error(`Error deleting appointment: ${error.message}`);
		},
	});
};
