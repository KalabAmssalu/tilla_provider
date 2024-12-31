import { QueryKey } from "@tanstack/react-query";
import axios from "axios";

import { Provider } from "@/lib/store/redux/providerSlice";

const API_BASE_URL = "http://api.tillahealthinsurance.com";

export const fetchProviders = async (): Promise<Provider[]> => {
	const response = await axios.get(`${API_BASE_URL}/providers`);
	return response.data;
};

export const providersQueryKey: QueryKey = ["providers"];
