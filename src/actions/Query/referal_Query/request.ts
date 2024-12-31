import { setReferralMultiForm } from "@/actions/referral/action";
import useToastMutation from "@/hooks/useToastMutation";

export const useSetReferral = () => {
	return useToastMutation<FormData>(
		["setReferral"],
		setReferralMultiForm,
		"Referral creating...",
		{
			onSuccess: (data, variables) => {
				console.log("Referral creation data:", data);
				console.log("Submitted variables:", variables);

				// Optionally invalidate queries or perform other actions here
				// queryClient.invalidateQueries({ queryKey: ["Organizations"] });
			},
			onError: (error) => {
				console.error("Error creating referral:", error);
			},
		}
	);
};
