"use server";

import axios from "axios";

import { ClaimStatusFormValues } from "@/components/screen/claims/StatusScreen";
import { type APIResponseType } from "@/hooks/useToastMutation";
import { generatePDF } from "@/lib/utils/generatePDF";
import { type ClaimType } from "@/types/claim/claim";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

// Reusable function to fetch JSON from a given URL with caching
let cachedData: any[] | null = null;

export async function fetchJsonData(url: string) {
	// Check if data is already cached
	if (cachedData) {
		console.log("Returning cached data");
		return {
			ok: true,
			message: "Data fetched from cache",
			data: cachedData,
		};
	}

	try {
		// Fetch data from the URL if not cached
		const response = await axios.get(url);
		// console.log("Fetched JSON Data:", response.data);

		// Cache the data for future use
		cachedData = response.data;

		return {
			ok: true,
			message: "JSON data fetched successfully!",
			data: cachedData,
		};
	} catch (error: any) {
		console.error("Error fetching JSON data:", error);

		return {
			ok: false,
			message:
				error.response?.data?.message || error.message || "An error occurred",
		};
	}
}

export async function getCPT() {
	try {
		const response = await axiosInstance.get("codes/cpt/cpt-categories/");
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getCPTRecords(category: string) {
	try {
		const response = await axiosInstance.get(
			`codes/cpt/cpt-records/${category}/`
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getICD10Ethiopia() {
	try {
		const response = await axiosInstance.get(
			"codes/ethiopian/ethiopian-categories/"
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getICD10EthiopiaRecords(category: string) {
	try {
		const response = await axiosInstance.get(
			`codes/ethiopian/ethiopian-records/${category}/`
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getICD10WHO() {
	try {
		const response = await axiosInstance.get("codes/icd/icd-categories/");
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getICD10WHORecords(category: string) {
	try {
		const response = await axiosInstance.get(
			`codes/icd/icd-records/${category}/`
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getLonic() {
	try {
		const response = await axiosInstance.get("codes/lonic/lonic-categories/");
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getLonicRecords(category: string) {
	try {
		const response = await axiosInstance.get(
			`codes/lonic/lonic-records/${category}/`
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "Getting Data Successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function generateAndDownloadPDF(data: any) {
	try {
		const base64PDF = await generatePDF(data);
		return base64PDF;
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw new Error("Failed to generate PDF");
	}
}

export async function getClaims() {
	try {
		const response = await axiosInstance.get("claims/get-claims");
		return response.data;
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getMyPaymentSummary() {
	try {
		const response = await axiosInstance.get("claims/my-claim-payment-summary");
		console.log("Payment Summary:", response.data);
		return response.data;
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getClaimsById(id: string) {
	try {
		const response = await axiosInstance.get(`claims/get-claim/${id}`);
		return response.data;
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function searchClaims(data: Partial<ClaimStatusFormValues>) {
	try {
		const queryParams = new URLSearchParams();
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryParams.append(key, String(value));
			}
		});
		console.log("send query", queryParams.toString());
		const response = await axiosInstance.get(
			`claims/myclaims?${queryParams.toString()}`
		);
		console.log("response", response.data);
		return {
			ok: true,
			message: "claim fetched successfully",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export const setClaim = async (
	formData: FormData
): Promise<APIResponseType> => {
	console.log("formData", formData);
	const response = await axiosInstance.post("claims/create-claim", formData, {
		headers: {
			"Content-Type": "multipart/form-data", // Ensure the correct content type
		},
	});
	console.log("response", response);

	return {
		ok: response.status >= 200 && response.status < 300,
		message: response.data?.message || "Claim submitted successfully.",
		data: response.data?.data,
	};
};
