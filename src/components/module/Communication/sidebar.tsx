"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { ChatItem } from "./chat-item";

// Dummy data for chats
const chats = [
	{
		id: 1,
		name: "Tilla health insurance Chat",
		lastMessage: "Hello Teams, let us know which logo makes more sense",
		timestamp: "4:26 PM",
		unread: 2,
	},
	{
		id: 2,
		name: "Project Updates",
		lastMessage: "The new features have been deployed",
		timestamp: "2:15 PM",
		unread: 0,
	},
	// Add more dummy chats as needed
];

export function Sidebar() {
	return (
		<div className="flex flex-col border-r bg-muted/50">
			<div className="p-4 border-b">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<input
						placeholder="Search chats..."
						className="w-full pl-8 pr-2 py-2 text-sm bg-background rounded-md border"
					/>
				</div>
			</div>
			<ScrollArea className="flex-1">
				<div className="p-2 space-y-2">
					{chats.map((chat) => (
						<ChatItem key={chat.id} {...chat} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
