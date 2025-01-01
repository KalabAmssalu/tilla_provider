import { redirect } from "next/navigation";

type Props = {};

const Memberpage = (props: Props) => {
	return redirect("/dashboard/members/search");
};

export default Memberpage;
