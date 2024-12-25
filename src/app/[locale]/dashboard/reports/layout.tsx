import type { ReactNode } from "react";

import { FileQuestion, type LucideIcon } from "lucide-react";

import { AppSidebar } from "@/components/shared/Navigations/app-sideBar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/ui/navType";

interface ReportsLayoutProps {
	children: ReactNode;
}

const navData: { headers: string; icons: LucideIcon; items: NavItem[] } = {
	headers: "Claims",
	icons: FileQuestion,
	items: [
		{
			title: "Member Records",
			url: "/dashboard/reports/member",
		},
		{
			title: "Provider Forms",
			url: "/dashboard/reports/provider",
		},
		{
			title: "Reports",
			url: "/dashboard/reports/report",
		},
	],
};

export default function ReportsLayout({ children }: ReportsLayoutProps) {
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