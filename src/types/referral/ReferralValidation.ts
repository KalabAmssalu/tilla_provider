import * as z from "zod";

// Define the referral field schema
export const createReferralInfoSchema = (t: (key: string) => string) =>
	z.object({
		referral_date: z.string().min(1, {
			message: t("fields.referral_date.error"),
		}),

		referred_to: z.number().min(1, {
			message: t("fields.referred_to.error"),
		}),
		reason_for_referral: z.string().max(2000, {
			message: t("fields.reason_for_referral.error"),
		}),
		additional_note: z
			.string()
			.max(2000, {
				message: t("fields.additional_note.error"),
			})
			.optional(), // Nullable
	});

// Type inference for referral form values
export type ReferralFormValues = z.infer<
	ReturnType<typeof createReferralInfoSchema>
>;
