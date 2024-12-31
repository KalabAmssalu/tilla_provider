import type { ReactNode } from "react";

import { FileQuestion, type LucideIcon } from "lucide-react";

import { AppSidebar } from "@/components/shared/Navigations/app-sideBar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/ui/navType";

interface ClaimsLayoutProps {
	children: ReactNode;
}

const navData: { headers: string; icons: LucideIcon; items: NavItem[] } = {
	headers: "Claims",
	icons: FileQuestion,
	items: [
		{
			title: "Claims Submission",
			url: "/dashboard/claims/submission",
		},
		{
			title: "Claims status and History",
			url: "/dashboard/claims/status",
		},
		{
			title: "Payment Information",
			url: "/dashboard/claims/payment",
		},
		{
			title: "Appeals and Disputes",
			url: "/dashboard/claims/appeals",
		},
	],
};

export default function ClaimsLayout({ children }: ClaimsLayoutProps) {
	return (
		<div>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "15rem",
						"--sidebar-content-width": "15rem",
					} as React.CSSProperties
				}
			>
				<AppSidebar navData={navData} />

				{/* Main Content Area */}
				<SidebarInset>
					<main className="p-4 pt-2 flex gap-1 flex-col shrink-0">
						<SidebarTrigger className="-ml-1" />
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
