"use client";

import { useState } from "react";

import { UserX } from "lucide-react";

import { useGetAllInfoClaims } from "@/actions/Query/claim-Query/request";
import MemberReport, {
	type ClaimReportFormValues,
} from "@/components/screen/reports/Claim_and_Member_Report";
import FinancialReport, {
	PayementReportFormValues,
} from "@/components/screen/reports/PaymentReport";
import CustomGrid from "@/components/shared/dataTable/CustomTable";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAge } from "@/lib/utils/calculateAge";
import { type ClaimdetailType } from "@/types/claim/claim";

type Props = {};

const Page = (props: Props) => {
	const [filteredClaims, setFilteredClaims] = useState<ClaimdetailType[]>([]);
	const { data: claimSearchData, isLoading } = useGetAllInfoClaims();
	const [visible, setVisible] = useState(false);
	const [summary, setSummary] = useState("");

	const handleSubmitReport = (data: ClaimReportFormValues, summary: string) => {
		setVisible(true);
		setSummary(summary);
		if (claimSearchData) {
			const filtered = claimSearchData.filter((claim: ClaimdetailType) => {
				const memberAge = calculateAge(claim.individual_member.date_of_birth);
				return (
					(!data.from ||
						new Date(claim.service_start_date) >= new Date(data.from)) &&
					(!data.to || new Date(claim.service_end_date) <= new Date(data.to)) &&
					(!data.claim_status || claim.claim_status === data.claim_status) &&
					(!data.diagnosis_category ||
						claim.diagnosis_category === data.diagnosis_category) &&
					(!data.diagnosis_source ||
						claim.diagnosis_source === data.diagnosis_source) &&
					(!data.cpt_category || claim.cpt_category === data.cpt_category) &&
					(!data.loinc_category ||
						claim.lonic_code?.startsWith(data.loinc_category)) &&
					(!data.member_id ||
						claim.individual_member.member_id === data.member_id) &&
					(!data.plan_type ||
						claim.individual_member.benefit_plan === data.plan_type) &&
					(!data.member_first_name ||
						claim.individual_member.first_name.includes(
							data.member_first_name
						)) &&
					(!data.member_middle_name ||
						claim.individual_member.middle_name.includes(
							data.member_middle_name
						)) &&
					(!data.member_last_name ||
						claim.individual_member.last_name.includes(
							data.member_last_name
						)) &&
					(!data.provider_first_name ||
						claim.provider.provider_first_name.includes(
							data.provider_first_name
						)) &&
					(!data.provider_middle_name ||
						claim.provider.provider_middle_initial.includes(
							data.provider_middle_name
						)) &&
					(!data.provider_last_name ||
						claim.provider.provider_last_name.includes(
							data.provider_last_name
						)) &&
					(!data.referral_provider_name ||
						claim.refferal_provider_name === data.referral_provider_name) &&
					(!data.referral_provider_npi ||
						claim.refferal_provider_npi === data.referral_provider_npi) &&
					(!data.procedure_code ||
						claim.principal_procedure_code === data.procedure_code) &&
					(!data.cpt_code || claim.cpt_code === data.cpt_code) &&
					(!data.ageRange ||
						(memberAge >= data.ageRange[0] && memberAge <= data.ageRange[1]))
				);
			});
			setFilteredClaims(filtered);
			setVisible(true);
		}
	};
	const handleSubmitPaymentReport = (
		data: PayementReportFormValues,
		summary: string
	) => {
		setVisible(true);
		setSummary(summary);
		if (claimSearchData) {
			const filtered = claimSearchData.filter((claim: ClaimdetailType) => {
				const memberAge = calculateAge(claim.individual_member.date_of_birth);
				return (
					(!data.from ||
						new Date(claim.service_start_date) >= new Date(data.from)) &&
					(!data.to || new Date(claim.service_end_date) <= new Date(data.to)) &&
					(!data.claim_status || claim.claim_status === data.claim_status) &&
					(!data.member_id ||
						claim.individual_member.member_id === data.member_id) &&
					(!data.plan_type ||
						claim.individual_member.benefit_plan === data.plan_type) &&
					(!data.member_first_name ||
						claim.individual_member.first_name.includes(
							data.member_first_name
						)) &&
					(!data.member_middle_name ||
						claim.individual_member.middle_name.includes(
							data.member_middle_name
						)) &&
					(!data.member_last_name ||
						claim.individual_member.last_name.includes(
							data.member_last_name
						)) &&
					(!data.provider_first_name ||
						claim.provider.provider_first_name.includes(
							data.provider_first_name
						)) &&
					(!data.provider_middle_name ||
						claim.provider.provider_middle_initial.includes(
							data.provider_middle_name
						)) &&
					(!data.provider_last_name ||
						claim.provider.provider_last_name.includes(
							data.provider_last_name
						)) &&
					(!data.referral_provider_name ||
						claim.refferal_provider_name === data.referral_provider_name) &&
					(!data.referral_provider_npi ||
						claim.refferal_provider_npi === data.referral_provider_npi) &&
					(!data.procedure_code ||
						claim.principal_procedure_code === data.procedure_code) &&
					(!data.amountRange ||
						(parseFloat(claim.member_payment_amount) >= data.amountRange[0] &&
							parseFloat(claim.member_payment_amount) <=
								data.amountRange[0])) &&
					(!data.cpt_code || claim.cpt_code === data.cpt_code) &&
					(!data.ageRange ||
						(memberAge >= data.ageRange[0] && memberAge <= data.ageRange[1]))
				);
			});
			setFilteredClaims(filtered);
			setVisible(true);
		}
	};

	return (
		<div className="container mt-4 flex flex-col gap-4">
			<Tabs defaultValue="member" className="w-full">
				<TabsList className="w-full ">
					<TabsTrigger value="member" className="w-[400px]">
						Member and Claims Report{" "}
					</TabsTrigger>
					<TabsTrigger value="financial" className="w-[400px]">
						Financial Report
					</TabsTrigger>
				</TabsList>
				<TabsContent value="member">
					{!visible ? (
						<MemberReport onSubmitReport={handleSubmitReport} />
					) : (
						<div className="mb-20">
							{visible && (
								<>
									<Card className="mb-4 flex-col bg-secondary/40">
										<CardHeader>
											<CardTitle className="text-xl font-bold text-center">
												Member and Claim Report
											</CardTitle>
											<CardDescription>Report For: {summary}</CardDescription>
										</CardHeader>
									</Card>
									<CustomGrid />
								</>
							)}
						</div>
					)}
					{isLoading && (
						<div className="flex justify-center items-center">Loading...</div>
					)}
					{!isLoading && claimSearchData?.length === 0 && (
						<div className="flex flex-col gap-6 text-xl mt-10 justify-center items-center">
							<div className="bg-muted rounded-full w-80 h-80 p-16">
								<UserX size={200} className="text-background" />
							</div>
							No Claim Found
						</div>
					)}
				</TabsContent>
				<TabsContent value="financial">
					<FinancialReport onSubmitReport={handleSubmitPaymentReport} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Page;
