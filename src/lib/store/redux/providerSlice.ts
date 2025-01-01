import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Provider {
	id: number;
	provider_date_of_birth: string;
	tin_number: string;
	provider_npi_id: string;
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
	institute_name: string;
	provider_service_type: string;
	provider_gender: string;
	provider_address: string;
	provider_address_line2: string;
	provider_city: string;
	provider_county: string;
	provider_region: string;
	provider_kifle_ketema: string;
	provider_zip_code: string;
	provider_phone_number: string;
	provider_fax: string;
	provider_email: string;
	provider_type: string;
	provider_primary_specialty: string;
	provider_sub_specialty: string;
	provider_group_email: string;
	medicare_provider_number: string;
	provider_group_name: string;
	provider_group_contact_person: string;
	provider_group_phone_number: string;
	provider_group_address: string;
}

interface ProvidersState {
	providers: Provider[];
}

const initialState: ProvidersState = {
	providers: [],
};

const providersSlice = createSlice({
	name: "providers",
	initialState,
	reducers: {
		setProviders: (state, action: PayloadAction<Provider[]>) => {
			state.providers = action.payload;
		},
	},
});

export const { setProviders } = providersSlice.actions;
export default providersSlice.reducer;
