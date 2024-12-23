"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/custom/modeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMAGES } from "@/constants/files";

import LocaleSwitcher from "../DropDown/LocaleSwitcher";
import { HomeNavigationMenuConf } from "./HomeNavigationMenu";

const TopNav = () => {
	// 	const t = useTranslations();
	const route = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-primary z-50 w-full">
			<div className=" mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center gap-2">
						<Image
							src={IMAGES.logoOnly}
							height={30}
							width={30}
							alt={"logo"}
							onClick={() => route.push("/home")}
						/>
						<div className="hidden md:block text-xl font-bold text-secondary hover:cursor-pointer mr-6 ">
							Tilla Health Insurance
						</div>
					</div>

					<div className="mr-0 flex items-center gap-2 md:mr-2">
						<div className="hidden md:block">
							<HomeNavigationMenuConf />
						</div>
						{/* <HomeNavigationMenuConf /> */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="p-4" variant="secondary">
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
						{/* Dropdown Menu for Mobile */}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
