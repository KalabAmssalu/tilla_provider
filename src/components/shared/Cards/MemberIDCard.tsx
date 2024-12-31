import { CheckCircle, CircleX } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { DeductableProgressBar } from "../Progress/DeductableProgressBar";
import { InsuranceProgress } from "../Progress/InsuranceProgress";
import { InsuranceProgressBar } from "../Progress/InsuranceProgressBar";

interface MemberInfo {
	id: string;
	member_id?: string;
	family_id?: string;
	middle_name: string;
	first_name: string;
	last_name: string;
	first_name_amharic: string;
	middle_name_amharic: string;
	last_name_amharic: string;
	phone_number: string;
	email_address: string;
	gender?: string;
	date_of_birth?: string;
	marital_status?: string;
	mailing_address_line1?: string;
	kifle_ketema?: string;
	country?: string;
	region?: string;
	city?: string;
	benefit_plan?: string;
	member_payment_duty?: string;
	member_status?: string;
	totalInsuranceAmount: number;
	usedInsuranceAmount: number;
	deductible: number;
	maxOutOfPocket: number;
	totalCoverage: number;
	currentSpending: number;
}

export function MemberIDCard({ member }: { member: MemberInfo }) {
	return (
		<Card className="w-full ">
			<CardContent className="p-0">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/3 bg-primary">
						<div className="p-6 flex flex-col items-center justify-center h-full">
							<Avatar className="w-32 h-32 mb-4">
								<AvatarImage
									src="/placeholder.svg?height=128&width=128"
									alt={`${member.first_name} ${member.last_name}`}
								/>
								<AvatarFallback>
									{member.first_name[0]}
									{member.last_name[0]}
								</AvatarFallback>
							</Avatar>
							<div className="text-center text-primary-foreground">
								<h2 className="md:text-xl text-sm font-bold">
									{member.first_name} {member.middle_name} {member.last_name}
								</h2>
								{/* <p className="text-sm">
									{member.first_name_amharic} {member.middle_name_amharic}{" "}
									{member.last_name_amharic}
								</p> */}
							</div>
							<div className="flex-col mt-4 space-y-4 lg:space-y-0 flex w-full lg:flex-row justify-between">
								{member.member_id && (
									<div>
										<p className="text-white">Member ID:</p>
										<Button
											className="items-center w-full lg:w-40 "
											variant={"outline"}
											size={"sm"}
										>
											{member.member_id || "N/A"}
										</Button>
									</div>
								)}
								{member.member_id && (
									<div>
										<p className="text-white">Family ID:</p>
										<Button
											className="items-center w-full lg:w-40 "
											variant={"outline"}
											size={"sm"}
										>
											{member.family_id || "N/A"}
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="md:w-2/3 md:p-6 p-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InfoItem
								label="Date of Birth"
								value={member.date_of_birth || "N/A"}
							/>

							<div className="flex flex-col flex-1 min-w-[150px]">
								<Label
									htmlFor="memberStatus"
									className="text-sm font-medium text-muted-foreground"
								>
									Member Status:
								</Label>
								{member.member_status === "active" ? (
									<Button className=" bg-green-500  text-white hover:bg-green-700">
										<CheckCircle className="mr-2 h-4 w-4" />
										Active
									</Button>
								) : (
									<Button className="bg-red-500 text-white hover:bg-red-700">
										<CircleX className="mr-2 h-4 w-4" />
										Termed
									</Button>
								)}
							</div>
							<InfoItem
								label="Member Benefit Plan"
								value={member.benefit_plan || "N/A"}
							/>
							<InfoItem
								label="Member Payment Duty"
								value={member.member_payment_duty || "N/A"}
							/>
						</div>
						<Separator className="my-4 bg-primary h-1" />
						<div className="mt-4 space-y-8">
							<InsuranceProgress
								deductible={member.deductible}
								maxOutOfPocket={member.maxOutOfPocket}
								currentSpending={member.currentSpending}
							/>
							{/* <DeductableProgressBar
								deductible={member.deductible}
								maxOutOfPocket={member.maxOutOfPocket}
								currentSpending={member.currentSpending}
								totalCoverage={member.totalCoverage}
							/> */}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-sm font-medium text-muted-foreground">{label}</p>
			<p className="text-sm">{value}</p>
		</div>
	);
}
