"use client";

import { useParams } from "next/navigation";

import { useFetchMemeberDetail } from "@/actions/Query/member_Query/member_Query";
import ClaimForm from "@/components/module/claimForm/ClaimForm";
import ClaimMember from "@/components/module/claimForm/ClaimMember";

type Props = {};

const ClaimSubmit = (props: Props) => {
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
					{userDetail && <ClaimMember userDetail={userDetail} />}

					<div className=" ">
						<main className="">
							{userDetail && <ClaimForm selectedMember={userDetail} />}
						</main>
						{/* <BillingSidebar /> */}
					</div>
				</>
			)}
		</div>
	);
};

export default ClaimSubmit;
