"use client";

import Image from "next/image";
import * as React from "react";

import { IMAGES } from "@/constants/files";
import { appointments } from "@/types/appointment/appointment";

import { AppointmentTable } from "../tool/AppointmentTable";

export default function ReferralView() {
	const [view, setView] = React.useState<boolean>(false);
	return (
		<div className="container max-w-screen pt-10">
			{view ? ( // Use ternary operator for better readability
				<AppointmentTable appointments={appointments} />
			) : (
				<div className="flex flex-col gap-6 text-xl justify-center items-center">
					<Image src={IMAGES.noRecord} height={200} width={200} alt={"logo"} />
					No Records Yet!!
				</div>
			)}
		</div>
	);
}
