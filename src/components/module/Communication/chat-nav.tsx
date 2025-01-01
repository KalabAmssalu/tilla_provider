import { Archive, Inbox, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatNavProps {
	isCollapsed: boolean;
}

export function ChatNav({ isCollapsed }: ChatNavProps) {
	return (
		<ScrollArea className="h-[calc(100vh-52px)]">
			<div className="space-y-2 p-2">
				<h2
					className={cn(
						"mb-2 px-2 text-lg font-semibold tracking-tight",
						isCollapsed && "sr-only"
					)}
				>
					Chats
				</h2>
				<Button variant="secondary" className="w-full justify-start">
					<Inbox className="mr-2 h-4 w-4" />
					{!isCollapsed && "All Chats"}
				</Button>
				<Button variant="ghost" className="w-full justify-start">
					<Users className="mr-2 h-4 w-4" />
					{!isCollapsed && "Tilla Admin"}
				</Button>
				<Button variant="ghost" className="w-full justify-start">
					<Star className="mr-2 h-4 w-4" />
					{!isCollapsed && "Tilla Providers"}
				</Button>
				<Button variant="ghost" className="w-full justify-start">
					<Archive className="mr-2 h-4 w-4" />
					{!isCollapsed && "Members"}
				</Button>
			</div>
		</ScrollArea>
	);
}
