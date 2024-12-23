import * as z from "zod";

export const createPersonalInfoSchema = (t: (key: string) => string) =>
	z.object({
		// member_id: z.union([
		// 	z.literal(""),
		// 	z.string().min(2, {
		// 		message: t("fields.member_id.error"),
		// 	}),
		// ]),
		member_id: z.union([
			z.literal(""),
			z.string().max(20, {
				message: t("fields.member_id.error"),
			}),
		]),
		first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.first_name.error"),
			}),
		]),
		middle_name: z.union([
			z.literal(""),
			z
				.string()
				.min(2, {
					message: t("fields.middle_name.error"),
				})
				.regex(/^[^\d]*$/, {
					message: t("fields.middle_name.error"),
				}),
		]),
		last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.last_name.error"),
			}),
		]),
		first_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.first_name_amharic.error"),
			}),
		]),
		middle_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.middle_name_amharic.error"),
			}),
		]),
		last_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.last_name_amharic.error"),
			}),
		]),
		date_of_birth: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.date_of_birth.error"),
			}),
		]),
		phone_number: z.union([
			z.literal(""),
			z
				.string()
				.min(10, { message: t("fields.phone_number.error") })
				.max(15, { message: t("fields.phone_number.error") }),
		]),
		family_id: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.family_id.error"),
			}),
		]),
		dependent_first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.dependent_first_name.error"),
			}),
		]),
		dependent_middle_name: z.union([
			z.literal(""),
			z
				.string()
				.min(2, {
					message: t("fields.dependent_middle_name.error"),
				})
				.regex(/^[^\d]*$/, {
					message: t("fields.dependent_middle_name.error"),
				}),
		]),
		dependent_last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.dependent_last_name.error"),
			}),
		]),
		dependent_first_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.dependent_first_name_amharic.error"),
			}),
		]),
		dependent_middle_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.dependent_middle_name_amharic.error"),
			}),
		]),
		dependent_last_name_amharic: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.dependent_last_name_amharic.error"),
			}),
		]),
		dependent_date_of_birth: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.date_of_birth.error"),
			}),
		]),
	});

export type PersonalInfoFormValues = z.infer<
	ReturnType<typeof createPersonalInfoSchema>
>;
