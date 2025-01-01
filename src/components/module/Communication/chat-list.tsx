import { ComponentProps } from "react";

import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/Communication/communicate";

interface ChatListProps {
	items: Chat[];
	selectedChat: Chat | null;
	setSelectedChat: (chat: Chat) => void;
}

export function ChatList({
	items,
	selectedChat,
	setSelectedChat,
}: ChatListProps) {
	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search chats" className="pl-8" />
				</div>
			</div>
			<ScrollArea className="flex-1">
				<div className="p-4 space-y-2">
					{items.map((item) => (
						<button
							key={item.id}
							className={cn(
								"flex flex-col w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
								selectedChat?.id === item.id && "bg-muted"
							)}
							onClick={() => setSelectedChat(item)}
						>
							<div className="flex w-full justify-between gap-1">
								<div className="flex items-center">
									<div className="font-semibold">{item.name}</div>
									{item.unread && (
										<Badge variant="secondary" className="ml-2">
											New
										</Badge>
									)}
								</div>
								<div
									className={cn(
										"text-xs",
										selectedChat?.id === item.id
											? "text-foreground"
											: "text-muted-foreground"
									)}
								>
									{formatDistanceToNow(new Date(item.date), {
										addSuffix: true,
									})}
								</div>
							</div>
							<div className="text-xs text-muted-foreground line-clamp-2">
								{item.lastMessage}
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
