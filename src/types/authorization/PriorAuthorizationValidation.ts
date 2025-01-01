import * as z from "zod";

// Define the prior authorization field schema
export const createPriorAuthorizationInfoSchema = (
	t: (key: string) => string
) =>
	z.object({
		date_of_service: z.string().min(1, {
			message: t("fields.date_of_service.error"),
		}),
		requested_service: z.string().min(2, {
			message: t("fields.requested_service.error"),
		}),

		reason_for_request: z.string().max(2000, {
			message: t("fields.reason_for_request.error"),
		}),

		additional_note: z
			.string()
			.max(2000, {
				message: t("fields.additional_note.error"),
			})
			.optional(), // Nullable
		cpt_code: z.string().optional(),
		cpt_category: z.string().optional(), // Nullable
		cpt_description: z.string().optional(), // Nullable
		diagnosis_date: z.string().optional(), // Date in string format
		diagnosis_source: z.string().optional(), // Nullable
		diagnosis_category: z.string().optional(), // Nullable
		diagnosis_description: z.string().optional(), // Nullable
		diagnosis_code: z.string().optional(), // Nullable
	});

// Type inference for prior authorization form values
export type PriorAuthorizationFormValues = z.infer<
	ReturnType<typeof createPriorAuthorizationInfoSchema>
>;
