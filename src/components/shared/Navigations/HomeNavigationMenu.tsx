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
		label: "Tele Medicine",
		route: "/tele-service",
		alternateRoutes: ["/en-US/tele-service", "/am/tele-service"],
	},
	{
		label: "Provider Online",
		route: "/provider-online",
		alternateRoutes: ["/en-US/provider-online", "/am/provider-online"],
	},
	{
		label: "Location",
		route: "/location",
		alternateRoutes: ["/en-US/location", "/am/location"],
	},
	{
		label: "Provider Portal",
		route: "/auth/sign-in",
		alternateRoutes: ["/en-US/provider-portal", "/am/provider-portal"],
	},
	{
		label: "Referrals, Appeals, and Disputes",
		route: "/referrals-appeals",
		alternateRoutes: ["/en-US/referrals-appeals", "/am/referrals-appeals"],
	},
	{
		label: "Carriers",
		route: "/carriers",
		alternateRoutes: ["/en-US/carriers", "/am/carriers"],
	},
];

export function HomeNavigationMenuConf() {
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
