"use client";

import { useParams } from "next/navigation";

import {
	Activity,
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Mail,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils/formatDate";

type ClaimStatusDetailParams = {
	id: string;
};

type ClaimDetails = {
	id: string;
	claim_id: string;
	recipt_date: string;
	payer_claim_control_number: string;
	claim_type: string;
	service_begin_date: string;
	service_end_date: string;
	activity_state: string;
	claim_status: string;
	amount: number;
	status: string;
	email: string;
};

const ClaimStatusDetail: React.FC = () => {
	const { id } = useParams<ClaimStatusDetailParams>();

	// Mock data fetching function
	const fetchClaimDetails = (claimId: string): ClaimDetails => {
		// Replace this with actual data fetching logic
		return {
			id: claimId,
			claim_id: "C12345",
			recipt_date: "2023-01-01",
			payer_claim_control_number: "PCCN12345",
			claim_type: "Type A",
			service_begin_date: "2023-01-01",
			service_end_date: "2023-01-10",
			activity_state: "Active",
			claim_status: "Approved",
			amount: 316,
			status: "success",
			email: "ken99@yahoo.com",
		};
	};

	const claimDetails = fetchClaimDetails(id);

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "success":
			case "approved":
				return <CheckCircle className="h-5 w-5 text-green-500" />;
			case "pending":
				return <Clock className="h-5 w-5 text-yellow-500" />;
			case "rejected":
				return <AlertCircle className="h-5 w-5 text-red-500" />;
			default:
				return <Activity className="h-5 w-5 text-gray-500" />;
		}
	};

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Claim Status Detail</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle className="text-2xl">Claim Information</CardTitle>
						<CardDescription>
							Details about the claim and its current status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">Claim ID</p>
								<p className="font-semibold">{claimDetails.claim_id}</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">
									Receipt Date
								</p>
								<p className="font-semibold">
									{formatDate(claimDetails.recipt_date)}
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">
									Payer Claim Control Number
								</p>
								<p className="font-semibold">
									{claimDetails.payer_claim_control_number}
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">Claim Type</p>
								<p className="font-semibold">{claimDetails.claim_type}</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">
									Service Begin Date
								</p>
								<p className="font-semibold">
									{formatDate(claimDetails.service_begin_date)}
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-gray-500">
									Service End Date
								</p>
								<p className="font-semibold">
									{formatDate(claimDetails.service_end_date)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Status Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-500">
									Activity State
								</span>
								<Badge
									variant={
										claimDetails.activity_state.toLowerCase() === "active"
											? "default"
											: "secondary"
									}
								>
									{claimDetails.activity_state}
								</Badge>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-500">
									Claim Status
								</span>
								<div className="flex items-center space-x-2">
									{getStatusIcon(claimDetails.claim_status)}
									<span className="font-semibold">
										{claimDetails.claim_status}
									</span>
								</div>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-500">
									Amount
								</span>
								<div className="flex items-center space-x-2">
									<DollarSign className="h-5 w-5 text-green-500" />
									<span className="font-semibold">
										${claimDetails.amount.toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-2">
					<CardHeader>
						<CardTitle className="text-2xl">Additional Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<Mail className="h-5 w-5 text-gray-500" />
								<span className="text-sm font-medium text-gray-500">
									Contact Email:
								</span>
								<span className="font-semibold">{claimDetails.email}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Calendar className="h-5 w-5 text-gray-500" />
								<span className="text-sm font-medium text-gray-500">
									Claim Duration:
								</span>
								<span className="font-semibold">
									{formatDate(claimDetails.service_begin_date)} -{" "}
									{formatDate(claimDetails.service_end_date)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ClaimStatusDetail;
