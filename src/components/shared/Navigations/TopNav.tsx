"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IMAGES } from "@/constants/files";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

import { HomeNavigationMenuConf, navigationMap } from "./HomeNavigationMenu";

const TopNav = () => {
	const route = useRouter();
	const path = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isActive = (route: string, alternateRoutes: string[] = []) =>
		path?.startsWith(route) || alternateRoutes.some((r) => path?.startsWith(r));

	return (
		<nav className="sticky top-0 z-50 w-full bg-primary">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between">
					<div className="flex items-center gap-2">
						<Image
							src={IMAGES.logoOnly}
							height={30}
							width={30}
							alt={"logo"}
							onClick={() => route.push("/home")}
							className="cursor-pointer"
						/>
						<div className="hidden text-xl font-bold text-secondary hover:cursor-pointer md:block">
							Tilla Health Insurance
						</div>
					</div>

					<div className="flex items-center gap-2">
						<HomeNavigationMenuConf />

						{/* Mobile Navigation */}
						<Sheet>
							<SheetTrigger asChild>
								<Button className="lg:hidden" variant="secondary">
									<span className="text-primary">☰</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[300px] p-0 bg-secondary/80"
							>
								<div className="flex flex-col">
									<div className="border-b p-4">
										<div className="text-lg font-semibold">Menu</div>
									</div>
									<div className="flex flex-col p-4">
										{navigationMap.map(({ label, route, alternateRoutes }) => (
											<Link key={route} href={route}>
												<Button
													variant="ghost"
													className={cn(
														"w-full justify-start",
														isActive(route, alternateRoutes) &&
															"bg-accent text-accent-foreground"
													)}
												>
													{label}
												</Button>
											</Link>
										))}
										<DropdownMenuSeparator className="my-2" />
										<Button variant="ghost" className="w-full justify-start">
											Settings
										</Button>
										<Button variant="ghost" className="w-full justify-start">
											Support
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>

						{/* User Menu - Visible on all screen sizes */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="hidden lg:flex"
								>
									<span className="text-primary">☰</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									Support
								</DropdownMenuItem>
								<DropdownMenuSeparator />
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
