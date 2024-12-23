import { redirect } from "next/navigation";

type Props = {};

const referralsPage = (props: Props) => {
	return redirect("/dashboard/referrals/management");
};

export default referralsPage;
