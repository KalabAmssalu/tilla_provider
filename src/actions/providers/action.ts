"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function fetchProviders() {
	try {
		const response = await axiosInstance.get("providers");
		console.log("response of all providers", response);
		return {
			ok: true,
			message: "providers fetched successfully!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
