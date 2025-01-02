import { useCallback, useEffect, useState } from "react";

import { useGetAllInfoClaims } from "@/actions/Query/claim-Query/request";
import { type ClaimReportFormValues } from "@/components/screen/reports/Claim_and_Member_Report";
import { type PayementReportFormValues } from "@/components/screen/reports/PaymentReport";
import { useDebounce } from "@/hooks/use-Debounce";
import { calculateAge } from "@/lib/utils/calculateAge";
import { type ClaimdetailType } from "@/types/claim/claim";

export const useClaimSearch = () => {
	const [filteredClaims, setFilteredClaims] = useState<ClaimdetailType[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const { data: claimSearchData, isLoading: isDataLoading } =
		useGetAllInfoClaims();
	const [searchParams, setSearchParams] = useState<
		ClaimReportFormValues | PayementReportFormValues | null
	>(null);
	const [isPaymentReport, setIsPaymentReport] = useState(false);

	const debouncedSearchParams = useDebounce(searchParams, 300);

	const filterClaims = useCallback(
		(
			data: ClaimReportFormValues | PayementReportFormValues,
			isPayment: boolean
		) => {
			setSearchParams(data);
			setIsPaymentReport(isPayment);
		},
		[]
	);

	useEffect(() => {
		const performSearch = async () => {
			if (debouncedSearchParams && claimSearchData) {
				setIsSearching(true);
				const filtered = claimSearchData.filter((claim: ClaimdetailType) => {
					const memberAge = calculateAge(claim.individual_member.date_of_birth);
					const baseConditions =
						(!debouncedSearchParams.from ||
							new Date(claim.service_start_date) >=
								new Date(debouncedSearchParams.from)) &&
						(!debouncedSearchParams.to ||
							new Date(claim.service_end_date) <=
								new Date(debouncedSearchParams.to)) &&
						(!debouncedSearchParams.claim_status ||
							claim.claim_status === debouncedSearchParams.claim_status) &&
						(!debouncedSearchParams.member_id ||
							claim.individual_member.member_id ===
								debouncedSearchParams.member_id) &&
						(!debouncedSearchParams.plan_type ||
							claim.individual_member.benefit_plan ===
								debouncedSearchParams.plan_type) &&
						(!debouncedSearchParams.member_first_name ||
							claim.individual_member.first_name.includes(
								debouncedSearchParams.member_first_name
							)) &&
						(!debouncedSearchParams.member_middle_name ||
							claim.individual_member.middle_name.includes(
								debouncedSearchParams.member_middle_name
							)) &&
						(!debouncedSearchParams.member_last_name ||
							claim.individual_member.last_name.includes(
								debouncedSearchParams.member_last_name
							)) &&
						(!debouncedSearchParams.provider_first_name ||
							claim.provider.provider_first_name.includes(
								debouncedSearchParams.provider_first_name
							)) &&
						(!debouncedSearchParams.provider_middle_name ||
							claim.provider.provider_middle_initial.includes(
								debouncedSearchParams.provider_middle_name
							)) &&
						(!debouncedSearchParams.provider_last_name ||
							claim.provider.provider_last_name.includes(
								debouncedSearchParams.provider_last_name
							)) &&
						(!debouncedSearchParams.referral_provider_name ||
							claim.refferal_provider_name ===
								debouncedSearchParams.referral_provider_name) &&
						(!debouncedSearchParams.referral_provider_npi ||
							claim.refferal_provider_npi ===
								debouncedSearchParams.referral_provider_npi) &&
						(!debouncedSearchParams.procedure_code ||
							claim.principal_procedure_code ===
								debouncedSearchParams.procedure_code) &&
						(!debouncedSearchParams.cpt_code ||
							claim.cpt_code === debouncedSearchParams.cpt_code) &&
						(!debouncedSearchParams.ageRange ||
							(memberAge >= debouncedSearchParams.ageRange[0] &&
								memberAge <= debouncedSearchParams.ageRange[1]));

					if (isPaymentReport) {
						return (
							baseConditions &&
							(!("amountRange" in debouncedSearchParams) ||
								(debouncedSearchParams.amountRange &&
									parseFloat(claim.member_payment_amount) >=
										debouncedSearchParams.amountRange[0] &&
									parseFloat(claim.member_payment_amount) <=
										debouncedSearchParams.amountRange[1]))
						);
					} else {
						return (
							baseConditions &&
							(!debouncedSearchParams.diagnosis_category ||
								claim.diagnosis_category ===
									debouncedSearchParams.diagnosis_category) &&
							(!debouncedSearchParams.diagnosis_source ||
								claim.diagnosis_source ===
									debouncedSearchParams.diagnosis_source) &&
							(!debouncedSearchParams.cpt_category ||
								claim.cpt_category === debouncedSearchParams.cpt_category) &&
							(!debouncedSearchParams.loinc_category ||
								claim.lonic_code?.startsWith(
									debouncedSearchParams.loinc_category
								))
						);
					}
				});

				// Simulate a delay to show loading state (remove in production)
				await new Promise((resolve) => setTimeout(resolve, 500));

				setFilteredClaims(filtered);
				setIsSearching(false);
			}
		};

		performSearch();
	}, [debouncedSearchParams, claimSearchData, isPaymentReport]);

	return {
		filteredClaims,
		isLoading: isDataLoading || isSearching,
		filterClaims,
	};
};
