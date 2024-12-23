"use client";

import { AlertCircle } from "lucide-react";

import { MemberIDCard } from "@/components/shared/Cards/MemberIDCard";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type memberType } from "@/types/member/memeberType";

const ReferralMember = ({ userDetail }: { userDetail: memberType }) => {
	const sampleMember = {
		id: userDetail?.id || "1234", // Default value if userDetail?.id is not available
		member_id: userDetail?.member_id || "M001", // Default value if userDetail?.member_id is not available
		family_id: userDetail?.family_id || "F001",
		middle_name: userDetail?.middle_name || "Abebe",
		first_name: userDetail?.first_name || "Kebede",
		last_name: userDetail?.last_name || "Tadesse",
		first_name_amharic: userDetail?.first_name_amharic || "ከበደ",
		middle_name_amharic: userDetail?.middle_name_amharic || "አበበ",
		last_name_amharic: userDetail?.last_name_amharic || "ታደሰ",
		phone_number: userDetail?.phone_number || "+251 911 234 567",
		email_address: userDetail?.email_address || "kebede.abebe@example.com",
		gender: userDetail?.gender || "Male",
		date_of_birth: userDetail?.date_of_birth || "1985-05-15",
		marital_status: userDetail?.marital_status || "Married",
		mailing_address_line1: userDetail?.mailing_address_line1 || "123 Main St",
		kifle_ketema: userDetail?.kifle_ketema || "Bole",
		country: userDetail?.country || "Ethiopia",
		region: userDetail?.region || "Addis Ababa",
		city: userDetail?.city || "Addis Ababa",
		benefit_plan: userDetail?.benefit_plan || "Basic",
		member_payment_duty: userDetail?.member_payment_duty?.toString() || "10%",
		member_status: userDetail?.member_status || "Active",
		totalInsuranceAmount: userDetail?.totalInsuranceAmount || 10000,
		usedInsuranceAmount: userDetail?.usedInsuranceAmount || 1000,
		deductible: userDetail?.deductible || 1500,
		maxOutOfPocket: userDetail?.maxOutOfPocket || 5000,
		totalCoverage: userDetail?.totalCoverage || 10000,
		currentSpending: userDetail?.currentSpending || 3500,
	};
	return (
		<div>
			<>
				<Accordion type="single" defaultValue="item-1" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger className="bg-secondary  text-xl w-full rounded-md pl-4 pr-4 font-bold">
							<div className="flex gap-2 items-center justify-center">
								{/* <Avatar className="w-16 h-16 mb-4">
								<AvatarImage
									src="/placeholder.svg?height=128&width=128"
									alt={`${sampleMember.first_name} ${sampleMember.last_name}`}
								/>
								<AvatarFallback>
									{sampleMember.first_name[0]}
									{sampleMember.last_name[0]}
								</AvatarFallback>
							</Avatar> */}
								<div>{sampleMember.member_id}</div>
								<div>
									{sampleMember.first_name} {sampleMember.last_name}
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<main className="mb-4 mt-4">
								<MemberIDCard member={sampleMember} />
							</main>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{sampleMember.member_status === "Inactive" && (
					<Alert variant="destructive" className="mt-4">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle className="font-bold">Memeber Terminated</AlertTitle>
						<AlertDescription>
							This user is termed from the Claiming an Insurance. Please contact
							Tilla to activate the user.
						</AlertDescription>
					</Alert>
				)}
			</>
		</div>
	);
};

export default ReferralMember;
