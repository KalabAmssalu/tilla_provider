"use client";

import { PhoneOutgoing } from "lucide-react";
import { useTypewriter } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/custom/modeToggle";

import LocaleSwitcher from "../DropDown/LocaleSwitcher";

const Navbar = () => {
	const [typewriter] = useTypewriter({
		words: [
			"Welcome to Tilla Health Insurance",
			"Protecting Your Health, Securing Your Future.",
		],
		loop: true,
		deleteSpeed: 40,
		typeSpeed: 100,
	});

	return (
		<>
			<div className="bg-secondary dark:bg-muted py-1 px-4 sm:px-8 text-center">
				<div className="flex justify-between items-center mx-auto">
					<p className="text-black dark:text-white text-sm flex gap-1">
						&#128400; <span className="hidden sm:flex"> {typewriter}</span>
					</p>
					<div className="flex space-x-3 justify-center items-center">
						<ModeToggle classStyle="h-6 w-6 border-none" />
						<LocaleSwitcher />
						<Button className="h-6" variant={"outline"}>
							<PhoneOutgoing className="mr-2 h-4 w-4" />
							<span className="sm:flex hidden">Contact</span>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
