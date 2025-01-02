"use server";

// Ensure this is imported correctly
import { type APIResponseType } from "@/hooks/useToastMutation";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export const setAppointment = async (
	formData: FormData
): Promise<APIResponseType> => {
	console.log("formData", formData);
	const response = await axiosInstance.post("/members/appointment", formData, {
		headers: {
			"Content-Type": "multipart/form-data", // Ensure the correct content type
		},
	});
	console.log("response", response);

	return {
		ok: response.status >= 200 && response.status < 300,
		message: response.data?.message || "Appointment submitted successfully.",
		data: response.data?.data,
	};
};

export async function fetchAppointments() {
	try {
		const response = await axiosInstance.get("/members/appointment");
		console.log("response of all appointments", response);
		return {
			ok: true,
			message: "Appointments fetched successfully!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

// Function to update an existing appointment
export const updateAppointment = async (
	appointmentId: string,
	formData: FormData
): Promise<APIResponseType> => {
	try {
		const response = await axiosInstance.patch(
			`/members/appointment/${appointmentId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // Ensure the correct content type
				},
			}
		);
		console.log("response of update appointment", response);

		return {
			ok: response.status >= 200 && response.status < 300,
			message: response.data?.message || "Appointment updated successfully.",
			data: response.data?.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
};

// Function to delete an appointment
export const deleteAppointment = async (
	appointmentId: string
): Promise<APIResponseType> => {
	try {
		const response = await axiosInstance.delete(
			`/members/appointment/${appointmentId}`
		);
		console.log("response of delete appointment", response);

		return {
			ok: response.status >= 200 && response.status < 300,
			message: response.data?.message || "Appointment deleted successfully.",
			data: response.data?.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
};
