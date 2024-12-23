"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useLogout } from "@/actions/Query/auth-Query/auth";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMAGES } from "@/constants/files";

import { NavigationMenuConf } from "./NavigationMenu";

const MainNav = () => {
	// 	const t = useTranslations();
	const { mutate: logOut } = useLogout();

	const route = useRouter();
	const handleLogout = () => {
		logOut();
	};
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
						<div
							className="text-xl font-bold text-secondary hover:cursor-pointer"
							onClick={() => route.push("/dashboard/home")}
						>
							Tilla Health Insurance
						</div>
						<NavigationMenuConf />
					</div>

					<div className="mr-0 flex items-center gap-2 md:mr-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full h-[45px] w-[45px] overflow-hidden bg-secondary"
								>
									<Image
										src={IMAGES.logoOnly}
										height={40}
										width={40}
										alt={"logo"}
									/>
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel className="flex gap-2 text-sm text-customOrange">
									{/* <span>{userRole}:</span>
								<span>{user}</span> */}
									Black Lion Hospital
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									My Account
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									Support
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => handleLogout()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
