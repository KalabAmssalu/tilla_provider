import type { ReactNode } from "react";

import { CircleAlert } from "lucide-react";

import Navbar from "@/components/shared/Navigations/Nav-Bar";
import TopNav from "@/components/shared/Navigations/TopNav";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<GeneralShell>
			<div className="w-full h-screen flex flex-col">
				<div className="sticky top-0 z-50">
					<Navbar />
					<TopNav />
				</div>
				{/* <Image
					src={IMAGES.logoOnly}
					alt="Tilla Logo"
					className="w-20 h-30 absolute top-4 left-4"
				/> */}

				<div className="flex-grow flex items-center justify-center">
					{children}
				</div>
				{/* <footer className="bg-primary text-primary-foreground text-sm p-2 text-center">
					<p>@tilla health insurance</p>
				</footer> */}
			</div>
		</GeneralShell>
	);
}
