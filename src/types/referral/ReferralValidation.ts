import * as z from "zod";

// Define the referral field schema
export const createReferralInfoSchema = (t: (key: string) => string) =>
	z.object({
		referral_date: z.string().min(1, {
			message: t("fields.referral_date.error"),
		}),

		referred_to: z.string().min(2, {
			message: t("fields.referred_to.error"),
		}),

		referral_number: z.string().min(2, {
			message: t("fields.referral_number.error"),
		}),
		referral_status: z.enum(["approved", "pending", "rejected"], {
			invalid_type_error: t("fields.referral_status.error"),
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
		supporting_doc1: z.string().optional(), // URI, readOnly
		supporting_doc2: z.string().optional(), // URI, readOnly
	});

// Type inference for referral form values
export type ReferralFormValues = z.infer<
	ReturnType<typeof createReferralInfoSchema>
>;
