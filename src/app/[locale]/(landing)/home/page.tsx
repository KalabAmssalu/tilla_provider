import Image from "next/image";
import Link from "next/link";

import HomeScreen from "@/components/screen/landing/HomeScreen";
import { Button } from "@/components/ui/button";

type Props = {};

const page = (props: Props) => {
	return (
		<div>
			<HomeScreen />
		</div>
	);
};

export default page;
