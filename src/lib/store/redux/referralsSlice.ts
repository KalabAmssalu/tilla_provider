import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	referralData: {
		referral_date: "",
		referral_number: "",
		referral_status: "",
		reason_for_referral: "",
		additional_note: "",
		supporting_doc1: "",
		supporting_doc2: "",
		user: 0,
		referred_to: "",
		individual_member: 0,
	},
};

const referralSlice = createSlice({
	name: "referral",
	initialState,
	reducers: {
		setReferralData: (state, action) => {
			state.referralData = action.payload;
		},
		clearReferralData: (state) => {
			state.referralData = initialState.referralData; // Resets to initial state
		},
	},
});

export const { setReferralData, clearReferralData } = referralSlice.actions;
export default referralSlice.reducer;
