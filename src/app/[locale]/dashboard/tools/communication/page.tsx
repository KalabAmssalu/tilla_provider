"use client";

import * as React from "react";

import { AccountSwitcher } from "@/components/module/Communication/account-switcher";
import { ChatDisplay } from "@/components/module/Communication/chat-display";
import { ChatList } from "@/components/module/Communication/chat-list";
import { ChatNav } from "@/components/module/Communication/chat-nav";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Chat } from "@/types/Communication/communicate";

// Dummy data for chats and accounts
const chats: Chat[] = [
	{
		id: "1",
		name: "Alice Johnson",
		lastMessage: "Hey, how's it going?",
		date: new Date(2023, 5, 1, 14, 30),
		unread: true,
	},
	{
		id: "2",
		name: "Bob Smith",
		lastMessage: "Did you see the latest project update?",
		date: new Date(2023, 5, 1, 10, 15),
		unread: false,
	},
	// Add more dummy chats as needed
];

const accounts = [
	{
		label: "Personal",
		email: "m@example.com",
		icon: "M",
	},
	{
		label: "Work",
		email: "m@company.com",
		icon: "M",
	},
];

export default function ChatPage() {
	const [isCollapsed, setIsCollapsed] = React.useState(false);
	const [selectedChat, setSelectedChat] = React.useState<Chat | null>(null);

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				className="max-h-[600px] items-stretch"
			>
				<ResizablePanel
					defaultSize={20}
					collapsible={true}
					minSize={15}
					maxSize={20}
					onCollapse={() => setIsCollapsed(true)}
					onExpand={() => setIsCollapsed(false)}
					className={isCollapsed ? "min-w-[50px]" : ""}
				>
					{/* <div className="flex h-[52px] items-center justify-center">
						<AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
					</div> */}
					<ChatNav isCollapsed={isCollapsed} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={30} minSize={20}>
					<ChatList
						items={chats}
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={50} minSize={30}>
					<ChatDisplay chat={selectedChat} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
