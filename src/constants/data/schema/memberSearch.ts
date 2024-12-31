import { z } from "zod";

export const SearchSchemas = z.object({
	member_id: z.union([z.string(), z.number()]),
	first_name: z.string().optional(),
	middle_name: z.string().optional(),
	last_name: z.string().optional(),
	first_name_amharic: z.string().optional(),
	middle_name_amharic: z.string().optional(),
	last_name_amharic: z.string().optional(),
	date_of_birth: z.string().optional(),
	phone_number: z.string().optional(),
	family_id: z.string().optional(),
	dependent_first_name: z.string().optional(),
	dependent_middle_name: z.string().optional(),
	dependent_last_name: z.string().optional(),
	dependent_first_name_amharic: z.string().optional(),
	dependent_middle_name_amharic: z.string().optional(),
	dependent_last_name_amharic: z.string().optional(),
	dependent_date_of_birth: z.string().optional(),
});

export type SearchValues = z.infer<typeof SearchSchemas>;
