import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	fetchJsonData,
	getCPT,
	getCPTRecords,
	getICD10Ethiopia,
	getICD10EthiopiaRecords,
	getICD10WHO,
	getICD10WHORecords,
	getLonic,
	getLonicRecords,
	setClaim,
} from "@/actions/claim/action";
import useToastMutation from "@/hooks/useToastMutation";
import { type ClaimType } from "@/types/claim/claim";

interface ICD10Record {
	category: string;
	code: string;
	description: string;
}

interface MyResponseType {
	ok: boolean;
	message: string;
	data: ICD10Record[];
}
// Modify the hook to accept a dynamic URL
export const useFindJSON = (url: string) => {
	return useQuery({
		queryKey: ["findJSON", url], // Add URL as part of the query key for caching purposes
		queryFn: async () => {
			try {
				const response = await fetchJsonData(url);
				return response.data; // Assuming `response.data` contains the array of diagnosis codes
			} catch (error: any) {
				toast.error(
					`Error fetching JSON data: ${error.message || "Unknown error"}`
				);
				throw error;
			}
		},
		retry: false,
		// staleTime: Infinity, // Cache data indefinitely
	});
};

export const useCPT = (fetchMe: boolean) => {
	return useQuery<Array<string>>({
		queryKey: ["getCPT"],
		queryFn: async () => {
			try {
				const response = await getCPT();
				return response.data.cpt_categories;
			} catch (error: any) {
				toast.error(`Error fetching members: ${error.message}`);
				throw error;
			}
		},
		enabled: Boolean(fetchMe),
		retry: false,
	});
};
export const useCPTRecords = (category: string, enabled: boolean) => {
	return useQuery<ICD10Record[]>({
		queryKey: ["findICD10Ethiopia", category],
		queryFn: async () => {
			try {
				const response = await getCPTRecords(category);
				return response.data;
			} catch (error: any) {
				toast.error(`Failed to fetch records: ${error.message}`);
				throw error;
			}
		},
		enabled: enabled,
		retry: false,
	});
};

export const useICD10Ethiopia = (diagnosisSource: string) => {
	return useQuery<Array<string>>({
		queryKey: ["findICD10Ethiopia"],
		queryFn: async () => {
			try {
				const response = await getICD10Ethiopia();
				return response.data.ethiopian_code_categories; // Assuming `response.data` contains the member array
			} catch (error: any) {
				toast.error(`Error fetching members: ${error.message}`);
				throw error;
			}
		},
		enabled: Boolean(diagnosisSource === "ETHIOPIA"),
		retry: false,
	});
};

export const useICD10EthiopiaRecords = (category: string, enabled: boolean) => {
	return useQuery<ICD10Record[]>({
		queryKey: ["findICD10Ethiopia", category],
		queryFn: async () => {
			try {
				const response = await getICD10EthiopiaRecords(category);
				return response.data;
			} catch (error: any) {
				toast.error(`Failed to fetch records: ${error.message}`);
				throw error;
			}
		},
		enabled: enabled,
		retry: false,
	});
};

export const useICD10WHO = (diagnosisSource: string) => {
	return useQuery<Array<string>>({
		queryKey: ["findICD10WHO"],
		queryFn: async () => {
			try {
				const response = await getICD10WHO();

				return response.data.icd_10_categories;
			} catch (error: any) {
				toast.error(`Error fetching members: ${error.message}`);
				throw error;
			}
		},
		enabled: Boolean(diagnosisSource === "WHO"),
		retry: false,
	});
};

export const useICD10WHORecords = (category: string, enabled: boolean) => {
	return useQuery<ICD10Record[]>({
		queryKey: ["findICD10WHO", category],
		queryFn: async () => {
			try {
				const response = await getICD10WHORecords(category);
				return response.data;
			} catch (error: any) {
				toast.error(`Failed to fetch records: ${error.message}`);
				throw error;
			}
		},
		enabled: enabled,
		retry: false,
	});
};

export const useLonic = (fecheMe: boolean) => {
	return useQuery<Array<string>>({
		queryKey: ["findLonic"],
		queryFn: async () => {
			try {
				const response = await getLonic();
				return response.data.lonic_categories;
			} catch (error: any) {
				toast.error(`Error fetching lonic: ${error.message}`);
				throw error;
			}
		},
		enabled: Boolean(fecheMe),
		retry: false,
	});
};
export const useLonicRecords = (category: string, enabled: boolean) => {
	return useQuery<ICD10Record[]>({
		queryKey: ["findLonic", category],
		queryFn: async () => {
			try {
				const response = await getLonicRecords(category);
				return response.data;
			} catch (error: any) {
				toast.error(`Failed to fetch records: ${error.message}`);
				throw error;
			}
		},
		enabled: enabled,
		retry: false,
	});
};

export const useSetClaim = () => {
	return useToastMutation<Partial<ClaimType>>(
		["setClaim"],
		setClaim,
		"Claim creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the memeber data you passed in
				console.log("Claim creating:", variables);
				console.log("Claim created:", data);

				// queryClient.invalidateQueries({ queryKey: ["Organizations"] });
				// Example: Display a message with the Organization name
			},
			onError: (error) => {
				console.error("Error creating Claim:", error);
			},
		}
	);
};
