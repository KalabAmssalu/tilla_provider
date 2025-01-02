"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memberType } from "@/types/member/memeberType";

interface MemberInfoDetailsProps {
	member: memberType;
}

export default function MemberInfoDetails({ member }: MemberInfoDetailsProps) {
	if (!member) return null;

	return (
		<div className="container mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-6">Member Information</h1>
			<ScrollArea>
				{/* Member Info Card */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Member Info</CardTitle>
						<CardDescription>Basic details about the member</CardDescription>
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
								<Label>Member Status</Label>
								<p>{member.member_status || "N/A"}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contact Info Card */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Contact Info</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<Label>Email</Label>
								<p>{member.email_address || "N/A"}</p>
							</div>
							<div>
								<Label>Phone Number</Label>
								<p>{member.phone_number}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Health Info Card */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Health Info</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div>
								<Label>Insurance Type</Label>
								<p>{member.insurance_type}</p>
							</div>
							<div>
								<Label>Benefit Plan</Label>
								<p>{member.benefit_plan || "N/A"}</p>
							</div>
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
							<div>
								<Label>Payment Status</Label>
								<p>{member.payment_status ? "Paid" : "Not Paid"}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Address Info Card */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Address Info</CardTitle>
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

				{/* Other Info Card */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Other Info</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label>Family ID</Label>
								<p>{member.family_id}</p>
							</div>
							<div>
								<Label>Plan Cycle</Label>
								<p>{member.plan_cycle}</p>
							</div>
							<div>
								<Label>Representative Name</Label>
								<p>
									{`${member.representative_first_name} ${member.representative_middle_name || ""} ${member.representative_last_name}`.trim()}
								</p>
							</div>
							<div>
								<Label>Relationship to Member</Label>
								<p>{member.relationship_to_member}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</ScrollArea>
		</div>
	);
}
