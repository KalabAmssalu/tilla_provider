import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: {
		token: "",
		user: {
			id: 0,
			provider: {
				id: 0,
				provider_id: "",
				tin_number: "",
				provider_last_name: "",
				provider_first_name: "",
				provider_middle_initial: "",
				provider_title: "",
				provider_contact_person: "",
				provider_discount_agreement: 0,
				provider_health_tier: null,
				provider_service_type: "",
				provider_address: "",
				provider_city: "",
				provider_county: "",
				provider_region: "",
				provider_kifle_ketema: "",
				provider_zip_code: "",
				provider_phone_number: "",
				provider_fax: "",
				provider_email: "",
				provider_type: "",
				provider_primary_specialty: "",
				provider_sub_specialty: "",
				medicare_provider_number: "",
				provider_group_name: "",
				provider_group_contact_person: "",
				provider_group_phone_number: "",
				provider_group_address: "",
			},
			email: "",
			phone_number: null,
			first_name: "",
			middle_name: null,
			last_name: "",
			date_of_birth: null,
			gender: null,
			date_joined: "",
			last_login: "",
			is_active: false,
			role: "",
		},
	},
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		SetCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		ClearCurrentUser: (state) => {
			state.currentUser = initialState.currentUser; // Resets to initial state
		},
	},
});

export const { SetCurrentUser, ClearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
