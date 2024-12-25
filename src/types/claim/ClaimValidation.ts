import * as z from "zod";

// Define the claim field schema
export const createClaimInfoSchema = (t: (key: string) => string) =>
	z.object({
		// Basic Provider Information
		place_of_service_description: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.place_of_service_description.error"),
			}),
		]),
		place_of_service_code: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.place_of_service_code.error"),
			}),
		]),
		billing_provider_npi: z.union([
			z.literal(""),
			z
				.string()
				.min(1, {
					message: t("fields.billing_provider_npi.error"),
				})
				.max(15, {
					message: t("fields.billing_provider_npi.error"),
				}),
		]),
		attending_provider_name_npi_specialty_code: z.string().min(2, {
			message: t("fields.attending_provider_name_npi_specialty_code.error"),
		}),

		// Additional Provider Details
		other_provider_name_npi_specialty: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.other_provider_name_npi_specialty.error"),
			}),
		]),
		other_provider_ids: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.other_provider_ids.error"),
			}),
		]),

		// Admission Details
		admission_date: z.string().min(1, {
			message: t("fields.admission_date.error"),
		}),
		admission_hour: z.union([
			z.literal(""),
			z.object({
				hour: z.string().min(1, {
					message: t("fields.discharge_hour.error"),
				}),
				period: z.enum(["AM", "PM"]).optional(),
			}),
		]),
		source_of_admission: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.source_of_admission.error"),
			}),
		]),
		type_of_admission_visit: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.type_of_admission_visit.error"),
			}),
		]),
		admitting_diagnosis: z.string().min(2, {
			message: t("fields.admitting_diagnosis.error"),
		}),
		patient_reason_for_visit: z.union([
			z.literal(""),
			z.string().max(10000, {
				message: t("fields.patient_reason_for_visit.error"),
			}),
		]),

		// WHO Diagnosis Information
		diagnosis_date: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.diagnosis_date.error"),
			}),
		]),
		diagnosis_source: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.diagnosis_source.error"),
			}),
		]),
		diagnosis_category: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.diagnosis_category.error"),
			}),
		]),
		diagnosis_description: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.diagnosis_description.error"),
			}),
		]),
		diagnosis_code: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.diagnosis_code.error"),
			}),
		]),

		// Other Diagnosis Information
		other_diagnosis_codes_poc_code: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.other_diagnosis_codes_poc_code.error"),
			}),
		]),
		external_cause_of_injury_code: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.external_cause_of_injury_code.error"),
			}),
		]),
		treatment_details: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.treatment_details.error"),
			}),
		]),
		treatment_authorization_codes: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.treatment_authorization_codes.error"),
			}),
		]),

		// LONIC Information
		lonic_category: z.union([z.literal(""), z.string().optional()]),
		lonic_code: z.string().min(2, {
			message: t("fields.lonic_code.error"),
		}),
		lonic_description: z.string().min(2, {
			message: t("fields.lonic_description.error"),
		}),

		// Procedure Information
		cpt_code: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.cpt_code.error"),
			}),
		]),
		cpt_category: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.cpt_category.error"),
			}),
		]),
		cpt_description: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.cpt_description.error"),
			}),
		]),
		principal_procedure_code: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.principal_procedure_code.error"),
			}),
		]),
		operating_physician_name_npi_specialty_code: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.operating_physician_name_npi_specialty_code.error"),
			}),
		]),

		other_procedure_code_description: z.union([
			z.literal(""),
			z.string().max(2000, {
				message: t("fields.other_procedure_code_description.error"),
			}),
		]),

		// Service Details
		service_start_date: z.string().min(1, {
			message: t("fields.service_start_date.error"),
		}),
		service_end_date: z.string().min(1, {
			message: t("fields.service_end_date.error"),
		}),
		discharge_hour: z.union([
			z.literal(""),
			z.object({
				hour: z.string().min(1, {
					message: t("fields.discharge_hour.error"),
				}),
				period: z.enum(["AM", "PM"]).optional(),
			}),
		]),
		patient_discharge_status: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.patient_discharge_status.error"),
			}),
		]),
		additional_notes: z
			.string()
			.max(2000, {
				message: t("fields.additional_notes.error"),
			})
			.optional(),

		// Billing Information
		service_charge: z
			.number()
			.min(0, {
				message: t("fields.service_charge.error"),
			})
			.refine((value) => !isNaN(Number(value)), {
				message: t("fields.service_charge.error"),
			}),
		additional_charge: z.number().min(0, {
			message: t("fields.additional_charge.error"),
		}),
		non_covered_charges: z.union([
			z.number(),
			z.number().min(1, {
				message: t("fields.additional_charge.error"),
			}),
		]),
		type_of_bill: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.type_of_bill.error"),
			}),
		]),
		payer_name: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.payer_name.error"),
			}),
		]),
		revenue_code_tin_number: z.union([
			z.literal(""),
			z.string().min(1, {
				message: t("fields.revenue_code_tin_number.error"),
			}),
		]),
	});

// Type inference for referral form values
export type ClaimFormValues = z.infer<ReturnType<typeof createClaimInfoSchema>>;
