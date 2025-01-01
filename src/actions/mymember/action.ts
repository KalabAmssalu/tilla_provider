"use server";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function fetchMyMembers() {
	try {
		const response = await axiosInstance.get("/claims/mymembers");
		console.log("response of all members", response);
		return {
			ok: true,
			message: "Members fetched successfully!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
