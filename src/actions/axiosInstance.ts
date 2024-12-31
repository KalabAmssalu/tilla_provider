import type { AxiosInstance } from "axios";
import axios from "axios";

import { get_session } from "./auth/action";

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.DJANGO_API_BASE_URL, // Default baseURL for non-tenant requests
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		// Handle session authorization
		if (
			!config.url?.includes("auth/sign-in/") &&
			!config.url?.includes("auth/sign-up/") &&
			!config.url?.includes("auth/forgot-password/") &&
			!config.url?.includes("auth/verify-otp/") &&
			!config.url?.includes("auth/reset-password/")
		) {
			const session = await get_session();
			const sessionId = session?.sessionId;

			if (sessionId) {
				config.headers.Authorization = `Token ${sessionId}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
