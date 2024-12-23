import type { ReactNode } from "react";

import { type LucideIcon, Undo2 } from "lucide-react";

import { AppSidebar } from "@/components/shared/Navigations/app-sideBar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/ui/navType";

interface ReferralsLayoutProps {
	children: ReactNode;
}

const navData: { headers: string; icons: LucideIcon; items: NavItem[] } = {
	headers: "Referral ",
	icons: Undo2,
	items: [
		{
			title: "Referral Management",
			url: "/dashboard/referrals/management",
		},
		{
			title: "Prior Authorization Request",
			url: "/dashboard/referrals/authorization",
		},
		{
			title: "Provider Network",
			url: "/dashboard/referrals/network",
		},
	],
};

export default function ReferralsLayout({ children }: ReferralsLayoutProps) {
	return (
		<div>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "15rem",
					} as React.CSSProperties
				}
			>
				<AppSidebar navData={navData} />

				{/* Main Content Area */}
				<SidebarInset className="flex">
					<main className="p-4">
						<SidebarTrigger className="-ml-1" />
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
