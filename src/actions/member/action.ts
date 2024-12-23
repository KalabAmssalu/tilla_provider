"use server";

import { type memberType } from "@/types/member/memeberType";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function setMemeberIndividual(data: memberType) {
	try {
		const response = await axiosInstance.post("members/individual", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "አዲስ ተጠቃሚ በተሳካ ሁኔታ ፈጥረዋል!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getMemeber() {
	try {
		const response = await axiosInstance.get("members/individual");
		console.log("Response on action:", response.data);
		return {
			ok: true,
			message: "User is fetched successfully!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getMemeberIndividual(id: string) {
	try {
		const response = await axiosInstance.get(`members/individual/${id}`);
		console.log("Response on action:", response.data);
		return {
			ok: true,
			message: "User is fetched successfully!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function searchMembers(data: Partial<memberType>) {
	try {
		const queryParams = new URLSearchParams();
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryParams.append(key, String(value));
			}
		});
		console.log("send query", queryParams.toString());
		const response = await axiosInstance.get(
			`members/individual?${queryParams.toString()}`
		);

		return {
			ok: true,
			message: "User fetched successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
