"use server";

// Ensure this is imported correctly
import { type APIResponseType } from "@/hooks/useToastMutation";

import axiosInstance from "../axiosInstance";

export const setReferralMultiForm = async (
	formData: FormData
): Promise<APIResponseType> => {
	console.log("formData", formData);
	const response = await axiosInstance.post("referrals", formData, {
		headers: {
			"Content-Type": "multipart/form-data", // Ensure the correct content type
		},
	});
	console.log("response", response);

	return {
		ok: response.status >= 200 && response.status < 300,
		message: response.data?.message || "Referral submitted successfully.",
		data: response.data?.data,
	};
};
