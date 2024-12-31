import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { fetchProviders } from "@/actions/providers/action";
import { Provider } from "@/lib/store/redux/providerSlice";

// const API_BASE_URL = "http://api.tillahealthinsurance.com";

// export const fetchProviders = async (): Promise<Provider[]> => {
// 	const response = await axios.get(`${API_BASE_URL}/providers`);
// 	return response.data;
// };

// export const providersQueryKey: QueryKey = ["providers"];

export const useFetchProviders = () => {
	return useQuery<Array<Provider>>({
		queryKey: ["fetchAllProviders"],
		queryFn: async () => {
			try {
				const response = await fetchProviders();
				console.log("response of all providers", response);
				return response.data;
			} catch (error: any) {
				toast.error(`Error fetching providers: ${error.message}`);
				throw error;
			}
		},
		enabled: true,
		retry: false,
	});
};
