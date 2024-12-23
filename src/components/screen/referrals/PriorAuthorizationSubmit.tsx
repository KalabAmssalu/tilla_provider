"use client";

import { useParams } from "next/navigation";

import { useFetchMemeberDetail } from "@/actions/Query/member_Query/member_Query";
import PriorAuthorizationForm from "@/components/module/priorAuthorizationForm/PriorAuthorizationForm";
import ReferralMember from "@/components/module/referral/referralForm/ReferralMember";

type Props = {};

const PriorAuthorizationSubmit = (props: Props) => {
	const { id } = useParams();
	const userId: string = Array.isArray(id) ? id[0] : id;

	const {
		data: userDetail,
		isSuccess,
		isLoading,
	} = useFetchMemeberDetail(userId);

	return (
		<div className="flex flex-col gap-4">
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{userDetail && <ReferralMember userDetail={userDetail} />}

					<div className=" ">
						<main className="">
							{userDetail && (
								<PriorAuthorizationForm selectedMember={userDetail} />
							)}
						</main>
						{/* <BillingSidebar /> */}
					</div>
				</>
			)}
		</div>
	);
};

export default PriorAuthorizationSubmit;
