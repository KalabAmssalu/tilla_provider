"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationMap = [
	{
		label: "Home",
		route: "/dashboard/home",
		alternateRoutes: ["/en-US/dashboard/home", "/am/dashboard/home"],
	},
	{
		label: "Manage Members",
		route: "/dashboard/members",
		alternateRoutes: ["/en-US/dashboard/members", "/am/dashboard/members"],
	},
	{
		label: "Claims & Payment",
		route: "/dashboard/claims",
		alternateRoutes: ["/en-US/dashboard/claims", "/am/dashboard/claims"],
	},
	{
		label: "Referrals & Prior Authorization",
		route: "/dashboard/referrals",
		alternateRoutes: ["/en-US/dashboard/referrals", "/am/dashboard/referrals"],
	},
	{
		label: "Documents & Reports",
		route: "/dashboard/reports",
		alternateRoutes: ["/en-US/dashboard/reports", "/am/dashboard/reports"],
	},
	{
		label: "Additional Tools",
		route: "/dashboard/tools",
		alternateRoutes: ["/en-US/dashboard/tools", "/am/dashboard/tools"],
	},
	// Add more navigation items here as needed
];

export function NavigationMenuConf() {
	const path = usePathname();

	const isActive = (route: string, alternateRoutes: string[] = []) =>
		path?.startsWith(route) || alternateRoutes.some((r) => path?.startsWith(r));

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navigationMap.map(({ label, route, alternateRoutes }) => (
					<NavigationMenuItem key={route}>
						<Link href={route as `/${string}`} legacyBehavior passHref>
							<NavigationMenuLink className="bg-transparent">
								<Button
									className={cn(
										isActive(route, alternateRoutes) &&
											"border-b-4  border-white text-black",
										"hover:border-b-4 hover:border-white hover:bg-transparent hover:text-white hover rounded-none text-white"
									)}
									variant={"ghost"}
								>
									{label}
								</Button>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
