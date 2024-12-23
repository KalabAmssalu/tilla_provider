import * as React from "react";

import {
	CircleHelp,
	LogOut,
	type LucideIcon,
	MessageCircleMore,
	Settings,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types/ui/navType";

import { NavSecondary } from "./nav-secondary";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	navData: { headers: string; icons: LucideIcon; items: NavItem[] };
}

/**
 * AppSidebar is a reusable sidebar component.
 * @param {Object} props - Props passed to the Sidebar component.
 * @param {Array} props.navData - Array of navigation items.
 */
const BottomMenu = {
	navSecondary: [
		{
			title: "Contact Us",
			url: "#",
			icon: MessageCircleMore,
		},
		{
			title: "Help",
			url: "#",
			icon: CircleHelp,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			title: "Log Out",
			url: "#",
			icon: LogOut,
		},
	],
};

export function AppSidebar({ navData, ...props }: AppSidebarProps) {
	return (
		<Sidebar variant="floating" {...props} className="mt-20 ">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
							className="border-b-2 border-primary"
						>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
									<navData.icons className="size-6" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-bold text-lg">{navData.headers}</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-2">
						{navData.items.map((item) => (
							<SidebarMenuItem
								key={item.title}
								className="hover:bg-primary hover:text-white rounded-md"
							>
								<SidebarMenuButton
									asChild
									className="hover:bg-primary my-1 active:bg-primary hover:text-white"
								>
									<a href={item.url} className="font-medium">
										{item.title}
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
				<NavSecondary
					items={BottomMenu.navSecondary}
					className="mt-auto pb-24"
				/>
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
