"use server";

import axios from "axios";

import { generatePDF } from "@/lib/utils/generatePDF";

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
