import * as z from "zod";

// Define the appeal field schema
export const createAppealInfoSchema = (t: (key: string) => string) =>
	z.object({
		reason_for_appeal: z.string().max(2000, {
			message: t("fields.reason_for_appeal.error"),
		}),
		additional_note: z
			.string()
			.max(2000, {
				message: t("fields.additional_note.error"),
			})
			.optional(), // Nullable
		supporting_doc1: z.string().optional(), // URI or file path
		supporting_doc2: z.string().optional(), // URI or file path
	});

// Type inference for appeal form values
export type AppealFormValues = z.infer<
	ReturnType<typeof createAppealInfoSchema>
>;
