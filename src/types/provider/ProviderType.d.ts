export interface ProviderType {
	tin_number: string;
	provider_npi_id: string;
	institute_name: string;
	provider_last_name: string;
	provider_first_name: string;
	provider_middle_initial: string;
	provider_last_name_amharic: string;
	provider_first_name_amharic: string;
	provider_middle_initial_amharic: string;
	provider_title: string;
	provider_contact_person: string;
	provider_contact_email: string;
	provider_contact_phone_number: string;
	provider_discount_agreement: number;
	provider_health_tier: string;
	provider_health_sub_tier: string;
	provider_service_type: string;
	provider_gender: string;
	provider_date_of_birth: string;
	provider_address: string;
	provider_address_line2: string;
	provider_city: string;
	provider_country: string;
	provider_region: string;
	provider_kifle_ketema: string;
	provider_zip_code: string;
	provider_phone_number: string;
	provider_fax: string;
	provider_email: string;
	provider_type: string;
	provider_primary_specialty: string;
	provider_sub_specialty: string;
	provider_group_name: string;
	provider_group_contact_person: string;
	provider_group_contact_email: string;
	provider_group_phone_number: string;
	provider_group_address: string;
}

export type ProviderTitle =
	| "Phd"
	| "Dr"
	| "MD"
	| "DO"
	| "DPM"
	| "PA"
	| "NP"
	| "PhD"
	| "RN"
	| "BSN"
	| "MSN"
	| "Path"
	| "Orthopedic"
	| "PharmD"
	| "Prof"
	| "Mr"
	| "Mrs"
	| "Ms";

export interface ProviderTitleOption {
	value: ProviderTitle;
	label: string;
}
