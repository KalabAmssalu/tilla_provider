import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/app";

export async function generateMetadata() {
	// useTranslations works both on the server and client;
	// we only need the getTranslations on async functions.
	const t = await getTranslations();

	const metadata: Metadata = {
		title: `${t("metadata.title.home")} - ${siteConfig.appNameDesc}`,
	};

	return metadata;
}

export default function claimPage() {
	// const t = useTranslations();
	return redirect("/dashboard/reports/member");
}
