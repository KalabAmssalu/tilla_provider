import { MoreVertical, Phone, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="flex items-center p-4 border-b gap-4">
			<div className="flex-1">
				<h1 className="text-lg font-semibold">Tilla health insurance Chat</h1>
				<p className="text-sm text-muted-foreground">4 participants</p>
			</div>
			<Button variant="ghost" size="icon">
				<Phone className="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="icon">
				<Video className="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="icon">
				<MoreVertical className="h-5 w-5" />
			</Button>
		</header>
	);
}
