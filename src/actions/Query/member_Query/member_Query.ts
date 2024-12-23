import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getMemeberIndividual, searchMembers } from "@/actions/member/action";
import { type memberType } from "@/types/member/memeberType";

export const useFetchMemeberDetail = (id: string) => {
	return useQuery<memberType>({
		queryKey: ["memberDetail", id],
		queryFn: async () => {
			try {
				const response = await getMemeberIndividual(id);
				return response.data; // Assuming `response.data` contains the member array
			} catch (error: any) {
				toast.error(`Error fetching members: ${error.message}`);
				throw error;
			}
		},
		enabled: Boolean(id),
		retry: false,
	});
};

export const useSearchMember = (sendData: Partial<memberType>) => {
	return useQuery<memberType[]>({
		queryKey: ["memberSearch", sendData],
		queryFn: async () => {
			// Check if sendData is empty and prevent unnecessary API calls
			if (
				!sendData ||
				(Object.keys(sendData) as (keyof memberType)[]).every(
					(key) => !sendData[key]
				)
			) {
				return []; // Return an empty array if no valid data
			}

			// Proceed with the API call when sendData is valid
			const response = await searchMembers(sendData);
			return response.data || []; // Ensure response.data is not undefined
		},
		enabled: Boolean(
			sendData &&
				(Object.keys(sendData) as (keyof memberType)[]).some(
					(key) => sendData[key]
				)
		), // Only enable query if there's valid input
		retry: false,
	});
};
