import type { ReactNode } from "react";

import MainNav from "@/components/shared/Navigations/MainNav";
import Navbar from "@/components/shared/Navigations/Nav-Bar";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<GeneralShell>
			<div className="flex flex-col min-h-screen">
				{/* Top Navigation */}
				<div className="sticky top-0 z-50">
					<Navbar />
					<MainNav />
				</div>
				{/* Main Content with Sidebar and Breadcrumbs */}
				<main>{children}</main>
			</div>
		</GeneralShell>
	);
}
