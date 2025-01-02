"use client";

import { useEffect, useState } from "react";

import MemberInfoDetails from "@/components/module/member/member-details";
import { memberType } from "@/types/member/memeberType";

type Props = {};

const MemberDetailpage = () => {
	const [member, setMember] = useState<memberType | null>(null);

	useEffect(() => {
		const memberData = localStorage.getItem("member");
		if (memberData) {
			setMember(JSON.parse(memberData));
		}
	}, []);

	if (!member) {
		return <p>Loading member information...</p>;
	}
	return (
		<div>
			<MemberInfoDetails member={member} />
		</div>
	);
};

export default MemberDetailpage;
