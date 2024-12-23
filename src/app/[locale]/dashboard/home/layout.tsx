import type { ReactNode } from "react";

import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

interface AuthLayoutProps {
	children: ReactNode;
}

export default function MemeberLayout({ children }: AuthLayoutProps) {
	return (
		<GeneralShell>
			<div className="w-full h-screen flex flex-col">
				<div className="flex-grow flex items-center justify-center">
					{children}
				</div>
			</div>
		</GeneralShell>
	);
}
