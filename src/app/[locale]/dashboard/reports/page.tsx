"use client";

import { useState } from "react";

import { Loader2, UserX } from "lucide-react";

import MemberReport, {
	type ClaimReportFormValues,
} from "@/components/screen/reports/Claim_and_Member_Report";
import FinancialReport, {
	type PayementReportFormValues,
} from "@/components/screen/reports/PaymentReport";
import CustomGrid from "@/components/shared/dataTable/CustomTable";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClaimSearch } from "@/hooks/use-ClaimSearch";

const Page = () => {
	const [visible, setVisible] = useState(false);
	const [summary, setSummary] = useState("");
	const [activeTab, setActiveTab] = useState<"member" | "financial">("member");
	const { filteredClaims, isLoading, filterClaims } = useClaimSearch();
	console.log("filteredClaims", filteredClaims);

	const handleSubmitReport = (
		data: ClaimReportFormValues | PayementReportFormValues,
		summary: string
	) => {
		setVisible(true);
		setSummary(summary);
		filterClaims(data, activeTab === "financial");
	};

	return (
		<div className="container mt-4 flex flex-col gap-4">
			<Tabs
				defaultValue="member"
				className="w-full"
				onValueChange={(value) => setActiveTab(value as "member" | "financial")}
			>
				<TabsList className="w-full">
					<TabsTrigger value="member" className="w-[400px]">
						Member and Claims Report
					</TabsTrigger>
					<TabsTrigger value="financial" className="w-[400px]">
						Financial Report
					</TabsTrigger>
				</TabsList>
				<TabsContent value="member">
					{!visible ? (
						<MemberReport onSubmitReport={handleSubmitReport} />
					) : (
						<ReportResults
							title="Member and Claim Report"
							summary={summary}
							filteredClaims={filteredClaims}
							isLoading={isLoading}
						/>
					)}
				</TabsContent>
				<TabsContent value="financial">
					{!visible ? (
						<FinancialReport onSubmitReport={handleSubmitReport} />
					) : (
						<ReportResults
							title="Financial Report"
							summary={summary}
							filteredClaims={filteredClaims}
							isLoading={isLoading}
						/>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

interface ReportResultsProps {
	title: string;
	summary: string;
	filteredClaims: any[];
	isLoading: boolean;
}

const ReportResults: React.FC<ReportResultsProps> = ({
	title,
	summary,
	filteredClaims,
	isLoading,
}) => {
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Loader2 className="mr-2 h-8 w-8 animate-spin" />
				<span>Loading...</span>
			</div>
		);
	}

	if (filteredClaims.length === 0) {
		return (
			<div className="flex flex-col gap-6 text-xl mt-10 justify-center items-center">
				<div className="bg-muted rounded-full w-80 h-80 p-16">
					<UserX size={200} className="text-background" />
				</div>
				No Claims Found
			</div>
		);
	}

	return (
		<div className="mb-20">
			<Card className="mb-4 flex-col bg-secondary/40">
				<CardHeader>
					<CardTitle className="text-xl font-bold text-center">
						{title}
					</CardTitle>
					<CardDescription>Report For: {summary}</CardDescription>
				</CardHeader>
				<CardContent>
					{filteredClaims.length > 0 && `${filteredClaims.length} claims found`}
				</CardContent>
			</Card>
			<CustomGrid dataSearched={filteredClaims} />
			{/* <CustomGrid data={filteredClaims} /> */}
		</div>
	);
};

export default Page;

{
	/* <CustomGrid />; */
}
