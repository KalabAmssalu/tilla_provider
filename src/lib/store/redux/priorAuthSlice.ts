import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	priorAuthorizationData: {
		date_of_service: "",
		claim_id: "",
		requested_service: "",
		reason_for_request: "",
		additional_note: "",
		supporting_doc1: "",
		supporting_doc2: "",
		user: 0,
		individual_member: 0,
		cpt_code: "",
		cpt_category: "",
		cpt_description: "",
		diagnosis_date: "",
		diagnosis_source: "",
		diagnosis_category: "",
		diagnosis_description: "",
		diagnosis_code: "",
	},
};

const priorAuthorizationSlice = createSlice({
	name: "priorAuthorization",
	initialState,
	reducers: {
		setPriorAuthorizationData: (state, action) => {
			state.priorAuthorizationData = action.payload;
		},
		clearPriorAuthorizationData: (state) => {
			state.priorAuthorizationData = initialState.priorAuthorizationData; // Resets to initial state
		},
	},
});

export const { setPriorAuthorizationData, clearPriorAuthorizationData } =
	priorAuthorizationSlice.actions;
export default priorAuthorizationSlice.reducer;
