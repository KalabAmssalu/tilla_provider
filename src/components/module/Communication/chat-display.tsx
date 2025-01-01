import { useState } from "react";

import { format } from "date-fns";
import { MoreVertical, Phone, Send, Video } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Chat } from "@/types/Communication/communicate";

interface ChatDisplayProps {
	chat: Chat | null;
}

export function ChatDisplay({ chat }: ChatDisplayProps) {
	const [message, setMessage] = useState("");

	return (
		<div className="flex flex-col h-full">
			{chat ? (
				<>
					<div className="flex items-center p-4 border-b">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={`https://avatar.vercel.sh/${chat.name}.png`}
								alt={chat.name}
							/>
							<AvatarFallback>{chat.name[0]}</AvatarFallback>
						</Avatar>
						<div className="ml-2 flex-1">
							<div className="font-semibold">{chat.name}</div>
							<div className="text-xs text-muted-foreground">Active now</div>
						</div>
						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon">
										<Phone className="h-4 w-4" />
										<span className="sr-only">Call</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>Call</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon">
										<Video className="h-4 w-4" />
										<span className="sr-only">Video call</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>Video call</TooltipContent>
							</Tooltip>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<MoreVertical className="h-4 w-4" />
										<span className="sr-only">More options</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>View profile</DropdownMenuItem>
									<DropdownMenuItem>Block user</DropdownMenuItem>
									<DropdownMenuItem>Delete chat</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className="flex-1 p-4 overflow-auto">
						{/* Chat messages would go here */}
						<div className="text-center text-muted-foreground">
							No messages yet
						</div>
					</div>
					<Separator />
					<div className="p-4">
						<form
							onSubmit={(e) => e.preventDefault()}
							className="flex items-center gap-2"
						>
							<Input
								placeholder={`Message ${chat.name}`}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="flex-1"
							/>
							<Button type="submit" size="icon">
								<Send className="h-4 w-4" />
								<span className="sr-only">Send</span>
							</Button>
						</form>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center h-full">
					<div className="text-center">
						<h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
						<p className="text-muted-foreground">
							Select a conversation to start chatting
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
