"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memberType } from "@/types/member/memeberType";

interface MemberInfoDetailsProps {
	member: memberType;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function MemberInfoDetails({
	member,
	open,
	onOpenChange,
}: MemberInfoDetailsProps) {
	if (!member) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]  ">
				<DialogHeader>
					<DialogTitle>Member Information</DialogTitle>
				</DialogHeader>
				<ScrollArea className="">
					<Card className="mb-6">
						<CardHeader>
							<CardTitle>Member Profile</CardTitle>
							<CardDescription>Details about the member</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<div>
									<Label>Member ID</Label>
									<p>{member.member_id}</p>
								</div>
								<div>
									<Label>Name</Label>
									<p>
										{`${member.first_name} ${member.middle_name || ""} ${member.last_name}`.trim()}
									</p>
								</div>
								<div>
									<Label>Email</Label>
									<p>{member.email_address || "N/A"}</p>
								</div>
								<div>
									<Label>Phone Number</Label>
									<p>{member.phone_number}</p>
								</div>
								<div>
									<Label>Gender</Label>
									<p>{member.gender || "N/A"}</p>
								</div>
								<div>
									<Label>Date of Birth</Label>
									<p>{member.date_of_birth || "N/A"}</p>
								</div>
								<div>
									<Label>Marital Status</Label>
									<p>{member.marital_status || "N/A"}</p>
								</div>
								<div>
									<Label>Benefit Plan</Label>
									<p>{member.benefit_plan || "N/A"}</p>
								</div>
								<div>
									<Label>Member Status</Label>
									<p>{member.member_status || "N/A"}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Address Information */}
					<Card>
						<CardHeader>
							<CardTitle>Address Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label>Mailing Address</Label>
									<p>{member.mailing_address_line1 || "N/A"}</p>
									<p>{`${member.city || "N/A"}, ${member.region || "N/A"}, ${member.country}`}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Additional Information */}
					{/* <Card>
						<CardHeader>
							<CardTitle>Additional Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label>Height</Label>
									<p>{member.height ? `${member.height} cm` : "N/A"}</p>
								</div>
								<div>
									<Label>Weight</Label>
									<p>{member.weight ? `${member.weight} kg` : "N/A"}</p>
								</div>
								<div>
									<Label>TIN Number</Label>
									<p>{member.tin_number || "N/A"}</p>
								</div>
								{/* Add other fields as needed 
							</div>
						</CardContent>
					</Card> */}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
