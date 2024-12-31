import type { ReactNode } from "react";

import { CircleUserRound, type LucideIcon } from "lucide-react";

import { AppSidebar } from "@/components/shared/Navigations/app-sideBar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/ui/navType";

interface MemberLayoutProps {
	children: ReactNode;
}

const navData: { headers: string; icons: LucideIcon; items: NavItem[] } = {
	headers: "Members",
	icons: CircleUserRound,
	items: [
		{
			title: "Member Search and Details",
			url: "/dashboard/members/search",
		},
		{
			title: "Eligibility verification",
			url: "/dashboard/members/eligibility",
		},
		{
			title: "Core coordination",
			url: "/dashboard/members/core",
		},
	],
};

export default function MemberLayout({ children }: MemberLayoutProps) {
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
				<SidebarInset>
					<main className="p-4 overflow-hidden">
						<SidebarTrigger className="-ml-1" />
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
