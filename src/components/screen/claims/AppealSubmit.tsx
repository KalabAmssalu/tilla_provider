"use client";

import { useParams } from "next/navigation";

import { useFetchMemeberDetail } from "@/actions/Query/member_Query/member_Query";
import AppealForm from "@/components/module/appealForm/AppealForm";

type Props = {};

const AppealSubmit = (props: Props) => {
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
						<main className="">
							{userDetail && <AppealForm selectedMember={userDetail} />}
						</main>
						{/* <BillingSidebar /> */}
					</div>
				</>
			)}
		</div>
	);
};

export default AppealSubmit;
