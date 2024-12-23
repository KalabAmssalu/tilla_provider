"use client";

import { useParams } from "next/navigation";

import { useFetchMemeberDetail } from "@/actions/Query/member_Query/member_Query";
import { DisputeForm } from "@/components/module/dispute/disputeForm/dispute-form";

type Props = {};

const DisputeSubmit = (props: Props) => {
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
					{/* {userDetail && <ClaimMember userDetail={userDetail} />} */}

					<div className=" ">
						<main className="">{userDetail && <DisputeForm />}</main>
						{/* <BillingSidebar /> */}
					</div>
				</>
			)}
		</div>
	);
};

export default DisputeSubmit;
